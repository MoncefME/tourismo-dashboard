import { CreatePlaceRequestBody, getPlacesResponseBody, placeService } from "@/services/places.service";
import { TokenService } from "@/services/token.service";
import { create } from "zustand";


type States = {
    isLoading: boolean;
    places: getPlacesResponseBody;
    selectedPlace: {
        "id": number,
        "name": string,
        "lat": number,
        "long": number,
        "description": string
        "category": string,
        "nb_visitors": number,
        "date_debut": Date | null,
        "date_fin": Date | null,
        "opening_time": Date | null,
        "closing_time": Date | null,
        "transport": string,
        "created_by": number,
        "region": string,
        "wilaya": string,
        "ville": string
      }| null;
    selectedPlaceStats: {
        "id": number,
        "rating_average": number,
        "nb_visitors": number
    } | null;
}

type Actions = {
    createPlace: (data: CreatePlaceRequestBody,images:File[]) => Promise<void>;
    getPlaces: () => Promise<void>;
    getPlaceById: (placeId: number) => Promise<void>
}

export const usePlaces  = create<States & Actions>((set,get) => ({
    isLoading: false,
    places: [],
    selectedPlace: null,
    selectedPlaceStats: null,
    createPlace: async(data,images) => {
        const token = TokenService.getAccessToken();
        if (get().isLoading || !token){
            return;
        }
        set({isLoading: true})
        try{
            const response = await placeService.createPlace(data,token);
            const placeId = response.data.id;
            await placeService.addImages(placeId,images,token)
        }finally{
            set({
                isLoading: false
            })
        }
    },
    getPlaces: async() => {
        const token = TokenService.getAccessToken();
        if(get().isLoading || !token){
            return;
        }
        set({
            isLoading: true
        })
        try{
           const response =  await placeService.getPlaces(token);
           const places = response.data 
           set({
            places
           })
        }finally{
            set({isLoading: false})
        }
    },
    getPlaceById: async (placeId) => {
        const token = TokenService.getAccessToken();
        if(get().isLoading || !token){
            return;
        }
        set({
            isLoading: true
        })
        try{
           const response =  await placeService.getPlaceById(placeId,token);
           const place = response.data;
           const statsResponse = await placeService.getStatsByPlaceId(placeId,token);
           const stats =statsResponse.data;
           set({
            selectedPlace: place,
            selectedPlaceStats: stats
           })
        }finally{
            set({isLoading: false})
        }
    }
}))