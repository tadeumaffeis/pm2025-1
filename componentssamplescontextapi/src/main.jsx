import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import { Board } from './components/board/Board.jsx';
import ComponentsSampleProvider from './components/context/ComponentsSampleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentsSampleProvider>
      <Board />
    </ComponentsSampleProvider>
  </StrictMode>,
)
