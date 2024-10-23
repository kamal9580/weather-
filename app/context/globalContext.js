"use Client";
import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";

import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [forecast, setForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const [threshold, setThreshold] = useState(null);
  const [activeCityCoords, setActiveCityCoords] = useState([
    12.9716, 77.5946
  ]);

  const [airQuality, setAirQuality] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [uvIndex, seUvIndex] = useState({});

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
      
      if(res.data.name === "Pitampura"){
        res.data.name = "Delhi";
      }else if(res.data.name === "Konkan Division"){
        res.data.name = "Mumbai";
      }else if(res.data.name === "Park Town"){
        res.data.name = "Chennai";
      }

      setForecast(res.data);

    } catch (error) {
      console.log("Error fetching forecast data: ", error.message);
    }
  };

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    setInterval(() => {
      fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    }, 5 * 60 * 1000);
  }, [])

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        airQuality,
        fiveDayForecast,
        uvIndex,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
        temperatureUnit,
        setTemperatureUnit,
        threshold,
        setThreshold
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);