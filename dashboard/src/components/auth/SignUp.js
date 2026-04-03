import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3002/auth/signup", data);

    
    toast.success("Signup successful 🚀");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

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
        onSubmit={handleSubmit} 
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2>Create Account</h2>
        <input
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
          style={inputStyle}
        />

       <div style={{ position: "relative" }}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter password"
    value={data.password}
    onChange={(e) => setData({ ...data, password: e.target.value })}
    style={inputStyle}
  />

  {/* 👁 Toggle Button */}
  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#94a3b8",
      fontSize: "14px"
    }}
  >
    {showPassword ? "Hide" : "Show"}
  </span>
</div>

        <button style={btnStyle}>Signup</button>
        <p style={{ marginTop: "10px", color: "#94a3b8" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#3b82f6", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
