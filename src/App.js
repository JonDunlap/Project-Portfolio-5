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

  // State variables used in the App component
  const [location, setLocation] = useState('');
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
        .then((result) => setRegionList(result))
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
        .then((result) => setStateList(result))
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
        .then((result) => setCityList(result))
        .catch((error) => console.log('error', error));
    };

    if (state) {
      fetchCity();
    }
  }, [state]);
  // Fetch the weather data after the lat lng has been retrieved from the Google API
  useEffect(() => {
    // Async function to get weather data for the users input location
    const fetchWeather = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        // TODO - destructure the needed information into an object if needed
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
        .then((weatherData) => setWeather({ ...weatherData }))
        // Handle any errors
        .catch((error) => console.log(`Error: ${error}`));
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

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

  // Handle the form submission
  const submitForm = (e) => {
    e.preventDefault();

    // fetch lat lng location from google API
    getLatLng();

    // Clear the form fields
    clearSearchForm();
  };

  // Get latitude & longitude from address using google maps geocode API
  const getLatLng = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state},+${region}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => data.results[0].geometry.location)
      .then((latLng) => setLocation({ ...latLng }))
      .catch((error) => console.error(error));
  };

  // Clear the search form fields by clearing the state variables
  const clearSearchForm = () => {
    setRegion('');
    setState('');
    setCity('');
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
