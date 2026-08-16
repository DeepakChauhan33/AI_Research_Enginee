import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard";
import ResearchIntake from "../pages/ResearchIntake";
import Workflow from "../pages/Workflow";
import Report from "../pages/Report";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/research-intake"
          element={<ResearchIntake />}
        />

        <Route path="/workflow" element={<Workflow />} />

        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;