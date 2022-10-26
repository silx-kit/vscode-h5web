import { Suspense, useEffect, useState } from 'react';
import { useEventListener } from '@react-hookz/web';
import { FileInfo, Message } from './models';
import { isFileInfoMessage } from './utils';
import Viewer from './Viewer';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(window, 'message', (evt: MessageEvent<Message>) => {
    const { data: message } = evt;
    if (isFileInfoMessage(message)) {
      setFileInfo(message.data);
    }
  });

  useEffect(() => {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ type: 'ready' });
  }, []);

  if (!fileInfo) {
    return null;
  }

  return (
    <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
      <Suspense fallback={<>Loading...</>}>
        <Viewer fileInfo={fileInfo} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
