import { useEffect, useState } from "react"
import { fetchWeatherInfo } from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import SoilChart from "../../components/analytics/SoilChart";
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
        <div className="p-4">
            <h1 className="text-gray-800 font-bold text-3xl text-center mb-7">Regional Environmental Conditions Analysis</h1>
            {weatherData ? (
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <RainfallChart data={weatherData} />
                    </div>

                    <div className="w-1/2">
                        <SoilChart data={weatherData} />
                    </div>
                </div>
            ) : (
                <h1 className="text-center">Loading...</h1>
            )}
        </div>
    )
}

export default Dashboard