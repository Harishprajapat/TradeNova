import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    
     try {
    const res = await axios.post(
      "http://localhost:3002/auth/login",
      data
    );

    localStorage.setItem("token", res.data.token);

    toast.success("Login successful 🚀");

    setTimeout(() => {
      navigate("/dashboard");
    });

  } catch (err) {
    toast.error("Invalid credentials ❌");
  }
  };
  

 
  const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)"
};

const cardStyle = {
  backdropFilter: "blur(15px)",
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  width: "300px",
  color: "white",
  textAlign: "center"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  outline: "none"
};

const btnStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const iconStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#94a3b8"
};

const linkText = {
  color: "#3b82f6",
  cursor: "pointer"
};

return(
<div style={containerStyle}>
  <form onSubmit={handleLogin} style={cardStyle}>
    <h2 style={{ marginBottom: "20px" }}>Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={data.email}
      onChange={(e) => setData({ ...data, email: e.target.value })}
      style={inputStyle}
    />

    <div style={{ position: "relative" }}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        style={inputStyle}
      />

      <span onClick={() => setShowPassword(!showPassword)} style={iconStyle}>
        {showPassword ? "Hide" : "Show"}
      </span>
    </div>

    <button type="submit" style={btnStyle}>Login</button>

    <p style={{ marginTop: "10px", color: "#94a3b8" }}>
      New here?{" "}
      <span onClick={() => navigate("/signup")} style={linkText}>
        Signup
      </span>
    </p>
  </form>
</div>
);


}
