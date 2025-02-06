import React from "react";
export default function PopupSendDemande({ productID, chaineID }) {
  const [description, setDescription] = React.useState("");
  const [prix, setPrix] = React.useState(-1);
  const HandleClose = () => {
    document.getElementById(
      "dem_modal_" + chaineID + "_" + productID
    ).style.display = "none";
  };
  const sendDemande = () => {
    fetch("http://localhost:5000/api/addDemande", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ description, prix, productID }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Demande envoyée");
          HandleClose();
        }
      });
  };
  return (
    <div
      id={"dem_modal_" + chaineID + "_" + productID}
      className={`absolute w-full h-full inset-0 justify-center items-center hidden z-10`}
    >
      <div
        onClick={() => {
          HandleClose();
        }}
        className=" absolute backdrop-blur-md w-full h-full inset-0 justify-center items-center"
      ></div>
      <div className=" inset-0">
        <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px]">
          <button
            onClick={() => {
              HandleClose();
            }}
            className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
          >
            X
          </button>
          <h2 className="text-lg font-bold text-center">
            Informations sur le placement
          </h2>
          <div className=" flex flex-col">
            <label htmlFor="description" className="mr-2 font-bold">
              Description du placement de produit
            </label>
            <textarea
              className=" min-h-8"
              type="text"
              name="description"
              id="description"
              rows={4}
              placeholder="Pour une vidéo de 20 minutes avec un placmenet de 30 secondes et un rappel du produit 2 fois dans la vidéo"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div>
            <label htmlFor="name" className="mr-2 font-bold">
              {"PDF du placement de produit"}
            </label>
            <input type="file" name="img" id="img" />
          </div> */}
          <div>
            <label htmlFor="prix" className="mr-2 font-bold">
              Prix pour le placement
            </label>
            <input
              type="number"
              name="prix"
              id="prix"
              placeholder="Prix en €"
              onChange={(e) => setPrix(Number(e.target.value))}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-8"
            onClick={() => sendDemande()}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
