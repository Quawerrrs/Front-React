import React, { useState } from "react";

export default function Profile() {
  // Simuler un email utilisateur stocké en local
  const [userEmail, setUserEmail] = useState("utilisateur@example.com");
  const [userName, setUserName] = useState("Sport Quantum");
  const [userSiren, setUserSiren] = useState("1512960541845");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Profil utilisateur</h2>

        {/* Affichage de l'email */}
        <p className="mb-4 text-gray-700">
          Nom Entreprise : <span className="font-semibold">{userName}</span>
        </p>
        <p className="mb-4 text-gray-700">
          N° Siren : <span className="font-semibold">{userSiren}</span>
        </p>
        <p className="mb-4 text-gray-700">
          Email : <span className="font-semibold">{userEmail}</span>
        </p>

        {/* Bouton */}
        <button
          onClick={() => alert("Bouton cliqué !")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Modifier le profil
        </button>
        <a
          href="/entreprises"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Retour
        </a>
      </div>
    </div>
  );
}
