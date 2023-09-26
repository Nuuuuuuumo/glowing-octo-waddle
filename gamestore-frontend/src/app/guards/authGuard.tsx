import {Navigate} from "react-router-dom";
import { type ReactElement} from "react";

type AuthGuardProps = {
  children: ReactElement
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  // const isAuthorized = useAppSelector(selectIsAuthorized);
  const isAuthorized = true;
  if (!isAuthorized) return <Navigate to="/" />;

  return children;
};