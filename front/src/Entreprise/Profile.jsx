import React, { useState, useEffect } from "react";
import axios from "axios"; // Importation de la biblioth que axios pour faire des requ tes HTTP vers l'API
import { Link, redirect, useNavigate } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tempMessage, setTempMessage] = useState(""); // État pour le message temporaire
  const navigate = useNavigate();
  // Récupérer les informations de l'utilisateur depuis l'API
  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        setLoading(false);
        setUser(token);
        console.log(token);
      });
  }, []);

  useEffect(() => {
    if (tempMessage) {
      // Masquer le message après 3 secondes
      const timer = setTimeout(() => setTempMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [tempMessage]);

  const handleEditClick = () => {
    setTempMessage("Fonction de modification non implémentée");
  };

  const logout = () => {
    fetch("http://localhost:5000/api/session/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        navigate(response.redirect);
      });
  };

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Pas d'utilisateur connecté.</p>;
  }

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-orange-500 text-xl font-bold">Streamio</div>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 no-underline"
          >
            Accueil
          </a>
          <a
            href="/Profile"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 no-underline"
          >
            Profil
          </a>
        </div>
      </nav>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="relative bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Profil utilisateur</h2>
          {/* Affichage conditionnel basé sur le type d'utilisateur */}
          {user.type === "entreprise" ? (
            <>
              <p className="mb-4 text-gray-700">
                Nom Entreprise :{" "}
                <span className="font-semibold">{user.nom}</span>
              </p>
              <p className="mb-4 text-gray-700">
                N° Siren : <span className="font-semibold">{user.siren}</span>
              </p>
            </>
          ) : (
            <>
              <p className="mb-4 text-gray-700">
                Pseudo : <span className="font-semibold">{user.pseudo}</span>
              </p>
            </>
          )}
          <p className="mb-4 text-gray-700">
            Email : <span className="font-semibold">{user.email}</span>
          </p>

          {/* Message temporaire affiché au-dessus du contenu */}
          {tempMessage && (
            <div className="absolute top-0 left-0 w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-b-md shadow-md z-50">
              <span>{tempMessage}</span>
            </div>
          )}

          {/* Bouton de modification */}
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-8"
          >
            Modifier le profil
          </button>
          {/* Lien de retour */}
          <Link
            to="/entreprises"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4 no-underline border-black"
          >
            Retour
          </Link>
          <button
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md shadow-md z-50 hover:bg-red-300 transition duration-300 mt-8"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
