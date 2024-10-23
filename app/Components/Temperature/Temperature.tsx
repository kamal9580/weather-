
"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

function Temperature() {
  const { forecast, temperatureUnit, threshold, setThreshold } = useGlobalContext();

  const { main, timezone, name, weather } = forecast;

  if (!forecast || !weather) {
    return <Skeleton className="h-[25rem] w-full" />;
  }

  const temp = temperatureUnit === '°C' ? kelvinToCelsius(main?.temp) : Math.floor(main?.temp);
  const minTemp = temperatureUnit === '°C' ? kelvinToCelsius(main?.temp_min) : Math.floor(main?.temp_min);
  const maxTemp = temperatureUnit === '°C' ? kelvinToCelsius(main?.temp_max) : Math.floor(main?.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // upadte time every second
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format: 24 hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);

    // clear interval
    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (threshold && main.temp > threshold) {
      alert(`Temperature over ${threshold}K reached`);
      setThreshold();
    }
  }, [main, threshold])

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-blue-600 shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="pt-2 font-bold flex gap-1">
        <span>{name}</span>
        <span>{navigation}</span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}{temperatureUnit}</p>

      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-2 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2">
          <span>Low: {minTemp}{temperatureUnit}</span>
          <span>High: {maxTemp}{temperatureUnit}</span>
          <span>Average: {(maxTemp + minTemp) / 2}{temperatureUnit}</span>
        </p>
      </div>
    </div>
  );
}

export default Temperature;
