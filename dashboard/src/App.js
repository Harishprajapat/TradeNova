import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Layout from "./components/Layout";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import WatchList from "./components/WatchList";
import { isAuthenticated } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {GeneralContextProvider} from "./components/GeneralContext";
function App() {
  return (
    <BrowserRouter>
    <GeneralContextProvider>
     
      <Routes>
       
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/orders"
            element={isAuthenticated() ? <Orders /> : <Navigate to="/login" />}
          />

          <Route
            path="/holdings"
            element={
              isAuthenticated() ? <Holdings /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/positions"
            element={
              isAuthenticated() ? <Positions /> : <Navigate to="/login" />
            }
          />

           <Route
            path="/watchlist"
            element={
              isAuthenticated() ? <WatchList /> : <Navigate to="/login" />
            }
          />
           


          </Route>
        
      

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

export default App;
