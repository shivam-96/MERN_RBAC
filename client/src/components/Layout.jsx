import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { user, logout, hasPermission } = useAuth();

  return (
    <>
      <nav>
        <ul>
          {hasPermission("dashboard") && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}
          {hasPermission("reports") && (
            <li>
              <NavLink to="/reports">Reports</NavLink>
            </li>
          )}
        </ul>
        <div>
          <span>
            {user?.email} ({user?.role})
          </span>
          <button onClick={logout} style={{ marginLeft: "1rem" }}>
            Logout
          </button>
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
