import React from "react";

export default function PopupModifChannel({ chaine = null, setReload }) {
  const [formData, setFormData] = React.useState({
    cha_name: chaine != null ? chaine.cha_name : "",
    cha_url: chaine != null ? chaine.cha_url : "",
    cha_theme_1: chaine != null ? chaine.cha_theme_1 : "",
    cha_theme_2: chaine != null ? chaine.cha_theme_2 : "",
    cha_theme_3: chaine != null ? chaine.cha_theme_3 : "",
    cha_subs: chaine != null ? chaine.cha_subs : "",
    cha_id: chaine != null ? chaine.cha_id : 0,
    cha_email: chaine != null ? chaine.cha_email : "",
  });
  const handleClose = (e) => {
    document.getElementById(
      chaine != null ? "cha_modal_" + chaine.cha_id : "cha_modal_" + 0
    ).style.display = "none";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (chaine == null) {
      fetch("http://localhost:5000/api/addChannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Chaine ajoutée");
            setReload(formData);
            document.getElementById("cha_modal_0").style.display = "none";
          }
        });
    } else {
      fetch("http://localhost:5000/api/updateChannel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Chaine modifiée");
            setReload(chaine);
            document.getElementById(
              "cha_modal_" + chaine.cha_id
            ).style.display = "none";
          }
        });
    }
  };

  return (
    <div
      id={chaine != null ? "cha_modal_" + chaine.cha_id : "cha_modal_" + 0}
      className=" absolute w-full h-full inset-0 hidden justify-center items-center"
    >
      <div
        onClick={handleClose}
        className=" absolute backdrop-blur-md w-full h-full inset-0 justify-center items-center"
      ></div>
      <div className=" inset-0 z-10">
        <div className="bg-white p-10 rounded-md relative flex flex-col gap-y-6 shadow-md min-w-[600px]">
          <button
            onClick={handleClose}
            className=" bg-transparent border-none absolute top-0 right-0 font-bold px-2"
          >
            X
          </button>
          <div className="grid  grid-cols-[180px_auto] gap-4">
            <h3 className="text-lg font-bold text-gray-800">
              Nom de la chaine :
            </h3>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_name}
                name="cha_name"
                className="  ml-2 font-semibold border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_name"
                className="  ml-2 font-semibold border-black border-2 rounded-md "
                onChange={handleInputChange}
              />
            )}
            <p className="text-gray-600">Lien de la chaine : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_url}
                name="cha_url"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_url"
                className="  ml-2 border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}
            <p className="text-gray-600">Thème principal : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_theme_1}
                name="cha_theme_1"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_theme_1"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}
            <p className="text-gray-600">Thème secondaire : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_theme_2}
                name="cha_theme_2"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_theme_2"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}
            <p className="text-gray-600">Thème tertiaire : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_theme_3}
                name="cha_theme_3"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_theme_3"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}

            <p className="text-gray-600">Nombre d'abonnés : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_subs}
                name="cha_subs"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_subs"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}
            <p className="text-gray-600">Email de la chaine : </p>
            {chaine != null ? (
              <input
                defaultValue={chaine.cha_email}
                name="cha_email"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            ) : (
              <input
                name="cha_email"
                className="  ml-2    border-black border-2 rounded-md"
                onChange={handleInputChange}
              />
            )}
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}
