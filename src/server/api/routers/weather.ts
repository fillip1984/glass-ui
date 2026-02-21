export const fetchWeather = async (
  latitude: number,
  longitude: number,
  date: Date,
): Promise<AstronomicalData> => {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${format(
      date,
      "yyyy-MM-dd",
    )}&formatted=0`,
  );
  if (!response.ok) {
    // console.warn(
    //   "Error occurred while fetching sunrise/sunset info, info is nice to have so not throwing an error",
    // );
    // return null;
    throw new Error("Failed to retrieve astronomical data");
  }
  const data = (await response.json()) as SunriseSunsetResponse;

  return {
    sunrise: new Date(data.results.sunrise),
    sunset: new Date(data.results.sunset),
    firstLight: new Date(data.results.civil_twilight_begin),
    lastLight: new Date(data.results.civil_twilight_end),
    dayLength: {
      hours: Math.floor(Number(data.results.day_length) / 3600),
      minutes: Math.floor((Number(data.results.day_length) % 3600) / 60),
      seconds: Number(data.results.day_length) % 60,
    },
  };
};
