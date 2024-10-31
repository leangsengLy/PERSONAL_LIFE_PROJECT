import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../src/Global/Css/Color_System.scss'
import './Global/Css/tailwind.css'
import 'remixicon/fonts/remixicon.css';
import { store } from './Store/Manange_Store.js'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
