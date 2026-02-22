export interface WeatherDetails {
  highTemperature: number;
  lowTemperature: number;
  precipitationChance: number;
  //   humidity: number;
  windSpeed: number;
  shortDescription: string;
  description: string;
  location: {
    city: string;
    state: string;
  };
}

interface WeatherPointsResponse {
  properties: {
    forecast: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
}

interface WeatherForecastResponse {
  properties: {
    periods: {
      number: number;
      name: string;
      startTime: Date;
      endTime: Date;
      temperature: number;
      temperatureUnit: string;
      probabilityOfPrecipitation: {
        value: number;
      };
      //   relativeHumidity: {
      //     value: number;
      //   };
      windSpeed: string;
      windDirection: string;
      shortForecast: string;
      detailedForecast: string;
    }[];
  };
}

export const fetchWeatherDetails = async (
  latitude: number,
  longitude: number,
): Promise<WeatherDetails> => {
  // call points api to get forecast url
  const pointsResponse = await fetch(
    `https://api.weather.gov/points/${latitude},${longitude}`,
  );
  if (!pointsResponse.ok) {
    throw new Error(
      "Failed to retrieve weather details (failed at points API)",
    );
  }
  const pointsData = (await pointsResponse.json()) as WeatherPointsResponse;

  // call forecast api to get today's weather
  const forecastResponse = await fetch(pointsData.properties.forecast);
  if (!forecastResponse.ok) {
    throw new Error(
      "Failed to retrieve weather details (failed at forecast API)",
    );
  }
  const forecastData =
    (await forecastResponse.json()) as WeatherForecastResponse;
  const todayForecast = forecastData.properties.periods[0];
  if (!todayForecast) {
    throw new Error("Failed to retrieve weather details (no forecast data)");
  }
  return {
    highTemperature: todayForecast.temperature,
    lowTemperature: todayForecast.temperature,
    precipitationChance: todayForecast.probabilityOfPrecipitation.value,
    // humidity: todayForecast.relativeHumidity.value,
    windSpeed: parseInt(todayForecast.windSpeed),
    shortDescription: todayForecast.shortForecast,
    description: todayForecast.detailedForecast,
    location: {
      city: pointsData.properties.relativeLocation.properties.city,
      state: pointsData.properties.relativeLocation.properties.state,
    },
  };
};

/*
Notes:
38.1876, -85.5639

entry - https://api.weather.gov/points/38.1876,-85.5639
also give sunrise/sunset info like so:
"astronomicalData": {
            "sunrise": "2026-02-15T07:30:38-05:00",
            "sunset": "2026-02-15T18:22:01-05:00",
            "transit": "2026-02-15T12:56:19-05:00",
            "civilTwilightBegin": "2026-02-15T07:05:03-05:00",
            "civilTwilightEnd": "2026-02-15T18:47:36-05:00",
            "nauticalTwilightBegin": "2026-02-15T06:34:08-05:00",
            "nauticalTwilightEnd": "2026-02-15T19:18:31-05:00",
            "astronomicalTwilightBegin": "2026-02-15T06:03:30-05:00",
            "astronomicalTwilightEnd": "2026-02-15T19:49:09-05:00"
        },

look for properties, forecast --> url https://api.weather.gov/gridpoints/LMK/57,75/forecast
forecastHourly -- weather by the hour for days! https://api.weather.gov/gridpoints/LMK/57,75/forecast/hourly



astronomical info
https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400
{
  "results": {
    "sunrise": "7:04:21 AM",
    "sunset": "5:59:11 PM",
    "solar_noon": "12:31:46 PM",
    "day_length": "10:54:50",
    "civil_twilight_begin": "6:39:15 AM",
    "civil_twilight_end": "6:24:16 PM",
    "nautical_twilight_begin": "6:08:56 AM",
    "nautical_twilight_end": "6:54:35 PM",
    "astronomical_twilight_begin": "5:38:53 AM",
    "astronomical_twilight_end": "7:24:38 PM"
  },
  "status": "OK",
  "tzid": "UTC"
}

https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today
{
  "results": {
    "sunrise": "7:04:21 AM",
    "sunset": "5:59:11 PM",
    "solar_noon": "12:31:46 PM",
    "day_length": "10:54:50",
    "civil_twilight_begin": "6:39:15 AM",
    "civil_twilight_end": "6:24:16 PM",
    "nautical_twilight_begin": "6:08:56 AM",
    "nautical_twilight_end": "6:54:35 PM",
    "astronomical_twilight_begin": "5:38:53 AM",
    "astronomical_twilight_end": "7:24:38 PM"
  },
  "status": "OK",
  "tzid": "UTC"
}

https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2026-02-15
same as above

https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0
{
  "results": {
    "sunrise": "2026-02-15T07:04:21+00:00",
    "sunset": "2026-02-15T17:59:11+00:00",
    "solar_noon": "2026-02-15T12:31:46+00:00",
    "day_length": 39290,
    "civil_twilight_begin": "2026-02-15T06:39:15+00:00",
    "civil_twilight_end": "2026-02-15T18:24:16+00:00",
    "nautical_twilight_begin": "2026-02-15T06:08:56+00:00",
    "nautical_twilight_end": "2026-02-15T18:54:35+00:00",
    "astronomical_twilight_begin": "2026-02-15T05:38:53+00:00",
    "astronomical_twilight_end": "2026-02-15T19:24:38+00:00"
  },
  "status": "OK",
  "tzid": "UTC"
} */
