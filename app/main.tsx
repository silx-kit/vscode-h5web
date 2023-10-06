import './index.css';

import { createRoot } from 'react-dom/client';
import App from './App';
import { assertNonNull } from '@h5web/app';

const rootElem = document.querySelector('#root');
assertNonNull(rootElem);

createRoot(rootElem).render(<App />);
