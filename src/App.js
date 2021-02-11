// import { BrowserRouter as Router } from 'react-router-dom';
// import Routes from './components/Routes';
import { useState } from 'react';
import Container from '@material-ui/core/Container';
import Main from './pages/Main';
import Search from './pages/Search';

function App() {
  // State variables
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();

  // Dynamic, reusable url for fetching weather, uses a variable saved in the .env.local file
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}`;

  // Update the location state on user input
  const setLocName = (e) => {
    setLocation(e.target.value);
  };

  // Set the weather state after fetching weather
  const setWeatherData = (weatherData) => {
    setWeather({ ...weatherData });
  };

  // Handle the form submission
  const submitForm = (e) => {
    // Prevent default submit
    e.preventDefault();
    // Call fetchWeather function
    fetchWeather();
    // Reset the state of the location to clear the form
    setLocation('');
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
          submitForm={submitForm}
          setLocName={setLocName}
          location={location}
        />
      )}
    </div>
  );
}

export default App;
