import React from "react";
import Nav from "../components/nav";
import SearchBox from "../components/SearchBox";

export default function Search() {
  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Search</h1>
        <SearchBox />
      </div>
    </div>
  );
}
