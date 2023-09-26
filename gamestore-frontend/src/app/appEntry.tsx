import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/shared/base.css";
import {StrictMode} from "react";

import {appRouter} from "@/app/appRouter";


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={appRouter()} />
  </StrictMode>
);
