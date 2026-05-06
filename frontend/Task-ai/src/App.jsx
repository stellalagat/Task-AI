import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskApp from "./pages/TaskApp";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      {/* ✅ Tailwind test */}
      <h1 className="text-3xl font-bold text-blue-500 text-center">
        Task App 🚀
      </h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* ✅ protect tasks */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskApp />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;