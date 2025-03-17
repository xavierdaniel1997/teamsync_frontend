// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import './index.css'
import App from './App.tsx'
import store from './redux/store.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </Provider>

)
