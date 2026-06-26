import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 dark:bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="font-bold text-xl">
                ZAFTAN <span className="text-blue-400 dark:text-red-400">Studios</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Affordable Canva Pro access for everyone.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 dark:hover:text-red-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 dark:hover:text-red-400 transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 dark:hover:text-red-400 transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 dark:hover:bg-red-600 rounded-lg flex items-center justify-center transition"
                title="Discord (Add link later)"
              >
                <span className="text-lg">💬</span>
              </a>
              <a
                href="mailto:zaftanstudios@gmail.com"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 dark:hover:bg-red-600 rounded-lg flex items-center justify-center transition"
              >
                <span className="text-lg">✉️</span>
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              Discord link coming soon
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ZAFTAN Studios. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Made with ❤️ by ZAFTAN Studios
          </p>
        </div>
      </div>
    </footer>
  );
}