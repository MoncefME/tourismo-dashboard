import { ICONS } from "@/constants/icons";
import { navbar_elems } from "@/constants/routes";
import { useAuth } from "@/store/auth.store";
import {
  Box,
  Group,
  Navbar as MantineNavbar,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  Text,
  Button,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  opened: boolean;
};

const Navbar: React.FC<Props> = ({ opened }) => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  return (
    <MantineNavbar
      hidden={!opened}
      hiddenBreakpoint="sm"
      width={{ base: 300 }}
      p={"xs"}
    >
      <MantineNavbar.Section grow component={ScrollArea} mx={"-xs"} px={"xs"}>
        <Box py="md">
          {navbar_elems.map(
            ({ title, pathname, Icon, forNormalUser, forSuperUser }, index) => {
              if (currentUser?.is_superuser) {
                if (!forSuperUser) {
                  return null;
                }
              }
              if (!currentUser?.is_superuser) {
                if (!forNormalUser) {
                  return null;
                }
              }
              return (
                <Link href={pathname} key={index}>
                  <UnstyledButton
                    className={`${
                      router.asPath.startsWith(pathname) ? "bg-gray-100" : ""
                    } hover:bg-gray-100 transition w-full rounded-md`}
                    p={"xs"}
                    mt={"xs"}
                  >
                    <Group>
                      <ThemeIcon variant="light">
                        <Icon />
                      </ThemeIcon>
                      <Text className="font-medium">{title}</Text>
                    </Group>
                  </UnstyledButton>
                </Link>
              );
            }
          )}
        </Box>
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <Button
          onClick={logout}
          fullWidth
          size="lg"
          className="text-sm"
          leftIcon={<ICONS.LOGOUT />}
        >
          Se déconnecter
        </Button>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
