import { useState } from "react"
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { getTempAndHum } from "../utils/getTempAndHum";

const useGetAnalysis = () => {
    const [loading, setLoading] = useState(false);

    const analysis = async () => {
        setLoading(true);
        try {
            const weatherData = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();

            const fetchData = {
                rain: weatherData.NORMAL,
                soil_N: weatherData.N,
                soil_K: weatherData.K,
                soil_P: weatherData.P,
                soil_pH: weatherData.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const data = await fetch("http://127.0.0.1:8000/analysis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchData)
            });
            const res = await data.json();
            return res;
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, analysis }
}

export default useGetAnalysis;