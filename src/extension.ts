import { ExtensionContext, window } from 'vscode';
import H5WebViewer from './H5WebViewer';

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    window.registerCustomEditorProvider(
      'h5web.viewer',
      new H5WebViewer(context),
      {
        webviewOptions: { retainContextWhenHidden: true },
        supportsMultipleEditorsPerDocument: true,
      }
    )
  );
}
