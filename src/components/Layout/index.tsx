import React, { useState } from "react";
import { AppShell } from "@mantine/core";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuth } from "@/store/auth.store";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [opened, setOpened] = useState(false);

  const { currentUser, isAuthentificated } = useAuth();

  if (!currentUser || !isAuthentificated) {
    return <>{children}</>;
  }

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      header={
        <Header
          opened={opened}
          toggleOpened={() => setOpened((prev) => !prev)}
        />
      }
      navbar={<Navbar opened={opened} />}
      className="bg-gray-100 !w-full"
    >
      <div className="w-full">{children}</div>
    </AppShell>
  );
};

export default Layout;
