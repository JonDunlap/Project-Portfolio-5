import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// Search component
const Search = ({ submitForm, setLocName, location }) => {
  const classes = useStyles();
  const [region, setRegion] = useState('');

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <Paper variant='outlined' elevation={3} className='search-container'>
      <form onSubmit={submitForm}>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-required-label'>Region</InputLabel>
          <Select
            labelId='demo-simple-select-required-label'
            id='demo-simple-select-required'
            value={region}
            onChange={handleChange}
            autoWidth
            className={classes.selectEmpty}
          >
            {/* TODO - map through the regions */}
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.formControl}
          id='standard-required'
          label='City'
        />
        <Button
          className={classes.formControl}
          variant='contained'
          disabled
          onClick={submitForm}
        >
          Search
        </Button>
      </form>
    </Paper>
  );
};

export default Search;
