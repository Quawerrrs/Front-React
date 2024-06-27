import React from 'react';

function Login() {
  return (
    <form className="form">
      <div className="form-group">
        <label>Email :</label>
        <input type="email" required />
      </div>
      <div className="form-group">
        <label>Mot de passe :</label>
        <input type="password" required />
      </div>
      <button type="submit" className="submit-btn">Se connecter</button>
    </form>
  );
}

export default Login;
