import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3002/auth/login", data);

    localStorage.setItem("token", res.data.token);

    alert("Login successful");
  };

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}