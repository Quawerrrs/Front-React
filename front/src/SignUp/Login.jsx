import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // État pour le compte bloqué
  const [blockReason, setBlockReason] = useState(""); // État pour la raison du blocage

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.siret !== undefined) {
          navigate("/entreprises");
        } else if (token.pseudo !== undefined) {
          navigate("/createur");
        } else if (token.code !== undefined) {
          navigate("/admin");
        }
      });
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/session/connection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      // Vérifie si le compte est bloqué
      if (result.is_blocked === 1) {
        setIsBlocked(true); // Affiche la popup pour le compte bloqué
        setBlockReason(result.block_reason); // Définit la raison du blocage
        return; // Sort de la fonction pour éviter d'exécuter d'autres redirections
      }

      if (result.redirect === "entreprise") {
        navigate("/entreprises");
      } else if (result.redirect === "createur") {
        navigate("/createur");
      } else if (result.redirect === "admin") {
        navigate("/admin");
      } else if (result.success === "wrongpwd") {
        alert("Mauvais mot de passe renseigné");
      } else if (result.success === "noemail") {
        alert("Vous n'avez pas encore de compte");
      }
    } catch (err) {
      console.error("Une erreur s'est produite lors de la connexion :", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setIsBlocked(false); // Ferme la popup
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 transition-all duration-500 ease-in-out filter brightness-80 group-hover:brightness-90 group-hover:shadow-lg"></div>
      <div className="relative z-10 w-full p-4 flex items-center justify-center">
        <form
          className={`max-w-sm w-full bg-black p-6 rounded-lg shadow-lg transition-transform duration-1000 ${
            isVisible ? "animate-fadeInFromTop" : "opacity-0"
          }`}
          onSubmit={handleSubmit(onSubmit)}
          style={{
            boxShadow: "0 4px 15px rgba(255, 255, 255, 0.4)",
            border: "2px solid white",
            fontFamily: "'Fascinate Inline', cursive",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            Connexion
          </h2>

          <label className="block text-white font-semibold mb-4">
            Email :
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Vous devez rentrer le mail",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Vous devez rentrer un email valide",
                },
              })}
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </label>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label className="block text-white font-semibold mb-2">
            Mot de passe :
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Vous devez rentrer le mot de passe",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message: "Vous devez rentrer un mot de passe valide",
                },
              })}
              type="password"
              className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mb-4"
          >
            Se connecter
          </button>
          <p className="text-center text-white">
            Pas encore inscrit ?{" "}
            <a href="/Register" className="text-blue-400 hover:underline">
              Créez un compte
            </a>
          </p>
        </form>
      </div>

      {/* Popup pour compte bloqué */}
      {isBlocked && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-red-600 text-center">
              Votre compte est bloqué
            </h2>
            <p className="text-center mt-2">{blockReason}</p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              onClick={handleClosePopup}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
