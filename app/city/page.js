"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CityDetails = () => {
  const router = useRouter();
  //const { city } = useRouter() || { city: { text: "dubai" } };
  //const { city } = useRouter().query;
  const city = "dubai";
  console.log("city", city);

  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch city details using cityname
    const fetchCityDetails = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          setCityDetails(data);
        } else {
          console.error("Failed to fetch city details:", response.status);
          setCityDetails(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCityDetails(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch city details when the component mounts or when the 'city' query parameter changes
    if (city) {
      fetchCityDetails();
    } else {
      setLoading(false);
    }
  }, [city]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cityDetails) {
    return <p>City not found or error fetching data.</p>;
  }

  return (
    <div>
      <h1>City Details: {cityDetails.name}</h1>
      <p>Country: {cityDetails.sys.country}</p>
      <p>Temperature: {cityDetails.main.temp} °C</p>
      <p>Weather: {cityDetails.weather[0].description}</p>
      {/* Add more city details here */}
    </div>
  );
};

export default CityDetails;
