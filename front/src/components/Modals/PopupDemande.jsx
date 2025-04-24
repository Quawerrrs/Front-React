import React from "react";
import PopupSendDemande from "./PopupSendDemande";

export default function PopupDemande({ chaine = null }) {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch("http://10.0.0.183:5000/api/getProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.products);
        } else {
          alert(result.message);
        }
      });
  }, [chaine]);

  const handleClose = (e) => {
    document.getElementById("cha_demande_" + chaine.cha_id).style.display =
      "none";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const proposerPlacement = (id) => {
    document.getElementById(
      "dem_modal_" + chaine.cha_id + "_" + id
    ).style.display = "flex";
    // setProductID(id);
  };
  return (
    <>
      <div
        id={"cha_demande_" + chaine.cha_id}
        className={`absolute w-full h-[--webkit-fill-available] inset-0 justify-center items-center hidden `}
      >
        <div
          onClick={handleClose}
          className=" absolute backdrop-blur-md w-full h-[--webkit-fill-available] inset-0 justify-center items-center"
        ></div>
        <div className=" inset-0">
          <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px] max-h-[90vh] max-w-[75vw]">
            <button
              onClick={handleClose}
              className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
            >
              X
            </button>
            <h1 className="text-2xl font-bold text-center">
              Proposition de placement pour la chaine intitulée :{" "}
              {chaine.cha_name}
            </h1>
            <h2 className="text-lg font-bold text-center">Produits : </h2>
            <div className="flex flex-wrap justify-center gap-4 overflow-auto p-6 items-center">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <div className="flex flex-wrap justify-center gap-4 overflow-auto p-6 items-center">
                    <div className=" relative max-w-64">
                      <div className=" relative max-w-64">
                        <img src={product.pro_img} alt="" />
                      </div>
                      <div className="flex justify-evenly">
                        <p>{product.pro_nom}</p>
                        <p>{product.pro_prix} €</p>
                      </div>
                    </div>
                    <div className="flex justify-evenly w-full">
                      <button
                        className="bg-green-500 border border-red-200 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md"
                        onClick={() => proposerPlacement(product.pro_id)}
                      >
                        Proposer le placement
                      </button>
                    </div>
                    <PopupSendDemande
                      productID={product.pro_id}
                      chaineID={chaine.cha_id}
                    />
                  </div>
                ))
              ) : (
                <div className="col-start-1 col-end-5">
                  <p className="text-center">
                    Vous n'avez aucun produit renseigné
                  </p>
                </div>
              )}
            </div>
            <button
              className="bg-green-500 border border-red-200 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md"
              onClick={() => proposerPlacement(0)}
            >
              Proposer un placement global
            </button>
          </div>
          <PopupSendDemande productID={0} chaineID={chaine.cha_id} />
        </div>
      </div>
    </>
  );
}
