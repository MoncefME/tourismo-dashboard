import { LoggedInUserInfoResponseData, authService } from "@/services/auth.service";
import { TokenService } from "@/services/token.service";
import {create} from "zustand";

type User = LoggedInUserInfoResponseData;

type States = {
    isAuthentificated: null | boolean,
    isLoading: boolean;
    currentUser: User | null
}

type Actions = {
    login: (data: Parameters<typeof authService.login>[0]) => Promise<void>;
    setup: () => Promise<void>;
    logout: () => void;
}


export const useAuth = create<States & Actions>((set,get) => ({
    isAuthentificated: null,
    isLoading: false,
    currentUser: null,
    login: async (data) => {
        if (get().isLoading){
            return;
        }
        set({
            isLoading: true
        })
        try{
            const response = await authService.login(data);
            const token = response.data.access
            TokenService.setAccessToken(token)
            const userInfoResponse = await authService.getLoggedInUserInfo(token);
            const currentUser = userInfoResponse.data;
            set({
                currentUser,
                isAuthentificated: true
            })
        }finally{
            set({
                isLoading: false
            })
        }
    },
    setup: async () => {
        const token = TokenService.getAccessToken()
        const isAuthentificated = !!token
        set({
            isAuthentificated
        })
        if (!isAuthentificated){
            return;
        }
        if (get().isLoading){
            return;
        }
        set({
            isLoading: true
        })
        try{
            const response = await authService.getLoggedInUserInfo(token);
            const currentUser = response.data;
            set({
                currentUser
            })
        }catch(e){
            console.log(e)
        }finally{
            set({
                isLoading: false
            })
        }
    },
    logout: () => {
        TokenService.removeAccessToken();
        set({
            isAuthentificated: false,
            currentUser: null
        })
    }

}))