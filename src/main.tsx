import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/refinements.css';
import './styles/experience.css';
import './styles/discovery.css';
import './styles/studio.css';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

import './styles/reboot.css';
