import { mapState } from "@/atom";
import { useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import FullPageLoader from "./FullPageLoader";


export default function CurrentLocationButton() {
    const [loading, setLoading] = useState<boolean>(false);
    const map = useRecoilValue(mapState);

    const handleCurrentPosition = ( )=> {
        setLoading(true);
        
        //bring current location using geolocation
        const options = {
            enableHighAcuracy:false,
            timeout:5000,
            maximumAge:Infinity,
        };

        if(navigator.geolocation && map){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const currentPosition = new window.kakao.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude,
                    );

                    if(currentPosition){
                        setLoading(false);
                        map.panTo(currentPosition);
                        toast.success("Moved to the current location");
                    }

                    return currentPosition;
                }, 
                ()=>{
                    toast.error("Can't bring current location");
                    setLoading(false);
                },
                options
            );
        }
    };

    return(
        <>
            {loading && <FullPageLoader/> }

            <button 
                type="button" 
                onClick={handleCurrentPosition} 
                className="fixed z-10 p-2 shadow right-10 bottom-20 bg-white rounded-md hover:shdow-lg focus:shadow-lg hover:bg-blue-200"
            >
                <MdOutlineMyLocation className="w-5 h-5 "/>
            </button>
        </>
    )
};
