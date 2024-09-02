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
    <form className="max-w-xs mx-auto mt-4 bg-white p-3 rounded-lg shadow-md md:max-w-md" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">
          {userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'} :
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">Confirmez le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
      {userType === 'entreprise' && (
        <>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-1">N° SIREN :</label>
            <input
              type="number"
              name="siren"
              value={formData.siren}
              onChange={handleInputChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-1">Adresse du siège :</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </>
      )}
      {userType === 'videaste' && (
        <>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-1">Prénom :</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-semibold mb-1">Nom :</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </>
      )}
      <div className="mb-2">
        <label className="block text-gray-700 font-semibold mb-1">Type de compte :</label>
        <select
          value={userType}
          onChange={handleUserTypeChange}
          required
          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="entreprise">Entreprise</option>
          <option value="videaste">Vidéaste</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 text-sm"
      >
        S'inscrire
      </button>
    </form>
  );
}

export default Register;
