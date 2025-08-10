export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>© 2025 DogRunNearMe</p>
        <div className="space-x-4 mt-2 sm:mt-0">
          <a href="/#about" className="hover:underline">About</a>
          <a href="https://github.com/ronaldregan621/dogrunnearme-web" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href="mailto:hello@dogrunnearme.com" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
} 