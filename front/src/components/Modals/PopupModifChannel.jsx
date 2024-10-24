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
    const handleClickDiv = (e) => {
        document.getElementById(chaine != null ? "cha_modal_" + chaine.cha_id : "cha_modal_" + 0).style.display = "none";
    }

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
                body: JSON.stringify(formData),
            }).then((response) =>
                response.json()
            ).then((data) => {
                if (data.success) {
                    alert("Chaine ajoutée");
                    setReload(formData);
                    document.getElementById("cha_modal_0").style.display = "none";
                }
            })
        } else {
            fetch("http://localhost:5000/api/updateChannel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) =>
                response.json()
            ).then((data) => {
                if (data.success) {
                    alert("Chaine modifiée");
                    setReload(chaine);
                    document.getElementById("cha_modal_" + chaine.cha_id).style.display = "none";
                }
            })
        }
    }
    console.log(chaine);
    
    return (
        <div id={ chaine != null ? "cha_modal_" + chaine.cha_id :  "cha_modal_" + 0} className=" absolute w-full h-full inset-0 hidden justify-center items-center">
            <div onClick={handleClickDiv} className=" absolute backdrop-blur-sm w-full h-full inset-0 justify-center items-center">
            </div>
            <div className=" inset-0 z-10">
                <div className="bg-white p-10 rounded-md flex flex-col gap-y-6 ">
                    <h3 className="text-lg font-bold text-gray-800">
                        Nom de la chaine :
                        {chaine != null ?
                            <input defaultValue={chaine.cha_name} name="cha_name" className="  ml-2 " onChange={handleInputChange} />
                            : <input name="cha_name" className="  ml-2 " onChange={handleInputChange} />
                        }
                    </h3>
                    <div className="flex items-center">
                        <p className="text-gray-600">Lien de la chaine : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_url} name="cha_url" className="  ml-2 " onChange={handleInputChange} />
                            : <input name="cha_url" className="  ml-2 " onChange={handleInputChange} />
                        }                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Thème principal : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_theme_1} name="cha_theme_1" className="  ml-2" onChange={handleInputChange} />
                            : <input name="cha_theme_1" className="  ml-2" onChange={handleInputChange} />
                        }
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Thème secondaire : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_theme_2} name="cha_theme_2" className="  ml-2" onChange={handleInputChange} />
                            : <input name="cha_theme_2" className="  ml-2" onChange={handleInputChange} />
                        }
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Thème tertiaire : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_theme_3} name="cha_theme_3" className="  ml-2" onChange={handleInputChange} />
                            : <input name="cha_theme_3" className="  ml-2" onChange={handleInputChange} />
                        }
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Nombre d'abonnés : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_subs} name="cha_subs" className="  ml-2" onChange={handleInputChange} />
                            : <input name="cha_subs" className="  ml-2" onChange={handleInputChange} />
                        }
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-600">Email de la chaine : </p>
                        {chaine != null ?
                            <input defaultValue={chaine.cha_email} name="cha_email" className="  ml-2" onChange={handleInputChange} />
                            : <input name="cha_email" className="  ml-2" onChange={handleInputChange} />
                        }
                    </div>
                    <button onClick={handleSubmit}>Valider</button>
                </div>

            </div>
        </div>
    )
}