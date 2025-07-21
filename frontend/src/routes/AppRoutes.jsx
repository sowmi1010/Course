import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TopicList from "../pages/TopicList";
import TopicEditor from "../pages/TopicEditor";
import TopicView from "../pages/TopicView";
import Favorites from "../pages/Favorites";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topics/:language" element={<TopicList />} />
        <Route path="/topics/add/:language" element={<TopicEditor />} /> 
        <Route path="/topics/edit/:id" element={<TopicEditor />} />
        <Route path="/topics/view/:id" element={<TopicView />} />
        <Route path="/favorites" element={<Favorites />} /> 
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
