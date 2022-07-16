import "./App.css";
import HomePage from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import RequireAuth from "./Components/Auth/RequireAuth";
import Profile from "./pages/profile/Profile";
import Message from "./pages/message/Message";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile">
              <Route path=":username" element={<Profile />}></Route>
              <Route path="me" element={<Profile />} />
            </Route>
            <Route path="/message" element={<Message />}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
