import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import Users from "./components/Users/Users";
import Orders from "./components/Orders/Orders";
import Menu from "./components/Menu/Menu";
import Edit_User from "./components/Edit/Edit_User";
import Edit_Item from "./components/Edit/Edit_Item";
import Statistics from "./components/Stats/Statistics";
import Login from "./components/Login/Login";
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import socketIOClient from 'socket.io-client';
import {showNotification} from './components/Orders/Notification';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const serverEndpoint = 'http://localhost:5175';
  const socket = socketIOClient(serverEndpoint);

  useEffect(() => {
    socket.on('notification', (data) => {
      showNotification(data);
      console.log('MANAGER Received notification from the server:', data);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);

  const handleLogin = (status) => {
    console.log('Authorization successful');
    setAuthenticated(status);
  }

  const handleLogOut = () => {
    setAuthenticated(false);
  }

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogOut} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} isAuthenticated={isAuthenticated} />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} isAuthenticated={isAuthenticated} />} />
        <Route path="/menu" element={<ProtectedRoute element={<Menu />} isAuthenticated={isAuthenticated} />} />
        <Route path="/edit_user/:id" element={<ProtectedRoute element={<Edit_User />} isAuthenticated={isAuthenticated} />} />
        <Route path="/statistics" element={<ProtectedRoute element={<Statistics />} isAuthenticated={isAuthenticated} />} />
        <Route path="/edit_item/:id" element={<ProtectedRoute element={<Edit_Item />} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </>
  )
}

export default App;
