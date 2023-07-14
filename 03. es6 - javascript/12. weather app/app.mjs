const getWeatherData = async () => {
  const BASE_URL = "https://api.weatherapi.com";
  const KEY = `difj3j38r8f8383r8fe8u3r83ur0efu38ru`;
  const city = "lahore";
  const temp = document.querySelector("#temp");
  const img = document.querySelector("#img");

  try {
    const res = await axios.get(
      `${BASE_URL}/v1/current.json?key=${KEY}&q=${city}&aqi=no`
    );

    console.log("res", res);
    console.log("temp", res.data.current.temp_c);
    temp.textContent = res.data.current.temp_c;

    console.log("img src", res.data.current.condition.icon);
    img.src = res.data.current.condition.icon;
  
  } catch (err) {

    console.log("err", err);
    console.log("err", err.response.data.error.message);
    // Showing error in UI
    temp.textContent = err.response.data.error.message;
  }
};

// Old way of .then and .catch
const getWeatherData = () => {
  const res = axios
    .get(`${BASE_URL}/v1/current.json?key=${KEY}&q=${city}&aqi=no`)
    .then((res) => console.log("res", res))
    .catch((err) => console.log("err", err));
};

// calling getWeather Fun
document.querySelector("#form").addEventListener("submit", getWeatherData);
getWeatherData();
