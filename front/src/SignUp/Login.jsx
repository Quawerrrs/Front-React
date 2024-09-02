import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      fetch("http://localhost:5000/api/session/connection", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      }).then(response => response.json()).then(role => {
        if (role.redirect === 'entreprise') {
          navigate("/entreprises");
        } else if (role.redirect === 'createur') {
          navigate("/createur");
        } else if (role.redirect === 'admin') {
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
    <form className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Email :</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Mot de passe :</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Se connecter
      </button>
    </form>
  );
}

export default Login;
