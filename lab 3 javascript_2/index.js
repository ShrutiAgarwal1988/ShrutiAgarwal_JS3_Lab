
const api = {
    key: "a088b4002c677734340bad79ef7b8019",
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchBox = document.querySelector('.searchBox');
  searchBox.addEventListener('keypress', function (event) {
    // event key has the information about key
    console.log('keypress');
    console.log(searchBox.value);

    if (event.keycode === 'Enter') {
        getResults(searchBox.value);
    }
})
    /*searchbox.addEventListener('keypress', setQuery){
    
    function setQuery(evt) {
      if (evt.keyCode == 13 || evt.keycode!==null) {
        getResults(searchbox.value);
      }
    }}*/
    function getResults(query) {
    
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((weather) => {
          return weather.json();
        })
        .then((response)=>{
          console.log(response)
          displayResults(response)})
          .catch(error => console.log(error.message));
    }
  
  
  function displayResults (weather) {
    let city = document.querySelector('.innerdiv .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.innerdiv .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.innerdiv2 .current');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.innerdiv2 .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.innerdiv2 .maxtempmintemp');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }

  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  