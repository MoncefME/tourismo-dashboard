import axios ,{ AxiosResponse}from "axios"

export type LoginRequestData = {
    email: string;
    password: string;
}

export type LoginResponseData = {
    access: string;
    refresh: string;
}

export type LoggedInUserInfoResponseData = {
    email: string;
    id: number;
    name: string;
    is_superuser: boolean;
    region: string | null
}

export const authService = {
    login: async(data: LoginRequestData) => {
        return await axios.post<LoginRequestData,AxiosResponse<LoginResponseData>,LoginRequestData>("https://tourismo-api.onrender.com/auth/jwt/create",data)
    },
    getLoggedInUserInfo: async (token: string) => {
        return await axios.get<LoggedInUserInfoResponseData,AxiosResponse<LoggedInUserInfoResponseData>>("https://tourismo-api.onrender.com/auth/users/me/",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
} 