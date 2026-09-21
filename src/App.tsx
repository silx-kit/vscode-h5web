import { useEventListener } from '@react-hookz/web';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { clear } from 'suspend-react';

import { type FileInfo, type Message, MessageType } from '../extension/models';
import styles from './App.module.css';
import ErrorFallback from './ErrorFallback';
import StandaloneViewer from './StandaloneViewer';
import Viewer from './Viewer';
import { vscode } from './vscode-api';

// 2 GB = 2 * 1024 * 1024 * 1024 B
const MAX_SIZE_IN_BYTES = 2_147_483_648;

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(globalThis, 'message', (evt: MessageEvent<Message>) => {
    const { data: message } = evt;
    if (message.type === MessageType.FileInfo) {
      setFileInfo(message.data);
    }
  });

  useEffect(() => {
    vscode.postMessage({ type: MessageType.Ready });
  }, []);

  if (!fileInfo) {
    return null;
  }

  if (fileInfo.size === 0) {
    // e.g. when comparing git changes on an untracked file - https://github.com/silx-kit/vscode-h5web/issues/22
    return <p>File does not exist</p>;
  }

  const { colorScheme } = document.body.dataset;
  const disableDarkMode = colorScheme !== 'system';

  if (fileInfo.size >= MAX_SIZE_IN_BYTES) {
    return (
      <StandaloneViewer
        disableDarkMode={disableDarkMode}
        customMessage={
          <p>
            File is too large to be opened from the explorer (max 2 GB). Please
            browse for it from here:
          </p>
        }
      />
    );
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[fileInfo]}
      onError={() => {
        clear([fileInfo]); // clear suspend cache
      }}
    >
      <Suspense fallback={<p className={styles.loading}>Loading...</p>}>
        <Viewer fileInfo={fileInfo} disableDarkMode={disableDarkMode} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
