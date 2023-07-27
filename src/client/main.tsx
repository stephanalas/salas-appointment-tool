import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ErrorPage from "./common/error-page.tsx";
import Login from "./routes/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import Dashboard from "./routes/dashboard/Dashboard.tsx";
import Profiles from "./routes/profiles/Profiles.tsx";
import Appointments from "./routes/appointments/Appointments.tsx";
import Transmissions from "./routes/transmissions/Transmissions.tsx";
import Campaigns from "./routes/campaigns/Campaigns.tsx";
import Tasks from "./routes/tasks/Tasks.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // index would be dashboard component
      {
        index: true,
        path: "/",
        loader: () => {
          const {
            auth: { user },
          } = store.getState();
          if (!user) {
            return redirect("/login");
          } else return null;
        },
        element: <Dashboard />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profiles",
        element: <Profiles />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "transmissions",
        element: <Transmissions />,
      },
      {
        path: "campaigns",
        element: <Campaigns />,
      },
      {
        path: "tasks",
        element: <Tasks />,
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
