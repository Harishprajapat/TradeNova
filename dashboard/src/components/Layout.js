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
import Navbar from "./Navbar";
// import { useContext } from "react";
// import GeneralContext from "./GeneralContext";
// import BuyActionWindow from "./BuyActionWindow";
// import SellActionWindow from "./SellActionWindow";

const Layout = () => {
  // const { openBuyWindow, openSellWindow, selectedStock } = useContext(GeneralContext);
  return (
    <>
      <Navbar />
      <Outlet />
      {/* {openBuyWindow && <BuyActionWindow uid={selectedStock} />}
      {openSellWindow && <SellActionWindow uid={selectedStock} />} */}
    </>
  );
};

export default Layout;
