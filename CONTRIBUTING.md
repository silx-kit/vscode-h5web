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
mode** in a new VS Code window.

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

Publishing is done with the `vsce` CLI. you can install it globally with
`pnpm add -g vsce`.

To
[publish the extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
on the Visual Studio Marketplace, you must first have access, with the same
Microsoft account, to both the
[**ESRF** publisher account](https://marketplace.visualstudio.com/manage/publishers/esrf)
on the Marketplace and the
[**H5Web** organisation](https://dev.azure.com/H5Web/) on Azure DevOps.

Then, you can
[generate a Personal Access Token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)
on Azure DevOps and use it to login to the publisher account:

```bash
vsce login ESRF
```

If you are able to login, then you're ready to publish the extension:

```bash
vsce publish <patch|minor|major|x.y.z>
```

This will build the front-end app and the extension, bump the version in
`package.json` and publish the extension to the Marketplace.
