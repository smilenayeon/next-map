import { StoreType } from "@/interface";
import { useEffect, useCallback, Dispatch, SetStateAction } from "react";

interface MarkerProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  stores,
  setCurrentStore,
}: MarkerProps) {
  const loadKakoMarkers = useCallback(() => {
    if (map) {
      // Display markers for restaurant data
      stores?.map((store) => {
        var imageSrc = store?.category
            ? `/images/markers/${store?.category}.png`
            : "/images/markers/default.png", // Address of the marker image
          imageSize = new window.kakao.maps.Size(40, 40), // Size of the marker image
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // Options for the marker image. Sets the coordinates within the image to align with the marker's position.

        // Create a marker image that contains the marker's image information
        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // Position where the marker will be displayed
        var markerPosition = new window.kakao.maps.LatLng(
          store?.lat,
          store?.lng,
        );

        // Create the marker
        var marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // Setting the marker image
        });

        // Set the marker to be displayed on the map
        marker.setMap(map);

        // Create an info window to display over the marker when the cursor is over it
        var content = `<div class="infowindow">${store?.name}</div>`; // Content to be displayed in the info window

        // Create a custom overlay
        var customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // Register a mouseover event on the marker
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          // When a mouseover event occurs on the marker, display the custom overlay on the marker
          customOverlay.setMap(map);
        });

        // Register a mouseout event on the marker
        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          // When a mouseout event occurs on the marker, remove the custom overlay
          customOverlay.setMap(null);
        });

        // Save the selected store
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);


        });
      });
    }
  }, [map, setCurrentStore, stores]);

  useEffect(() => {
    loadKakoMarkers();
  }, [loadKakoMarkers, map]);
  return <></>;
}
