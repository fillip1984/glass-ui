import TodayTasks from "~/components/task/TodayTasks";
import AstronomicalDetailsCard from "~/components/weather/AstronomicalDetailsCard";
import WeatherDetailsCard from "~/components/weather/WeatherDetailsCard";

export default function Home() {
  const testGPSCoordinates = {
    latitude: 38.2542,
    longitude: -85.7507,
  };
  return (
    <div className="flex gap-2 p-2">
      <WeatherDetailsCard
        latitude={testGPSCoordinates.latitude}
        longitude={testGPSCoordinates.longitude}
      />
      <AstronomicalDetailsCard
        latitude={testGPSCoordinates.latitude}
        longitude={testGPSCoordinates.longitude}
        date={new Date()}
      />
      <TodayTasks />
    </div>
  );
}
