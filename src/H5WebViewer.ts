import {
  CustomDocument,
  CustomReadonlyEditorProvider,
  ExtensionContext,
  Uri,
  Webview,
  WebviewPanel,
  window,
  workspace,
} from 'vscode';
import { join, basename } from 'path';
import { writeFileSync, watchFile, unwatchFile } from 'fs';
import { Message, MessageType } from './models';
import path = require('path');
import { getSupportedPlugins } from './plugins';

export default class H5WebViewer
  implements CustomReadonlyEditorProvider<CustomDocument>
{
  public constructor(private readonly context: ExtensionContext) {}

  public async openCustomDocument(uri: Uri): Promise<CustomDocument> {
    return { uri, dispose: () => {} };
  }

  public async resolveCustomEditor(
    document: CustomDocument,
    webviewPanel: WebviewPanel
  ): Promise<void> {
    const { webview } = webviewPanel;

    // Allow opening files outside of workspace
    // https://github.com/ucodkr/vscode-tiff/blob/9a4f976584fcba24e9f25680fcdb47fc8f97493f/src/tiffPreview.ts#L27-L30
    const extensionRoot = Uri.file(this.context.extensionPath);
    const resourceRoot = document.uri.with({
      path: document.uri.path.replace(/\/[^/]+?\.\w+$/, '/'),
    });

    webview.options = {
      enableScripts: true,
      localResourceRoots: [resourceRoot, extensionRoot],
    };

    webview.html = await this.getHtmlForWebview(webview);

    webview.onDidReceiveMessage(async (evt: Message) => {
      if (evt.type === MessageType.Ready) {
        const uri = webview.asWebviewUri(document.uri).toString();
        const name = basename(document.uri.fsPath);
        const { size } = await workspace.fs.stat(document.uri);
        const supportedPlugins = getSupportedPlugins(webview);

        webview.postMessage({
          type: MessageType.FileInfo,
          data: { uri, name, size, supportedPlugins },
        });

        function watcher() {
          webview.postMessage({
            type: MessageType.FileInfo,
            data: { uri, name, size, supportedPlugins },
          });
        }

        watchFile(document.uri.fsPath, watcher);
        webviewPanel.onDidDispose(() => {
          unwatchFile(document.uri.fsPath, watcher);
        });

        return;
      }

      if (evt.type === MessageType.Export) {
        const { format, name, payload } = evt.data;

        const defaultUri = Uri.file(
          path.join(path.dirname(document.uri.fsPath), `${name}.${format}`)
        );

        const saveUri = await window.showSaveDialog({
          defaultUri,
          title: `Export to ${format.toUpperCase()}`,
        });

        if (saveUri) {
          writeFileSync(saveUri.fsPath, payload);
        }

        return;
      }
    });
  }

  private async getHtmlForWebview(webview: Webview): Promise<string> {
    const { extensionPath } = this.context;
    const { cspSource } = webview;

    const manifest = require(join(extensionPath, 'dist/manifest.json'));
    const { file: jsPath, css } = manifest['index.html'];
    const [cssPath] = css;

    const jsPathOnDisk = Uri.file(join(extensionPath, 'dist', jsPath));
    const cssPathOnDisk = Uri.file(join(extensionPath, 'dist', cssPath));

    const jsUri = webview.asWebviewUri(jsPathOnDisk);
    const cssUri = webview.asWebviewUri(cssPathOnDisk);

    return `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; connect-src data: ${cspSource}; script-src ${cspSource} 'unsafe-eval'; style-src ${cspSource};">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>H5Web</title>
        <script type="module" src="${jsUri}"></script>
        <link rel="stylesheet" href="${cssUri}">
			</head>
			<body>
				<div id="root"></div>
			</body>
			</html>`;
  }
}
