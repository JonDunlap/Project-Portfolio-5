import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Day from '../pages/Day';
import Switch from '@material-ui/core/Switch';
import { useState } from 'react';

const Main = ({
  //* Props
  weather: { current, daily, hourly, timezone },
  cityState: { city, state },
}) => {
  //* State variables
  // Variable used to toggle whether conversion is applied to fahrenheit
  const [convertToFahrenheit, setConvertToFahrenheit] = useState(true);

  //* Local Variables
  // Region variable for localized region
  const localRegion = 'en-US'; // can be used later to change region to users current region

  //* Functions
  // TODO - link to a toggle button
  // Toggle the convert variable by switching the current state of that variable
  const toggleConversion = () => {
    setConvertToFahrenheit(!convertToFahrenheit);
  };
  // Function that will convert the kelvin temperature from the API to either F/C depending on the toggle switch
  const convertTemp = (temp) => {
    return convertToFahrenheit
      ? `${convertTempToFahrenheit(temp)}° F`
      : `${convertTempToCelsius(temp)}° C`;
  };
  // Function that will convert speed based on whether F/C is selected
  const convertSpeed = (speed) => {
    return convertToFahrenheit
      ? `${(speed * 2.237).toFixed(2)} mph`
      : `${speed} m/s`;
  };
  // Converts kelvin to celsius
  const convertTempToCelsius = (temp) => {
    return roundNumber(temp - 273.15);
  };
  // Converts kelvin to fahrenheit
  const convertTempToFahrenheit = (temp) => {
    return roundNumber(((temp - 273.15) * 9) / 5 + 32);
  };
  // Rounds a number to a fixed length of 2 digits after a decimal
  const roundNumber = (temp) => {
    return temp.toFixed(2);
  };
  // Take a datetime object and convert it to a localized date string
  const localizeDate = (date) => {
    return new Date(date * 1000).toLocaleDateString(localRegion, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timezone,
    });
  };
  const localizeShortDate = (date) => {
    return new Date(date * 1000).toLocaleDateString(localRegion, {
      weekday: 'long',
      timeZone: timezone,
    });
  };
  // Take a datetime object and convert it to a localized time string
  const localizeTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString(localRegion, {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timezone,
    });
  };
  // Take in the icon and return the image from the URL
  const imageURL = (icon, size) => {
    return `http://openweathermap.org/img/wn/${icon}@${size}x.png`;
  };

  //* Return statement
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* Weather icon */}
              <img
                // className={classes.img}
                alt='weather icon'
                src={imageURL(current.weather[0].icon, 4)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* City, state, and current date & time */}
              <Typography variant='h1'>{`${city}, ${state}`}</Typography>
              <Typography variant='h2'>{localizeDate(current.dt)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          {/* //? Move this into a component */}
          <Grid component='label' item xs container direction='row' spacing={2}>
            {/* //* Temperature toggle buttons */}
            <Grid item>C</Grid>
            <Grid item>
              <Switch
                checked={convertToFahrenheit}
                onChange={toggleConversion}
              />
            </Grid>
            <Grid item>F</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* Sunrise time */}
              <Typography variant='subtitle1'>Sunrise</Typography>
              <Typography variant='subtitle2'>
                {localizeTime(current.sunrise)}
              </Typography>
            </Grid>
            <Grid item xs>
              {/* //* Sunset time */}
              <Typography variant='subtitle1'>Sunset</Typography>
              <Typography variant='subtitle2'>
                {localizeTime(current.sunset)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* Current temperature */}
              <Typography variant='subtitle1'>Current Temp.</Typography>
              <Typography variant='subtitle2'>
                {convertTemp(current.temp)}
              </Typography>
            </Grid>
            <Grid item xs>
              {/* //* Feel temp */}
              <Typography variant='subtitle1'>Feels Like</Typography>
              <Typography variant='subtitle2'>
                {convertTemp(current.feels_like)}
              </Typography>
            </Grid>
            <Grid item xs>
              {/* //* Weather description */}
              <Typography variant='subtitle1'>Conditions</Typography>

              <Typography variant='subtitle2'>
                {current.weather[0].description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* Winds */}
              <Typography variant='subtitle1'>Winds</Typography>
              <Typography variant='subtitle2'>{`${
                current.wind_deg
              }° at ${convertSpeed(current.wind_speed)}`}</Typography>
            </Grid>
            <Grid item xs>
              {/* //* Pressure */}
              <Typography variant='subtitle1'>Pressure</Typography>
              <Typography variant='subtitle2'>{`${current.pressure} hPa`}</Typography>
            </Grid>
            <Grid item xs>
              {/* //* Humidity */}
              <Typography variant='subtitle1'>Humidity</Typography>
              <Typography variant='subtitle2'>{`${current.humidity}%`}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              {/* //* Hourly chart */}
              Hourly graph goes here
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* //* Map through the daily weather forecast and create 5 day components for the coming 5 days */}
        {daily.slice(1, 6).map((day) => (
          <Day
            key={day.dt}
            day={day}
            city={city}
            state={state}
            toggleConversion={toggleConversion}
            convertTemp={convertTemp}
            convertSpeed={convertSpeed}
            localizeDate={localizeDate}
            localizeShortDate={localizeShortDate}
            localizeTime={localizeTime}
            imageURL={imageURL}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Main;
