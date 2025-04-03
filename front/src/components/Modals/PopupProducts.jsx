import React from "react";
import PopupAddProduct from "./PopupAddProduct";

export default function PopupProducts({ show, setShowProducts, utiId }) {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/api/getProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ uti_id: utiId }),
    })
      .then((response) => response.json())
      .then((result) => setProducts(result.products));
  }, [show]);
  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/deleteProduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(false);
        }
      });
  };
  const modifProductClick = (id) => {
    document.getElementById("pro_modal_" + id).style.display = "flex";
  };
  return (
    <div
      className={`absolute w-full h-full inset-0 justify-center items-center ${
        show ? "flex" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setShowProducts(false);
        }}
        className=" absolute backdrop-blur-md w-full h-full inset-0 justify-center items-center"
      ></div>
      <div className=" inset-0">
        <div className="bg-white p-8 rounded-md relative flex flex-col gap-y-4 shadow-md min-w-[600px] max-w-[75vw] max-h-[90vh]">
          <button
            onClick={() => {
              setShowProducts(false);
            }}
            className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
          >
            X
          </button>
          <h2 className="text-2xl font-bold text-center pb-3">Mes produits</h2>
          <div className="flex flex-wrap justify-center gap-4 overflow-auto p-6 items-center">
            {products && products.length > 0 ? (
              products.map((product) => (
                <>
                  <div className="flex flex-col justify-between items-center p-4 shadow-lg shadow-gray-500/50 rounded-xl">
                    <div className="w-full">
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
                        className="bg-blue-500 border border-blue-200 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md"
                        onClick={() => modifProductClick(product.pro_id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 border border-red-200 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md"
                        onClick={() => deleteProduct(product.pro_id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <PopupAddProduct
                    setShowProducts={setShowProducts}
                    product={product}
                  />
                </>
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
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-8"
            onClick={() => modifProductClick(0)}
          >
            Ajouter
          </button>
        </div>
      </div>
      <PopupAddProduct
        setShowProducts={setShowProducts}
        product={{ product: null, pro_id: 0 }}
      />
    </div>
  );
}
