# Changelog

## [v0.1.5](https://github.com/silx-kit/vscode-h5web/compare/v0.1.4...v0.1.5)

- ✨ **Allow opening HDF5 files of any size.** Previously, when you tried to
  open a file larger than 2 GB, you would see an error in the H5Web webview
  editor. Now, you will be able to browse for the file manually from inside the
  webview, and doing so will bypass the file size limitation.

## [v0.1.4](https://github.com/silx-kit/vscode-h5web/compare/v0.1.3...v0.1.4)

- ✨ Upgrade H5Web from v11.1.1 to v11.2.0
  - `< RGB >` Allow flipping RGB visualizations on X and Y
  - Add _NX Note_ visualization with support for JSON MIME type
  - Improve support for empty datasets and attributes
  - For the full list of changes, please refer to the release notes for
    [v11.2.0](https://github.com/silx-kit/h5web/releases/tag/v11.2.0)

## [v0.1.3](https://github.com/silx-kit/vscode-h5web/compare/v0.1.2...v0.1.3)

- ✨ Upgrade H5Web from v11.0.0 to v11.1.1
  - `< Raw >` Display JPEG/PNG images stored as
    [opaque datasets](https://docs.h5py.org/en/stable/special.html#storing-other-types-as-opaque-data)
  - `< Raw >` Fix error when encountering bigints in compound datasets
  - `< Heatmap >` Add toolbar control to flip `X` axis
  - `< NX Heatmap >` Support NeXus
    [auxiliary signals](https://manual.nexusformat.org/classes/base_classes/NXdata.html#nxdata)
  - Propagate HDF5 errors to viewer so they can be properly handled and
    displayed
  - For the full list of changes, please refer to the release notes for
    [v11.1.0](https://github.com/silx-kit/h5web/releases/tag/v11.1.0) and
    [v11.1.1](https://github.com/silx-kit/h5web/releases/tag/v11.1.1)

## [v0.1.2](https://github.com/silx-kit/vscode-h5web/compare/v0.1.1...v0.1.2)

- 📂 Add **Blosc2** and **Bitshuffle** compression plugins.
- ✨ Bump H5Web from v10.1.0 to v11.0.0
  - `[H5WasmProvider]` Support lazy-loading Blosc2 and Bitshuffle compression
    plugins
  - `[H5WasmProvider]` Correctly parse the following advanced HDF5 types:
    `H5T_OPAQUE`, `H5T_VLEN`, and `H5T_REFERENCE` so they no longer appear as
    _Unknown_ in the metadata viewer.
  - For the full list of changes, please refer to the release notes for
    [v11.0.0](https://github.com/silx-kit/h5web/releases/tag/v11.0.0)

## [v0.1.1](https://github.com/silx-kit/vscode-h5web/compare/v0.1.0...v0.1.1)

- 🐛 Fix compression plugins failing to load under symlinked user directory.

## [v0.1.0](https://github.com/silx-kit/vscode-h5web/compare/v0.0.11...v0.1.0)

> ⚠️ Requires VS Code **1.86.0** (January 2024) or later.

- 📂 Support the following seven HDF5 compression plugins: **Blosc, bzip2, LZ4,
  LZF, SZ, ZFP and Zstandard**. The plugins are loaded on demand when
  visualizing compressed datasets.
  [#35](https://github.com/silx-kit/vscode-h5web/pull/35)
- 🧩 Open `.loom` files in H5Web by default
  [#36](https://github.com/silx-kit/vscode-h5web/pull/36)
- ✨ Bump H5Web from v10.0.0 to v10.1.0
  - `[H5WasmProvider]` Support lazy-loading seven compression plugins
  - `< NX Heatmap >` Fix min axis array length off by 1 in error message
  - For the full list of changes, please refer to the release notes for
    [v10.1.0](https://github.com/silx-kit/h5web/releases/tag/v10.1.0)

## [v0.0.11](https://github.com/silx-kit/vscode-h5web/compare/v0.0.10...v0.0.11)

- ✨ Upgrade React to v18 and bump H5Web from v9.0.0 to v10.0.0
  - `< Matrix >` Support visualising compound datasets containing (u)int64 data
    — [#30](https://github.com/silx-kit/vscode-h5web/issues/30)
  - `< Line, Heatmap >` Support visualizing boolean datasets
  - For the full list of changes, please refer to the release notes for
    [v10.0.0](https://github.com/silx-kit/h5web/releases/tag/v10.0.0)

## [v0.0.10](https://github.com/silx-kit/vscode-h5web/compare/v0.0.9...v0.0.10)

- ✨ Rerender automatically on file changes
  [#31](https://github.com/silx-kit/vscode-h5web/pull/31)
- ✨ `< Matrix, Line >` Support exporting dataset/slice to CSV —
  [#23](https://github.com/silx-kit/vscode-h5web/pull/23) by @mandrew9
- ✨ `< Raw >` Support exporting dataset to JSON
  [#29](https://github.com/silx-kit/vscode-h5web/pull/29)
- ✨ Bump H5Web from v8.0.0 to v9.0.0
  - Allow zooming on very thin selection boxes
  - Fix heatmap snapshot feature and, more generally, fix saving WebGL canvas as
    image via "save image as"
  - Parse nested array types
  - For the full list of changes, please refer to the release notes for
    [v9.0.0](https://github.com/silx-kit/h5web/releases/tag/v9.0.0)
- Fall back gracefully when diffing an untracked file
  [#32](https://github.com/silx-kit/vscode-h5web/pull/32)

## [v0.0.9](https://github.com/silx-kit/vscode-h5web/compare/v0.0.8...v0.0.9)

- ✨ Bump H5Web from v7.1.0 to v8.0.0
  - Show NeXus axis labels when hovering dimension buttons D0, D1, ...
  - Add Cubehelix colormap for heatmap visualization
  - Display chunks information, if any, when inspecting a dataset
  - Fix support for big-endian numbers
  - For the full list of changes, please refer to the release notes for
    [v8.0.0](https://github.com/silx-kit/h5web/releases/tag/v8.0.0)

## [v0.0.8](https://github.com/silx-kit/vscode-h5web/compare/v0.0.7...v0.0.8)

- ✨ Bump H5Web from v7.0.0 to v7.1.0
  - Allow searching for datasets, groups and other entities by text in the
    sidebar.
  - Support NetCDF's `_FillValue` attribute to ignore missing data. When the
    attribute is set, the given value is ignored when computing the data domain
    and when rendering the line and heatmap visualizations.
  - Support unsigned 64-bit integers.
  - On heatmap visualizations, `+Infinity` and `-Infinity` no longer appear as
    transparent; they are now displayed with the lowest/highest colors of the
    selected color map just like any other under/over values.
  - For the full list of changes, please refer to the release notes for
    [v7.0.1](https://github.com/silx-kit/h5web/releases/tag/v7.0.1) and
    [v7.1.0](https://github.com/silx-kit/h5web/releases/tag/v7.1.0)

## [v0.0.7](https://github.com/silx-kit/vscode-h5web/compare/v0.0.6...v0.0.7)

- ✨ Bump H5Web from v6.5.0 to v7.0.0
  - Support stacks of RGB images
  - Support NeXus RGB visualizations with custom axis datasets
  - Fix detection of RGB datasets inside `NXdata` groups
  - In the heatmap toolbar, selecting a colormap range smaller than the data
    domain no longer reduces the slider's extent (and therefore keeps the thumbs
    where you drop them)
  - Select-to-zoom interactions now zoom only on areas of at least 20x20px,
    which avoids inadvertently zooming on very small areas
  - Fix error when switching from "NX Heatmap" to "NX Line" visualization with
    an axis dataset longer than the signal dataset by one value (i.e. pixel
    boundaries)
  - For the full list of changes, please refer to the release notes for
    [v6.6.0](https://github.com/silx-kit/h5web/releases/tag/v6.6.0),
    [v6.6.1](https://github.com/silx-kit/h5web/releases/tag/v6.6.1) and
    [v7.0.0](https://github.com/silx-kit/h5web/releases/tag/v7.0.0)

## [v0.0.6](https://github.com/silx-kit/vscode-h5web/compare/v0.0.5...v0.0.6)

- 🔄 Show loading message while opening large file
  [#16](https://github.com/silx-kit/vscode-h5web/pull/16)
- 🚩 Show error when trying to open file bigger than 2 GB
  [#16](https://github.com/silx-kit/vscode-h5web/pull/16)
- ✨ Bump H5Web from v6.2.1 to 6.5.0
  - Compression filters are now listed when inspecting a dataset
  - Visualizing a dataset compressed with external filters now brings out an
    explicit error in the UI
  - Explorer can be navigated with the keyboard's arrow keys
  - NeXus visualizations "NX Spectrum" and "NX Image" are renamed "NX Line" and
    "NX Heatmap" respectively
  - Tick labels should no longer appear underneath the ordinate axis' label
  - Selecting datatypes no longer brings out an error in the UI
  - For the full list of changes, please refer to the release notes for
    [v6.3.0](https://github.com/silx-kit/h5web/releases/tag/v6.3.0),
    [v6.4.0](https://github.com/silx-kit/h5web/releases/tag/v6.4.0),
    [v6.4.1](https://github.com/silx-kit/h5web/releases/tag/v6.4.1) and
    [v6.5.0](https://github.com/silx-kit/h5web/releases/tag/v6.5.0)

## [v0.0.5](https://github.com/silx-kit/vscode-h5web/compare/v0.0.4...v0.0.5)

- ✨ Bump H5Web from v6.1.0 to v6.2.1
  - Adds support for `int64` attributes amongst other dtypes (fixes
    [#15](https://github.com/silx-kit/vscode-h5web/issues/15))
  - For the full list of changes, please refer to the release notes for
    [v6.2.0](https://github.com/silx-kit/h5web/releases/tag/v6.2.0) and
    [v6.2.1](https://github.com/silx-kit/h5web/releases/tag/v6.2.1)

## [v0.0.4](https://github.com/silx-kit/vscode-h5web/compare/v0.0.3...v0.0.4)

- 🧩 Add `.nc4` extension
  [#11](https://github.com/silx-kit/vscode-h5web/pull/11)
- :sparkles: Allow opening _any_ file with H5Web via **Open with...** and
  **View: Reopen Editor With...**
  [#7](https://github.com/silx-kit/vscode-h5web/pull/7)
  [#12](https://github.com/silx-kit/vscode-h5web/pull/12)
- :memo: Mention VS Code's `workbench.editorAssociations` setting in README,
  which allows making H5Web the default editor for more file extensions
  [#9](https://github.com/silx-kit/vscode-h5web/pull/9)
- :zap: Remove obsolete file read when opening the viewer
  [#8](https://github.com/silx-kit/vscode-h5web/pull/8)

## [v0.0.3](https://github.com/silx-kit/vscode-h5web/compare/v0.0.2...v0.0.3)

- 🧩 Add `.nc` extension [#4](https://github.com/silx-kit/vscode-h5web/pull/4)
- 📝 List supported HDF5 filename extensions in README
  [#4](https://github.com/silx-kit/vscode-h5web/pull/4)

## [v0.0.2](https://github.com/silx-kit/vscode-h5web/compare/v0.0.1...v0.0.2)

- 🐛 Allow opening files outside of workspace folder
  [#3](https://github.com/silx-kit/vscode-h5web/pull/3)
- 📝 Update README with known limitations
  [#1](https://github.com/silx-kit/vscode-h5web/pull/1)

## [v0.0.1](https://github.com/silx-kit/vscode-h5web/tree/v0.0.1)

- ✨ [H5Web v6.1.0](https://github.com/silx-kit/h5web/releases/tag/v6.1.0)
