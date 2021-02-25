import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import ToggleButton from '../components/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 250,
    margin: 20,
    padding: theme.spacing(2),
  },
}));

const Day = ({
  day,
  city,
  state,
  timezone,
  convertToFahrenheit,
  setConvertToFahrenheit,
  convertTemp,
  convertSpeed,
  localizeShortDate,
  localizeTime,
  imageURL,
}) => {
  //* State variables
  // State variable to open & close the modal window
  const [open, setOpen] = useState(false);

  //* Local variables
  const classes = useStyles();

  //* Functions
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Take a datetime object and convert it to a localized date string
  const modalDate = (date) => {
    return new Date(date * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
  };

  return (
    <div>
      {/* //* Wrap the day view in a button that will open up the modal */}
      <ButtonBase focusRipple onClick={handleOpen}>
        <Paper className={classes.paper}>
          {/* TODO - move everything into a button to expand the view */}
          <Grid container spacing={2} direction='column'>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* Weather icon */}
                  <img
                    // className={classes.img}
                    alt='weather icon'
                    src={imageURL(day.weather[0].icon, 2)}
                  />
                </Grid>
                <Grid item xs>
                  {/* TODO - Change to day of the week */}
                  <Typography variant='h4'>
                    {localizeShortDate(day.dt)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction='row' spacing={2}>
                <Grid item xs>
                  {/* Highs */}
                  <Typography variant='subtitle1'>High</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.max)}
                  </Typography>
                </Grid>
                <Grid item xs>
                  {/* Lows */}
                  <Typography variant='subtitle1'>Low</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.min)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* Weather description */}
                  <Typography variant='subtitle1'>Conditions</Typography>
                  <Typography variant='subtitle2'>
                    {day.weather[0].description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* Winds */}
                  <Typography variant='subtitle1'>Winds</Typography>
                  <Typography variant='subtitle2'>{`${
                    day.wind_deg
                  }° at ${convertSpeed(day.wind_speed)}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>{' '}
      </ButtonBase>

      {/* //* Expanded modal view of selected day */}
      {/* // TODO - set the size and position of expanded modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Paper>
          {/* // TODO - provide aria labels and descriptions */}
          <Grid container spacing={2}>
            {/* //* Weather icon */}
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <img
                    // className={classes.img}
                    alt='weather icon'
                    src={imageURL(day.weather[0].icon, 4)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* //* Header */}
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* //* City, state, and day date & time */}
                  <Typography variant='h1'>{`${city}, ${state}`}</Typography>
                  <Typography variant='h2'>{modalDate(day.dt)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* //* Toggle Button that handles the temperature change */}
            <Grid item xs={12} sm container>
              <ToggleButton
                convertToFahrenheit={convertToFahrenheit}
                setConvertToFahrenheit={setConvertToFahrenheit}
              />
            </Grid>
            {/* //* Close button */}
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  <IconButton
                    aria-label='close modal'
                    color='primary'
                    onClick={handleClose}
                  >
                    <CancelIcon fontSize='large' />
                  </IconButton>
                </Grid>
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
                    {localizeTime(day.sunrise)}
                  </Typography>
                </Grid>
                <Grid item xs>
                  {/* //* Sunset time */}
                  <Typography variant='subtitle1'>Sunset</Typography>
                  <Typography variant='subtitle2'>
                    {localizeTime(day.sunset)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* //* Highs */}
                  <Typography variant='subtitle1'>High</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.max)}
                  </Typography>
                </Grid>
                <Grid item xs>
                  {/* //* Lows */}
                  <Typography variant='subtitle1'>Low</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.min)}
                  </Typography>
                </Grid>
                <Grid item xs>
                  {/* //* Weather description */}
                  <Typography variant='subtitle1'>Conditions</Typography>
                  <Typography variant='subtitle2'>
                    {day.weather[0].description}
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
                    day.wind_deg
                  }° at ${convertSpeed(day.wind_speed)}`}</Typography>
                </Grid>
                <Grid item xs>
                  {/* //* Pressure */}
                  <Typography variant='subtitle1'>Pressure</Typography>
                  <Typography variant='subtitle2'>{`${day.pressure} hPa`}</Typography>
                </Grid>
                <Grid item xs>
                  {/* //* Humidity */}
                  <Typography variant='subtitle1'>Humidity</Typography>
                  <Typography variant='subtitle2'>{`${day.humidity}%`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item xs>
                  {/* //* Hourly chart */}
                  Hourly graph goes here
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
};

export default Day;
