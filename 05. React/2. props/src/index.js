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

const Post = ({ name, body, imgUrl }) => (
  <div className="facebookPost">
    <h3>{name}</h3>
    <span>3 July 2023</span>
    <p>{body}</p>

    {
      (imgUrl) ? <img width={300} src={imgUrl} alt="this is poster image"></img> : null
    }

    {/* {imgUrl && <img width={300} src={imgUrl} alt="this is poster image"></img>} */}



    <br />
    <button>Like</button>
    <button>Comment</button>
    <button>share</button>
  </div>
)

// const Gate = ({ isOpen }) => (
//   <div>gate is {(isOpen) ? "open" : "closed"}</div>
// )
// ReactDOM.render(<Gate isOpen={true} />, document.getElementById('root'))


ReactDOM.render(<div>
  <Post
    text={"jhsdgfljskdhflksdjhf"}
    name={"John"}
    body={<b>Here's a cool thing about props: you can pass whatever you want into them. You’re not restricted to strings, or trying to guess what it will do with your string (cough Angular1). Remember earlier, and 30 seconds ago, how we put a JS expression inside single braces? Well, you can do the same thing with a prop’s value:</b>} />
  <Post
    imgUrl={"https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1200"}
    text={"jhsdgfljskdhflksdjhf"}
    name={"Malik"}
    body={"Here's a cool thing about props: you can pass whatever you want into them. You’re not restricted to strings, or trying to guess what it will do with your string (cough Angular1). Remember earlier, and 30 seconds ago, how we put a JS expression inside single braces? Well, you can do the same thing with a prop’s value:"} />
  <Post
    imgUrl={"https://static.pakwheels.com/2022/09/Ferrari-Purosangue-revealed-11-scaled.jpg"}
    text={"jhsdgfljskdhflksdjhf"}
    name={"Malik"}
    body={"Here's a cool thing about props: you can pass whatever you want into them. You’re not restricted to strings, or trying to guess what it will do with your string (cough Angular1). Remember earlier, and 30 seconds ago, how we put a JS expression inside single braces? Well, you can do the same thing with a prop’s value:"} />
  <Post
    imgUrl={"https://i.tribune.com.pk/media/images/7UOKRCYY7NJTFHXVVO5XFZLCK41641535289-0/7UOKRCYY7NJTFHXVVO5XFZLCK41641535289-0.jpg"} text={"jhsdgfljskdhflksdjhf"} name={"Malik"} />
</div>, document.querySelector("#root"));




let Card = ({ firstName }) => <div>hello {firstName}</div>



// let obj = { name: "john", roll: "abc" };

// // let name = obj.name
// // let roll = obj.roll

// let { name, roll } = obj

// let arr = ["John", "alice", "fred"];

// // let one = arr[0];
// // let two = arr[1];
// // let last = arr[2];

// let [one, two, last] = arr

