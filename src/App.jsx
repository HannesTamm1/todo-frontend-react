import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/views/TaskList";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Logout from "./components/views/Logout";
import "antd/dist/reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;