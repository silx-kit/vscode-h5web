# [H5Web](https://h5web.panosc.eu/) for Visual Studio Code

Explore and visualise **HDF5 files** directly in Visual Studio Code with
[H5Web](https://h5web.panosc.eu/) and its `H5WasmProvider`.

![GIF recording](./assets/vscode-h5web.gif)

## Supported file extensions

This VS Code extension relies on filename extensions to identify HDF5 files. It
currently supports the following: `.h5`, `.hdf`, `.hdf5`, `.nx`
([NeXus](https://manual.nexusformat.org/index.html)), `.nxs`, `.nx5`, `.nexus`,
`.cxi`
([Coherent X-ray Imaging](https://raw.githubusercontent.com/cxidb/CXI/master/cxi_file_format.pdf)),
`.nc` ([netCDF](https://docs.unidata.ucar.edu/nug/current/)). If you'd like to
add another, don't hesitate to
[open an issue](https://github.com/silx-kit/vscode-h5web/issues/new).

Alternatively, you can still open any file in H5Web by right-clicking on it and
choosing **Open with...**. If you've already opened the file, you can also
invoke the **View: Reopen Editor With...** command:

![GIF recording](./assets/vscode-openwith.gif)

## Known limitations

This extension uses [h5wasm](https://github.com/usnistgov/h5wasm) to read HDF5
files and therefore suffers from the following limitations:

- External links cannot be resolved
- Datasets compressed with external filters (such as those of
  [hdf5plugin](https://github.com/silx-kit/hdf5plugin)) cannot be read
