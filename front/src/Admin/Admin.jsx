import { useState, useEffect } from "react";
import PopupCode from "./PopupCode";

export default function Admin() {
  const [validAdmin, setValidAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(""); // Assuming you need a state for the validation code

  // Validation de l'admin avec le code de session
  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.code === code && code !== undefined) {
          setValidAdmin(true);
        } else {
          alert("Mauvais code de validation");
        }
      });
  }, [code]); // Include code in dependencies

  // Requête pour récupérer les utilisateurs après validation de l'admin
  useEffect(() => {
    if (validAdmin) {
      setLoading(true);
      fetch("http://localhost:5000/api/getUsers", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUsers(data.users); // Stocker les utilisateurs dans l'état
          } else {
            alert("Erreur lors de la récupération des utilisateurs");
          }
        })
        .catch((err) => {
          console.error("Erreur:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [validAdmin]);

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/deleteUser/${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.success) {
          // Mettre à jour l'état des utilisateurs pour retirer l'utilisateur supprimé
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.uti_id !== userId)
          );
          alert("Utilisateur supprimé avec succès !");
        } else {
          alert("Erreur lors de la suppression de l'utilisateur.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression :", err);
        alert(
          "Une erreur s'est produite lors de la suppression de l'utilisateur."
        );
      }
    }
  };

  // Fonction pour bloquer un utilisateur
  const handleBlockUser = async (userId) => {
    const reason = window.prompt("Veuillez entrer la raison du blocage :"); // Demande à l'admin d'entrer une raison

    if (reason) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blockUser/${userId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reason }), // Envoie la raison dans le corps de la requête
          }
        );

        const data = await response.json();

        if (data.success) {
          alert("Utilisateur bloqué avec succès !");
          // Vous pouvez mettre à jour l'état des utilisateurs ici si nécessaire
          setUsers((prevUsers) =>
            prevUsers.map(
              (user) =>
                user.uti_id === userId ? { ...user, is_blocked: true } : user // Correct property name
            )
          );
        } else {
          alert("Erreur lors du blocage de l'utilisateur.");
        }
      } catch (err) {
        console.error("Erreur lors du blocage :", err);
        alert("Une erreur s'est produite lors du blocage de l'utilisateur.");
      }
    } else {
      alert("Raison de blocage annulée.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {validAdmin ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Vous êtes bien un admin, bravo !
          </h1>
          {loading ? (
            <p className="text-gray-700">Chargement des utilisateurs...</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Liste des utilisateurs :
              </h2>
              <ul className="space-y-2">
                {users.length > 0 ? (
                  users.map((user) => (
                    <li
                      key={user.uti_id}
                      className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{user.uti_email}</span>
                        <div className="text-gray-500 text-sm">
                          Rôle : {user.role || "Non défini"}
                          {user.is_blocked && ( // Use correct property name
                            <span className="text-red-500"> (Bloqué)</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex space-x-2">
                        <button
                          onClick={() => handleDeleteUser(user.uti_id)}
                          className="bg-red-500 text-white rounded px-2 py-1 text-xs"
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => handleBlockUser(user.uti_id)}
                          className="bg-yellow-500 text-white rounded px-2 py-1 text-xs"
                        >
                          Bloquer
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                )}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <PopupCode validAdmin={setValidAdmin} />
      )}
    </div>
  );
}
