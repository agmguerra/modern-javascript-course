class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  //fill form with info
  fillWeatherScreen(weather) {    
    this.location.textContent = `${weather.name}, ${weather.sys.country}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = '';
    //this.icon.setAttribute('src', '');
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}%`;
    this.feelsLike.textContent = `Feels Like: ${weather.main.feels_like} C\u00B0`; 
    this.dewpoint.textContent = `DewPoint: ${weather.main.temp} C\u00B0`;
    this.wind.textContent = `Wind: ${weather.wind.speed}`;
  }
}