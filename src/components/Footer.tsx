import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/parks" className="text-base text-gray-300 hover:text-white">All Parks</Link></li>
              <li><Link href="/trails" className="text-base text-gray-300 hover:text-white">Trails</Link></li>
              <li><Link href="/swimming" className="text-base text-gray-300 hover:text-white">Swimming</Link></li>
              <li><Link href="/dog-rules" className="text-base text-gray-300 hover:text-white">Dog Rules</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About Us</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/#about" className="text-base text-gray-300 hover:text-white">Our Story</Link></li>
              <li><Link href="/faq" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link href="/questions" className="text-base text-gray-300 hover:text-white">Q&A</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="https://github.com/ronaldregan621/dogrunnearme-web" target="_blank" rel="noreferrer" className="text-base text-gray-300 hover:text-white">GitHub</a></li>
              <li><a href="mailto:hello@dogrunnearme.com" className="text-base text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} DogRunNearMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 