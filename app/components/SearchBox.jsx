"use client";
import { useState } from "react";
import Link from "next/link";

const predefinedCities = ["Sibiu", "București", "Brașov", "Timișoara", "Cluj"];

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredCities = predefinedCities.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredCities);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city"
        value={searchTerm}
        onChange={handleSearch}
        style={{ color: "black" }}
      />
      <ul>
        {searchResults.map((city, index) => (
          <li key={index}>
            <Link href={{ pathname: "/city", query: { city } }}>{city}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
