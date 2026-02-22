"server only";

import { format } from "date-fns/format";

import { fetchAstronomicalDetails } from "~/server/api/routers/astronomical";
import { Skeleton } from "../ui/skeleton";

export default async function AstronomicalDetailsCard({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const astronomicalDetails = await fetchAstronomicalDetails(
    latitude,
    longitude,
  );

  return (
    <div className="glass relative rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Astronomical Details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Sunrise</span>
          <span className="font-semibold">
            {format(astronomicalDetails.sunrise, "h:mm a")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Sunset</span>
          <span className="font-semibold">
            {format(astronomicalDetails.sunset, "h:mm a")}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Day length</span>
          <div className="flex flex-col items-end text-sm font-light">
            <span>{astronomicalDetails.dayLength.hours} hrs</span>
            <span>{astronomicalDetails.dayLength.minutes} mins</span>
            <span>{astronomicalDetails.dayLength.seconds} secs</span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 bottom-3 text-xs">
        <a
          href="https://sunrise-sunset.org/"
          target="_blank"
          className="rounded bg-linear-to-r from-yellow-400 via-yellow-600 to-slate-400 px-2 py-1 text-xs sm:text-sm"
        >
          sunrise-sunset.org
        </a>
      </div>
    </div>
  );
}

export function AstronomicalDetailsSkeletonCard() {
  return (
    <div className="glass relative rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Astronomical Details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Sunrise</span>
          <span className="font-semibold">
            <Skeleton className="h-4 w-16 bg-zinc-700" />
          </span>
        </div>
        <div className="flex justify-between">
          <span>Sunset</span>
          <span className="font-semibold">
            <Skeleton className="h-4 w-16 bg-zinc-700" />
          </span>
        </div>
        <div className="flex justify-between">
          <span>Day length</span>
          <div className="flex flex-col items-end gap-1 text-sm font-light">
            <Skeleton className="h-4 w-16 bg-zinc-700" />
            <Skeleton className="h-4 w-16 bg-zinc-700" />
            <Skeleton className="h-4 w-16 bg-zinc-700" />
          </div>
        </div>
      </div>
      <div className="absolute right-2 bottom-3 text-xs">
        <a
          href="https://sunrise-sunset.org/"
          target="_blank"
          className="rounded bg-linear-to-r from-yellow-400 via-yellow-600 to-slate-400 px-2 py-1 text-xs sm:text-sm"
        >
          sunrise-sunset.org
        </a>
      </div>
    </div>
  );
}
