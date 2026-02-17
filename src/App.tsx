import { useState } from 'react'
import MiddleEastMap from './components/MiddleEastMap'
import MeccaMap from './components/MeccaMap'

type ViewType = 'middle-east' | 'mecca';

function App() {
  const [startJourney, setStartJourney] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('middle-east');

  return (
    <div className="relative w-full max-w-7xl mx-auto p-8 text-center">
      {!startJourney && 
        <button 
          className="absolute top-100 left-1/2 -translate-x-1/2 px-6 py-3 text-lg font-semibold bg-amber-700 hover:bg-amber-950 text-white rounded-lg border-2 border-amber-900 transition-colors duration-200 z-10" 
          onClick={() => setStartJourney(true)}
        >
          Start the Journey
        </button>}
      <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        {currentView === 'middle-east' ? (
          <MiddleEastMap 
            startJourney={startJourney} 
            onCityClick={(city) => {
              if (city === 'Mecca') {
                setCurrentView('mecca');
              }
            }}
          />
        ) : (
          <MeccaMap onBack={() => setCurrentView('middle-east')} />
        )}
      </div>
    </div>
  )
}

export default App
