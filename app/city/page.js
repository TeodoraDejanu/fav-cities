"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Nav from "../components/nav";

const CityDetails = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // State pentru a verifica dacă orașul este în lista de preferate

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        if (response.ok) {
          const data = await response.json();
          setCityDetails(data);
          checkFavoriteStatus(data.name); // Verificăm dacă orașul este în lista de preferate la încărcarea componentei
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

  const checkFavoriteStatus = async (cityName) => {
    try {
      // Verificăm dacă orașul este în lista de preferate a utilizatorului
      const response = await axios.get(
        `http://localhost:3001/checkFavorite/?city=${cityName}`
      );
      setIsFavorite(response.data);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleToggleFavorite = async () => {
    console.log("Button clicked!");
    try {
      const { name, sys, main, weather } = cityDetails;
      const cityData = {
        name,
        country: sys.country,
        temperature: main.temp,
        weather: weather[0].description,
      };
      console.log("City Data:", cityData);
      if (isFavorite) {
        // If the city is already a favorite, remove it from favorites
        await axios.delete(
          `http://localhost:3001/removeFavorite?city=${cityData.name}`
        );

        console.log("cityname" + cityData.name);
      } else {
        // If the city is not a favorite, add it to favorites
        await axios.post("http://localhost:3001/addFavorite", cityData);
        console.log("cityname" + cityData.name);
      }
      setIsFavorite(!isFavorite); // Toggle the favorite state
      alert(`City ${isFavorite ? "removed from" : "added to"} favorites!`);
    } catch (error) {
      console.error("Error adding/removing city from favorites:", error);
      alert("Failed to update favorites.");
    }
  };

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
        <button onClick={handleToggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default CityDetails;
