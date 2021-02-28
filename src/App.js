import { useState } from 'react';
import Main from './components/Main';
import Search from './components/Search';

function App() {
  //* State variables used in the App component
  const [location, setLocation] = useState();
  const [cityState, setCityState] = useState();
  const [weather, setWeather] = useState();

  return (
    <div className='container'>
      {/* //* Check if the weather state has data, if it does show the main weather component, if not show the search component */}
      {weather ? (
        <Main weather={weather} cityState={cityState} />
      ) : (
        <Search
          location={location}
          setLocation={setLocation}
          setCityState={setCityState}
          setWeather={setWeather}
        />
      )}
    </div>
  );
}

export default App;
