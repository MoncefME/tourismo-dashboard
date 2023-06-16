import { CreatePlaceRequestBody, getPlacesResponseBody, placeService } from "@/services/places.service";
import { TokenService } from "@/services/token.service";
import { create } from "zustand";


type States = {
    isLoading: boolean;
    places: getPlacesResponseBody;
}

type Actions = {
    createPlace: (data: CreatePlaceRequestBody,images:File[]) => Promise<void>;
    getPlaces: () => Promise<void>
}

export const usePlaces  = create<States & Actions>((set,get) => ({
    isLoading: false,
    places: [],
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
    }
}))