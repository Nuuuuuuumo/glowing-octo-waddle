import {Link} from "react-router-dom";
import {CSSProperties, ReactNode} from "react";
import {SxProps, Theme} from "@mui/material";

type RedirectLinkProps = {
  children?: ReactNode
  redirectTo: string
  sx?: SxProps<Theme> & CSSProperties
}

const styles = {
  textDecoration: "none",
  color: "inherit",
};
export const RedirectLink = ({children, redirectTo = "/", sx}: RedirectLinkProps) => {
  return (
    <Link style={{...styles, ...sx}} to={redirectTo}>
      {children}
    </Link>
  );
};