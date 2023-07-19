import Nav from "./components/nav";
import SearchButton from "./components/SearchButton";
import CityList from "./components/CityList";

export default function Home() {
  return (
    <div>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Home</h1>
          <div className="mb-8">
            <SearchButton />
          </div>
        </div>
        <div className="mb-8">
          <hr className="border-gray-300" />
        </div>
        <div className="text-center">
          <CityList />
        </div>
        <div className="text-center mt-8">
          <h5>You can search for information about cities such as:</h5>
          <h3>Constanta, Arad, Dubai, New York, Bakersfield</h3>
          <h5>and more</h5>
        </div>
      </main>
    </div>
  );
}
