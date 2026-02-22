import { Suspense } from "react";

import TodayTasks from "~/components/task/TodayTasks";
import AstronomicalDetailsCard, {
  AstronomicalDetailsSkeletonCard,
} from "~/components/weather/AstronomicalDetailsCard";
import WeatherDetailsCard from "~/components/weather/WeatherDetailsCard";

export default function Home() {
  const testGPSCoordinates = {
    latitude: 38.2542,
    longitude: -85.7507,
  };

  return (
    <div className="grid grow grid-cols-4 grid-rows-2 gap-2 p-2">
      <div className="col-span-3 grid">
        <Suspense
          fallback={
            <div className="glass rounded-lg p-6">
              Loading weather details...
            </div>
          }
        >
          <WeatherDetailsCard
            latitude={testGPSCoordinates.latitude}
            longitude={testGPSCoordinates.longitude}
          />
        </Suspense>
      </div>

      <Suspense fallback={<AstronomicalDetailsSkeletonCard />}>
        <AstronomicalDetailsCard
          latitude={testGPSCoordinates.latitude}
          longitude={testGPSCoordinates.longitude}
        />
      </Suspense>

      <div className="col-span-4">
        <TodayTasks />
      </div>
    </div>
  );
}
