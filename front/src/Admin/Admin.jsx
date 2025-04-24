import { useState, useEffect } from "react";
import PopupCode from "./PopupCode";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [validAdmin, setValidAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // "all", "blocked", "unblocked"
  const [code, setCode] = useState(""); // Assuming you need a state for the validation code
  const navigate = useNavigate();

  // Validation de l'admin avec le code de session
  useEffect(() => {
    fetch("http://10.0.0.183:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);

        if (!data.success) {
          navigate("/login");
        }
      });
  }, [code]);

  // Requête pour récupérer les utilisateurs après validation de l'admin
  useEffect(() => {
    if (validAdmin) {
      setLoading(true);
      fetch("http://10.0.0.183:5000/api/getUsers", {
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
          `http://10.0.0.183:5000/api/deleteSpecificUser/${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.success) {
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
  const Logout = () => {
    fetch("http://10.0.0.183:5000/api/session/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        navigate(response.redirect);
      });
  };
  // Fonction pour bloquer ou débloquer un utilisateur
  const handleBlockUser = async (userId, isBlocked) => {
    const action = isBlocked ? "unblock" : "block"; // Si l'utilisateur est bloqué, on va le débloquer, sinon on le bloque
    const reason =
      action === "block"
        ? window.prompt("Veuillez entrer la raison du blocage :")
        : null;

    if (action === "block" && !reason) {
      alert("Raison de blocage annulée.");
      return;
    }

    try {
      const response = await fetch(
        `http://10.0.0.183:5000/api/${action}User/${userId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: action === "block" ? JSON.stringify({ reason }) : null, // Envoie la raison seulement pour le blocage
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          `Utilisateur ${
            action === "block" ? "bloqué" : "débloqué"
          } avec succès !`
        );
        // Mettre à jour l'état des utilisateurs ici
        setUsers((prevUsers) =>
          prevUsers.map(
            (user) =>
              user.uti_id === userId
                ? { ...user, is_blocked: !isBlocked }
                : user // Inverse le statut de blocage
          )
        );
      } else {
        alert(
          `Erreur lors du ${
            action === "block" ? "blocage" : "déblocage"
          } de l'utilisateur.`
        );
      }
    } catch (err) {
      console.error(
        `Erreur lors du ${action === "block" ? "blocage" : "déblocage"} :`,
        err
      );
      alert(
        `Une erreur s'est produite lors du ${
          action === "block" ? "blocage" : "déblocage"
        } de l'utilisateur.`
      );
    }
  };

  // Fonction pour filtrer les utilisateurs en fonction de leur statut de blocage
  const filteredUsers = users.filter((user) => {
    if (filter === "blocked") {
      return user.is_blocked;
    }
    if (filter === "unblocked") {
      return !user.is_blocked;
    }
    return true; // "all" -> aucun filtre
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {validAdmin ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Interface Administrateur
          </h1>

          {/* Filtrage des utilisateurs */}
          <div className="mb-4">
            <label className="mr-2">Filtrer par statut :</label>
            <input
              type="radio"
              id="all"
              name="filter"
              value="all"
              checked={filter === "all"}
              onChange={() => setFilter("all")}
            />
            <label htmlFor="all" className="mr-4">
              Tous
            </label>

            <input
              type="radio"
              id="blocked"
              name="filter"
              value="blocked"
              checked={filter === "blocked"}
              onChange={() => setFilter("blocked")}
            />
            <label htmlFor="blocked" className="mr-4">
              Comptes bloqués
            </label>

            <input
              type="radio"
              id="unblocked"
              name="filter"
              value="unblocked"
              checked={filter === "unblocked"}
              onChange={() => setFilter("unblocked")}
            />
            <label htmlFor="unblocked">Comptes non bloqués</label>
          </div>

          {loading ? (
            <p className="text-gray-700">Chargement des utilisateurs...</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Liste des utilisateurs :
              </h2>
              <ul className="space-y-2">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <li
                      key={user.uti_id}
                      className="bg-gray-50 p-2 rounded border border-gray-200 flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{user.uti_email}</span>
                        <div className="text-gray-500 text-sm">
                          Rôle : {user.role || "Non défini"}
                          {user.is_blocked && (
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
                          onClick={() =>
                            handleBlockUser(user.uti_id, user.is_blocked)
                          } // Passer l'état du blocage
                          className={`${
                            user.is_blocked ? "bg-green-500" : "bg-yellow-500"
                          } text-white rounded px-2 py-1 text-xs`}
                        >
                          {user.is_blocked ? "Débloquer" : "Bloquer"}
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                )}
              </ul>
              <div className=" flex justify-end">
                <button
                  onClick={() => Logout()}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 font-semibold py-2 rounded-md shadow-md mt-6"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <PopupCode validAdmin={setValidAdmin} />
      )}
    </div>
  );
}
