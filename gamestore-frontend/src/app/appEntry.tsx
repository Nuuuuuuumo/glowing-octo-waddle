import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/shared/base.css";
import {StrictMode} from "react";

import {Provider} from "react-redux";

import {appRouter} from "@/app/appRouter";
import {appStore} from "@/app/store";


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter()} />
    </Provider>
  </StrictMode>
);
