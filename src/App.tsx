import './App.css'
import { Header, MainLayout, CategoryPanel, ResultsPanel, Footer } from './layouts'
import { SEO } from './components/SEO'

function App() {
  return (
    <div className="rupee-rise min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEO />
      
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Wealth, <span className="text-rupee-green">Plan Your Future</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Privacy-first net worth tracker for India. Track assets with SIP, manage loans with EMI, 
            and see 30-year projections—all with AI-powered insights.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="border-t border-gray-300"></div>
      </div>
      
      {/* Main Dashboard Layout: 8-column sidebar + 4-column results */}
      <MainLayout 
        sidebar={<CategoryPanel />}
        results={<ResultsPanel />}
      />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
