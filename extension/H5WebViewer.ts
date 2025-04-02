import { readFileSync, unwatchFile, watchFile, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

import { assertDefined } from '@h5web/app';
import { type Manifest } from 'vite';
import {
  commands,
  type CustomDocument,
  type CustomReadonlyEditorProvider,
  type ExtensionContext,
  type LogOutputChannel,
  Uri,
  type Webview,
  type WebviewPanel,
  window,
  workspace,
} from 'vscode';

import { type Message, MessageType } from './models';
import { PLUGINS } from './plugins';

export default class H5WebViewer implements CustomReadonlyEditorProvider {
  public constructor(
    private readonly context: ExtensionContext,
    private readonly outputChannel: LogOutputChannel,
  ) {}

  public async openCustomDocument(uri: Uri): Promise<CustomDocument> {
    return { uri, dispose: () => {} };
  }

  public async resolveCustomEditor(
    document: CustomDocument,
    webviewPanel: WebviewPanel,
  ): Promise<void> {
    const { webview } = webviewPanel;
    const { extensionUri } = this.context;

    // Allow opening files outside of workspace
    // https://github.com/ucodkr/vscode-tiff/blob/9a4f976584fcba24e9f25680fcdb47fc8f97493f/src/tiffPreview.ts#L27-L30
    const resourceRoot = document.uri.with({
      path: document.uri.path.replace(/\/[^/]+?\.\w+$/u, '/'),
    });

    webview.options = {
      enableScripts: true,
      localResourceRoots: [extensionUri, resourceRoot],
    };

    // eslint-disable-next-line require-atomic-updates
    webview.html = await this.getHtmlForWebview(webview);

    webview.onDidReceiveMessage(async (evt: Message) => {
      if (evt.type === MessageType.Ready) {
        const uri = webview.asWebviewUri(document.uri).toString();
        const name = basename(document.uri.fsPath);
        const { size } = await workspace.fs.stat(document.uri);

        webview.postMessage({
          type: MessageType.FileInfo,
          data: { uri, name, size },
        });

        watchFile(document.uri.fsPath, () => {
          webview.postMessage({
            type: MessageType.FileInfo,
            data: { uri, name, size },
          });
        });

        webviewPanel.onDidDispose(() => {
          unwatchFile(document.uri.fsPath);
        });

        return;
      }

      if (evt.type === MessageType.Export) {
        const { format, name, payload } = evt.data;

        const defaultUri = Uri.file(
          join(dirname(document.uri.fsPath), `${name}.${format}`),
        );

        const saveUri = await window.showSaveDialog({
          defaultUri,
          title: `Export to ${format.toUpperCase()}`,
        });

        if (saveUri) {
          writeFileSync(saveUri.fsPath, payload);

          // Open output file in separate editor
          commands.executeCommand('workbench.action.keepEditor'); // if current editor is in preview mode, keep it open

          try {
            await window.showTextDocument(saveUri);
          } catch (error) {
            this.outputChannel.warn(
              'Unable to open file:',
              error instanceof Error ? error.message : 'unknown error',
            );
          }
        }
      }
    });
  }

  private async getHtmlForWebview(webview: Webview): Promise<string> {
    const { extensionPath, extensionUri } = this.context;
    const { cspSource } = webview;

    const manifest = JSON.parse(
      readFileSync(join(extensionPath, 'dist/.vite/manifest.json'), 'utf-8'),
    ) as Manifest;

    const [{ file: jsPath, css }] = Object.values(manifest);
    assertDefined(css);
    const [cssPath] = css;

    const jsPathOnDisk = Uri.joinPath(extensionUri, 'dist', jsPath);
    const cssPathOnDisk = Uri.joinPath(extensionUri, 'dist', cssPath);

    const jsUri = webview.asWebviewUri(jsPathOnDisk);
    const cssUri = webview.asWebviewUri(cssPathOnDisk);

    const plugins = JSON.stringify(
      Object.fromEntries(
        Object.entries(PLUGINS).map(([name, relativePath]) => {
          const pluginUri = Uri.joinPath(extensionUri, 'out', relativePath);
          return [name, webview.asWebviewUri(pluginUri).toString()];
        }),
      ),
    );

    const cspRules = [
      "default-src 'none'", // strict by default
      `connect-src ${cspSource}`, // to allow fetching HDF5 file as buffer
      `script-src ${cspSource} 'unsafe-eval'`, // 'unsafe-eval' because of cwise dependency in H5Web
      `style-src ${cspSource}`,
      'img-src blob:', // for JPEG/PNG images in Raw visualization
      'worker-src blob:', // for H5WasmLocalFileProvider's inline worker
    ];

    return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta
          http-equiv="Content-Security-Policy"
          content="${cspRules.join('; ')};"
        >
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>H5Web</title>
        <script id="plugins" type="application/json">${plugins}</script>
        <script type="module" src="${jsUri.toString()}"></script>
        <link rel="stylesheet" href="${cssUri.toString()}">
			</head>
			<body>
				<div id="root"></div>
			</body>
			</html>`;
  }
}
