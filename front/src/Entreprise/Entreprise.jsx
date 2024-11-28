import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Entreprise() {
  const [validEntreprise, setValidEntreprise] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(5);
  const [chaines, setChaines] = useState([]);
  const [sortCategory, setSortCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.siren !== undefined) {
          setValidEntreprise(true);
        } else {
          setValidEntreprise(false);
        }
      });

    getMoreChannels();
  }, []);

  const getMoreChannels = () => {
    fetch("http://localhost:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ start: start, length: length }),
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
    fetch("http://localhost:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ start: 0, length: length, search: search }),
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
  };
  const handlePlacement = (id) => {
    console.log(id);
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

        <div className="flex min-h-screen">
          {/* La box sur la gauche qui prend 1/3 de la largeur */}
          <div className={`bg-blue-800 text-white p-4 w-1/3 flex flex-col`}>
            <h2 className="text-xl font-bold text-center mb-4">
              Conversations
            </h2>
          </div>

          {/* Barre de recherche et menu de tri */}
          <div className="bg-gray-100 p-8 w-2/3">
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
                  <option value="creationDate">Date de création</option>
                  <option value="subscribers">Nombre d'abonnés</option>
                  <option value="theme">Thème</option>
                </select>
              </div>

              {/* Sous-catégorie basée sur le choix */}
              {sortCategory === "creationDate" && (
                <div className="flex items-center">
                  <label
                    htmlFor="creation-date"
                    className="mr-2 text-gray-700 font-medium"
                  >
                    Ordre :
                  </label>
                  <select
                    id="creation-date"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-800"
                  >
                    <option value="">Sélectionner</option>
                    <option value="asc">Croissant</option>
                    <option value="desc">Décroissant</option>
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
      </>
    );
  } else {
    navigate("/login");
  }
}
