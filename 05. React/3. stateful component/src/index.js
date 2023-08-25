import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";


const Home = () => {

  const [isLit, setLit] = useState(true);
  const [temp, setTemp] = useState(72);

  const sub = () => {

    // setTemp(temp - 1); // 72

    setTemp((prev) => {
      // my logic here
      return prev - 1;
    })
    setTemp((prev) => {
      // my logic here
      return prev - 1;
    })

    console.log("sub: ", temp);
  }
  const add = () => {
    // setTemp(temp + 1);
    setTemp((prev) => {
      // my logic here
      return prev + 1;
    })
  }

  return <div className={`room ${(isLit) ? "lit" : "dark"}`}>

    <p>

      <button onClick={sub}>-</button>
      {temp}
      <button onClick={add}>+</button>

    </p>


    <br />
    <br />

    <p> Light is {(isLit) ? "On" : "Off"} </p>

    <button onClick={() => { setLit(!isLit) }}>
      Turn {(isLit) ? "off" : "on"}
    </button>




  </div>
}


ReactDOM.render(<Home />, document.querySelector("#root"));
