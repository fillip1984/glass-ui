import { Suspense } from "react";
import { updateTag } from "next/cache";

import TodayTasks from "~/components/task/TodayTasks";
import WallpaperDetailsCard from "~/components/WallpaperDetailsCard";
import AstronomicalDetailsCard, {
  AstronomicalDetailsSkeletonCard,
} from "~/components/weather/AstronomicalDetailsCard";
import WeatherDetailsCard from "~/components/weather/WeatherDetailsCard";
import { getWallpaper } from "~/server/api/routers/wallpaper";

export default function Home() {
  const testGPSCoordinates = {
    latitude: 38.2542,
    longitude: -85.7507,
  };

  const refreshWallpaper = async () => {
    "use server";
    await getWallpaper({
      query: "nature,snow,light",
      orientation: "landscape",
    });
    updateTag("wallpaper");
    console.log("Refresh wallpaper triggered");
  };

  return (
    <div className="grid grow gap-2 overflow-y-auto p-2 pr-3 lg:grid-cols-4">
      <div className="grid lg:col-span-4">
        <WallpaperDetailsCard refreshWallpaper={refreshWallpaper} />
      </div>
      <div className="grid lg:col-span-3">
        <Suspense
          fallback={
            <div className="glass-card rounded-lg p-6">
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

      <div className="grid lg:col-span-4">
        <TodayTasks />
      </div>
    </div>
  );
}
