import { Suspense, useState } from 'react';
import { useEventListener } from '@react-hookz/web';
import { FileInfo, Message } from './models';
import { isFileInfoMessage } from './utils';
import Viewer from './Viewer';

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>();

  useEventListener(window, 'message', (evt: MessageEvent<Message>) => {
    const { data: message } = evt;
    if (isFileInfoMessage(message)) {
      setFileInfo(message.data);
    }
  });

  if (!fileInfo) {
    return null;
  }

  return (
    <Suspense fallback={<></>}>
      <Viewer fileInfo={fileInfo} />
    </Suspense>
  );
}

export default App;
