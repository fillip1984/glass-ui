import TodayTasks from "~/components/task/TodayTasks";
import AstronomicalDetailsCard from "~/components/weather/AstronomicalDetailsCard";
import WeatherDetailsCard from "~/components/weather/WeatherDetailsCard";

export default function Home() {
  return (
    <div className="flex gap-2 p-2">
      <WeatherDetailsCard latitude={38.1876} longitude={-85.5639} />
      <AstronomicalDetailsCard
        latitude={38.1876}
        longitude={-85.5639}
        date={new Date()}
      />
      <TodayTasks />
    </div>
  );
}
