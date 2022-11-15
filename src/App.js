import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import PageNotFound from "./components/errorPage/PageNotFound";
import LoginAndRegister from "./components/pages/LoginAndRegister";
import Dashboard from "./components/Dashboard";
import Preloader from "./components/preloader/Preloader";
import Logout from "./components/Logout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("hrLogin") ? localStorage.getItem("hrLogin") : null
  );

  const ProtectedRoute = ({ user, redirectPath = "/" }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const AuthRoute = ({ user, redirectPath = "/dashboard" }) => {
    if (user) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <PageNotFound />
              </>
            }
          />
          <Route
            path="/loading"
            element={
              <>
                <Preloader />
              </>
            }
          />

          <Route
            path="/logout"
            element={
              <>
                <Logout />
              </>
            }
          />
          <Route element={<AuthRoute user={user} />}>
            <Route
              path="/"
              element={
                <>
                  <LoginAndRegister />
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
            <Route
              path="/dashboard"
              element={
                <>
                  <Dashboard />
                </>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
