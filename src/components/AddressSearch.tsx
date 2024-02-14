import {useState} from "react";
import { StoreType } from "@/interface";
import {FieldErrors, UseFormRegister, UseFormSetValue} from "react-hook-form";
import DaumPostcodeEmbed from 'react-daum-postcode';

interface AddressProps{
    setValue:UseFormSetValue<StoreType>;
    register:UseFormRegister<StoreType>;
    errors:FieldErrors<StoreType>;
}

export default function AddressSearch({register,errors,setValue}:AddressProps) {
    const[isOpen, setIsOpen]=useState<boolean>(false);

    const handleComplete = (data:any) => {
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          setValue("address",fullAddress);
          setIsOpen(false);
        }
    
        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
      };
return(
    <>
        <div className="col-span-full">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
            </label>
            <div className="mt-2">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                    <input 
                        readOnly  
                        placeholder="Click Search Address button to search" 
                        {...register("address", {required: true})} 
                        className="col-span-2 block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button type="button" onClick={() => setIsOpen((val) => !val)} className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white">
                        Search Address
                    </button>
                </div>
                
                {errors?.address?.type === "required" && (
                    <div className="pt-2 text-xs text-red-600">Required Input</div>
                )}
            </div>
        </div>
        {isOpen && 
            <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2">
                <DaumPostcodeEmbed onComplete={handleComplete}/>
            </div>
        }
        
    </>
)
    
};
