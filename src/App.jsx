import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Users from "./components/Users/Users";
import Orders from "./components/Orders/Orders";
import Menu from "./components/Menu/Menu";
import Edit_User from "./components/Edit/Edit_User";


function App() {
  

  return (
    <>
     <NavBar />
     <Routes>
        <Route path="/orders" element={<Orders/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/edit_user/:id" element={<Edit_User/>} />

      </Routes>
    </>
  )
}

export default App
