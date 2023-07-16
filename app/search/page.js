import React from "react";
import CitySearch from "../components/CitySearch";
import Nav from "../components/nav";

export default function Search() {
  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Search</h1>
        <CitySearch />
      </div>
    </div>
  );
}
