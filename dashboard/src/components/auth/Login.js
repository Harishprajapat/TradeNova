import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3002/auth/login", data);
      console.log(data);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };
  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
  };

  const btnStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={inputStyle}
        />

        <button style={btnStyle}>Login</button>
        <p style={{ marginTop: "10px", color: "#94a3b8" }}>
          New here?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
