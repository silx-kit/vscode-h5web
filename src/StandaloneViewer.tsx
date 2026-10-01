import { App } from '@h5web/app';
import { H5WasmLocalFileProvider } from '@h5web/h5wasm';
import { type ReactNode, useState } from 'react';

import { getExportURL, getPlugin } from './utils';

interface Props {
  disableDarkMode: boolean;
  customMessage?: ReactNode;
}

function StandaloneViewer(props: Props) {
  const { disableDarkMode, customMessage } = props;
  const [fallbackFile, setFallbackFile] = useState<File>();

  if (!fallbackFile) {
    return (
      <>
        {customMessage}
        <input
          type="file"
          aria-label="Select file"
          onChange={(evt) => setFallbackFile(evt.target.files?.[0])}
        />
      </>
    );
  }

  return (
    <H5WasmLocalFileProvider
      file={fallbackFile}
      getExportURL={getExportURL}
      getPlugin={getPlugin}
    >
      <App disableDarkMode={disableDarkMode} />
    </H5WasmLocalFileProvider>
  );
}

export default StandaloneViewer;
