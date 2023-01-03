import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import '../maps/maps.css'
import Header from "../../components/Header";
import { Box, Button, TextField } from "@mui/material";
function Maps() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDQ0NKHCmrvpVn4zwOezzNVxwJakPqPW48",
      });
    
      if (!isLoaded) return <div>Loading...</div>;
      return <Gmap />
}
function Gmap() {
    const center = useMemo(() => ({ 
        lat:24.8568991,lng:67.2646838
    }), []);
  
    return (
        <Box m="10px">
        <Header title="Supervisor Tracking" subtitle="Track All Available Supervisors" />
        <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
        <MarkerF position={{ lat:24.8568991,lng:67.2646838}} />
      </GoogleMap>
      </Box>
    );
}
export default Maps