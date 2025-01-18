import { defineStore } from "pinia";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    cities: [] as Array<{
      id: number;
      name: string;
      country: string;
      lat: number;
      lon: number;
    }>,
    weatherData: [] as any[],
    weatherDetail: null as any,
    weatherForecast: null as any,
    loading: false,
    error: null,
  }),

  //=========================== Actions ==============================

  actions: {
    async fetchWeatherData(
      lat: number,
      lon: number,
      city: string,
      state: string,
      country: string,
      currentLocation: boolean = false
    ) {
      try {
        this.loading = true;
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat,
              lon,
              lang: "en",
              units: "metric",
              exclude: "minutely,alerts",
              appid: API_KEY,
            },
          }
        );
        response.data.mylocation = currentLocation;
        this.weatherData.push(response.data);
        this.loading = false;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        this.loading = false;
      }
    },

    async setWeatherDetail(id: any) {
      try {
        const weatherItem = await this.filterWeatherDataById(id);
        if (!weatherItem) {
          console.error(`No weather item found for id: ${id}`);
          return;
        }
        console.log("weatherItem setWeatherDetail filter:", weatherItem);

        // Extract latitude and longitude
        const { lat, lon } = weatherItem.coord;
        this.weatherDetail = weatherItem;
        this.weatherForecast = await this.fetchCitiesForecast(lat, lon);
        console.log("weatherItem====", this.weatherDetail);
      } catch (error) {
        console.error("Error setting weather detail:", error);
      }
    },

    async fetchCities(query: string) {
      if (query.length < 2) {
        this.cities = [];
        return;
      }

      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

        this.cities = response.data
          // .filter(
          //   (city: any) =>
          //     city.addresstype === "city" || city.addresstype === "aeroway"
          // )
          .map((city: any) => ({
            id: `${city.lat}-${city.lon}`,
            city: city.display_name || city.address?.aeroway || "Unknown",
            country: city.address?.country,
            state: city.address?.state,
            lat: parseFloat(city.lat),
            lon: parseFloat(city.lon),
          }));
      } catch (error) {
        console.error("Error fetching cities Accure:", error);
      }
    },

    async fetchCitiesForecast(lat: number, lon: number) {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat,
              lon,
              appid: API_KEY,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error fetching cities Forecast:", error);
      }
    },

    async fetchMyLocation(lat: number, lon: number) {
      try {
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/reverse",
          {
            params: {
              lat,
              lon,
              format: "json",
            },
          }
        );
        if (response.data && response.data.address) {
          const { city, state, country } = response.data.address;
          return {
            city: city,
            state: state,
            country: country,
            mylocation: true,
          };
        }
      } catch (error) {
        console.error("Error fetching city details:", error);
      }
    },

    async filterWeatherDataById(id: any) {
      try {
        if (!this.weatherData) {
          console.log("No weatherData To be Filtered ");
          return;
        }
        const weatherItem = this.weatherData.find((data) => {
          console.log("inside the filter data item is ", data);
          return data.id === +id;
        });

        if (!weatherItem) {
          console.log(`Weather data with id ${id} not found`);
          return;
        } else {
          console.log("Weather data FOUND with id ", weatherItem);
        }
        return weatherItem;
      } catch (error) {
        console.error("Error can't find weather detail:", error);
      }
    },

    async deleteCity(id: string) {
      // Remove the city from weatherData based on the given id
      this.weatherData = this.weatherData.filter((data) => data.id !== +id);
    },
  },
});
