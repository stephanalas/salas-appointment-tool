import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./common/error-page.tsx";
import Login from "./routes/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import App from "./App.tsx";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // index would be dashboard component

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
