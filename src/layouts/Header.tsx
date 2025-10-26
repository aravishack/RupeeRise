import logo from '../assets/logo.png';
import { APP_NAME, APP_TAGLINE } from '../constants';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go to home"
          >
            <img 
              src={logo} 
              alt={`${APP_NAME} Logo`}
              className="h-12 w-24 object-fill"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-bold text-rupee-green leading-none">
                {APP_NAME}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {APP_TAGLINE}
              </p>
            </div>
          </button>

          {/* Right side - can add actions later */}
          <div className="flex items-center gap-4">
            {/* Placeholder for future actions like Export, Share, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
}
