import { useEffect, useState } from "react";

export default function Profil() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getProfile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  if (!profileData) {
    return <p>Chargement des données du profil...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4">Profil</h1>
        <p>
          <strong>Nom:</strong> {profileData.name}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>Entreprise:</strong> {profileData.company}
        </p>
        <p>
          <strong>Date de création:</strong> {profileData.creationDate}
        </p>
        {/* Ajoutez ici d'autres informations du profil */}
      </div>
    </div>
  );
}
