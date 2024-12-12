import React, { useState, useEffect } from "react";
import axios from "axios"; // Importation de la biblioth que axios pour faire des requ tes HTTP vers l'API
import { useNavigate } from "react-router-dom";
import PopupProducts from "../components/Modals/PopupProducts";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [tempMessage, setTempMessage] = useState(""); // État pour le message temporaire
  const [formData, setFormData] = useState({
    uti_id: "",
    name: "",
    email: "",
    siret: "",
    adresse: "",
    firstName: "",
    pseudo: "",
  });
  const navigate = useNavigate();
  // Récupérer les informations de l'utilisateur depuis l'API
  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.error == "notoken") {
          navigate("/login");
        }
        setLoading(false);
        setUser(token);
        setFormData({
          uti_id: token.id,
          name: token.nom,
          email: token.email,
          siret: token.siret,
          adresse: token.adresse,
          firstName: token.prenom,
          pseudo: token.pseudo,
        });
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

  const saveModif = async () => {
    console.log("test");
    try {
      const result = await fetch("http://localhost:5000/api/updateUser", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success) {
        setTempMessage("Les informations ont bien été modifiées");
      } else if (data.email) {
        alert("Email déjà utilisé");
      } else if (data.pseudo) {
        alert("pseudo déjà utilisé");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
  const redirect = () => {
    navigate("/login");
  };

  const supprimer = () => {
    if (confirm("Voulez-vous supprimer votre compte ?")) {
      fetch("http://localhost:5000/api/deleteUser", {
        method: "POST",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            navigate("/login");
          }
        });
    } else {
      alert("Suppression annulee");
    }
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
        <div className="relative bg-white p-6 rounded-lg shadow-lg min-w-[30%]">
          <h2 className="text-xl font-bold mb-4">Profil utilisateur</h2>
          {/* Affichage conditionnel basé sur le type d'utilisateur */}
          <div className="grid  grid-cols-[120px_auto] gap-4">
            {user.type === "entreprise" ? (
              <>
                <p className=" text-gray-700">Nom Entreprise :</p>
                <input
                  className="font-semibold border-black border-2 rounded-md"
                  name="name"
                  defaultValue={user.nom}
                  onChange={handleInputChange}
                />
                <p className=" text-gray-700">N° Siret :</p>
                <input
                  className="font-semibold border-black border-2 rounded-md"
                  name="siret"
                  defaultValue={user.siret}
                  onChange={handleInputChange}
                />
              </>
            ) : (
              <>
                <span className=" text-gray-700">Nom : </span>
                <input
                  className="font-semibold border-black border-2 rounded-md"
                  name="name"
                  defaultValue={user.nom}
                  onChange={handleInputChange}
                />
                <span className=" text-gray-700">Prenom :</span>
                <input
                  className="font-semibold border-black border-2 rounded-md"
                  name="firstName"
                  defaultValue={user.prenom}
                  onChange={handleInputChange}
                />
                <span className=" text-gray-700">Pseudo :</span>
                <input
                  className="font-semibold border-black border-2 rounded-md"
                  name="pseudo"
                  defaultValue={user.pseudo}
                  onChange={handleInputChange}
                />
              </>
            )}
            <p className=" text-gray-700">Email :</p>
            <input
              className="font-semibold border-black border-2 rounded-md"
              name="email"
              defaultValue={user.email}
              onChange={handleInputChange}
            />
            {user.type === "entreprise" ? (
              <>
                <button
                  onClick={() => setShowProducts(true)}
                  className="bg-gray-300 hover:bg-gray-500 font-semibold py-2 px-4 rounded mt-8 w-full col-start-1 col-end-3"
                >
                  Mes produits
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* Message temporaire affiché au-dessus du contenu */}
          {tempMessage && (
            <div className="absolute bottom-full left-0 w-full bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow-md z-50">
              <span>{tempMessage}</span>
            </div>
          )}

          {/* Bouton de modification */}
          <div className="flex justify-between">
            {/* Lien de retour */}
            <button
              onClick={redirect}
              className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition duration-300 mt-8 w-[160px]"
            >
              Retour
            </button>
            <button
              onClick={saveModif}
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-8 w-[160px]"
            >
              Valider Modifs
            </button>
          </div>
          <div className="flex justify-between pt-4 ">
            <button
              className="bg-red-100 border border-red-400 text-red-700 px-4 font-semibold py-2 rounded-md shadow-md w-[160px]"
              onClick={() => logout()}
            >
              Logout
            </button>
            <button
              className="bg-red-500 border border-red-200 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md w-[160px]"
              onClick={() => supprimer()}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <PopupProducts
        show={showProducts}
        setShowProducts={setShowProducts}
        utiId={user.id}
      />
    </>
  );
}
