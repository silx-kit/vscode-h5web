import { ExtensionContext, window } from 'vscode';
import H5WebViewer from './H5WebViewer';

const EDITOR_IDS = ['h5web.viewer', 'h5web.fallback-viewer'];

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    ...EDITOR_IDS.map((id) =>
      window.registerCustomEditorProvider(id, new H5WebViewer(context), {
        webviewOptions: { retainContextWhenHidden: true },
        supportsMultipleEditorsPerDocument: true,
      })
    )
  );
}
