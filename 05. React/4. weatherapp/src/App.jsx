import { useState, useRef, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

import WeatherCard from "./components/WeatherCard";

function App() {
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const [data, setData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("position: ", position);

        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=3ccbbf01ea7148599c1154007220608&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
        );
        console.log("response: ", response.data);

        setCurrentWeather(response.data);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    return ()=>{
      // socket.close();
    }
  },[]);

  const getWeather = async (event) => {
    event.preventDefault();

    // const cityName = document.querySelector("#cityName").value;
    // console.log(`getting weather of ${cityName}...`);
    // console.log(`getting weather of ${cityName}...`);
    console.log(`getting weather of ${inputRef.current.value}...`);

    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=3ccbbf01ea7148599c1154007220608&q=${inputRef.current.value}&aqi=no`
      );
      console.log("response: ", response.data);

      setIsLoading(false);

      // setData([response.data, ...data]);
      setData((prev) => [response.data, ...prev]);

      event.target.reset();

      console.log(data);
    } catch (e) {
      setIsLoading(false);
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

      {isLoading ? <div>Loading...</div> : null}
      {data.length || currentWeather ? null : <div>No Data</div>}

      {(data.length) ? (
        
        data.map((eachWeatherData, index) => <WeatherCard key={index} data={eachWeatherData} />)
      
      ) : null}

      { currentWeather && <WeatherCard data={currentWeather} />}
    </div>
  );
}

export default App;
