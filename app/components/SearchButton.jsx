import Link from "next/link";

const SearchButton = () => {
  return (
    <Link
      href="/search"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Search for a city
    </Link>
  );
};

export default SearchButton;
