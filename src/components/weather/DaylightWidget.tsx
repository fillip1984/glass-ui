"use client";

import React from "react";
import { api } from "~/trpc/server";

export default function DaylightWidget() {
  const {} = api.weather.getDaylightInfo.useQuery({}); // Placeholder for actual data fetching
  return (
    <div className="glass rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Daylight Widget</h2>
      <svg className="mb-6 w-full" viewBox="0 0 300 150" height="150">
        {/* Curved path for sun trajectory */}
        <path
          d="M 20 130 Q 150 30 280 130"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-gray-300"
        />
        {/* Sun position (approximate current time) */}
        <circle cx="200" cy="55" r="12" className="fill-yellow-400" />
        {/* Filled arc showing daylight remaining */}
        <path
          d="M 200 55 Q 240 40 280 130"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-yellow-400 opacity-60"
        />
      </svg>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Sunrise</span>
          <span className="font-semibold">6:12 AM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunset</span>
          <span className="font-semibold">7:45 PM</span>
        </div>
      </div>
    </div>
  );
}
