class Weather {
  constructor(city, state) {
    this.apiKey = '2833cc129cf1d4d8319947a77bf40ff8';
    this.city = city;
    this.state = state;
  }

  //Fetch weather from api
  async getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.apiKey}`);

    const responseData = await response.json();
    
    return responseData;
    
  }

  //Change location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}