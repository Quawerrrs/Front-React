import React, { useState, useEffect } from "react";
import axios from "axios"; // Importation de la biblioth que axios pour faire des requ tes HTTP vers l'API
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tempMessage, setTempMessage] = useState(""); // État pour le message temporaire

  // Récupérer les informations de l'utilisateur depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/profile"); // Assure-toi que l'URL correspond à ton API
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Impossible de récupérer les informations de profil.");
        setLoading(false);
      }
    };

    fetchUserData();
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Profil utilisateur</h2>

        {/* Affichage conditionnel basé sur le type d'utilisateur */}
        {user.role === "entreprise" ? (
          <>
            <p className="mb-4 text-gray-700">
              Nom Entreprise :{" "}
              <span className="font-semibold">{user.name}</span>
            </p>
            <p className="mb-4 text-gray-700">
              N° Siren : <span className="font-semibold">{user.siren}</span>
            </p>
          </>
        ) : user.role === "createur" ? (
          <>
            <p className="mb-4 text-gray-700">
              Pseudo : <span className="font-semibold">{user.pseudo}</span>
            </p>
          </>
        ) : (
          <p className="text-gray-700">Type de compte inconnu.</p>
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
        <a
          href="/entreprises"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-4"
        >
          Retour
        </a>
      </div>
    </div>
  );
}
