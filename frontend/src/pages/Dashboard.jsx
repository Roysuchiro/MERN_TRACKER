import { useEffect, useState } from "react";
import io from "socket.io-client";
import API from "../services/api";
import MapView from "../components/MapView";

const socket = io("http://localhost:5000");

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [myLocation, setMyLocation] = useState(null);
  const [searchCode, setSearchCode] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {

    if (!user) {
      window.location = "/";
      return;
    }

    navigator.geolocation.watchPosition((pos) => {

      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };

      setMyLocation(loc);

      socket.emit("sendLocation", loc);

      API.post("/location/update", loc);

    });

  }, []);

  const searchUser = async () => {
    try {
      const res = await API.get(`/location/${searchCode}`);
      setFoundUser(res.data);
    } catch {
      alert("User not found");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif"
      }}
    >

      {/* Glass Header */}
      <div
        style={{
          padding: "25px",
          marginBottom: "30px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          color: "white"
        }}
      >

        <h2 style={{ marginBottom: "10px" }}>
          Welcome, {user?.name} 👋
        </h2>

        <p style={{ marginBottom: "10px" }}>
          Your Tracking Code: <strong>{user?.code}</strong>
        </p>

        <button
          onClick={() => {
            localStorage.clear();
            window.location = "/";
          }}
          style={{
            padding: "10px 20px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(90deg, #ff512f, #dd2476)",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>

      </div>

      {/* Search Section */}
      <div
        style={{
          padding: "25px",
          marginBottom: "30px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}
      >

        <h3
          style={{
            color: "white",
            marginBottom: "15px"
          }}
        >
          Search User by Code 🔍
        </h3>

        <input
          placeholder="Enter Tracking Code"
          onChange={(e) => setSearchCode(e.target.value)}
          style={{
            width: "70%",
            padding: "14px 20px",
            borderRadius: "50px",
            border: "none",
            outline: "none",
            marginRight: "15px",
            background: "rgba(255,255,255,0.8)"
          }}
        />

        <button
          onClick={searchUser}
          style={{
            padding: "14px 25px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            color: "white"
          }}
        >
          Search
        </button>

      </div>

      {/* Map Section */}
      {myLocation && (
        <MapView
          center={myLocation}
          other={foundUser}
        />
      )}

    </div>
  );
}
