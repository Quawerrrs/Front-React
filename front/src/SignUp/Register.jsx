import React, { useState } from 'react';

function Register() {
  const [userType, setUserType] = useState('entreprise');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <form className="">
      <div className="">
        <label>{userType === 'entreprise' ? 'Nom' : 'Pseudo'} :</label>
        <input type="text" placeholder={userType === 'entreprise' ? 'Nom' : 'Pseudo'} required />
      </div>
      <div className="">
        <label>Email :</label>
        <input type="email" required />
      </div>
      <div className="">
        <label>Mot de passe :</label>
        <input type="password" required />
      </div>
      <div className="">
        <label>Confirmez le mot de passe :</label>
        <input type="password" required />
      </div>
      {userType === 'entreprise' && (
        <div className="">
          <label>N° SIREN :</label>
          <input type="text" required />
        </div>
      )}
      {userType === 'videaste' && (
        <div className="">
          <label>Lien vers la chaîne :</label>
          <input type="url" required />
        </div>
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
