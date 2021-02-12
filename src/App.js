// import { BrowserRouter as Router } from 'react-router-dom';
// import Routes from './components/Routes';
import { useState } from 'react';
import Main from './pages/Main';
import Search from './pages/Search';

function App() {
  // State variables
  // const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();

  // State variables used in search component
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Dynamic, reusable url for fetching weather, uses a variable saved in the .env.local file
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${region}&appid=${process.env.REACT_APP_API_KEY}`;

  // onChange functions to set state
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // TODO - build location object, maybe?

  // Handle the form submission
  const submitForm = (e) => {
    e.preventDefault();

    // TODO - debug
    console.log('URL', URL);
    // Call fetchWeather function
    fetchWeather();

    // Clear the form fields
    clearSearchForm();
  };

  // Clear the search form fields by clearing the state variables
  const clearSearchForm = () => {
    setRegion('');
    setState('');
    setCity('');
  };

  // Async function to get weather data for the users input location
  const fetchWeather = async () => {
    await fetch(URL)
      .then((response) => response.json())
      // Destructure the return data into an object to be used in the application
      .then((info) => ({
        name: `${info.name}`,
        temp: `${info.main.temp}`,
        feel: `${info.main.feels_like}`,
        min: `${info.main.temp_min}`,
        max: `${info.main.temp_max}`,
        pressure: `${info.main.pressure}`,
      }))
      // Call the function to set the weather state
      .then((weatherData) => setWeatherData(weatherData))
      // Handle any errors
      .catch((error) => console.log(`Error: ${error}`));
  };

  // Set the weather state after fetching weather
  const setWeatherData = (weatherData) => {
    setWeather({ ...weatherData });
    // TODO - debug
    console.log('weatherData', weatherData);
  };

  return (
    <div className='container'>
      {/* TODO - use routes later? */}
      {/* <Router>
        <Routes />
      </Router> */}

      {/* Check if the weather state has data, if not show the search component, if it does show the main weather component */}
      {weather ? (
        <Main weather={weather} />
      ) : (
        <Search
          region={region}
          state={state}
          city={city}
          submitForm={submitForm}
          handleRegionChange={handleRegionChange}
          handleStateChange={handleStateChange}
          handleCityChange={handleCityChange}
        />
      )}
    </div>
  );
}

export default App;
