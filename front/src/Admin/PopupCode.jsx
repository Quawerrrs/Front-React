import { useState } from "react";

export default function  PopupCode({validAdmin}){
  const [code, setCode] = useState();
  const handleCodeChange = async (e) => {
    setCode(e.target.value);
  }
  const valider = async () => {
    fetch("http://localhost:5000/api/session/getSession",{
      method: "GET",
      credentials: "include",
    }).then((response) =>response.json()).then((token)=>{
      if (token.code === code && code != undefined){
        alert("Bon code de validation")
        validAdmin(true)
      } else {
        alert("Mauvais code de validation")
      }
    })
  }
    return (
        <div className=" w-screen h-screen flex justify-center items-center">
            <div className="bg-white p-10 rounded-md flex flex-col gap-y-6">
            <input type="text" placeholder="Entrez votre code admin" onChange={(e)=>{handleCodeChange(e)}}></input>
            <button onClick={valider}>Valider</button>
            </div>
        </div>
    );
}