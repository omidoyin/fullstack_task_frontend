import "./App.css";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Tasks from "./components/Tasks";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
