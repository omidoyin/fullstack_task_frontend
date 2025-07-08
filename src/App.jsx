import "./App.css";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
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
    
       <Toaster />
    </>
  );
}

export default App;
