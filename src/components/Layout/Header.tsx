import React from "react";
import { Burger, Header as MantineHeader, MediaQuery } from "@mantine/core";
import Image from "next/image";
import { ROUTES } from "@/constants/routes";
import { IMAGES } from "@/constants/images";
import Link from "next/link";

type Props = {
  opened: boolean;
  toggleOpened: () => void;
};

const Header: React.FC<Props> = ({ opened, toggleOpened }) => {
  return (
    <MantineHeader
      height={60}
      p={"xs"}
      className="flex items-center justify-between"
    >
      <Link href={ROUTES.HOME.pathname}>
        <Image
          src={IMAGES.LOGO}
          alt="logo"
          width={300}
          height={150}
          className="h-auto w-28 object-contain drop-shadow-lg"
        />
      </Link>

      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger opened={opened} onClick={toggleOpened} size="sm" mr="xl" />
      </MediaQuery>
    </MantineHeader>
  );
};

export default Header;
