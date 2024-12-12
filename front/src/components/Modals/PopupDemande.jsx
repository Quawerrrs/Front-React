import React from "react";

export default function PopupDemande({ chaine = null }) {
  const handleClose = (e) => {
    document.getElementById("cha_demande_" + chaine).style.display = "none";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div
        id={"cha_demande_" + chaine}
        className={`absolute w-full h-[--webkit-fill-available] inset-0 justify-center items-center hidden `}
      >
        <div
          onClick={handleClose}
          className=" absolute backdrop-blur-md w-full h-[--webkit-fill-available] inset-0 justify-center items-center"
        ></div>
        <div className=" inset-0">
          <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px]">
            <button
              onClick={handleClose}
              className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
            >
              X
            </button>
            <h2 className="text-lg font-bold text-center">Produit</h2>
          </div>
        </div>
      </div>
    </>
  );
}
