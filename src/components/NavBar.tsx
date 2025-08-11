import Link from 'next/link';

export default function NavBar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link href="/" className="text-lg font-bold text-blue-600">
            DogRunNearMe
          </Link>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/parks" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">All Parks</Link>
            <Link href="/trails" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Trails</Link>
            <Link href="/dog-rules" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dog Rules</Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">FAQ</Link>
            <Link href="/#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 