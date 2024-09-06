// import React from "react";
// import { Marker, Popup, useMapEvents } from "react-leaflet";
// import { useState} from "react";
// import marker from "../../assets/icons-quiz.png";

// export default function AddMarker({setPosition}) {
//     const [markerPosition, setMarkerPosition] = useState(null);
   
//     useMapEvents({
//       click(e) {
//         setMarkerPosition(e.latlng);
//         setPosition(e.latlng); 
//       } 
//     });

//     function markerIcon(iconsize) {
//       return L.icon({
//         iconUrl: marker,
//         iconSize: iconsize,
//       });
//     }

//   return (
    
//       markerPosition ? (
//         <Marker icon={markerIcon([30])}
//         position={markerPosition}>
//           <Popup>
//           {markerPosition.lat}, {markerPosition.lng}
//           </Popup>
//         </Marker>
//       ): null
    
//   );
// }

