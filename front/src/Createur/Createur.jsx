import { useState, useEffect } from "react";
import PopupModifChannel from "../components/Modals/PopupModifChannel";
import { useNavigate } from "react-router-dom";

export default function Createur() {
  const [validCreateur, setValidCreateur] = useState(false);
  const [createurID, setCreateurID] = useState();
  const [chaines, setChaines] = useState();
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.pseudo != undefined) {
          setValidCreateur(true);
          setCreateurID(token.id);
        } else {
          setValidCreateur(false);
          navigate("/login");
        }
        fetch("http://localhost:5000/api/getchannelsID", {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ uti_id: token.id }),
        })
          .then((response) => response.json())
          .then((chaineID) => {
            setChaines(chaineID);
          });
      });
  }, [reload]);
  const handleUpdate = (id) => {
    document.getElementById(`cha_modal_${id}`).style.display = "flex";
  };
  const deleteChannel = (id) => {
    if (confirm("Voulez-vous supprimer cette chaine ?")) {
      fetch("http://localhost:5000/api/deleteChannel", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ cha_id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setReload(true);
          }
        });
    } else {
    }
  };
  const addChannel = () => {
    document.getElementById("cha_modal_0").style.display = "flex";
  };
  if (validCreateur) {
    return (
      <>
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
          <div className="text-orange-500 text-xl font-bold">Streamio</div>
          <div className="space-x-4">
            <a
              href="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 no-underline"
            >
              Accueil
            </a>
            <a
              href="/Profile"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 no-underline"
            >
              Profil
            </a>
          </div>
        </nav>

        {/* Main container */}
        <div className="flex h-[calc(100vh_-_116px)]">
          {/* Left Box: Blue box taking 1/3 of the page */}
          <div className="bg-blue-500 w-1/3 p-4">
            <h2 className="text-white text-lg font-bold text-center">Offres</h2>
            {/* You can add more content here */}
          </div>

          {/* Right Content: Rest of the page */}
          <div className="w-2/3 p-4 pl-10 overflow-auto">
            <h2 className="text-gray-800 text-2xl font-bold">Mes Chaines :</h2>
            {/* Rest of your page content */}
            <ol className="mt-8">
              {chaines &&
                chaines.map((chaine) => (
                  <li
                    key={chaine.cha_id}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      Nom de la chaine : {chaine.cha_name}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Lien de la chaine : {chaine.cha_url}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Thème principal : {chaine.cha_theme_1}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Thème secondaire : {chaine.cha_theme_2}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Thème tertiaire : {chaine.cha_theme_3}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Nombre d'abonnés : {chaine.cha_subs}{" "}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        Email de la chaine : {chaine.cha_email}
                      </p>
                    </div>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => handleUpdate(chaine.cha_id)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                      onClick={() => deleteChannel(chaine.cha_id)}
                    >
                      Supprimer
                    </button>
                    <PopupModifChannel chaine={chaine} setReload={setReload} />
                  </li>
                ))}
            </ol>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => addChannel()}
            >
              Ajouter une chaine
            </button>
            <PopupModifChannel setReload={setReload} />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 p-4 text-white text-center">
          © 2024 Streamio. Tous droits réservés.
        </footer>
      </>
    );
  }
}
