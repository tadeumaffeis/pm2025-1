import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import { BoardOptimized } from './components/board/BoardOptimized.jsx';
import ComponentsSampleProvider from './components/context/ComponentsSampleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentsSampleProvider>
      <BoardOptimized />
    </ComponentsSampleProvider>
  </StrictMode>,
)
