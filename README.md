# weather-cli

A promise based Node.js CLI weather app. Retrieves forecasts based on address and returns current temperature from the [Dark Sky](https://darksky.net/dev) API.

### Instructions for Use

The `-a` flag is used to specify the address that you would like to retrieve weather data for. It can process street addresses, cities, provinces and states, postal and zip codes, or any combination thereof.

Examples:

`node app-promise.js -a="1125 W 12th Ave"`

`node app-promise.js -a="V6H3Z3"`

`node app-promise.js -a="Vancouver, BC"`

For partial addresses, data for the first result will be displayed.
