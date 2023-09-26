import {createBrowserRouter} from "react-router-dom";

import {ErrorPage} from "@/pages/404/Page/404";
import {BaseLayout} from "@/app/layouts/baseLayout";
import {AuthGuard} from "@/app/guards/authGuard";

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/login",
          element:(
            <AuthGuard>
              <div>Login Page</div>
            </AuthGuard>
          ),
        },
        {
          path: "/home",
          element: (
            <div>HOME</div>
          ),
        },
      ],
    },
  ]);
