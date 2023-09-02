// import "./WeatherCard.css";
import styles from "./WeatherCard.module.css";


const WeatherCard = ({ data }) => {
  return (
    <div className={styles.weatherCard}>
      {data?.location?.name} {data?.location?.country}
      <br />
      <div className={styles.temp}>{data?.current?.temp_c}°C</div>
      <br />
      <img src={data?.current?.condition?.icon} className="icon" alt="" />
      <div className="weather"> {data?.current?.condition?.text} </div>
      <div className="wind"> Wind: {data?.current?.wind_kph} KPH </div>
      <div className="humidity"> Humidity: {data?.current?.humidity} % </div>
    </div>
  );
};

export default WeatherCard;
