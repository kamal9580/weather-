# Weather Web App
Hosted link: https://weather-liard-seven.vercel.app/

## Overview

Real-time data processing system to monitor weather conditions and provide summarized insights using rollups and aggregates. The system utilizes data from the OpenWeatherMap API. Built using Next.js, this project focuses on using the API appropriately to display the required information

![image](https://github.com/user-attachments/assets/a16b67cc-996e-45b9-96e8-298c9d582aa1)

## Features

The system will continuously retrieve weather data from the OpenWeatherMap API. The API provides various weather parameters, and for this assignment, we will focus on:

● main: Main weather condition (e.g., Rain, Snow, Clear)

● temp: Current temperature in Centigrade

● feels_like: Perceived temperature in Centigrade

● dt: Time of the data update (Unix timestamp)

The system continuously calls the OpenWeatherMap API at a configurable interval(e.g., every 5 minutes) to retrieve real-time weather data for the metros in India. (Delhi,
Mumbai, Chennai, Bangalore, Kolkata, Hyderabad)

● For each received weather update:

  ○ Temperature values is converted from Kelvin to Celsius

### Provide Daily Summaries
### Provides visualization of the data

## Main Focus

● Functionality and correctness of the real-time data processing system.

● Accuracy of data parsing, temperature conversion, and rollup/aggregate calculations.

● Efficiency of data retrieval and processing within acceptable intervals.

● Clarity and maintainability of the codebase.

## Getting Started

### Prerequisites

- Node.js and npm installed
- OpenWeather API Key

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/kamal9580/weather-.git
   cd weather-app
   ```

2. **Install Backend Dependencies**

   ```bash
   npm install
   ```

3. **Create and initialize .env file**
    Add the following fields in the .env file
   ```bash
   OPENWEATHERMAP_API_KEY={Your API Key}
   ```

4. **Start the Project**

   ```bash
   npm run dev
   ```


Created By: Nilesh kumar kamal
