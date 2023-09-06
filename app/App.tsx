import { Suspense, useEffect, useState } from 'react';
import { useEventListener } from '@react-hookz/web';
import Viewer from './Viewer';
import { ErrorBoundary } from 'react-error-boundary';
import { vscode } from './vscode-api';
import { MessageType, type Message, type FileInfo } from '../src/models';

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(window, 'message', (evt: MessageEvent<Message>) => {
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

  return (
    <ErrorBoundary fallbackRender={({ error }) => <p>{error.message}</p>}>
      <Suspense fallback={<>Loading...</>}>
        <Viewer fileInfo={fileInfo} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
