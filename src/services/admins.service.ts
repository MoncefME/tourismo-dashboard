import axios ,{AxiosResponse}from "axios"
import { LoggedInUserInfoResponseData } from "./auth.service";

export type CreateUserRequestData = {
    email: string;
    name: string;
    password: string;
    re_password: string;
    region: string;
}

export type CreateUserResponseData = LoggedInUserInfoResponseData

export type getAdminsResponseData = {
    email: string;
    name: string;
    password: string;
    re_password: string;
    region: string | null;
}[]

export const adminService = {
    createAdmin: async (data: CreateUserRequestData,token: string) => {
        return await axios.post<CreateUserRequestData,AxiosResponse<CreateUserResponseData>,CreateUserRequestData>("https://tourismo-api.onrender.com/auth/users/",data,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
    getAdmins: async (token: string) => {
        return await axios.get<getAdminsResponseData>("https://tourismo-api.onrender.com/centraladmins/",{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }
}