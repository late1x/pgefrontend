import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarD from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<><SidebarD/><Dashboard/></>}/>
      </Routes>
    </Router>
  );
}


export default App
