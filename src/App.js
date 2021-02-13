import { useState, useEffect } from 'react';
import Main from './pages/Main';
import Search from './pages/Search';

function App() {
  // Header and options used for the country-city-state API
  const headers = new Headers();
  headers.append(
    'X-CSCAPI-KEY',
    'Tmk3R2VmamRvWEsxbUpHREFSWHlSRW5pZ050Q2QwMVBPdjRTdGFVRA=='
  );
  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  // State variables
  // const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();

  // State variables used in search component
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [regionList, setRegionList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();

  // Fetch the region list on initial load of the App component
  useEffect(() => {
    const fetchRegion = async () => {
      await fetch(
        'https://api.countrystatecity.in/v1/countries',
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setRegionListData(result))
        .catch((error) => console.log('error', error));
    };

    fetchRegion();
  }, []);
  // Fetch the state list after the region has been set
  useEffect(() => {
    const fetchState = async () => {
      await fetch(
        `https://api.countrystatecity.in/v1/countries/${region}/states`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setStateListData(result))
        .catch((error) => console.log('error', error));
    };

    if (region) {
      fetchState();
    }
  }, [region]);
  // Fetch the city list after the state has been set
  useEffect(() => {
    const fetchCity = async () => {
      await fetch(
        `https://api.countrystatecity.in/v1/countries/${region}/states/${state}/cities`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setCityListData(result))
        .catch((error) => console.log('error', error));
    };

    if (state) {
      fetchCity();
    }
  }, [state]);

  // Functions to set the list items
  const setRegionListData = (regionData) => {
    setRegionList(regionData);
  };
  const setStateListData = (stateData) => {
    setStateList(stateData);
  };
  const setCityListData = (cityData) => {
    setCityList(cityData);
  };
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

  // Dynamic, reusable url for fetching weather, uses a variable saved in the .env.local file
  // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${region}&appid=${process.env.REACT_APP_API_KEY}`;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${region}&appid=${process.env.REACT_APP_API_KEY}`;

  // TODO - build location object, maybe?

  // Handle the form submission
  const submitForm = (e) => {
    e.preventDefault();

    // TODO - fetch location from google API, move fetch to that function
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
      // .then((info) => ({
      //   name: `${info.name}`,
      //   temp: `${info.main.temp}`,
      //   feel: `${info.main.feels_like}`,
      //   min: `${info.main.temp_min}`,
      //   max: `${info.main.temp_max}`,
      //   pressure: `${info.main.pressure}`,
      // }))
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
      {/* Check if the weather state has data, if not show the search component, if it does show the main weather component */}
      {weather ? (
        <Main weather={weather} />
      ) : regionList ? (
        <Search
          region={region}
          state={state}
          city={city}
          submitForm={submitForm}
          handleRegionChange={handleRegionChange}
          handleStateChange={handleStateChange}
          handleCityChange={handleCityChange}
          regionList={regionList}
          stateList={stateList}
          cityList={cityList}
        />
      ) : (
        // TODO - Create a loading component while waiting for regions
        'Loading'
      )}
    </div>
  );
}

export default App;
