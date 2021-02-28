import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ToggleButton = ({ convertToFahrenheit, setConvertToFahrenheit }) => {
  //* Toggle the convert variable by switching the current state of that variable
  const toggleConversion = () => {
    setConvertToFahrenheit(!convertToFahrenheit);
  };

  //* Component responsible for toggling the currently displayed temperature
  return (
    <Grid container sm={12} md={12} direction='row'>
      <Grid item>
        {/* //* Temperature toggle buttons */}
        <Typography>C</Typography>{' '}
      </Grid>
      <Grid item>
        <Switch
          color='primary'
          checked={convertToFahrenheit}
          onChange={toggleConversion}
        />{' '}
      </Grid>
      <Grid item>
        <Typography>F</Typography>
      </Grid>
    </Grid>
  );
};

export default ToggleButton;
