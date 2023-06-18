import axios from "axios"

export type getCommentsResponseData = {
    name : string ;
    content : string;
    rating : number;
    touristicPlace : number;
    approved: boolean;
    id: number


}[]

export type CommentsResponseData = getCommentsResponseData;

export const commentService = {
    getComments: async (token: string) => {
        return await axios.get<getCommentsResponseData>("https://tourismo-api.onrender.com/comments/",{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    },
    approveComment: async (token: string,id: number) => {
        return await axios.put(`https://tourismo-api.onrender.com/comments/${id}/approved/`,{},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
}