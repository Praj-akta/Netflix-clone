import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyList from "./pages/MyList";
import Player from "./components/Player";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/mylist" element={<MyList />} />
          <Route exact path="player" element={<Player />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
