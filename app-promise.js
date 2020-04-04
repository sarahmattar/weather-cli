const _ = require('lodash');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const yargs = require('yargs');
const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for.',
			string: true,
		},
	})
	.help()
	.alias('help', 'h').argv;

const encodedAddress = encodeURIComponent(argv.address);

const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.MAPBOX_API}`;

axios
	.get(geocodeUrl)
	.then((response) => {
		if (response.data.features[0] === undefined) {
			throw new Error('Unable to find that address.');
		}

		const lat = response.data.features[0].geometry.coordinates[1];
		const lng = response.data.features[0].geometry.coordinates[0];
		const weatherUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_SECRET_KEY}/${lat},${lng}`;

		console.log(response.data.features[0].place_name);

		return axios.get(weatherUrl);
	})
	.then((response) => {
		const temperature = response.data.currently.temperature;
		const feelsLike = response.data.currently.apparentTemperature;
		console.log(
			`It's currently ${temperature}. It feels like ${feelsLike}.`
		);
	})
	.catch((error) => {
		if (error.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers.');
		} else {
			console.log(error.message);
		}
	});
