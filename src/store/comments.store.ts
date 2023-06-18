import { commentService, getCommentsResponseData } from "@/services/comments.service";
import { TokenService } from "@/services/token.service";
import { create } from "zustand";


type States = {
    isLoading: boolean;
    comments: getCommentsResponseData
}

type Actions =  {
    getComments: () => Promise<void>
}

export const useComment = create<States & Actions>((set ,get)=> ({
    isLoading: false,
    comments: [],
    getComments: async () => {
        const token = TokenService.getAccessToken();
        if (get().isLoading || !token){
            return;
        }
        set({isLoading: true});
        try{
            const response = await commentService.getComments(token);
            const comments = response.data;
            set({
                comments
            })
        }finally{
            set({
                isLoading: false
            })
        }
    }
}))