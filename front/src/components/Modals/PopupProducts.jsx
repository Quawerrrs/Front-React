import React from "react";
import PopupAddProduct from "./PopupAddProduct";

export default function PopupProducts({ show, setShowProducts, utiId }) {
  const [products, setProducts] = React.useState([]);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
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
        alert(result);
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
          setShowProducts(false);
        }}
        className=" absolute backdrop-blur-md w-full h-full inset-0 justify-center items-center"
      ></div>
      <div className=" inset-0 z-10">
        <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px]">
          <button
            onClick={() => {
              setShowProducts(false);
            }}
            className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
          >
            X
          </button>
          <h2 className="text-lg font-bold text-center">Produits</h2>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <div className="flex flex-col justify-center items-center">
                <img src={product.pro_img} alt="" />
                <p>{product.pro_nom}</p>
                <p>{product.pro_prix} €</p>
                <button
                  className="bg-red-500 border border-red-200 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow-md"
                  onClick={() => deleteProduct(product.pro_id)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mt-8"
            onClick={() => setShowAddProduct(true)}
          >
            Ajouter
          </button>
        </div>
      </div>
      <PopupAddProduct
        show={showAddProduct}
        setShowAddProduct={setShowAddProduct}
      />
    </div>
  );
}
