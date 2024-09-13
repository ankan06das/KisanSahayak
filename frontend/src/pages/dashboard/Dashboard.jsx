import { useEffect, useState } from "react"
import { fetchWeatherInfo } from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import SoilChart from "../../components/analytics/SoilChart";

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [analysisData, setAnanlysisData] = useState(null);

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
        <div className="p-4">
            <h1 className="text-gray-800 font-bold text-3xl text-center mb-7">Regional Environmental Conditions Analysis</h1>
            {weatherData ? (
                <div className="flex space-x-4 flex-col">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <RainfallChart data={weatherData} />
                        </div>

                        <div className="w-1/2">
                            <SoilChart data={weatherData} />
                        </div>
                    </div>

                    {!analysisData && (
                        <div className="flex gap-3 mt-10">
                            <div className="w-1/2">
                                <span className="font-semibold text-lg">Most Suitable Crops you can Grow</span>
                                <ul className="pl-2 pt-2">
                                    <li>A</li>
                                    <li>B</li>
                                    <li>C</li>
                                </ul>
                            </div>

                            <div className="w-1/2">
                                <span className="font-semibold text-lg">Diseases your crops are most prone to</span>
                                <ul className="pl-2 pt-2">
                                    <li>A</li>
                                    <li>B</li>
                                    <li>C</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1 className="text-center">Loading...</h1>
            )}
        </div>
    )
}

export default Dashboard