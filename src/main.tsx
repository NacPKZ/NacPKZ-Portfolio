import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './Portfolio';
import './styles/portfolio-site.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><Portfolio /></StrictMode>,
);
