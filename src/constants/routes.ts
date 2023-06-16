import { IconType } from "react-icons";
import { ICONS } from "./icons";

type Route = {
    title: string;
    pathname: string;
    forSuperUser?: boolean; 
    forNormalUser?: boolean;
    Icon?: IconType
}
export const ROUTES  = {
    LOGIN: {
        title: "Login",
        pathname: "/auth/login"
    },
    HOME: {
        title: "Home",
        pathname: "/home",
        forSuperUser: true,
        forNormalUser: true,
        Icon: ICONS.HOME
    },
    ADMINS: {
        title: "Admins List",
        pathname: "/admins",
        forNormalUser: false,
        forSuperUser: true,
        Icon: ICONS.ADMINS
    },
    CREATE_ADMINS: {
        title: "Create Admin",
        pathname: "/admins/create",
        forSuperUser: true,
        forNormalUser: false,
        Icon: ICONS.CREATE_ADMIN
    },
    CREATE_PLACES: {
        title : "Create Place",
        pathname : "/places/create",
        forSuperUser: true,
        forNormalUser: true,
        Icon : ICONS.ADD_PLACE
    },
    PLACES: {
        title : "Places List",
        pathname : "/places",
        forSuperUser : true,
        forNormalUser : true,
        Icon : ICONS.PLACE
    }
} satisfies Record<string,Route>

export const navbar_elems = [
    ROUTES.HOME,
    ROUTES.ADMINS,
    ROUTES.PLACES]