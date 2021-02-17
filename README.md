# Project & Portfolio 5: Weather Application

## APIs Used

### [Country State City API](https://countrystatecity.in)
  * On initial load of the website, pull in the country data from this API.
  * Once a user selects the country a list of states are retrieved from the API using the country as a parameter.
  * After the state is selected by the user a list of cities are retrieved from the API using the previously input parameters.
  * These selections are then uploaded to the Google Maps geocoding API to retrieve a latitude and longitude for the selected location.

### [Google Maps geocoding API](https://developers.google.com/maps/documentation/geocoding/overview)
  * Retrieves the latitude and longitude based on the provided city, state, and country that the user inputs.

### [OpenWeather one call API](https://openweathermap.org/api/one-call-api)
  * Takes the latitude and longitude and provides weather data for the selected location.
  * Provides the following information:
    * Current weather
    * Minute forecast for 1 hour (not used)
    * Hourly forecast for the next 48 hours
    * Daily forecast for the next 7 days
    * National weather alerts (if applicable)
    * Historical weather data for the previous 5 days (not used)
  * Units of measurement are returned in standard units which will make conversion between celsius/fahrenheit and mph/kmh easier to accomplish.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
