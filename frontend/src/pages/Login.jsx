import { useState } from "react";
import API from "../services/api";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      window.location = "/dashboard";

    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif"
      }}
    >

      {/* Glass Card */}
      <div
        style={{
          width: "380px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
        }}
      >

        {/* Title */}
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "bold"
          }}
        >
          Welcome Back 👋
        </h2>

        {/* Username */}
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 20px",
            marginBottom: "20px",
            borderRadius: "50px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 20px",
            marginBottom: "30px",
            borderRadius: "50px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        />

        {/* Login Button */}
        <button
          onClick={login}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "50px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            cursor: "pointer",
            background: "linear-gradient(90deg, #4facfe, #00f2fe)",
            transition: "0.3s"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Login
        </button>

        {/* Register Link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "white",
            fontSize: "14px"
          }}
        >
          New user?{" "}
          <a
            href="/register"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "underline"
            }}
          >
            Register
          </a>
        </p>

      </div>
    </div>
  );
}
