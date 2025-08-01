import { useContext } from "react";
import "./styles.css";

import { AppContext } from "../../context";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <div className="header">
      
      <div className="title">
        <h2>Chat-IA</h2>
      </div>
   
    </div>
  );
}
