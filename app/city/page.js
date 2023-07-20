"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Nav from "../components/nav";
import { FacebookShareButton, TwitterShareButton } from "react-share";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
/>;

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

  const shareUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDetails.name}&appid=c51c844e38c20c82c5f106976976bdf4`;
  const title = `Check out the weather details for ${cityDetails.name}`;

  const handleWhatsappShare = () => {
    const message = encodeURIComponent(`Check out this link: ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-between p-24">
        <h1>City Details: {cityDetails.name}</h1>
        <p>Country: {cityDetails.sys.country}</p>
        <p>Temperature: {cityDetails.main.temp}</p>
        <p>Weather: {cityDetails.weather[0].description}</p>
        <div className="mt-4">
          <button
            onClick={handleToggleFavorite}
            className="px-3 py-1.5 rounded-md shadow-md font-semibold text-white text-sm bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>

        <div className="mt-4 space-x-4">
          <FacebookShareButton url={shareUrl} quote={title}>
            <button className="px-4 py-2 rounded-md shadow-md font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transform transition-transform hover:rotate-6 hover:scale-110">
              <i className="fab fa-facebook mr-2"></i> Share on Facebook
            </button>
          </FacebookShareButton>
          <button
            onClick={handleWhatsappShare}
            className="px-4 py-2 rounded-md shadow-md font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 transform transition-transform hover:rotate-6 hover:scale-110"
          >
            <i className="fab fa-whatsapp mr-2"></i> Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
