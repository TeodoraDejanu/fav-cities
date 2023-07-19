"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/nav";

const FavoritesPage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getFavorites");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching favorite cities:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-2xl font-bold mb-4">Favorite Cities</h1>
        <ul className="grid gap-2">
          {cities.map((city) => (
            <li key={city._id} className="mx-4">
              {city.name}, {city.country},{city.temperature},{city.weather}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FavoritesPage;
