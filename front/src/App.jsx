import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Entreprise from "./Entreprise/Entreprise.jsx";
import Createur from "./Createur/Createur.jsx";
import Admin from "./Admin/Admin.jsx";
import Accueil from "./Accueil.jsx";
import Register from "./SignUp/Register.jsx";
import Login from "./SignUp/Login.jsx";
import Profile from "./Entreprise/Profile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/entreprises" element={<Entreprise />} />
        <Route path="/createur" element={<Createur />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
