"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const CityList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getFavorites");
        const data = response.data.slice(0, 5);
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorite Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>
            {city.name}, {city.country},{city.temperature},{city.weather}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
