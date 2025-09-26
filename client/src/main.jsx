import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRooter} from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRooter>
    <App />
    </BrowserRooter>
  </StrictMode>,
)
