// import Navbar from "./Navbar";

// export default function Layout({ children }) {
//   return (
//     <>
//       <Navbar />
//       <div>{children}</div>
//     </>
//   );
// }

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
};

export default Layout;