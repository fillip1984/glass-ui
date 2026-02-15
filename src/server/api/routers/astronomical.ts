import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";

/**
 * Returns sunrise and sunset times for a given location and date. Uses https://sunrise-sunset.org/api
 */
export const AstronomicalRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        date: z.iso.date(),
      }),
    )
    .query(async ({ input }) => {
      const { lat, lng, date } = input;
      const response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`,
      );
      if (!response.ok) {
        console.warn(
          "Error occurred while fetching sunrise/sunset info, info is nice to have so not throwing an error",
        );
        return null;
      }
      const data = (await response.json()) as SunriseSunsetResponse;
      const astronomicalData: AstronomicalData = {
        sunrise: new Date(data.results.sunrise),
        sunset: new Date(data.results.sunset),
        firstLight: new Date(data.results.civil_twilight_begin),
        lastLight: new Date(data.results.civil_twilight_end),
        dayLength: {
          hours: Math.floor(Number(data.results.day_length) / 3600),
          minutes: Math.floor((Number(data.results.day_length) % 3600) / 60),
          seconds: Math.floor(Number(data.results.day_length) % 60),
        },
      };
      return astronomicalData;
    }),
});

export type AstronomicalData = {
  sunrise: Date;
  sunset: Date;
  firstLight: Date;
  lastLight: Date;
  dayLength: {
    hours: number;
    minutes: number;
    seconds: number;
  };
};

type SunriseSunsetResponse = {
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
};
