import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Modal from '@material-ui/core/Modal';
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
  toggleConversion,
  convertTemp,
  convertSpeed,
  localizeDate,
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

  return (
    <Paper className={classes.paper}>
      <ButtonBase focusRipple onClick={handleOpen}>
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
      </ButtonBase>

      {/* TODO - set the size and position of expanded modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Paper>
          {/* TODO - provide aria labels and descriptions */}
          <Typography variant='h2'>{localizeDate(day.dt)}</Typography>
        </Paper>
      </Modal>
    </Paper>
  );
};

export default Day;
