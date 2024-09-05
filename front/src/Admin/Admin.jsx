import { useState,useEffect } from "react";
import PopupCode from "./PopupCode";

export default function Admin() {
  const [validAdmin, setValidAdmin] = useState(false);
useEffect(() => {
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
  },[])
  return (
    <div>
      {validAdmin ? (
        <div>Vous êtes bien un admin bravo</div>
      ) : (
        <PopupCode validAdmin={setValidAdmin} />
      )}
    </div>
  );
}
