import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import Layout from "./components/Layout";
import Orders from "./components/Orders";
import Holdings from "./components/Holdings";
import Positions from "./components/Positions";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
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
            element={
              isAuthenticated() ? <Orders /> : <Navigate to="/login" />
            }
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

        </Route>

        {/* <Route
          path="/login"
          element={
            !isAuthenticated() ? <Login /> : <Navigate to="/" />
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated() ? <Signup /> : <Navigate to="/" />
          }
        /> */}
          <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;