import React from "react";

import {Layout} from "@/shared/ui/Layout/Layout";
import {Header} from "@/widgets/Header";

export const BaseLayout = () => {
  return (
    <Layout headerSlot={<Header />} />
  );
};