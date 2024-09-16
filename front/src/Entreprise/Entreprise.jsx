import { useState, useEffect } from "react";
import Profile from "./Profile";

export default function Entreprise() {
  const [validEntreprise, setValidEntreprise] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(5);
  const [chaines, setChaines] = useState([]);
  const [sortCategory, setSortCategory] = useState("");

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
        setChaines((prevChaines) => [...prevChaines, ...channels]);
        setStart(start + length);
      });
  };

  const handleCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">MonSite</div>
        <div className="space-x-4">
          <a
            href="/"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Accueil
          </a>
          <p className="text-center text-gray-800">
            Pas encore inscrit ?{" "}
            <a href="/Profile" className="text-blue-600 hover:underline">
              Créez un compte
            </a>
          </p>
        </div>
      </nav>
      <div className="flex min-h-screen">
        {/* La box sur la gauche qui prend 1/3 de la largeur */}
        <div className="bg-blue-500 text-white p-8 w-1/3">
          <h2 className="text-xl font-bold">Box Gauche</h2>
          <p>Ceci est une box qui prend 1/3 de la largeur de la page.</p>
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
                  className="w-full p-4 pl-10 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Rechercher..."
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Rechercher
                </button>
              </div>
            </form>

            {/* Menu de tri principal */}
            <div className="flex items-center">
              <label
                htmlFor="sort-category"
                className="mr-2 text-gray-700 font-medium"
              >
                Trier par:
              </label>
              <select
                id="sort-category"
                value={sortCategory}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="creationDate">Date de création</option>
                <option value="subscribers">Nombre d'abonnés</option>
                <option value="theme">Thème</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
