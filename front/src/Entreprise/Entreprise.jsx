import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopupDemande from "../components/Modals/PopupDemande";

export default function Entreprise() {
  const [validEntreprise, setValidEntreprise] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(5);
  const [chaines, setChaines] = useState([]);
  const [sortCategory, setSortCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState(null);
  const [showDemande, setShowDemande] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://10.0.0.183:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.siret !== undefined) {
          setValidEntreprise(true);
        } else {
          setValidEntreprise(false);
          navigate("/login");
        }
      });

    getMoreChannels();

    fetch("http://10.0.0.183:5000/api/getDemandesEntreprise", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDemandes(data);
        console.log(data);
      });
  }, []);

  const getMoreChannels = () => {
    fetch("http://10.0.0.183:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        start: start,
        length: length,
        search: search,
        sortCategory: sortCategory,
        sortOrder: subCategory,
        subscribers: subCategory,
      }),
    })
      .then((response) => response.json())
      .then((channels) => {
        console.log(channels);

        setChaines((prevChaines) => [...prevChaines, ...channels]);
        setStart(start + length);
      });
  };
  useEffect(() => {
    handleSearch();
  }, [length]);
  const handleSearch = (e) => {
    fetch("http://10.0.0.183:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        start: 0,
        length: length,
        search: search,
        sortCategory: sortCategory,
        sortOrder: subCategory,
        subscribers: subCategory,
      }),
    })
      .then((response) => response.json())
      .then((channels) => {
        setChaines(channels);
      });
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
    setSubCategory("");
  };
  const handleNbChange = (e) => {
    setLength(Number(e.target.value));
    setStart(Number(e.target.value));
  };
  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    var subscribers = 0;
    var sortOrder = "";
    if (sortCategory == "theme") {
      switch (e.target.value) {
        case "1":
          sortOrder = "ASC";
          break;
        case "2":
          sortOrder = "DESC";
          break;
        default:
          sortOrder = "ASC";
      }
    } else if (sortCategory == "subscribers") {
      switch (e.target.value) {
        case "1":
          subscribers = 1;
          break;
        case "2":
          subscribers = 10;
          break;
        case "3":
          subscribers = 100;
          break;
        case "4":
          subscribers = 1000;
          break;
        default:
          subscribers = 0;
      }
    }
    fetch("http://10.0.0.183:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        start: 0,
        length: length,
        search: search,
        sortCategory: sortCategory,
        sortOrder: sortOrder,
        subscribers: subscribers,
      }),
    })
      .then((response) => response.json())
      .then((channels) => {
        setChaines(channels);
      });
  };
  const handlePlacement = (id) => {
    document.getElementById(`cha_demande_${id}`).style.display = "flex";
  };
  const deleteDemande = (id) => {
    if (confirm("Voulez-vous vraiment supprimer la demande ?")) {
      fetch(`http://10.0.0.183:5000/api/deleteDemande/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Demande supprimée");
            fetch("http://10.0.0.183:5000/api/getDemandesEntreprise", {
              method: "GET",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                setDemandes(data);
              });
          }
        });
    }
  };
  if (validEntreprise) {
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

        <div className="flex h-[calc(100vh_-_116px)]">
          {/* La box sur la gauche qui prend 1/3 de la largeur */}
          <div
            className={`bg-blue-800 text-white p-4 max-w-[33.33vw] min-w-[25vw] flex flex-col overflow-auto`}
          >
            <h2 className="text-xl font-bold mb-4 ml-4">Demandes en cours</h2>
            <div className="flex gap-2 flex-col">
              {demandes.map((demande) => (
                <div
                  key={demande.dem_id}
                  className={`${
                    !demande.dem_refus ? " bg-blue-700" : " bg-gray-800"
                  } p-4 rounded-md`}
                >
                  {demande.dem_refus ? (
                    <h1 className="text-xl text-red-600 font-bold rounded-lg text-center">
                      Proposition Refusée
                    </h1>
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-wrap gap-x-2">
                    <p className=" font-bold">Demande destiné à : </p>
                    <p>{demande.cha_name}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-2">
                    <p className=" font-bold">Description :</p>
                    <p className="overflow-hidden max-h-48 max-w-[33vw]">
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
                  <button
                    className="bg-red-500 border border-red-200 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-md shadow-md w-full min-w-[max-content]"
                    onClick={() => deleteDemande(demande.dem_id)}
                  >
                    Annuler la demande
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Autre 2/3 de la page Barre de recherche et menu de tri */}
          <div className="bg-gray-100 p-8 w-full overflow-scroll">
            <div className="flex items-center space-x-4">
              {/* Barre de recherche */}
              <form className="w-full max-w-md">
                <label htmlFor="search" className="sr-only">
                  Recherche
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="search"
                    className="w-full p-4 pl-10 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-800"
                    placeholder="Rechercher..."
                    onChange={handleSearchChange}
                  />
                  <button
                    className="absolute right-2 top-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                  >
                    Rechercher
                  </button>
                </div>
              </form>

              {/* nombre de chaines par page */}
              <div className="flex items-center">
                <label
                  htmlFor="nbAffiche"
                  className="mr-2 text-gray-700 font-medium"
                >
                  Nombre affiché :
                </label>
                <select
                  id="nbAffiche"
                  onChange={handleNbChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              {/* Menu de tri principal */}
              <div className="flex items-center">
                <label
                  htmlFor="sort-category"
                  className="mr-2 text-gray-700 font-medium"
                >
                  Trier par
                </label>
                <select
                  id="sort-category"
                  value={sortCategory}
                  onChange={handleCategoryChange}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="subscribers">Nombre d'abonnés</option>
                  <option value="theme">Thème</option>
                </select>
              </div>

              {/* Sous-catégorie basée sur le choix */}
              {sortCategory === "subscribers" && (
                <div className="flex items-center">
                  <label
                    htmlFor="sub-category"
                    className="mr-2 text-gray-700 font-medium"
                  >
                    Sous-catégorie :
                  </label>
                  <select
                    id="sub-category"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                  >
                    <option value="">0 ou plus</option>
                    <option value="1">plus de 1K</option>
                    <option value="2">plus de 10K</option>
                    <option value="3">plus de 100K</option>
                    <option value="4">plus de 1 M</option>
                  </select>
                </div>
              )}
              {sortCategory === "theme" && (
                <div className="flex items-center">
                  <label
                    htmlFor="sub-category"
                    className="mr-2 text-gray-700 font-medium"
                  >
                    Sous-catégorie :
                  </label>
                  <select
                    id="sub-category"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                  >
                    <option value="">choisir</option>
                    <option value="1">croissant</option>
                    <option value="2">décroissant</option>
                  </select>
                </div>
              )}

              {sortCategory === "budget" && (
                <div className="flex items-center">
                  <label
                    htmlFor="sub-category"
                    className="mr-2 text-gray-700 font-medium"
                  >
                    Sous-catégorie :
                  </label>
                  <select
                    id="sub-category"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                  >
                    <option value="">choisir</option>
                    <option value="1">croissant</option>
                    <option value="2">décroissant</option>
                  </select>
                </div>
              )}
              {/* Ajouter d'autres options selon les catégories */}
            </div>

            {/* Liste des chaînes */}
            <ul className="mt-8">
              {chaines &&
                chaines.map((chaine) => (
                  <li
                    key={chaine.cha_id}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md relative"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {chaine.cha_name +
                        " avec " +
                        chaine.cha_subs +
                        " abonnés"}
                    </h3>
                    <div className="flex items-center">
                      <p className="text-gray-600">Lien :</p>
                      <a
                        href={chaine.cha_url}
                        className="text-blue-500"
                        target="_blank"
                      >
                        {chaine.cha_url.substring(
                          chaine.cha_url.lastIndexOf("@")
                        )}
                      </a>
                    </div>
                    <p className="text-gray-600">
                      {"Thème principal : " +
                        chaine.cha_theme_1 +
                        " " +
                        (chaine.cha_theme_3 != ""
                          ? " Thème tertiaire : " + chaine.cha_theme_3
                          : "")}
                    </p>
                    {chaine.cha_theme_2 != "" ? (
                      <p className="text-gray-600">
                        {" "}
                        Thème secondaire : {chaine.cha_theme_2}
                      </p>
                    ) : (
                      <></>
                    )}
                    {chaine.cha_theme_3 != "" ? (
                      <p className="text-gray-600">
                        {" "}
                        Thème thertiaire : {chaine.cha_theme_3}
                      </p>
                    ) : (
                      <></>
                    )}
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 right-1 bottom-1 absolute"
                      onClick={() => handlePlacement(chaine.cha_id)}
                    >
                      Proposer un placement ?
                    </button>
                  </li>
                ))}
            </ul>

            {/* Bouton de chargement pour plus de chaînes */}
            <button
              onClick={getMoreChannels}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
            >
              Charger plus
            </button>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-gray-800 p-4 text-white text-center">
          © 2024 Streamio. Tous droits réservés.
        </footer>
        {chaines.map((chaine) => (
          <PopupDemande
            showDemande={showDemande}
            setShowDemande={setShowDemande}
            chaine={chaine}
          />
        ))}
      </>
    );
  } else {
    navigate("");
  }
}
