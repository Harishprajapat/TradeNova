export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log("TOKEN:", token); // 🔥 debug
  return token ? true : false;
};