import {createBrowserRouter} from "react-router-dom";

import {AuthGuard} from "@/app/guards";
import {LoginPage} from "@/pages/login";
import {ErrorPage} from "@/pages/404";
import {BaseLayout} from "@/app/layouts";
import {GameList} from "@/pages/game-list/GameList";

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "/login",
          element: (
            <AuthGuard>
              <LoginPage/>
            </AuthGuard>
          ),
        },
        {
          path: "/register",
          element: (
            <LoginPage/>
          ),
        },
        {
          path: "/home",
          element: (
            <div>HOME</div>
          ),
        },
        {
          path: "/games",
          element: (
            <AuthGuard>
              <GameList/>
            </AuthGuard>
          ),
        },
      ],
    },
  ]);
