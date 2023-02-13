# Contributing

## Getting started

```bash
pnpm install
pnpm build:app
pnpm watch
```

- `pnpm build:app` builds the front-end app (i.e. the H5Web viewer) with
  [Vite](https://vitejs.dev/).
- `pnpm watch` compiles the extension code with `tsc` in watch mode.

Once watch mode is running, press <kbd>F5</kbd> to **run the extension in debug
mode** in a new VS Code window. If this doesn't work, check that the
[_JavaScript Debugger_](https://marketplace.visualstudio.com/items?itemName=ms-vscode.js-debug)
extension is enabled.

Whenever you change the code of the front-end app, run `pnpm build:app` again in
a separate terminal, wait for Vite to finish building the app, and reload the VS
Code window where the extension is running with <kbd>Ctrl+R</kbd>.

## How it works

1. When the user opens an HDF5 file, a new
   [webview editor](https://code.visualstudio.com/api/extension-guides/custom-editors)
   opens up.
2. The [webview](https://code.visualstudio.com/api/extension-guides/webview) is
   initialised with an HTML document that references the compiled front-end
   assets located in the `dist` directory.
3. VS Code loads the webview, which kicks off the H5Web viewer.
4. Once the `App` component is mounted, it notifies the extension that the
   viewer is ready using VS Code's
   [`postMessage` API](https://code.visualstudio.com/api/extension-guides/webview#scripts-and-message-passing).
5. The extension then sends the URI and name of the HDF5 file opened by the user
   to the viewer.
6. Finally, the viewer fetches the file with the given URI as an array buffer,
   passes that buffer to the `H5WasmProvider`, and renders H5Web's `App`
   component.

## Publishing

To be allowed to
[publish an extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
to the Visual Studio Marketplace you must have access to both the
[**H5Web** publisher account](https://marketplace.visualstudio.com/manage/publishers/h5web)
on the Marketplace and the
[**H5Web** organisation](https://dev.azure.com/H5Web/) on Azure DevOps, with the
same Microsoft account.

Then, you have to
[generate a Personal Access Token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)
(PAT) on Azure DevOps. Then, use the `vsce` CLI and your PAT to add `h5web` to
the list of known publishers on your machine:

```bash
pnpx vsce login h5web
```

You're now ready to publish the extension to the Visual Studio Marketplace.

Before doing so, remember to update the `CHANGELOG` and commit/push all changes.
Then, run the following command to publish the extension:

```bash
pnpm pub <patch|minor|major|x.y.z>
```

This will build the front-end app and the extension, bump the version in
`package.json` and publish the extension to the Marketplace.

> Do not use the `pnpm publish` command, as this is a reserved command for
> publishing packages to the NPM repository.

It will take a few minutes before the new version appears in the Marketplace,
and it may take a while longer before you're able to update the extension in VS
Code.

Once you're able to install the new version and confirm that it works as
expected, tag the latest commit and
[publish a new release](https://github.com/silx-kit/vscode-h5web/releases/) on
GitHub to advertise it.
