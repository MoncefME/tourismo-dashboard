import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import React from "react";

const HomeContainer = () => {
  return (
    <div>
      <Header currentTitle={ROUTES.HOME.title} title={ROUTES.HOME.title} />
    </div>
  );
};

export default HomeContainer;
