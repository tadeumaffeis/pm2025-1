import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BoardWithCell} from './components/board/BoardWithCell.jsx';
import { BoardOptimized } from './components/board/BoardOptimized.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BoardOptimized />
  </StrictMode>,
)
