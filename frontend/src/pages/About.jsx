export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          About <span className="text-blue-600 dark:text-red-500">ZAFTAN Studios</span>
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            Welcome to ZAFTAN Studios Canva Pro! We provide affordable access to Canva Pro 
            features through team sharing. Our mission is to make premium design tools 
            accessible to everyone.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            For just ₹50 per month, you get full access to Canva Pro including:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 dark:text-red-500 mr-3 text-xl">•</span> Premium templates and assets
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 dark:text-red-500 mr-3 text-xl">•</span> Background remover
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 dark:text-red-500 mr-3 text-xl">•</span> Brand kit and magic resize
            </li>
            <li className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="text-blue-600 dark:text-red-500 mr-3 text-xl">•</span> Team collaboration features
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Join our Discord community for support and updates!
          </p>
        </div>
      </div>
    </div>
  );
}