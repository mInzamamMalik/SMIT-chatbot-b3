import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";


const Home = () => {

  const [isLit, setLit] = useState(true);


  return <div className={`room ${(isLit) ? "lit" : "dark"}`}>

    <p> Light is {(isLit) ? "On" : "Off"} </p>

    <button onClick={() => { setLit(!isLit) }}>
      Turn {(isLit) ? "off" : "on"}
    </button>
  </div>
}


ReactDOM.render(<Home />, document.querySelector("#root"));
