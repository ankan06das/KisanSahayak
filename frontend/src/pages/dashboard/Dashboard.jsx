import { useEffect, useState } from "react"
import fetchWeatherInfo from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import { getTempAndHum } from "../../utils/getTempAndHum";

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState(null);

    const test = async() => {
        const data = await getTempAndHum();
        console.log(data);
    }

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherInfo();
                if (data) {
                    setWeatherData(data);
                }
                test();
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
            }
        };

        getWeatherData();
    }, []);

    return (
        <div>
            {weatherData ? (
                <div>
                    <RainfallChart />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    )
}

export default Dashboard