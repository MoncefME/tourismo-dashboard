import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/store/auth.store";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import Loading from "./Loading";

type Props = {
  children: React.ReactNode;
};

const Redirects: React.FC<Props> = ({ children }) => {
  const { setup, isAuthentificated, currentUser } = useAuth();
  const router = useRouter();

  const currentRoute = Object.entries(ROUTES).find(
    ([_, value]) => value.pathname === router.pathname
  )?.[1];

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    if (isAuthentificated === null) {
      return;
    }

    if (isAuthentificated && router.pathname === ROUTES.LOGIN.pathname) {
      router.replace(ROUTES.HOME.pathname);
      return;
    }
    if (!isAuthentificated && router.pathname !== ROUTES.LOGIN.pathname) {
      router.replace(ROUTES.LOGIN.pathname);
      return;
    }
    if (!currentRoute) {
      router.replace(ROUTES.HOME.pathname);
      return;
    }
    if (!currentUser) {
      return;
    }
    if ("forSuperUser" in currentRoute) {
      console.log(currentUser.is_superuser);
      if (currentUser.is_superuser) {
        if (!currentRoute.forSuperUser) {
          router.replace(ROUTES.HOME.pathname);
        }
        return;
      }
      if (!currentRoute.forNormalUser) {
        router.replace(ROUTES.HOME.pathname);
      }
    }
    // verify role
  }, [router.pathname, isAuthentificated, currentUser, currentRoute]);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  if (isAuthentificated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isAuthentificated === true && !currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`Tourismo - ${currentRoute?.title}`}</title>
      </Head>
      <NavigationProgress autoReset={true} size={2} />
      <>{children}</>
    </>
  );
};

export default Redirects;
