import { useRouter } from "next/router";

export default function StoreEditPage() {
    const router=useRouter();
    const {id}=router.query;
    return(
        <h1>store edit page: {id}</h1>
        
    );

};