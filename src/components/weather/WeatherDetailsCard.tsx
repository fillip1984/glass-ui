import { fetchWeatherDetails } from "~/server/api/routers/weather";

export default async function WeatherDetailsCard({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  "use cache";
  const weatherDetails = await fetchWeatherDetails(latitude, longitude);
  const weatherDetailsForNow = weatherDetails.dailyForecast[0];

  return (
    <div className="glass-card overflow-hidden rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Weather Details</h2>
      <h5 className="mb-2 text-lg font-bold">
        {weatherDetails.location.city}, {weatherDetails.location.state}
      </h5>
      {weatherDetailsForNow && (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Temperature</span>
            <span className="font-semibold">
              {weatherDetailsForNow.temperature}°
              {weatherDetailsForNow.temperatureUnit}
            </span>
          </div>
          {/* <div className="flex justify-between">
          <span>Humidity</span>
          <span className="font-semibold">{weatherDetails.humidity}%</span>
        </div> */}
          <div className="flex justify-between">
            <span>Wind Speed</span>
            <span className="font-semibold">
              {weatherDetailsForNow.windSpeed} mph
            </span>
          </div>
          <div className="flex w-90 flex-col gap-1">
            <span>Condition</span>
            <span className="text-xs font-semibold">
              {weatherDetailsForNow.description}
            </span>
          </div>
        </div>
      )}
      <div className="w-100 overflow-hidden">
        <h5 className="mb-2 text-lg font-bold">Forecast</h5>
        <div className="flex gap-2 overflow-x-auto">
          {weatherDetails.dailyForecast.map((period, index) => (
            <div
              key={index}
              className="flex w-60 shrink-0 flex-col rounded bg-zinc-400/40 p-4"
            >
              <h3 className="font-bold">{period.name}</h3>
              <p>
                Temperature: {period.temperature}°{period.temperatureUnit}
              </p>
              <p>Precipitation Chance: {period.precipitationChance}%</p>
              <p>Wind Speed: {period.windSpeed} mph</p>
              <p>{period.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-100 overflow-hidden">
        <h5 className="mb-2 text-lg font-bold">Hourly Forecast</h5>
        <div className="flex gap-2 overflow-x-auto">
          {weatherDetails.hourlyForecast.map((period, index) => (
            <div
              key={index}
              className="flex w-60 shrink-0 flex-col rounded bg-zinc-400/40 p-4"
            >
              <h3 className="font-bold">{period.name}</h3>
              <p>
                Temperature: {period.temperature}°{period.temperatureUnit}
              </p>
              <p>Precipitation Chance: {period.precipitationChance}%</p>
              <p>Wind Speed: {period.windSpeed} mph</p>
              <p>{period.shortDescription}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
