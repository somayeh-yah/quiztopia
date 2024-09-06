// import { MapContainer, TileLayer} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// // import "../MapComponent/MapComponent.css";
// import loading from "../../assets/loading-icon.png";
// import AddMarker from "./AddMarker";
// import { useEffect } from "react";

// export default function MapComponent({ position, setPosition }) {
  
//   useEffect(() => {
//     "geolocation" in navigator;
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//       },
//       (err) => {
//         console.error(err);
//         setPosition(position);
//       }
//     );
//   }, []);
//   return position ?(
//     <>
//     <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: "100%", height: "500px" }}>
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />

//  <AddMarker/>
// </MapContainer>

//   </>
//   ): (
//     <p className="loading">
//       <img className="loading-icon" src={loading} />
//       Laddar Karta...
//     </p>
//   );
// }


