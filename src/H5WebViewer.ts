import {
  CancellationToken,
  CustomDocumentOpenContext,
  CustomReadonlyEditorProvider,
  ExtensionContext,
  Uri,
  Webview,
  WebviewPanel,
  workspace,
} from 'vscode';
import HDF5Document from './HDF5Document';
import { join, basename } from 'path';

export default class H5WebViewer
  implements CustomReadonlyEditorProvider<HDF5Document>
{
  public constructor(private readonly context: ExtensionContext) {}

  public async openCustomDocument(
    uri: Uri,
    openContext: CustomDocumentOpenContext
  ): Promise<HDF5Document> {
    const { backupId } = openContext;
    const fileUri = typeof backupId === 'string' ? Uri.parse(backupId) : uri;

    const buffer = await workspace.fs.readFile(fileUri);
    return new HDF5Document(uri, buffer);
  }

  public async resolveCustomEditor(
    document: HDF5Document,
    webviewPanel: WebviewPanel
  ): Promise<void> {
    const { webview } = webviewPanel;

    // Allow opening files outside of workspace
    // https://github.com/ucodkr/vscode-tiff/blob/master/src/tiffPreview.ts#L27-L30
    const extensionRoot = Uri.file(this.context.extensionPath);
    const resourceRoot = document.uri.with({
      path: document.uri.path.replace(/\/[^/]+?\.\w+$/, '/'),
    });

    webview.options = {
      enableScripts: true,
      localResourceRoots: [resourceRoot, extensionRoot],
    };

    webview.html = await this.getHtmlForWebview(webview);

    webview.onDidReceiveMessage((evt) => {
      if (evt.type === 'ready') {
        webview.postMessage({
          type: 'FileInfo',
          data: {
            uri: webview.asWebviewUri(document.uri).toString(),
            name: basename(document.uri.fsPath),
          },
        });
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
