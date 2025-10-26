import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">RupeeRise</h3>
            <p className="text-sm text-gray-600">
              Privacy-first net worth tracker for India. Track your wealth, plan your future.
            </p>
          </div>
          
          {/* Features Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Assets with SIP tracking</li>
              <li>✓ Liabilities with EMI tracking</li>
              <li>✓ 30-year wealth projections</li>
              <li>✓ AI-powered insights</li>
            </ul>
          </div>
          
          {/* Privacy Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Privacy</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🔒 No data collection</li>
              <li>🔒 No backend servers</li>
              <li>🔒 Everything stays local</li>
              <li>🔒 100% privacy-first</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} RupeeRise. All rights reserved.
            </p>
            
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Made with <Heart size={16} className="text-red-500 fill-current" /> for India
            </p>
            
            <p className="text-xs text-gray-500">
              Not financial advice. Projections are estimates only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
