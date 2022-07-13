import './index.css';

import { render } from 'react-dom';
import App from './App';

const vscode = acquireVsCodeApi();
vscode.postMessage({ type: 'ready' });

render(<App />, document.getElementById('root'));
