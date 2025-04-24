import { useState, useEffect } from "react";
import PopupModifChannel from "../components/Modals/PopupModifChannel";
import { useNavigate } from "react-router-dom";

export default function Createur() {
  const [validCreateur, setValidCreateur] = useState(false);
  const [createurID, setCreateurID] = useState();
  const [chaines, setChaines] = useState();
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [demandesChaines, setDemandesChaines] = useState([]);

  useEffect(() => {
    fetch("http://10.0.0.183:5000/api/session/getSession", {
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
        fetch("http://10.0.0.183:5000/api/getchannelsID", {
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
    fetch("http://10.0.0.183:5000/api/getDemandesCreateur", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDemandesChaines(data);
      });
  }, [reload]);
  const handleUpdate = (id) => {
    document.getElementById(`cha_modal_${id}`).style.display = "flex";
  };
  const deleteChannel = (id) => {
    if (confirm("Voulez-vous supprimer cette chaine ?")) {
      fetch("http://10.0.0.183:5000/api/deleteChannel", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ cha_id: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setReload(!reload);
          }
        });
    } else {
    }
  };
  const refuserDemande = (id) => {
    if (confirm("Voulez-vous vraiment refuser la demande ?")) {
      fetch(`http://10.0.0.183:5000/api/refuserDemande/${id}`, {
        method: "PUT",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Demande refusée");
            setReload(!reload);
          }
        });
    }
    setReload(!reload);
  };
  const validDemande = (id) => {
    if (confirm("Voulez-vous accepter ce placement de produit ?")) {
      fetch(`http://10.0.0.183:5000/api/validDemande/${id}`, {
        method: "PUT",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Demande accpetée");
            setReload(!reload);
          }
        });
    }
    setReload(!reload);
  };
  const addChannel = () => {
    document.getElementById("cha_modal_0").style.display = "flex";
  };
  const annulerDemande = (id) => {
    if (confirm("Voulez-vous vraiment supprimer la demande ?")) {
      fetch(`http://10.0.0.183:5000/api/deleteDemande/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Demande supprimée");
            setReload(!reload);
          }
        });
    }
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
          <div className="bg-blue-800 max-w-[50vw] min-w-[33vw] p-4 overflow-auto">
            <h2 className="text-white text-lg font-bold mb-4 ml-4">Offres :</h2>
            <div className="flex gap-2 flex-col">
              {demandesChaines.map((demandesChaine) =>
                demandesChaine.map((demande) => (
                  <div
                    key={demande.dem_id}
                    className=" bg-blue-700 p-4 rounded-md"
                  >
                    <div className="flex flex-wrap gap-x-2 w-full">
                      <p className=" font-bold">Demande destiné à : </p>
                      <p>{demande.cha_name}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <p className=" font-bold">Entreprise : </p>
                      <p>{demande.ent_nom}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <p className=" font-bold ">Description :</p>
                      <p className=" overflow-auto max-h-72">
                        {demande.dem_description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <p className=" font-bold">Prix : </p>
                      <p>{demande.dem_prix} €</p>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <p className=" font-bold">Produit : </p>
                      <p>{demande.pro_nom}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-2">
                      <p className=" font-bold">Date limite : </p>
                      <p>{demande.dem_date_limite.split("T")[0]}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 border-green-300 border text-white font-semibold py-1 px-4 rounded-md min-w-[max-content]"
                        onClick={() => validDemande(demande.dem_id)}
                      >
                        Valider la demande
                      </button>

                      <button
                        className="bg-red-500 border border-red-300 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-md shadow-md min-w-[max-content]"
                        onClick={() => refuserDemande(demande.dem_id)}
                      >
                        Refuser la demande
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Content: Rest of the page */}

          <div className="w-full p-4 pl-10 overflow-auto">
            <h2 className="text-gray-800 text-2xl font-bold">Mes Chaines :</h2>
            {/* Rest of your page content */}
            <ol className="mt-8 flex flex-col">
              {chaines &&
                chaines.map((chaine) => (
                  <li
                    key={chaine.cha_id}
                    className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg shadow-gray-400"
                  >
                    <h3 className="text-xl font-bold text-orange-600">
                      {chaine.cha_name}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Lien de la chaine : </b>
                        {chaine.cha_url}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Thème principal : </b>
                        {chaine.cha_theme_1}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Thème secondaire : </b>
                        {chaine.cha_theme_2 ? chaine.cha_theme_2 : "Aucun"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Thème tertiaire : </b>
                        {chaine.cha_theme_3 ? chaine.cha_theme_3 : "Aucun"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Nombre d'abonnés : </b>
                        {chaine.cha_subs}{" "}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-300">
                        <b>Email de la chaine : </b>
                        {chaine.cha_email}
                      </p>
                    </div>
                    <div className="flex gap-2">
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
                    </div>
                    <div className=" pt-2 pb-2">
                      {chaine.placements.length > 0 ? (
                        <h1 className=" text-xl font-bold pb-2 text-orange-600">
                          Placements :
                        </h1>
                      ) : (
                        <></>
                      )}

                      {chaine.placements.map((placement) => (
                        <div
                          key={placement.dem_id}
                          className=" bg-blue-700 p-4 rounded-md flex flex-col justify-center"
                        >
                          <div className="flex flex-wrap gap-x-2 pb-1 rounded-md border-2 border-red-600 justify-center bg-red-600 bg-opacity-40">
                            <p className=" text-lg font-bold">Date limite : </p>
                            <p className=" text-lg font-bold text-white">
                              {placement.dem_date_limite.split("T")[0]}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-x-2 pb-1 justify-center">
                            <p className=" font-bold">Entreprise : </p>
                            <p>{placement.ent_nom}</p>
                            <p className=" font-bold">Prix : </p>
                            <p>{placement.dem_prix} €</p>
                            <p className=" font-bold">Produit : </p>
                            <p>{placement.pro_nom}</p>
                          </div>
                          <img
                            src={placement.pro_img}
                            alt="Pas d'image du produit"
                            className=" pb-1 max-h-[33vh] w-[fit-content] self-center"
                          />
                          <div className="flex flex-wrap gap-x-2">
                            <p className=" font-bold ">Description :</p>
                            <p className=" ">{placement.dem_description}</p>
                          </div>
                          <br />
                          <div>
                            <button
                              className="bg-red-500 border border-red-300 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-md shadow-md min-w-[max-content]"
                              onClick={() => annulerDemande(placement.dem_id)}
                            >
                              Annuler la demande
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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
