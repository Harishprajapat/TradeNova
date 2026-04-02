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
    const res = await axios.post(
      "http://localhost:3002/auth/login",
      data 
    );
    console.log(data); 

    localStorage.setItem("token", res.data.token);

// 🔥 Force refresh so auth updates
window.location.href = "/dashboard";

  } catch (err) {
    alert("Login failed");
  }
};
      

 return (
  <div style={{ textAlign: "center", marginTop: "100px" }}>
    <h2>Login</h2>

    <form onSubmit={handleLogin}>
      <input
  placeholder="Email"
  onChange={(e) =>
    setData({ ...data, email: e.target.value })
  }
/>

<br /><br />

<input
  type="password"
  placeholder="Password"
  onChange={(e) =>
    setData({ ...data, password: e.target.value })
  }
/> <br /><br />
<button>Login</button>


    </form>
  </div>
);
}