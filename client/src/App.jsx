import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Forbidden from "./pages/Forbidden";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute pageKey="dashboard">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute pageKey="reports">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <ProtectedRoute pageKey="dashboard" allowRedirect>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
