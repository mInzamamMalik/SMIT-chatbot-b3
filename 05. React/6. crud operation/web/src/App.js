import { useState, useRef, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";


function App() {
  const titleInputRef = useRef(null);
  const bodyInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [alert, setAlert] = useState("");

  const [data, setData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if(alert){
      setTimeout(() => {
        setAlert("");
        console.log("time out");
      }, 4000)
      console.log("effect");
    }
  }, [alert]);


  const postStory = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(`/api/v1/story`);
      console.log("response: ", response.data);

      setIsLoading(false);

      setAlert(response?.data?.message);

      event.target.reset();

      console.log(data);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Social Stories</h1>

      <form onSubmit={postStory}>
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          id="titleInput"
          maxLength={20}
          minLength={2}
          required
          ref={titleInputRef}
        />
        <br />
        <label htmlFor="bodyInput">what is in your mind: </label>
        <textarea
          type="text"
          id="bodyInput"
          maxLength={999}
          minLength={10}
          required
          ref={bodyInputRef}
        ></textarea>

        <br />
        <button type="submit">Post</button>
      </form>

      {alert && <div className="alert">{alert}</div>}

      <br />
      <hr />
      <br />
      


    </div>
  );
}

export default App;
