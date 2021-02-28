import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Day from '../pages/Day';
import ToggleButton from '../components/ToggleButton';
// import HourlyGraph from '../components/HourlyGraph';
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
  //* Function that will convert the kelvin temperature from the API to either F/C depending on the toggle switch
  const convertTemp = (temp) => {
    return convertToFahrenheit
      ? `${convertTempToFahrenheit(temp)}° F`
      : `${convertTempToCelsius(temp)}° C`;
  };
  //* Function that will convert speed based on whether F/C is selected
  const convertSpeed = (speed) => {
    return convertToFahrenheit
      ? `${(speed * 2.237).toFixed(2)} mph`
      : `${speed} m/s`;
  };
  //* Converts kelvin to celsius
  const convertTempToCelsius = (temp) => {
    return roundNumber(temp - 273.15);
  };
  //* Converts kelvin to fahrenheit
  const convertTempToFahrenheit = (temp) => {
    return roundNumber(((temp - 273.15) * 9) / 5 + 32);
  };
  //* Rounds a number to a fixed length of 2 digits after a decimal
  const roundNumber = (temp) => {
    return temp.toFixed(2);
  };
  //* Take a datetime object and convert it to a localized date string
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
  //* Take a datetime object and convert it to a localized date string with just the day of the week
  const localizeShortDate = (date) => {
    return new Date(date * 1000).toLocaleDateString(localRegion, {
      weekday: 'long',
      timeZone: timezone,
    });
  };
  //* Take a datetime object and convert it to a localized time string
  const localizeTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString(localRegion, {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: timezone,
    });
  };
  //* Take in the icon and return the image from the URL
  const imageURL = (icon, size) => {
    return `http://openweathermap.org/img/wn/${icon}@${size}x.png`;
  };

  //* Return statement
  return (
    <div>
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid container spacing={2}>
          {/* //* Weather icon */}
          <Grid item sm={12} md={2}>
            <img
              alt='weather icon'
              src={imageURL(current.weather[0].icon, 4)}
            />
          </Grid>
          {/* //* City, state, and current date & time */}
          <Grid item sm={12} md={8}>
            <Typography variant='h1'>{`${city}, ${state}`}</Typography>
            <Typography variant='h2'>{localizeDate(current.dt)}</Typography>
          </Grid>
          {/* //* Toggle Button that handles the temperature change */}
          <Grid item sm={12} md={2}>
            <ToggleButton
              convertToFahrenheit={convertToFahrenheit}
              setConvertToFahrenheit={setConvertToFahrenheit}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} justify='space-around' alignItems='center'>
        <Grid item sm={12} md={4} container spacing={2}>
          {/* //* Sunrise time */}
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Sunrise</Typography>
            <Typography variant='subtitle2'>
              {localizeTime(current.sunrise)}
            </Typography>
          </Grid>
          {/* //* Sunset time */}
          <Grid item xs={6}>
            <Typography variant='subtitle1'>Sunset</Typography>
            <Typography variant='subtitle2'>
              {localizeTime(current.sunset)}
            </Typography>
          </Grid>
        </Grid>

        <Grid item sm={12} md={8} container spacing={2} justify='space-around'>
          {/* //* Current temperature */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Current Temp.</Typography>
            <Typography variant='subtitle2'>
              {convertTemp(current.temp)}
            </Typography>
          </Grid>
          {/* //* Feel temp */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Feels Like</Typography>
            <Typography variant='subtitle2'>
              {convertTemp(current.feels_like)}
            </Typography>
          </Grid>
          {/* //* Weather description */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Conditions</Typography>
            <Typography variant='subtitle2'>
              {current.weather[0].description}
            </Typography>
          </Grid>
          {/* //* Winds */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Winds</Typography>
            <Typography variant='subtitle2'>{`${
              current.wind_deg
            }° at ${convertSpeed(current.wind_speed)}`}</Typography>
          </Grid>
          {/* //* Pressure */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Pressure</Typography>
            <Typography variant='subtitle2'>{`${current.pressure} hPa`}</Typography>
          </Grid>
          {/* //* Humidity */}
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Humidity</Typography>
            <Typography variant='subtitle2'>{`${current.humidity}%`}</Typography>
          </Grid>
        </Grid>

        {/* // TODO - add this component in once it is complete */}
        {/* <Grid item sm={12} md={6} container spacing={2}> */}
        {/* //* Hourly chart */}
        {/* <Grid item xs> */}
        {/* <HourlyGraph hourly={hourly} /> */}
        {/* </Grid> */}
        {/* </Grid> */}
      </Grid>

      <Grid container spacing={2} justify='space-evenly'>
        {/* //* Slice the daily weather array to show the coming 5 days, then map through the days to show the day component for the upcoming weather */}
        {daily.slice(1, 6).map((day) => (
          <Day
            key={day.dt}
            day={day}
            city={city}
            state={state}
            timezone={timezone}
            convertToFahrenheit={convertToFahrenheit}
            setConvertToFahrenheit={setConvertToFahrenheit}
            convertTemp={convertTemp}
            convertSpeed={convertSpeed}
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
