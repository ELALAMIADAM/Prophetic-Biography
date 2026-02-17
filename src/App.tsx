import { useState } from 'react'
import MiddleEastMap from './components/MiddleEastMap'

function App() {
  const [startJourney, setStartJourney] = useState(false);

  return (
    <div className="relative w-full max-w-7xl mx-auto p-8 text-center">
      {!startJourney && 
        <button 
          className="absolute top-100 left-1/2 -translate-x-1/2 px-6 py-3 text-lg font-semibold bg-amber-700 hover:bg-amber-950 text-white rounded-lg border-2 border-amber-900 transition-colors duration-200 z-10" 
          onClick={() => setStartJourney(true)}
        >
          bismilah
        </button>}
      <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <MiddleEastMap startJourney={startJourney} />
      </div>
    </div>
  )
}

export default App
