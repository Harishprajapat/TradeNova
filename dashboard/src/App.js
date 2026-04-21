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
import { GeneralContextProvider } from "./components/GeneralContext";

// ✅ ProtectedRoute is a COMPONENT — re-evaluates isAuthenticated()
// on every render so it always reads the latest localStorage value.
// The old approach called isAuthenticated() directly inside App()
// which only ran once on first load and never updated.
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// ✅ PublicRoute redirects already-logged-in users away from /login and /signup
const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <BrowserRouter>
      <GeneralContextProvider>
        <Routes>

          {/* Protected pages — inside Layout (has Navbar) */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute><Orders /></ProtectedRoute>}
            />
            <Route
              path="/holdings"
              element={<ProtectedRoute><Holdings /></ProtectedRoute>}
            />
            <Route
              path="/positions"
              element={<ProtectedRoute><Positions /></ProtectedRoute>}
            />
            <Route
              path="/watchlist"
              element={<ProtectedRoute><WatchList /></ProtectedRoute>}
            />
          </Route>

          {/* Public pages — redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={<PublicRoute><Login /></PublicRoute>}
          />
          <Route
            path="/signup"
            element={<PublicRoute><Signup /></PublicRoute>}
          />

        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </GeneralContextProvider>
    </BrowserRouter>
  );
}

export default App;