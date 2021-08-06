
const apiKey = '4c6ee178fbcaa341e556052daf49c4ef';
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=16.0433&lon=120.3333&exclude=minutely,hourly&appid=${apiKey}&units=metric`;

const todayDate = new Date();
const todayNumber = todayDate.getDay();
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

fetch(url)
  .then((response) => response.json())
  .then((weatherInfo) => {

    // console.log(weatherInfo)

    /***** Current Weather and Forecast Section *****/
    
    const weather = weatherInfo.current.weather[0].description.replace(
      /(^\w{1})|(\s+\w{1})/g,
      (letter) => letter.toUpperCase()
    );

    document.querySelector('.temperature').innerHTML = `${weatherInfo.current.temp.toFixed(0)}\xB0C`;
    document.querySelector('.condition').innerHTML = weather;
    document.querySelector('.humidity').innerHTML = `${weatherInfo.current.humidity}%`;

    let forecastList = weatherInfo.daily;

    let forecastToday = todayNumber;

    for (let i = 0; i < 5; i++) {

        forecastToday += 1;

        if (forecastToday === 7) {forecastToday = 0;}

        let dayName = document.createElement('h4');
        dayName.setAttribute('class', 'forecastheader');
        dayName.textContent = weekday[forecastToday];

        let temp = document.createElement('p');
        temp.setAttribute('class', 'forecast-temperature');
        temp.textContent = `${forecastList[i].temp.day.toFixed(0)}\xB0C`;

        let iconCode = weatherInfo.daily[i].weather[0].icon;
        let iconPath = `//openweathermap.org/img/wn/${iconCode}@2x.png`;
        let icon = document.createElement('img');
        icon.setAttribute('class', 'weathericon');
        icon.setAttribute('alt', 'Weather Icon');
        icon.setAttribute('loading', 'lazy');
        icon.src = iconPath;

        let dayCard = document.createElement('div');
        dayCard.setAttribute('class', 'weathercard');
        dayCard.appendChild(dayName);
        dayCard.appendChild(icon);
        dayCard.appendChild(temp);

        document.querySelector('.forecast').appendChild(dayCard);
    }

    /***** Alert Section *****/

    const alert = document.querySelector('.alerts');

    const alertcontainer = document.createElement('div');

    if (weatherInfo.hasOwnProperty('alerts')) {

      alertcontainer.innerHTML = `<h2>Alert(s):</h2>`;

      for (let i = 0; i < weatherInfo.alerts.length; i++) {
        alertcontainer.innerHTML += `${weatherInfo.alerts[i].event}<br>`;
      }

      alert.append(alertcontainer);
    } else {
      alertcontainer.innerHTML = 'No alert for today.';
    }

  });