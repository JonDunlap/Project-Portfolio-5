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

//* Styles used for material ui elements
const useStyles = makeStyles((theme) => ({
  paper: {
    width: 250,
    padding: theme.spacing(2),
  },
  modal: {
    margin: 'auto',
    marginTop: '2vh',
    width: '90vw',
    padding: '4rem',
  },
}));

//* Day component props
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
  //* function used to open the modal
  const handleOpen = () => {
    setOpen(true);
  };
  //* Function used to close the modal
  const handleClose = () => {
    setOpen(false);
  };
  //* Take a datetime object and convert it to a localized date string for use in the modal view
  const modalDate = (date) => {
    return new Date(date * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: timezone,
    });
  };

  //* Day component return
  return (
    <Grid item>
      {/* //* Wrap the day view in a button that will open up the modal */}
      <ButtonBase focusRipple onClick={handleOpen}>
        <Paper className={classes.paper}>
          <Grid item container spacing={2} direction='column'>
            {/* //* Weather icon */}
            <Grid item xs>
              <img alt='weather icon' src={imageURL(day.weather[0].icon, 2)} />
            </Grid>
            {/* //* Day of the week */}
            <Grid item xs>
              <Typography variant='h4'>{localizeShortDate(day.dt)}</Typography>
            </Grid>

            <Grid container direction='row' spacing={2}>
              {/* //* Highs */}
              <Grid item xs>
                <Typography variant='subtitle1'>High</Typography>
                <Typography variant='subtitle2'>
                  {convertTemp(day.temp.max)}
                </Typography>
              </Grid>
              {/* //* Lows */}
              <Grid item xs>
                <Typography variant='subtitle1'>Low</Typography>
                <Typography variant='subtitle2'>
                  {convertTemp(day.temp.min)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container direction='column' spacing={2}>
              {/* //* Weather description */}
              <Grid item xs>
                <Typography variant='subtitle1'>Conditions</Typography>
                <Typography variant='subtitle2'>
                  {day.weather[0].description}
                </Typography>
              </Grid>
              {/* //* Winds */}
              <Grid item xs>
                <Typography variant='subtitle1'>Winds</Typography>
                <Typography variant='subtitle2'>{`${
                  day.wind_deg
                }° at ${convertSpeed(day.wind_speed)}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>

      {/* //* Expanded modal view of selected day */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
      >
        <Paper className={classes.modal}>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid
              item
              container
              spacing={2}
              justify='center'
              alignItems='center'
            >
              <Grid item container spacing={2}>
                {/* //* Weather icon */}
                <Grid item sm={12} md={2}>
                  {/* // TODO - pass the image in as a variable to prevent loading on each interaction */}
                  <img
                    alt='weather icon'
                    src={imageURL(day.weather[0].icon, 4)}
                  />
                </Grid>
                {/* //* Header */}
                <Grid item sm={12} md={6}>
                  {/* //* City, state, and day date & time */}
                  <Typography
                    variant='h1'
                    id='modal-title'
                  >{`${city}, ${state}`}</Typography>
                  <Typography variant='h2' id='modal-description'>
                    {modalDate(day.dt)}
                  </Typography>
                </Grid>
                {/* //* Toggle Button that handles the temperature change */}
                <Grid item sm={12} md={2}>
                  <ToggleButton
                    convertToFahrenheit={convertToFahrenheit}
                    setConvertToFahrenheit={setConvertToFahrenheit}
                  />
                </Grid>
                {/* //* Close button */}
                <Grid item sm={12} md={2}>
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

            <Grid
              item
              container
              spacing={2}
              justify='center'
              alignItems='center'
            >
              <Grid item sm={12} container spacing={2}>
                {/* //* Sunrise time */}
                <Grid item xs>
                  <Typography variant='subtitle1'>Sunrise</Typography>
                  <Typography variant='subtitle2'>
                    {localizeTime(day.sunrise)}
                  </Typography>
                </Grid>
                {/* //* Sunset time */}
                <Grid item xs>
                  <Typography variant='subtitle1'>Sunset</Typography>
                  <Typography variant='subtitle2'>
                    {localizeTime(day.sunset)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item sm={12} container spacing={2}>
                {/* //* Highs */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>High</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.max)}
                  </Typography>
                </Grid>
                {/* //* Lows */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Low</Typography>
                  <Typography variant='subtitle2'>
                    {convertTemp(day.temp.min)}
                  </Typography>
                </Grid>
                {/* //* Weather description */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Conditions</Typography>
                  <Typography variant='subtitle2'>
                    {day.weather[0].description}
                  </Typography>
                </Grid>
                {/* //* Winds */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Winds</Typography>
                  <Typography variant='subtitle2'>{`${
                    day.wind_deg
                  }° at ${convertSpeed(day.wind_speed)}`}</Typography>
                </Grid>
                {/* //* Pressure */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Pressure</Typography>
                  <Typography variant='subtitle2'>{`${day.pressure} hPa`}</Typography>
                </Grid>
                {/* //* Humidity */}
                <Grid item xs={4}>
                  <Typography variant='subtitle1'>Humidity</Typography>
                  <Typography variant='subtitle2'>{`${day.humidity}%`}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={2}
              justify='center'
              alignItems='center'
            >
              {/* //* Hourly chart */}
              <Grid item xs>
                Hourly graph goes here
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default Day;
