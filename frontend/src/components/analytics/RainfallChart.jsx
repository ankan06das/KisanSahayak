import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register components to Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RainfallChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'], // X-axis labels
        datasets: [
            {
                label: 'Rainfall (mm)',
                data: [50, 70, 40, 100, 80], // Y-axis values
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Border color
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
            title: {
                display: true,
                text: 'Rainfall per Month', // Title of the chart
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Y-axis starts from zero
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default RainfallChart;
