import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function PopupCode({ validAdmin }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const valider = async () => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.code === code && code !== "") {
          validAdmin(true);
          navigate("/admin"); // Redirect to the admin page
        } else {
          alert("Mauvais code de validation");
        }
      });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-10 rounded-md shadow-lg flex flex-col gap-y-6 w-80">
        <h2 className="text-lg font-bold text-center">Validation Admin</h2>
        <input
          type="text"
          placeholder="Entrez votre code admin"
          onChange={handleCodeChange}
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={valider}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Valider
        </button>
      </div>
    </div>
  );
}
