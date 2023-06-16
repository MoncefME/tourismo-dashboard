import { adminService,CreateUserRequestData, getAdminsResponseData } from "@/services/admins.service";
import { TokenService } from "@/services/token.service";
import { create } from "zustand";

type States = {
    isLoading: boolean;
    admins: getAdminsResponseData
}

type Actions =  {
    createAdmin: (data : CreateUserRequestData) => Promise<void>;
    getAdmins: () => Promise<void>
}

export const useAdmin = create<States & Actions>((set ,get)=> ({
    isLoading: false,
    admins: [],
    createAdmin: async (data ) => {
        const token = TokenService.getAccessToken();
        if (get().isLoading || !token){
            return;
        }
        set({isLoading: true});
        try{
            const response = await adminService.createAdmin(data,token);
            console.log(response);
        }finally{
            set({
                isLoading: false
            })
        }
    },
    getAdmins: async () => {
        const token = TokenService.getAccessToken();
        if (get().isLoading || !token){
            return;
        }
        set({isLoading: true});
        try{
            const response = await adminService.getAdmins(token);
            const admins = response.data;
            set({
                admins
            })
        }finally{
            set({
                isLoading: false
            })
        }
    }
}))