import { useState } from "react";
import Login from "./SignUp/Login";
import Register from "./SignUp/Register";

export default function Accueil() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <div className=" bg-blue-800 p-8 rounded-2xl shadow-xlb text-center">
        <div className="form-container">
          
          <h1>{isLogin ? "Connexion" : "Inscription"}</h1>
          {isLogin ? <Login /> : <Register />}
          <button onClick={toggleForm} className="">
            {isLogin
              ? "Pas encore inscrit ? Inscrivez-vous"
              : "Déjà inscrit ? Connectez-vous"}
          </button>
        </div>
      </div>
    </>
  );
}
