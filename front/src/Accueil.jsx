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
      <div>
        <div>
          
          <h1>{isLogin ? "" : ""}</h1>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}
