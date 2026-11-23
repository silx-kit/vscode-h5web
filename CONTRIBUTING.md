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
   passes that buffer to the `H5WasmBufferProvider`, and renders H5Web's `App`
   component.
7. If the file is larger than 2 GB and can't fit into a single buffer, the `App`
   component renders a fallback `StandaloneViewer`, which offers to the user to
   browse for the file from inside the webview. In doing so, the webview can
   make use of H5Web's `H5WasmLocalFileProvider`, which has no file size
   restriction.

## Code quality

- `pnpm lint` - run all linting and code formatting commands
- `pnpm lint:eslint` - lint all TS and JS files with ESLint
- `pnpm lint:eslint --fix` - auto-fix linting issues
- `pnpm lint:prettier` - check that all files have been formatted with Prettier
- `pnpm lint:prettier --write` - format all files with Prettier

## Publishing

The H5Web extension is published to the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=h5web.vscode-h5web)
and to the [Open VSX Registry](https://open-vsx.org/) via GitHub Actions and
Trusted Publishing.

To release and publish a new version of the extension:

1. Check out the `main` branch and pull the latest changes.
1. Make sure your working tree doesn't have uncommitted changes and that the
   latest commit on `main` has passed the CI.
1. Update the `CHANGELOG` with the expected version number and commit the
   change.
1. Run `pnpm version [ patch | minor | major | <new-version> ]`

> The `pnpm version` command:
>
> 1. bumps the version in `package.json`;
> 1. commits and tags the change, and then pushes the new commit and the new tag
>    to the remote repository (via the `postversion` script).
>
> This, in turn, triggers the _Publish_ workflow on the CI, which builds and
> publishes the extension.

Once the CI workflow has run successfully:

1. Wait for the new version of the extension to become available on the
   [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage/publishers/h5web/extensions/vscode-h5web/hub?_a=manageExtension).
1. Update the extension in VS Code and make sure it works as expected — if
   needed, run _Extentions: Check for Extension Updates_.
1. Make sure it has also been published to the
   [Open VSX Registry](https://open-vsx.org/extension/h5web/vscode-h5web).
1. Write and publish [release notes](https://github.com/silx-kit/h5web/releases)
   on GitHub.
