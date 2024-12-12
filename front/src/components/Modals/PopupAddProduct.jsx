import React from "react";
export default function PopupAddProduct({
  show,
  setShowAddProduct,
  setShowProducts,
}) {
  const [nom, setNom] = React.useState("");
  const [prix, setPrix] = React.useState(-1);
  const addProductHandler = () => {
    var input = document.querySelector('input[type="file"]');
    if (input.files.length == 0) {
      alert("Veuillez choisir une image");
      return;
    }
    var data = new FormData();
    data.append("img", input.files[0]);
    data.append("nom", nom);
    data.append("prix", prix);
    fetch("http://localhost:5000/api/addProduct", {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowAddProduct(false);
          setShowProducts(false);
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <div
      className={`absolute w-full h-full inset-0 justify-center items-center ${
        show ? "flex" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setShowAddProduct(false);
        }}
        className=" absolute backdrop-blur-md w-full h-full inset-0 justify-center items-center"
      ></div>
      <div className=" inset-0">
        <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px]">
          <button
            onClick={() => {
              setShowAddProduct(false);
            }}
            className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
          >
            X
          </button>
          <h2 className="text-lg font-bold text-center">Produit</h2>
          <div>
            <label htmlFor="name" className="mr-2">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nom du produit"
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="mr-2">
              Image
            </label>
            <input type="file" name="img" id="img" />
          </div>
          <div>
            <label htmlFor="prix" className="mr-2">
              Prix
            </label>
            <input
              type="number"
              name="prix"
              id="prix"
              placeholder="Prix du produit en €"
              onChange={(e) => setPrix(Number(e.target.value))}
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-8"
            onClick={() => addProductHandler()}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
