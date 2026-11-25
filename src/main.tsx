import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import EditorialPortfolio from './EditorialPortfolio';
import './styles/editorial.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><EditorialPortfolio /></StrictMode>,
);
