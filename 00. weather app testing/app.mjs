const getWeatherData = async () => {
  const KEY = "25175e31b7074cfc895204529222906";
  const city = "Karachi";

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
    );

    // handle success
    // const data = response.data;
    console.log("res", response);
  } catch (err) {
    console.log("🚀 ~ file: app.mjs:26 ~ getWeatherData ~ err:", err);
  }
};
getWeatherData();

// const getWeatherData = () => {
//   const response = axios.get(
//     `https://api.weatherapi.com/v1/current.json?key=25175e31b7074cfc895204529222906&q=lahore`
//   );

//   // const data = response.data;

//   // handle success
//   console.log("res", response);

//   // let icon = data.current.condition.icon;
//   // icon.replace("/file// ");
//   // //console.log(icon);
//   // document.querySelector("#weather_icon").src = icon;
// };
