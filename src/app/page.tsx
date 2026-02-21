import TodayTasks from "~/components/task/TodayTasks";
import DaylightWidget from "~/components/weather/DaylightWidget";
import WeatherDetails from "~/components/weather/WeatherDetails";

export default function Home() {
  return (
    <div className="flex gap-2 p-2">
      <WeatherDetails />
      <DaylightWidget
        latitude={38.1876}
        longitude={-85.5639}
        date={new Date()}
      />
      <TodayTasks />
    </div>
  );
}
