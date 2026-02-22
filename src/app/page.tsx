import { Suspense } from "react";

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
      <Suspense
        fallback={
          <div className="glass rounded-lg p-6">Loading weather details...</div>
        }
      >
        <WeatherDetailsCard
          latitude={testGPSCoordinates.latitude}
          longitude={testGPSCoordinates.longitude}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="glass rounded-lg p-6">
            Loading astronomical details...
          </div>
        }
      >
        <AstronomicalDetailsCard
          latitude={testGPSCoordinates.latitude}
          longitude={testGPSCoordinates.longitude}
        />
      </Suspense>
      <TodayTasks />
    </div>
  );
}
