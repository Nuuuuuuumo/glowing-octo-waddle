import {Navigate} from "react-router-dom";
import {type ReactElement} from "react";

import {useMeQuery} from "@/entities/authentification/api/authApi";

type AuthGuardProps = {
  children: ReactElement
}

export const AuthGuard = ({children}: AuthGuardProps) => {
  const {data, isLoading} = useMeQuery({});
  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <Navigate to="/login"/>;
  return children;
};