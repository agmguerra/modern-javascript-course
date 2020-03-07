//Init storage
const storage = new Storage();

//get default storage location
const weatherLocation = storage.getLocationData();

//init Weather
const weather = new Weather(weatherLocation.city, weatherLocation.state);

//Init UI
const ui = new UI();

//Get weather on DOM load
document.addEventListener('DOMContentLoaded', () => {
  storage.setLocationData();
  getWeather();
});

//Chenge location event
document.getElementById('w-change-btn').addEventListener('click', e => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);

  getWeather();

  //save to storage
  storage.setLocationData(city, state)

  //Close modal
  $('#locModal').modal('hide');

});

//Get weather function
function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.fillWeatherScreen(results);
    })
    .catch(err => console.log(err));
}