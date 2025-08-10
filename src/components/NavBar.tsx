import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-bold text-blue-600">
          DogRunNearMe
        </Link>
        <div className="space-x-6 text-sm font-medium text-gray-700 hidden sm:block">
          <Link href="/">Home</Link>
          <Link href="/parks">All Parks</Link>
          <a href="/#about">About</a>
        </div>
      </nav>
    </header>
  );
} 