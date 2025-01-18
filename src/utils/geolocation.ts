import { useWeatherStore } from "@/store/weather.ts";

export const getCurrentPosition = async (): Promise<{
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
}> => {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  // Get the user's current position
  const position = await new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, (error) => {
      reject(new Error(`Error getting location: ${error.message}`));
    });
  });

  const { latitude, longitude } = position.coords;

  // get city details
  const weatherStore = useWeatherStore();
  const cityDetails = await weatherStore.fetchMyLocation(latitude, longitude);
  if (!cityDetails) {
    throw new Error("City details not found.");
  }

  return {
    latitude,
    longitude,
    ...cityDetails,
  };
};
