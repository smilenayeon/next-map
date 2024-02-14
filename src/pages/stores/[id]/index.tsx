import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { StoreType } from "@/interface";
import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";

import {useSession} from "next-auth/react";
import Link from "next/link";

export default function StoreDetailPage() {
    const router=useRouter();
    const {id} = router.query;

    const {status} = useSession();

    const fetchStore = async() => {
        const {data} = await axios(`/api/stores?id=${id}`);
        return data as StoreType;
    };

    const {
        data:store, 
        isFetching, 
        isSuccess,
        isError,
    } = useQuery(`store-${id}`, fetchStore, {
        enabled: !!id,
        refetchOnWindowFocus:false,
    });

    if(isError){
        return<div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">Try again</div>
    };

    if(isFetching){
        return <Loader className="mt-[20%]"/>
    }

    

    console.log(store, isFetching, isError);

    return(
        <>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="md:flex justify-between itmes-center py-4 md:py-0">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {store?.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                {store?.address}
              </p>
          </div>
          <div className="flex items-center gap-4">
            <Link className="underline hover:text-gray-400 text-sm" href = {`/stores/${store?.id}/edit`}>
              Edit
            </Link>
            <button type="button" className="underline hover:text-gray-400 text-sm">Delete</button>
        </div>
        </div>
      
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Category
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Latitude
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Longitude
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Food Certification Type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.foodCertifyName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                Store Type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {store?.storeType}
            </dd>
          </div>
          
        </dl>
      </div>
    </div>

    {isSuccess && (
        <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]">
            <Map lat={store?.lat} lng={store?.lng} zoom={1}/>
            <Marker store={store}/>
        </div>
    )}
    </>
    );

};