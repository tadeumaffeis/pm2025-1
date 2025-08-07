import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BoardWithCell} from './components/board/BoardWithCell.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BoardWithCell squares={[1,2,3,4,5,6,7,8,9]} />
  </StrictMode>,
)
