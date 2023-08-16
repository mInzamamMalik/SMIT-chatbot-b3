import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let itemNumber = 23;

function Hi() {
  return (
    <div>
      Hello <strong> Malik! </strong>
      <h1>some heading</h1>
      <ul className="myList" id="23">
        <li>abc item 1</li>
        <li>abc item 2</li>
        <li>abc item 3</li>
        <li>abc item 4</li>
        <li>abc item {5 + 10}</li>
        <li>abc item {++itemNumber}</li>
      </ul>
    </div>
  );
}

ReactDOM.render(<Hi />, document.querySelector("#root"));
