import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      fetch("http://localhost:5000/api/session/connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((role) => {
          if (role.redirect === "entreprise") {
            navigate("/entreprises");
          } else if (role.redirect === "createur") {
            navigate("/createur");
          } else if (role.redirect === "admin") {
            navigate("/admin");
          } else if (role.success === "wrongpwd") {
            alert("Mauvais mot de passe renseigné");
          } else if (role.success === "noemail") {
            alert("Vous n'avez pas encore de compte");
          }
        });
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Attendre 100ms avant de lancer l'animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://francis-gagnon.com/wp-content/uploads/2019/09/2017-09-27_FGagnon_91245-1080x607.jpg")',
      }}
    >
      {/* Flou important sur l'image de fond */}
      <div className="w-screen h-screen opacity-60 backdrop-blur-sm flex items-center justify-center">
        <div className="relative z-10 w-full p-4 flex items-center justify-center">
          <form
            className={`max-w-sm w-full bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-lg shadow-lg transition-transform duration-1000 ${
              isVisible ? "animate-fadeInFromTop" : "opacity-0"
            }`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Connexion
            </h2>

            <label className="block text-gray-800 font-semibold mb-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </label>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <label className="block text-gray-800 font-semibold mb-2">
              Mot de passe :
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Vous devez rentrer le mot de passe",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Vous devez rentrer un mot de passe valide",
                  },
                })}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
            <p className="text-center text-gray-800">
              Pas encore inscrit ?{" "}
              <a href="/Register" className="text-blue-600 hover:underline">
                Créez un compte
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
