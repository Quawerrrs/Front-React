import React from "react";
export default function PopupAddProduct({ setShowProducts, product }) {
  const [nom, setNom] = React.useState(product.pro_nom ? product.pro_nom : "");
  const [prix, setPrix] = React.useState(
    product.pro_prix ? product.pro_prix : -1
  );
  const addProductHandler = () => {
    var input = document.querySelector('input[type="file"]');
    var data = new FormData();
    data.append("img", input.files[0]);
    data.append("nom", nom);
    data.append("prix", prix);
    if (product.pro_id > 0) {
      data.append("id", product.pro_id);
      fetch("http://10.0.0.183:5000/api/updateProduct", {
        method: "PUT",
        credentials: "include",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            HandleClose();
          } else {
            alert(data.message);
          }
        });
    } else {
      if (input.files.length == 0) {
        alert("Veuillez choisir une image");
        return;
      }
      fetch("http://10.0.0.183:5000/api/addProduct", {
        method: "POST",
        credentials: "include",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            HandleClose();
          } else {
            alert(data.message);
          }
        });
    }
  };
  const HandleClose = () => {
    document.getElementById("pro_modal_" + product.pro_id).style.display =
      "none";
  };

  return (
    <div
      id={"pro_modal_" + product.pro_id}
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
          <h2 className="text-lg font-bold text-center">Produit</h2>
          <div>
            <label htmlFor="name" className="mr-2 font-bold">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nom du produit"
              defaultValue={product.pro_id > 0 ? product.pro_nom : ""}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name" className="mr-2 font-bold">
              {product.pro_id > 0
                ? "Ajoutez une image si vous souhaitez la modifier"
                : "Image du produit"}
            </label>
            <input type="file" name="img" id="img" />
          </div>
          <div>
            <label htmlFor="prix" className="mr-2 font-bold">
              Prix
            </label>
            <input
              type="number"
              name="prix"
              id="prix"
              placeholder="Prix du produit en €"
              defaultValue={product.pro_id > 0 ? product.pro_prix : ""}
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
