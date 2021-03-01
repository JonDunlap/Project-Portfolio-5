import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

//* Header and options used for the country-city-state API
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

//* Styles used for customizing the material-ui components
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(5),
  },
}));

//* Search component with props
const Search = ({ location, setLocation, setCityState, setWeather }) => {
  //* Styling for material elements
  const classes = useStyles();

  //* State variables used in search component
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [regionList, setRegionList] = useState();
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();

  //* Variables used to enable/disable inputs/buttons
  let stateDisabled = !stateList,
    cityDisabled = !cityList,
    btnDisabled = !city;

  //* Function used to sort the country, state, city lists before being saved to the state
  const sortList = (list) => {
    return list.sort((a, b) => {
      // Change the names to uppercase so they can be compared
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      // Return statement that compares if a < b / a > b / returns 0 if they are the same this ensures they are sorted properly
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
  };

  // useEffect functions
  //* Fetch the region list on initial load of the App component
  useEffect(() => {
    const fetchRegion = async () => {
      await fetch(
        'https://api.countrystatecity.in/v1/countries',
        requestOptions
      )
        .then((response) => response.json())
        //* Send the list to be sorted before saving it to the state
        .then((list) => sortList(list))
        .then((result) => setRegionList(result))
        .catch((error) => console.log('error', error));
    };

    fetchRegion();
  }, []);
  //* Fetch the state list after the region has been set
  useEffect(() => {
    const fetchState = async () => {
      await fetch(
        `https://api.countrystatecity.in/v1/countries/${region}/states`,
        requestOptions
      )
        .then((response) => response.json())
        //* Send the list to be sorted before saving it to the state
        .then((list) => sortList(list))
        .then((result) => setStateList(result))
        .catch((error) => console.log('error', error));
    };

    if (region) {
      fetchState();
    }
  }, [region]);
  //* Fetch the city list after the state has been set
  useEffect(() => {
    const fetchCity = async () => {
      await fetch(
        `https://api.countrystatecity.in/v1/countries/${region}/states/${state}/cities`,
        requestOptions
      )
        .then((response) => response.json())
        //* Send the list to be sorted before saving it to the state
        .then((list) => sortList(list))
        .then((result) => setCityList(result))
        .catch((error) => console.log('error', error));
    };

    if (state) {
      fetchCity();
    }
  }, [state, region]);
  //* Fetch the weather data after the lat lng has been retrieved from the Google API
  useEffect(() => {
    // Async function to get weather data for the users input location
    const fetchWeather = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((response) => response.json())
        // Call the function to set the weather state
        .then((weatherData) => setWeather({ ...weatherData }))
        // Handle any errors
        .catch((error) => console.log(`Error: ${error}`));
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  //* onChange functions to set state
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  //* Handle the form submission
  const submitForm = (e) => {
    e.preventDefault();

    setCityState({ city, state });
    // fetch lat lng location from google API
    getLatLng();

    // Clear the search form fields by clearing the state variables
    setRegion('');
    setState('');
    setCity('');
  };

  //* Get latitude & longitude from address using google maps geocode API
  const getLatLng = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state},+${region}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => data.results[0].geometry.location)
      .then((latLng) => setLocation({ ...latLng }))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {/* //* Check if the region list is loaded, if not show loading, if it is show the form */}
      {!regionList ? (
        // TODO - Create a loading component while waiting for regions
        'Loading'
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <form onSubmit={submitForm}>
            <Grid
              container
              spacing={2}
              justify='center'
              align='center'
              width='auto'
            >
              <Grid item sm={12}>
                <Typography variant='h3' component='h2'>
                  Weather Search
                </Typography>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='region-label'>Region</InputLabel>
                  <Select
                    labelId='region-label'
                    id='region'
                    value={region}
                    onChange={handleRegionChange}
                    autoWidth
                    className={classes.selectEmpty}
                  >
                    {/* //* Map through the regions & show them as select inputs */}
                    {regionList.map((region) => (
                      <MenuItem key={region.id} value={region.iso2}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='state-label'>State</InputLabel>
                  <Select
                    disabled={stateDisabled}
                    labelId='state-label'
                    id='state'
                    value={state}
                    onChange={handleStateChange}
                    autoWidth
                    className={classes.selectEmpty}
                  >
                    {/* //* Map through the states */}
                    {stateList
                      ? stateList.map((state) => (
                          <MenuItem key={state.id} value={state.iso2}>
                            {state.name}
                          </MenuItem>
                        ))
                      : ''}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel id='city-label'>City</InputLabel>
                  <Select
                    disabled={cityDisabled}
                    labelId='city-label'
                    id='city'
                    value={city}
                    onChange={handleCityChange}
                    autoWidth
                    className={classes.selectEmpty}
                  >
                    {/* //* Map through the cities */}
                    {cityList
                      ? cityList.map((city) => (
                          <MenuItem key={city.id} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))
                      : ''}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6} lg={3}>
                <Button
                  disabled={btnDisabled}
                  className={classes.formControl}
                  id='search-btn'
                  variant='contained'
                  type='submit'
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default Search;
