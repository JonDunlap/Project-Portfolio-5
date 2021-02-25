import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const ToggleButton = ({ convertToFahrenheit, setConvertToFahrenheit }) => {
  // Toggle the convert variable by switching the current state of that variable
  const toggleConversion = () => {
    setConvertToFahrenheit(!convertToFahrenheit);
  };

  //* Component responsible for toggling the currently displayed temperature
  return (
    <Grid component='label' item xs container direction='row' spacing={2}>
      {/* //* Temperature toggle buttons */}
      <Grid item>C</Grid>
      <Grid item>
        <Switch
          color='primary'
          checked={convertToFahrenheit}
          onChange={toggleConversion}
        />
      </Grid>
      <Grid item>F</Grid>
    </Grid>
  );
};

export default ToggleButton;
