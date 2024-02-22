import { StoreType } from "@/interface";
import { Like } from "@prisma/client";
import axios from "axios";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import { useQuery } from "react-query";
import {useSession} from "next-auth/react";
import { toast } from "react-toastify";

interface LikeProps{
    storeId:number;
}

export default function Like({storeId}:LikeProps) {
    const {data:session} =useSession();

    const fetchStore = async() => {
        const {data} = await axios(`/api/stores?id=${storeId}`);
        return data as StoreType;
    };

    const {data:store, refetch} = useQuery<StoreType>(
        `like-store-${storeId}`,
         fetchStore, 
         {
        enabled: !!storeId,
        refetchOnWindowFocus:false,
    });

    const toggleLike = async() => {
        //Like and cancle like
        if(session?.user && store){
            try {
                const like = await axios.post("/api/likes", {
                    storeId:store.id,
                });
                console.log(like);

                if(like.status === 201){
                    toast.success("The store is saved.");
                }else {
                    toast.warning("The store is unsaved.");
                }
                refetch();
                
            } catch (error) {
                console.log(error);
            }
        }
    }
    return(
        <button type="button" onClick={toggleLike}>
            {/* if the logged in user clicked like button */}
            {store?.likes?.length ? ( 
            <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500"/>
             ) : ( 
            <AiOutlineHeart className="hover:text-red-600 focus:text-red-600"/>
            )}
            
            
        </button>
    )
};
