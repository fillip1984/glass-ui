"server only";

import { fetchWeatherDetails } from "~/server/api/routers/weather";

export default async function WeatherDetailsCard({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const weatherDetails = await fetchWeatherDetails(latitude, longitude);
  return (
    <div className="glass rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Weather Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Temperature</span>
          <span className="font-semibold">
            {weatherDetails.highTemperature}°F
          </span>
        </div>
        {/* <div className="flex justify-between">
          <span>Humidity</span>
          <span className="font-semibold">{weatherDetails.humidity}%</span>
        </div> */}
        <div className="flex justify-between">
          <span>Wind Speed</span>
          <span className="font-semibold">{weatherDetails.windSpeed} mph</span>
        </div>
        <div className="flex justify-between">
          <span>Condition</span>
          <span className="font-semibold">{weatherDetails.description}</span>
        </div>
      </div>
    </div>
  );
}
