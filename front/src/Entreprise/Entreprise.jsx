import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Entreprise() {
  const [validEntreprise, setValidEntreprise] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(5);
  const [chaines, setChaines] = useState([]);
  const [sortCategory, setSortCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const navigate = useNavigate();

  // Gestion des conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Discussion 1",
      messages: [{ text: "Bonjour!", sender: "bot" }],
    },
    {
      id: 2,
      name: "Discussion 2",
      messages: [{ text: "Salut, comment vas-tu?", sender: "bot" }],
    },
    {
      id: 3,
      name: "Discussion 3",
      messages: [{ text: "Bienvenue dans la discussion 3", sender: "bot" }],
    },
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");

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
    setSubCategory("");
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "" && selectedConversation) {
      const newMessageObject = { text: newMessage, sender: "user" };
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, messages: [...conv.messages, newMessageObject] }
            : conv
        )
      );
      setNewMessage("");

      setTimeout(() => {
        const botResponse = { text: "Réponse automatique", sender: "bot" };
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === selectedConversation.id
              ? { ...conv, messages: [...conv.messages, botResponse] }
              : conv
          )
        );
      }, 1000);
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
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
          <div
            className={`bg-blue-800 text-white p-4 w-1/3 flex flex-col ${
              selectedConversation ? "hidden" : ""
            }`}
          >
            <h2 className="text-xl font-bold text-center mb-4">
              Conversations
            </h2>

            {/* Liste des conversations */}
            <ul className="flex-grow overflow-y-auto mb-4">
              {conversations.map((conversation) => (
                <li
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 mb-4 cursor-pointer rounded-lg ${
                    selectedConversation &&
                    selectedConversation.id === conversation.id
                      ? "bg-blue-600"
                      : "bg-blue-500"
                  }`}
                >
                  {conversation.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Zone de chat */}
          {selectedConversation && (
            <div className="bg-blue-800 text-white p-4 w-1/3 flex flex-col">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="text-white bg-blue-600 p-2 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-xl font-bold flex-grow text-center">
                  {selectedConversation.name}
                </h2>
              </div>

              <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4">
                {selectedConversation.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded-lg ${
                      message.sender === "user" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  >
                    {message.sender === "user" ? "Vous: " : "Bot: "}{" "}
                    {message.text}
                  </div>
                ))}
              </div>

              {/* Formulaire pour envoyer un message */}
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  className="w-full p-2 rounded-l-lg text-black"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Écrivez un message..."
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-r-lg"
                >
                  Envoyer
                </button>
              </form>
            </div>
          )}

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
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-800"
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
              {chaines.map((chaine) => (
                <li
                  key={chaine.id}
                  className="mb-4 p-4 bg-white rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {chaine.name}
                  </h3>
                  <p className="text-gray-600">{chaine.description}</p>
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
