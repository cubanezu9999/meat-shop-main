import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import Showcase from "./pages/Showcase";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/SignIn" element={<SignIn />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/Profile" element={<Profile />}></Route>
      <Route path="/ResetPassword" element={<ResetPassword />}></Route>
      <Route path="/Showcase" element={<Showcase />}></Route>
    </Routes>
  );
};

export default App;
