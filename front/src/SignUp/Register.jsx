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

    // Perform form validation here
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
      }).then((response)=> response.json()).then(data => {
        if (data.success){
          alert("ouiiiii")
        } else if (data.password) {
          alert('mdp non conforme')
        } else if (data.email) {
          alert('dupli email')
        }
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue, veuillez réessayer.');
    }
  };

  return (
    <form className="form fade-in" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>{userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'} :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={userType === 'entreprise' ? 'Nom de l\'entreprise' : 'Pseudo'}
          required
        />
      </div>
      <div className="">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="">
        <label>Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="">
        <label>Confirmez le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>
      {userType === 'entreprise' && (
        <>
          <div className="form-group">
            <label>N° SIREN :</label>
            <input
              type="number"
              name="siren"
              value={formData.siren}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Adresse du siège :</label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )}
      {userType === 'videaste' && (
        <>
          <div className="form-group">
            <label>Prénom :</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )}
      <div className="">
        <label>Type de compte :</label>
        <select value={userType} onChange={handleUserTypeChange} required>
          <option value="entreprise">Entreprise</option>
          <option value="videaste">Vidéaste</option>
        </select>
      </div>
      <button type="submit" className="">S'inscrire</button>
    </form>
  );
}

export default Register;
