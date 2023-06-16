import axios, { AxiosResponse } from "axios"

export type CreatePlaceRequestBody = {
    name: string;
    lat: number;
    long: number;
    description: string;
    category: string;
    nb_visitors: 0;
    created_by: number;
    wilaya: string;
    ville: string;
    region: string;
}

export type CreatePlaceResponseBody = {
    id: number;
    name: string;
    lat: number;
    long: number;
    description: string;
    category: string;
    nb_visitors: 0;
    created_by: number;
    wilaya: string;
    ville: string;
    region: string;
}

export type getPlacesResponseBody = CreatePlaceResponseBody[]

export const placeService = {
    createPlace: async (data : CreatePlaceRequestBody,token: string) => {
        return await axios.post<CreatePlaceResponseBody,AxiosResponse<CreatePlaceResponseBody>,CreatePlaceRequestBody>("https://tourismo-api.onrender.com/places/",data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    getPlaces: async (token: string) => {
        return await axios.get<getPlacesResponseBody>("https://tourismo-api.onrender.com/places/",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    addImages: async (placeId: number,images: File[],token: string) => {
        images.forEach(img => {
            const formData = new FormData();
            formData.append("image",img);
            formData.append("touristicPlace",JSON.stringify(placeId));
            axios.post("https://tourismo-api.onrender.com/places/photo/",formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        })
    }
}