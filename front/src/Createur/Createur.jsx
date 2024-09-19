import { useState, useEffect } from "react";

export default function Createur() {
  const [validCreateur, setValidCreateur] = useState(false);
  const [createurID, setCreateurID] = useState();
  const [chaines, setChaines] = useState();

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
        }
      });
    fetch("http://localhost:5000/api/getchannelsID", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ uti_id: createurID }),
    })
      .then((response) => response.json())
      .then((chaines) => {
        setChaines(chaines);
      });
  }, []);

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
        <div className="flex">
          {/* Left Box: Blue box taking 1/3 of the page */}
          <div className="bg-blue-500 w-1/3 h-screen p-4">
            <h2 className="text-white text-lg font-bold text-center">Offre</h2>
            {/* You can add more content here */}
          </div>

          {/* Right Content: Rest of the page */}
          <div className="w-2/3 p-4">
            <h2 className="text-gray-800 text-lg font-bold">
              Contenu principal
            </h2>
            {/* Rest of your page content */}
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
