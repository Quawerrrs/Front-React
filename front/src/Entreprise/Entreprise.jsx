import { useState, useEffect } from "react";

export default function Entreprise() {
  const [validEntreprise, setValidEntreprise] = useState(false);
  const [start, setStart] = useState(0);
  const [length, setLength] = useState(5);
  const [chaines, setChaines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/session/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((token) => {
        if (token.siren !== undefined) {
          setValidEntreprise(true);
        } else {
          setValidEntreprise(false);
        }
      });

    getMoreChannels();
  }, []);

  const getMoreChannels = () => {
    console.log("BITE");

    fetch("http://localhost:5000/api/getchannels", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ start: start, length: length }),
    })
      .then((response) => response.json())
      .then((channels) => {
        setChaines((prevChaines) => [...prevChaines, ...channels]);
        setStart(start + length);
        console.log(channels);
      });
  };

  if (validEntreprise && chaines) {
    return (
      <div>
        {chaines.map((channel, index) => (
          <div key={index}>
            <p>
              {channel.cha_name} a {channel.cha_subs} abonnés et porte sur le thème :{" "}
              {channel.cha_theme_1}
            </p>
          </div>
        ))}
        <button onClick={getMoreChannels}>Load More</button>
      </div>
    );
  } else {
    return null;
  }
}