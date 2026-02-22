import { format } from "date-fns";
import z from "zod/v4";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const astronomicalRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
        date: z.date(),
      }),
    )
    .query(async ({ input }) => {
      return await fetchAstronomicalDetails(
        input.latitude,
        input.longitude,
        input.date,
      );
    }),
});

export interface AstronomicalDetails {
  sunrise: Date;
  sunset: Date;
  firstLight: Date;
  lastLight: Date;
  dayLength: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface SunriseSunsetResponse {
  results: {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: number | string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
  };
  status: string;
  tzid: string;
}

/**
 * Returns sunrise and sunset times for a given location and date. Uses https://sunrise-sunset.org/api
 */
export const fetchAstronomicalDetails = async (
  latitude: number,
  longitude: number,
  date: Date,
): Promise<AstronomicalDetails> => {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${format(
      date,
      "yyyy-MM-dd",
    )}&formatted=0`,
  );
  if (!response.ok) {
    throw new Error("Failed to retrieve astronomical details");
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
