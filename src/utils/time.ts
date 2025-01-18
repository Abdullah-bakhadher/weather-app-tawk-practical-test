// Function to check if the current time in a given timezone is AM or PM
export const checkIfAM = (timezoneOffset: number): boolean => {
  const currentTime = new Date(); // Get the current UTC time
  const utcHours = currentTime.getUTCHours() + timezoneOffset / 3600; // Calculate the local hours by applying the timezone offset
  return utcHours < 12; // Return true if it's before noon (AM), otherwise false (PM)
};

// Function to calculate and format the local time based on a timezone offset
export const convertToLocalTime = (timezoneOffset: number): string => {
  const hours = timezoneOffset / 3600; // Convert offset from seconds to hours

  const utcDate = new Date(); // Get the current UTC date and time
  const utcHours = utcDate.getUTCHours(); // Extract the UTC hours
  const utcMinutes = utcDate.getUTCMinutes(); // Extract the UTC minutes

  // Calculate the local time in hours based on the UTC time and the timezone offset
  let cityCurrentHour = utcHours + hours;

  // Determine AM/PM and convert to 12-hour format
  const period = cityCurrentHour >= 12 ? "PM" : "AM"; // Set AM or PM based on the hour
  cityCurrentHour = cityCurrentHour % 12; // Adjust for 12-hour format
  if (cityCurrentHour === 0) cityCurrentHour = 12; // Handle 12:00 AM/PM correctly

  // Format the minutes with a leading zero if necessary
  const formattedMinutes = utcMinutes < 10 ? `0${utcMinutes}` : utcMinutes;

  // Return the formatted local time as a string in 12-hour format with AM/PM
  const cityCurrentTime = `${cityCurrentHour}:${formattedMinutes} ${period}`;
  return cityCurrentTime;
};

// Function to format the current date as a human-readable string
export const formatDate = (): string => {
  const utcDate = new Date(); // Get the current UTC date and time

  // Format the date in a "weekday, month day, year" format (e.g., "Sunday, January 18, 2025")
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(utcDate);

  return formattedDate;
};

// Function to format a timestamp into a local time string in 12-hour format with AM/PM
export const formatLocalTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert the UNIX timestamp (seconds) to milliseconds
  return date.toLocaleTimeString(undefined, {
    hour: "2-digit", // Display hours with two digits
    minute: "2-digit", // Display minutes with two digits
    hour12: true, // Use 12-hour format with AM/PM
  });
};

// Function to format a timestamp into a time string for a specific international timezone
export const FormatInternationalTime = (
  timestamp: number,
  timezone: string = "Asia/Kuala_Lumpur" // Default timezone
): string => {
  const date = new Date(timestamp * 1000); // Convert the UNIX timestamp (seconds) to milliseconds
  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit", // Display hours with two digits
    minute: "2-digit", // Display minutes with two digits
    hour12: true, // Use 12-hour format with AM/PM
    timeZone: timezone, // Apply the specified timezone
  }).format(date);
};

// Function to format a timestamp into the day of the week
export const formatDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // Convert the UNIX timestamp (seconds) to milliseconds
  return date.toLocaleDateString(undefined, { weekday: "long" }); // Return the day of the week (e.g., "Monday")
};

// Function to convert temperature from Kelvin to Celsius, rounded to one decimal place
export const kelvinToCelsius = (kelvin: number) => {
  return parseFloat((kelvin - 273.15).toFixed(1)); // Convert and round to 1 decimal place
};
