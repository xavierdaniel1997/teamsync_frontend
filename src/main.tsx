// import { StrictMode } from 'react'
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App.tsx";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./redux/store.ts";
// import store from "./redux/store.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GoogleOAuthProvider} from "@react-oauth/google";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </PersistGate>
  </GoogleOAuthProvider>
);
