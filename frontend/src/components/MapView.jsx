import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

export default function MapView({ center, other }) {

  const containerStyle = {
    width: "100%",
    height: "420px",
    borderRadius: "20px",
    overflow: "hidden"
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        borderRadius: "25px",
        background: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
      }}
    >

      {/* Map Title */}
      <h3
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "15px"
        }}
      >
        Live Location Map 🌍
      </h3>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
      >

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true,
            zoomControl: true
          }}
        >

          {/* Your Marker */}
          <Marker
            position={center}
            label="You"
          />

          {/* Other User Marker */}
          {other && other.location && (
            <Marker
              position={{
                lat: other.location.lat,
                lng: other.location.lng
              }}
              label={other.name}
            />
          )}

        </GoogleMap>

      </LoadScript>

    </div>
  );
}
