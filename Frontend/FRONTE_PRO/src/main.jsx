import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../src/Global/Css/Color_System.css'
import './Global/Css/tailwind.css'
import 'remixicon/fonts/remixicon.css';
import { store } from './Store/Manange_Store.js'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <NextUIProvider>
            <App />
        </NextUIProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
