import React, { useState } from 'react';
import Login from './SignUp/Login';
import Register from './SignUp/Register';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className=" bg-purple-800 p-8 rounded-2xl">
      <div className="form-container">
        <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
        {isLogin ? <Login /> : <Register />}
        <button onClick={toggleForm} className="toggle-btn">
          {isLogin ? 'Pas encore inscrit ? Inscrivez-vous' : 'Déjà inscrit ? Connectez-vous'}
        </button>
      </div>
    </div>
  );
}

export default App;
