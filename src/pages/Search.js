import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Search component
const Search = ({ submitForm, setLocName }) => {
  // Styling
  const classes = useStyles();
  // State variables
  const [region, setRegion] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  // Variables used to enable/disable inputs/buttons
  let stateDisabled = !region;
  let cityDisabled = !state;
  let btnDisabled = !city;

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

  //
  const handleSubmit = (e) => {
    // Prevent default submit
    e.preventDefault();

    // Create location object
    // TODO - temp location
    setLocName(city);

    // Submit the form to the main app
    submitForm();

    // Clear the form fields
    setRegion('');
    setState('');
    setCity('');
  };

  return (
    <Paper variant='outlined' elevation={3} className='search-container'>
      <form>
        <Grid
          container
          spacing={2}
          justify='center'
          align='center'
          width='auto'
        >
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
                {/* TODO - map through the regions? */}
                <MenuItem value={'US'}>United States of America</MenuItem>
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
                {/* TODO - map through the states */}
                <MenuItem value={'NV'}>Nevada</MenuItem>
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
                {/* TODO - map through the cities */}
                <MenuItem value={'las vegas'}>Las Vegas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Button
              disabled={btnDisabled}
              className={classes.formControl}
              id='search-btn'
              variant='contained'
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Search;
