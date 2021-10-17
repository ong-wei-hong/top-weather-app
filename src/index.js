import './style.css'

const Helpers = (() => {
	const build = (elementName, options = {
		parent: null,
		text: '',
		for: '',
		type: '',
		name: '',
		value: '',
		placeholder: '',
		required: false,
		classList: []
	}) => {
		const element = document.createElement(elementName);

		if(options.parent) { options.parent.appendChild(element) };
		if(options.text) { element.textContent = options.text };
		if(options.for) { element.htmlFor = options.for };
		if(options.type) {element.type = options.type };
		if(options.name) { element.name = options.name };
		if(options.value) { element.value = options.value };
		if(options.placeholder) { element.placeholder = options.placeholder }
		if(options.required) { element.required = true }
		if(options.classList) { options.classList.forEach( e => element.classList.add(e) )}


		return element;
	};

	return {
		build
	};
})();

const formController = (() => {
	const _form = Helpers.build('form', {
		parent: document.body,
		classList: ['form']
	});
	const _label= Helpers.build('label', {
		parent: _form,
		text: 'Enter your location:',
		for: 'location',
		classList: ['label']
	});
	const _inputWrapper = Helpers.build('div', {
		parent: _form,
		classList: ['input-wrapper']
	});
	const _input = Helpers.build('input', {
		parent: _inputWrapper,
		type: 'text',
		name: 'location',
		placeholder: 'Enter city name',
		required: true,
		classList: ['input']
	});

	const _units = Helpers.build('select', {
		parent: _inputWrapper,
		name: 'units',
		classList: ['units']
	})
	const standardOption = Helpers.build('option', {
		value: 'standard',
		text: 'Standard Units'
	})
	_units.add(standardOption)
	const metricOption = Helpers.build('option', {
		value: 'metric',
		text: 'Metric Units'
	})
	metricOption.selected = true
	_units.add(metricOption)
	const imperialOption = Helpers.build('option', {
		value: 'imperial',
		text: 'Imperial Units'
	})
	_units.add(imperialOption)

	const _submit = Helpers.build('input', {
		parent: _inputWrapper,
		type: 'submit',
		value: 'Check weather',
		classList: ['submit']
	});

	const form = () => _form

	return {
		form
	};
})();

const mainController = (() => {
	const _main = Helpers.build('main', {parent: document.body})
	const _wrapper = Helpers.build('div', {parent: _main, classList: ['main-wrapper', 'none']})
	const _left = Helpers.build('div', { parent: _wrapper, classList: ['left']})
	const _right = Helpers.build('div', { parent: _wrapper, classList: ['right']})
	const _location = Helpers.build('div', {parent: _left})
	const _iconAndTemp = Helpers.build('div', {parent: _left, classList: ['icon-and-temp']})
	const _img = Helpers.build('img', {parent: _iconAndTemp, classList: ['icon']})
	const _temp = Helpers.build('div', {parent: _iconAndTemp, classList: ['temp']})
	const _mainText = Helpers.build('div', {parent: _left})
	const _description = Helpers.build('div', {parent: _left, classList: ['italic']})
	const _tempRange = Helpers.build('div', {parent: _left})
	const _feelsLike = Helpers.build('div', {parent: _left})
	const _pressure = Helpers.build('div', {parent: _right})
	const _humidity = Helpers.build('div', {parent: _right})
	const _visibility = Helpers.build('div', {parent: _right})
	const _windSpeed = Helpers.build('div', {parent: _right})
	const _windDeg = Helpers.build('div', {parent: _right})
	const _clouds = Helpers.build('div', {parent:_right})
	const _loading = Helpers.build('div', {parent: _main, classList: ['info']})

	const render = () => { _wrapper.classList.remove('none') }
	const hide = () => { _wrapper.classList.add('none') }
	const imgSrc = (src) => { _img.src = src }
	const mainText = (text) => { _mainText.textContent = text }
	const descriptionText = (text) => { _description.textContent = text	}
	const tempText = (text) => { _temp.textContent = text	}
	const feelsLikeText = (text) => { _feelsLike.textContent = text }
	const tempRangeText = (text) => { _tempRange.textContent = text	}
	const pressureText = (text) => { _pressure.textContent = text	}
	const humidityText = (text) => { _humidity.textContent = text	}
	const visibilityText = (text) => { _visibility.textContent = text	}
	const windSpeedText = (text) => { _windSpeed.textContent = text	}
	const windDegText = (text) => { _windDeg.textContent = text	}
	const cloudsText = (text) => { _clouds.textContent = text }
	const locationText = (text) => {_location.textContent = text}
	const loadingText = (text) => { _loading.textContent = text }

	return {
		render,
		hide,
		imgSrc,
		mainText,
		descriptionText,
		tempText,
		feelsLikeText,
		tempRangeText,
		pressureText,
		humidityText,
		visibilityText,
		windSpeedText,
		windDegText,
		cloudsText,
		locationText,
		loadingText
	}
})();

const openweatherController = (() => {
	const getResponse = async (location, units) => {
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=${units}`, {mode: 'cors'});
		if(response.status == 200) {
			return response.json();
		}else{
			throw new Error(response.status)
		}
	};

	return {
		getResponse
	};
})();

const eventController = (() => {
	const renderMain = (response, units, requestSubmittedTime) => {
		const temperatureUnit =
			units == 'standard' ? ' \u212a' :
			units == 'metric' ? ' \u2103' : ' \u2109'
		const speedUnit = units == 'imperial' ? ' mph' : ' m/s'
		mainController.render()
		mainController.mainText(response.weather[0].main)
		mainController.descriptionText(response.weather[0].description)
		mainController.imgSrc(`http://openweathermap.org/img/wn/${response.weather[0].icon}.png`)
		mainController.tempText(response.main.temp + temperatureUnit)
		mainController.feelsLikeText('Feels like: ' + response.main.feels_like + temperatureUnit)
		mainController.tempRangeText('Temperatures from ' + response.main.temp_min + temperatureUnit + ' to ' + response.main.temp_max + temperatureUnit)
		mainController.pressureText('Pressure: ' + response.main.pressure + ' hPa')
		mainController.humidityText('Humidity: ' + response.main.humidity + ' \uff05')
		mainController.visibilityText('Visibility: ' + response.visibility + ' meters')
		mainController.windSpeedText('Wind speed: ' + response.wind.speed + speedUnit)
		mainController.windDegText('Wind degree: ' + response.wind.deg + ' \u00b0')
		mainController.cloudsText('Clouds: ' + response.clouds.all + ' \uff05')
		mainController.locationText(response.name + ', ' + response.sys.country)
		mainController.loadingText(`Request submitted at ${requestSubmittedTime}, information received at ${new Date().toString()}`)
	}
	formController.form().addEventListener('submit', (e) => {
		e.preventDefault();

		const requestSubmittedTime = (new Date()).toString()
		const location = e.target[0].value
		const units = e.target[1].value
		openweatherController.getResponse(location, units).then(response => renderMain(response, units, requestSubmittedTime)).catch(err => console.log(err))
	});
})();
