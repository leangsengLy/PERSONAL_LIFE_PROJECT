import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../src/Global/Css/Global.scss'
import './Global/Css/tailwind.css'
import 'remixicon/fonts/remixicon.css';
import { store } from './Store/Manange_Store.js'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import * as lz_module from '../../../LZ_MODULE/Global.js'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//Notification
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  // <StrictMode> //we comment on because it make the code run 2 time when use on function or other 
    <BrowserRouter>
      <Provider store={store}>
        <NextUIProvider>
               <App />
        </NextUIProvider>
      </Provider>
    </BrowserRouter>
  // </StrictMode>
)
