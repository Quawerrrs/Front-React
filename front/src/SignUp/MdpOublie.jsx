import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function MdpOublie() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
  });
  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const ChangePsw = () => {
    fetch("http://localhost:5000/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-900 text-black flex justify-center items-center flex-col">
        <div className="border-solid border border-black rounded-md">
          <div className="flex flex-col gap-y-2 p-4 bg-white rounded-md">
            <h1 className="text-2xl font-bold">MdpOublie</h1>
            <label className="text-sm">
              Veuillez renseigner votre email pour que nous vous envoyons un
              nouveau mot de passe
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="w-full min-h-10"
              onChange={HandleChange}
            ></input>
            <button
              onClick={ChangePsw}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 mb-4"
            >
              Valider
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
