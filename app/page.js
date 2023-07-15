import Nav from "./components/nav";

export default function Home() {
  return (
    <div>
      <Nav />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Home</h1>
      </main>
    </div>
  );
}
