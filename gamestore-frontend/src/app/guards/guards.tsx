import {ReactElement} from "react";

import {Navigate} from "react-router-dom";

import {CircularProgress} from "@mui/material";

import {useMeQuery} from "@/entities/authentification/api/authApi";
import {useAppSelector} from "@/shared/model/hooks";
import {selectIsAuth} from "@/entities/authentification/model/slice";

type GuardProps = {
  children: ReactElement
}

export const AuthGuard = ({children}: GuardProps) => {
  const {isFetching} = useMeQuery({});
  const isAuthorized = useAppSelector(selectIsAuth);

  if (isFetching) return <CircularProgress/>;
  if (!isAuthorized) return <Navigate to="/login"/>;

  return children;
};

export const GuestGuard = ({children}: GuardProps) => {
  const {isFetching} = useMeQuery({});
  const isAuthorized = useAppSelector(selectIsAuth);

  if (isFetching) return <CircularProgress/>;
  if (isAuthorized) return <Navigate to="/"/>;

  return children;
};