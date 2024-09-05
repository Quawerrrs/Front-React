import { useState, useEffect } from "react";
export default function Createur() {
  const [validCreateur, setValidCreateur] = useState(false);
  const [createurID, setCreateurID]= useState();
  const [chaines, setChaines] = useState();
  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.pseudo != undefined) {
          setValidCreateur(true);
          setCreateurID(token.id)
        } else {
          setValidCreateur(false);
        }
      });
    fetch("http://localhost:5000/api/getchannelsID", {
      method: "POST",
      credentials: "include",
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({uti_id : createurID})
    })
      .then((response) => response.json())
      .then((chaines) => {
        setChaines(chaines);
      });
  }, []);
  return <div>{validCreateur ? <div>Createurs</div> : <></>}</div>;
}
