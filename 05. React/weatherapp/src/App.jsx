import { useState, useRef } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");
  const inputRef = useRef(null);

  const [data, setData] = useState(null);

  const getWeather = async (event) => {
    event.preventDefault();

    // const cityName = document.querySelector("#cityName").value;
    // console.log(`getting weather of ${cityName}...`);
    // console.log(`getting weather of ${cityName}...`);
    console.log(`getting weather of ${inputRef.current.value}...`);

    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=3ccbbf01ea7148599c1154007220608&q=${inputRef.current.value}&aqi=no`
      );
      console.log("response: ", response.data);

      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (event) => {
    setCityName(event.target.value);
    // console.log("changeHandler: ", event.target.value);
  };

  return (
    <div>
      <h1>Weather App</h1>

      <form onSubmit={getWeather}>
        <label htmlFor="cityName">City: </label>
        <input
          type="text"
          id="cityName"
          maxLength={20}
          minLength={2}
          required
          onChange={changeHandler}
          ref={inputRef}
        />
        <br />
        <button type="submit">Get Weather</button>
      </form>

      <br />
      <hr />
      <br />

      <div>
        cityName: {data?.location?.name} {data?.location?.country}
        <br />
        temp: {data?.current?.temp_c}
      </div>
    </div>
  );
}

export default App;
