import Loading from "@/components/Loading";
import StoreList from "@/components/StoreList";
import { LikeApiResponse, LikeInterface } from "@/interface";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

export default function LikesPage() {
    const router = useRouter();
    const {page = '1'}:any = router.query;

    const fetchLikes = async () => {
        const {data}= await axios(`/api/likes?limit=10&page=${page}`);
        return data as LikeApiResponse;
    }

    const {data:likes, isError, isLoading}=useQuery(`likes-${page}`, fetchLikes);

    if(isError){
        return<div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">Try again</div>
       };

    return(
        <div className="px-4 md:max-w-4xl mx-auto py-8">
            <h3 className="text-lg font-semibold ">Saved Eateries</h3>
            <div className="mt-1 text-gray-500 text-sm">This is the list of liked eateries.</div>
            <ul role="list" className="divide-y divide-gray-100 mt-100">
                {isLoading 
                ? (<Loading/>) 
                :( 
                    likes?.data.map((like:LikeInterface, index)=>(
                        <StoreList store={like?.store} i={index} key={index}/>
                    ))
                )}
            </ul> 
            {likes?.totalPage && likes?.totalPage > 0 && (<Pagination total={likes.totalPage} page={page} pathname="/users/likes"/>)}
        </div>
    );
};
