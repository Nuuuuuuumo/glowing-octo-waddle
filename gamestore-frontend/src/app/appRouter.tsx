import {createBrowserRouter} from "react-router-dom";

import {AuthGuard} from "@/app/guards";
import {LoginPage} from "@/pages/login";
import {GamesPage} from "@/pages/games";
import {MainPage} from "@/pages/main/ui/MainPage";
import {GamePage} from "@/pages/game/GamePage";
import {AddGamePage} from "@/pages/add-game/AddGame";
import {GuestGuard} from "@/app/guards/guards";
import {App} from "@/app/App";
import {BaseLayout} from "@/app/layouts";
import {ErrorPage} from "@/pages/404";
import {ProfilePage} from "@/pages/profile";
import {RegistrationPage} from "@/pages/registration/ui/RegistrationPage";

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <App/>,
      errorElement: (
        <BaseLayout>
          <ErrorPage/>
        </BaseLayout>
      ),
      children: [
        {
          path: "/login",
          element: (
            <GuestGuard>
              <LoginPage/>
            </GuestGuard>
          ),
        },
        {
          path: "/register",
          element: (
            <GuestGuard>
              <RegistrationPage/>
            </GuestGuard>
          ),
        },
        {
          path: "/",
          element: (
            <MainPage/>
          ),
        },
        {
          path: "/games",
          element: (
            <AuthGuard>
              <GamesPage/>
            </AuthGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthGuard>
              <ProfilePage/>
            </AuthGuard>
          ),
        },
        {
          path: "/addGame",
          element: (
            <AuthGuard>
              <AddGamePage/>
            </AuthGuard>
          ),
        },
        {
          path: "/games/:id",
          element: (
            <AuthGuard>
              <GamePage/>
            </AuthGuard>
          ),
        },
      ],
    },
  ]);
