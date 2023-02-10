# Changelog

## v0.0.7

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

## v0.0.6

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

## v0.0.5

- ✨ Bump H5Web from v6.1.0 to v6.2.1
  - Adds support for `int64` attributes amongst other dtypes (fixes
    [#15](https://github.com/silx-kit/vscode-h5web/issues/15))
  - For the full list of changes, please refer to the release notes for
    [v6.2.0](https://github.com/silx-kit/h5web/releases/tag/v6.2.0) and
    [v6.2.1](https://github.com/silx-kit/h5web/releases/tag/v6.2.1)

## v0.0.4

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

## v0.0.3

- 🧩 Add `.nc` extension [#4](https://github.com/silx-kit/vscode-h5web/pull/4)
- 📝 List supported HDF5 filename extensions in README
  [#4](https://github.com/silx-kit/vscode-h5web/pull/4)

## v0.0.2

- 🐛 Allow opening files outside of workspace folder
  [#3](https://github.com/silx-kit/vscode-h5web/pull/3)
- 📝 Update README with known limitations
  [#1](https://github.com/silx-kit/vscode-h5web/pull/1)

## v0.0.1

- ✨ [H5Web v6.1.0](https://github.com/silx-kit/h5web/releases/tag/v6.1.0)
