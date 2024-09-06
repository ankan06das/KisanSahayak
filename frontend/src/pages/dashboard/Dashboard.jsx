import { useEffect, useState } from "react"
import fetchWeatherInfo from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeatherInfo();
                if (data) {
                    setWeatherData(data);
                }
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