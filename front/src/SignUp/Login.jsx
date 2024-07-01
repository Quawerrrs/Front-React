import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
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
        if (role.redirect === 'entreprise'){
          navigate("/entreprises")
        } else if (role.redirect === 'createur') {
          navigate("/createur")
        }else if (role.redirect === 'admin') {
          navigate("/admin")
        } else if (role.success === "wrongpwd") {
          alert("Mauvais mot de passe renseigné")
        } else if (role.success === "noemail") {
          alert("Vous n'avez pas encore de compte")
        }
      })

    } catch(err) {

    }
  }
  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="">
        <label>Email :</label>
        <input type="email" name='email' required onChange={handleInputChange}/>
      </div>
      <div className="">
        <label>Mot de passe :</label>
        <input type="password" name='password' required onChange={handleInputChange}/>
      </div>
      <button type="submit" className="">Se connecter</button>
    </form>
  );
}

export default Login;
