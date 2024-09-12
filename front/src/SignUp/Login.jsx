import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  // const [formData, setFormData] = React.useState({
  //   email: "",
  //   password: "",
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://francis-gagnon.com/wp-content/uploads/2019/09/2017-09-27_FGagnon_91245-1080x607.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-sm"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <form
          className="max-w-sm w-full bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-xl font-bold text-white mb-4 text-center shadow-md">
            Connexion
          </h2>

          <label className="block text-white font-semibold mb-4 ">
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
          <p className="text-center text-white">
            Pas encore inscrit ?{" "}
            <a href="/Register" className="text-blue-400 hover:underline">
              Créez un compte
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
