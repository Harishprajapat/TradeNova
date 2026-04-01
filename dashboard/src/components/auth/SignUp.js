import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3002/auth/signup", data);

    alert("Signup successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e)=>setData({...data,name:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})}/>
      <button type="submit">Signup</button>
    </form>
  );
}