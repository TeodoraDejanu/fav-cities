import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link href="/">Home</Link>
      <Link href="/search" className="ml-2">
        Search
      </Link>
      <Link href="/favourites" className="ml-2">
        Favourites
      </Link>
    </nav>
  );
}
