import React, { useState } from 'react';

function Register() {
  const [userType, setUserType] = useState('entreprise');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    siren: '',
    adresse: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setFormData({
      ...formData,
      name: '',
      siren: '',
      adresse: '',
      firstName: '',
      lastName: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const dataToSave = {
      userType,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      ...(userType === 'entreprise' && { siren: formData.siren, adresse: formData.adresse }),
      ...(userType === 'videaste' && { firstName: formData.firstName, lastName: formData.lastName })
    };

    try {
      const response = await fetch('http://localhost:5000/api/ajoutuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      }).then(response => response.json()).then(data => {
        if (data.success) {
          alert("Inscription réussie");
        } else if (data.password) {
          alert('Mot de passe non conforme');
        } else if (data.email) {
          alert('Email déjà utilisé');
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue, veuillez réessayer.');
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://via.placeholder.com/1920x1080")' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <form className="max-w-md w-full bg-white bg-opacity-70 backdrop-blur-lg p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inscription</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              {userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'} :
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Confirmez le mot de passe :</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          {userType === 'entreprise' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">N° SIREN :</label>
                <input
                  type="number"
                  name="siren"
                  value={formData.siren}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Adresse du siège :</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </>
          )}
          {userType === 'videaste' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Prénom :</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Nom :</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Type de compte :</label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="entreprise">Entreprise</option>
              <option value="videaste">Vidéaste</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 text-sm"
          >
            S'inscrire
          </button>
          <p className="text-center text-gray-600 mt-4">
            Déjà inscrit ?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
