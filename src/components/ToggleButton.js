import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

const ToggleButton = ({ convertToFahrenheit, setConvertToFahrenheit }) => {
  // Toggle the convert variable by switching the current state of that variable
  const toggleConversion = () => {
    setConvertToFahrenheit(!convertToFahrenheit);
  };

  //* Component responsible for toggling the currently displayed temperature
  return (
    <div>
      <Grid component='label' item xs container direction='row' spacing={2}>
        {/* //* Temperature toggle buttons */}
        <Grid item>C</Grid>
        <Grid item>
          <Switch checked={convertToFahrenheit} onChange={toggleConversion} />
        </Grid>
        <Grid item>F</Grid>
      </Grid>
    </div>
  );
};

export default ToggleButton;
