import React from "react";

export default function WeatherDetails() {
  return (
    <div className="glass rounded-lg p-6">
      <h2 className="mb-4 text-2xl font-bold">Weather Details</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Temperature</span>
          <span className="font-semibold">72°F</span>
        </div>
        <div className="flex justify-between">
          <span>Humidity</span>
          <span className="font-semibold">65%</span>
        </div>
        <div className="flex justify-between">
          <span>Wind Speed</span>
          <span className="font-semibold">12 mph</span>
        </div>
        <div className="flex justify-between">
          <span>Condition</span>
          <span className="font-semibold">Partly Cloudy</span>
        </div>
      </div>
    </div>
  );
}
