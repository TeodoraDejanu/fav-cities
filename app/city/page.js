"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Nav from "../components/nav";

const CityDetails = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Nav />
      <div className="flex flex-col items-center justify-between p-24">
        <h1>City Details: {cityDetails.name}</h1>
        <p>Country: {cityDetails.sys.country}</p>
        <p>Temperature: {cityDetails.main.temp} °F</p>
        <p>Weather: {cityDetails.weather[0].description}</p>
      </div>
    </div>
  );
};

export default CityDetails;
