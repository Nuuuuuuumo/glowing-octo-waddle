import React, {ReactNode} from "react";

import {Layout} from "@/shared/ui/layout/Layout";
import {Header} from "@/widgets/Header";

type BaseLayoutProps = {
  children?: ReactNode
}
export const BaseLayout = ({children}: BaseLayoutProps) => {
  return (
    <Layout headerSlot={<Header/>}>
      {children ? children : null}
    </Layout>
  );
};