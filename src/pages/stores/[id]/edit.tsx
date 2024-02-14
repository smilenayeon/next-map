/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CATEGORY_ARR, FOOD_CERTIFY_ARR, STORE_TYPE_ARR } from "@/data/store";
import axios from "axios";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import { useRouter } from "next/router";
import AddressSearch from "@/components/AddressSearch";
import { StoreType } from "@/interface";
import { useQuery } from "react-query";

export default function StoreEditPage() {
    const router = useRouter();
    const {id}= router.query;

    const fetchStore = async() => {
        const {data} = await axios(`/api/stores?id=${id}`);
        return data as StoreType;
    };

    const {
        register, 
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm<StoreType>();

    const {
        data: store,
        isFetching,
        isSuccess,
        isError,
      } = useQuery(`store-${id}`, fetchStore, {
        onSuccess: (data) => {
          setValue("id", data.id);
          setValue("name", data.name);
          setValue("phone", data.phone);
          setValue("lat", data.lat);
          setValue("lng", data.lng);
          setValue("address", data.address);
          setValue("foodCertifyName", data.foodCertifyName);
          setValue("storeType", data.storeType);
          setValue("category", data.category);
        },
        refetchOnWindowFocus: false,
      });


   
  return (
    <form className="px-4 md:max-w-4xl mx-auto py-8" onSubmit={handleSubmit(async(data) => {
        
        try {
          const result = await axios.post("/api/stores", data);

          if(result.status === 200){
            //success
            toast.success("The new place was added.");
            router.replace(`/stores/${result?.data?.id}`)

          } else{
            //failed
            toast.error("There was an error. Please try again.");
          }
        } catch (error) {
          console.log(error);
        
        }
    })}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Add a new Restaurant</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Fill out the form to register a new restaurant.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Restaurant Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required : true })}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 outline-none  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.type === 'required' && (
                    <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <div className="mt-2">
                <select {...register("category",{required: true})} className="block w-full rounded-md border-0 py-2 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="">Choose the Category</option>
                    {CATEGORY_ARR?.map((category) => ( 
                      <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors?.category?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Contact
              </label>
              <div className="mt-2">
                <input {...register("phone", {required:true}) }className="block w-full rounded-md border-0 px-2 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors?.phone?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
              </div>
            </div>


            <AddressSearch setValue={setValue} register={register} errors={errors}/>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="foodCertifyName" className="block text-sm font-medium leading-6 text-gray-900">
              Food Certification Type
              </label>
              <div className="mt-2">
                <select {...register("foodCertifyName", {required: true})}className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Choose the Food Certification Type</option>
                  {FOOD_CERTIFY_ARR?.map((data) => (
                    <option key={data} value={data}>{data}</option>
                  ))}
                </select>
                {errors?.foodCertifyName?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="storeType" className="block text-sm font-medium leading-6 text-gray-900">
              Store Type
              </label>
              <div className="mt-2">
                <select {...register("storeType", {required: true})}className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Choose the Store Type</option>
                  {STORE_TYPE_ARR?.map((data)=> (
                    <option key={data} value={data}>{data}</option>
                  ))}
                </select>
                {errors?.storeType?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
              </div>
            </div>

          </div>
        </div>

        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button"  onClick={()=>router.back()} className="text-sm font-semibold leading-6 text-gray-900">
          Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}
