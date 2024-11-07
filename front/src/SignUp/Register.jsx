import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userType, setUserType] = useState("entreprise");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    siren: "",
    adresse: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.siren !== undefined) {
          navigate("/entreprises");
        } else if (token.pseudo !== undefined) {
          navigate("/createur");
        } else if (token.code !== undefined) {
          navigate("/admin");
        }
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setFormData({
      ...formData,
      name: "",
      siren: "",
      adresse: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    const dataToSave = {
      userType,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      ...(userType === "entreprise" && {
        siren: formData.siren,
        adresse: formData.adresse,
      }),
      ...(userType === "videaste" && {
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    };

    try {
      const response = await fetch("http://localhost:5000/api/ajoutuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Inscription réussie");
          } else if (data.password) {
            alert("Mot de passe non conforme");
          } else if (data.email) {
            alert("Email déjà utilisé");
          }
        });
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue, veuillez réessayer.");
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
      <div className="w-screen h-screen opacity-60 backdrop-blur-sm flex items-center justify-center bg-black">
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 animate-fadeInFromTop">
          <form
            className="max-w-md w-full bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold text-white mb-4 text-center shadow-md">
              Inscription
            </h2>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                {userType === "entreprise" ? "Nom de l'entreprise" : "Pseudo"} :
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={
                  userType === "entreprise" ? "Nom de l'entreprise" : "Pseudo"
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Email :
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Mot de passe :
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Confirmez le mot de passe :
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {userType === "entreprise" && (
              <>
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">
                    N° SIREN :
                  </label>
                  <input
                    type="number"
                    name="siren"
                    value={formData.siren}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">
                    Adresse du siège :
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </>
            )}

            {userType === "videaste" && (
              <>
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">
                    Prénom :
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2">
                    Nom :
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Type de compte :
              </label>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="entreprise">Entreprise</option>
                <option value="videaste">Vidéaste</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              S'inscrire
            </button>

            <p className="text-center text-white mt-4">
              Déjà inscrit ?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Connectez-vous
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
