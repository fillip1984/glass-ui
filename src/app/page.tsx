import TodayTasks from "~/components/task/TodayTasks";
import DaylightWidget from "~/components/weather/DaylightWidget";
import WeatherDetails from "~/components/weather/WeatherDetails";

export default async function Home() {
  return (
    <div className="flex gap-2 p-2">
      <WeatherDetails />
      <DaylightWidget />
      <TodayTasks />
    </div>
  );
}
