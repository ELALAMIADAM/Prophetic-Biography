import { useState } from 'react'
import MiddleEastMap from './components/MiddleEastMap'

function App() {
  const [startJourney, setStartJourney] = useState("#000000");

  return (
    <div className="w-full max-w-7xl mx-auto p-8 text-center">
      <div className="mb-6">
        <button 
          className="px-6 py-3 text-lg font-semibold bg-amber-700 hover:bg-amber-950 text-white rounded-lg border-2 border-amber-900 transition-colors duration-200" 
          onClick={() => setStartJourney("#e6c48a")}
        >
          Start the Journey
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <MiddleEastMap startJourney={startJourney} />
      </div>
    </div>
  )
}

export default App
