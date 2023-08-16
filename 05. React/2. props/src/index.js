import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let itemNumber = 23;

function Hi(props) {
  return (
    <div>
      Hello <strong> {props.name} </strong>
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

function Post(props) {
  return <div className="facebookPost">
    <h3>{props.name}</h3>
    <span>3 July 2023</span>
    <p>Here's a cool thing about props: you can pass whatever you want into them. You’re not restricted to strings, or trying to guess what it will do with your string (cough Angular1). Remember earlier, and 30 seconds ago, how we put a JS expression inside single braces? Well, you can do the same thing with a prop’s value:</p>

    <img width={300} src={props.imgUrl}></img>
    <br />
    <button>Like</button>
    <button>Comment</button>
    <button>share</button>

  </div>
}



ReactDOM.render(<div>
  <Post imgUrl={"https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png"} text={"jhsdgfljskdhflksdjhf"} name={"John"}/>
  <Post imgUrl={"https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200"} text={"jhsdgfljskdhflksdjhf"} name={"Malik"}/>
  <Post imgUrl={"https://static.pakwheels.com/2022/09/Ferrari-Purosangue-revealed-11-scaled.jpg"} text={"jhsdgfljskdhflksdjhf"} name={"Malik"}/>
  <Post imgUrl={"https://i.tribune.com.pk/media/images/7UOKRCYY7NJTFHXVVO5XFZLCK41641535289-0/7UOKRCYY7NJTFHXVVO5XFZLCK41641535289-0.jpg"} text={"jhsdgfljskdhflksdjhf"} name={"Malik"}/>
</div>, document.querySelector("#root"));
