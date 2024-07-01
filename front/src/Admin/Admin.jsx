import { useState } from "react";
import PopupCode from "./PopupCode";

export default function Admin() {
  const [validAdmin, setValidAdmin] = useState(false);

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
