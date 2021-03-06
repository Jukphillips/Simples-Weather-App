// Declaring search button
var searchBtn = document.getElementById('searchButton')
//Declaring clear button
var clearBtn = document.getElementById('clearButton')
// Declaring search results container
var searchResultCon = document.getElementById('searchResults')
// Declaring result city name in today's forecast
var resultCityName = document.getElementById('resultCityName')
// Declaring result city Temp in today's forecast
var resultCityTemp = document.getElementById('resultCityTemp')
// Declaring result city Wind in today's forecast
var resultCityWind = document.getElementById('resultCityWind')
// Declaring result city Humidity in today's forecast
var resultCityUV = document.getElementById('resultCityUV')
// Declaring forecast div
var forecastWeekDiv = document.getElementById('weekForecast')



// declaring recent searches bar
var recentSearches = document.getElementById('recentSearches')



//declaring array of stored cities
citiesList = []
// declaring array for most recent search
mostRecentSearch = []
// declaring open weather api key
var openKey = "f2df7213ca5b57c2821faa8411ae4fe9";
// declaring date
var currentTime = moment().format("(MMMM/Do/YYYY)")
console.log(currentTime)


//search function
function search(event) {
    event.preventDefault();
    var userInput = document.getElementById('searchInput').value.trim();

    mostRecentSearch.push(userInput)
   
    
    clearBtn.style.display = 'block';
    searchResultCon.style.display = 'block';

    var storedCitiesList = JSON.parse(localStorage.getItem('citiesList'))

    if( storedCitiesList !== null) {
        citiesList = storedCitiesList;
    }

    citiesList.push({UserCity: userInput })
   localStorage.setItem('CitiesList', JSON.stringify(citiesList));
   console.log(citiesList)
 
    

    

    
   displayRecentSearches();
    getCurrentWeatherInfo();
    
   
   }
  
function displayRecentSearches() {
    for (var i = 0; i < citiesList.length; i++) {
       var listBtnsearches = document.createElement('button');
       listBtnsearches.textContent = citiesList[i].UserCity;
       listBtnsearches.setAttribute("id", "recentSearchesDisplay")
       listBtnsearches.setAttribute("class", "searchFormat")
  
       recentSearches.appendChild(listBtnsearches)
}
}

 function getCurrentWeatherInfo() {

     var openApiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + mostRecentSearch + '&units=imperial&appid=' + openKey
     
     console.log(openApiWeather)

     // Fetching 
     fetch(openApiWeather)
        .then(function (response){
            return response.json();

        })
        .then(function (data){
        
            

        resultCityName.textContent = mostRecentSearch + " " + currentTime 
        resultCityTemp.textContent = "Temp: " + data.main.temp + "??F"
        resultCityWind.textContent = "Wind: " + data.wind.speed + " MPH"
        resultCityHumidity.textContent = "Humidity: " + data.main.humidity + "%"
        var lat = data.coord.lat
        var lon = data.coord.lon

        var openUVIWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + '&units=imperial&appid=' + openKey
            fetch(openUVIWeather)
                .then(function(responseuv) {
                return responseuv.json();

            }) .then (function (dataUV){

                resultCityUV.textContent = "UV Index: " 
                var UVText = document.createElement("p")
                UVTextValue = dataUV.daily[0].uvi
                UVText.textContent = dataUV.daily[0].uvi
                resultCityUV.appendChild(UVText)
                console.log(UVTextValue)

                if (UVTextValue > 0 && UVTextValue <= 2) {
                    UVText.setAttribute('class', 'greenUV')
                } else if (UVTextValue > 2 && UVTextValue <= 5) {
                    UVText.setAttribute("class", "yellowUV")
                } else if (UVTextValue > 5 && UVTextValue <= 7) {
                    UVText.setAttribute("class", "orangeUV")
                } else if (UVTextValue > 7 &&  UVTextValue <=10) {
                    UVText.setAttribute("class", 'redUV')
                } else {
                    UVText.setAttribute('class', 'purpleUV')
                }
            } )
        
         getFivedayForecast()
        })}


 function getFivedayForecast() {

    var openForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + mostRecentSearch + "&units=imperial&appid=" + openKey
    console.log(openForecast)
    fetch(openForecast) 
        .then(function (responseForecast) {
            return responseForecast.json();
        }) .then( function (dataresponse) { 
            var i = 8
     for ( var m=0; m < 5; m++ ) {
    
         console.log(dataresponse.list)
        var currentFiveDate = dataresponse.list[i].dt
        console.log({currentFiveDate})
        if (dataresponse.list[i].dt != dataresponse.list[i+1].dt) {
            var numberDayForecast = document.createElement('div')
            numberDayForecast.setAttribute('class', 'forecastCards')

            var forecastDate = moment.unix(currentFiveDate).format("(MMMM/Do/YYYY)")
            var forecastDateText = document.createElement('h4')
            forecastDateText.textContent = forecastDate
            forecastDateText.setAttribute = ('class', 'forecastCardsText')

            var fiveForecastEmoji = document.createElement('img')
            fiveForecastEmoji.setAttribute('src', 'https://openweathermap.org/img/wn/' + dataresponse.list[i].weather[0].icon + "@2x.png")

            var forecastTemp = document.createElement('p')
            forecastTemp.textContent = "Temp: " + dataresponse.list[i].main.temp + "??F"
            forecastTemp.setAttribute('class', 'forecastCardsText')

            var forecastWind = document.createElement('p')
            forecastWind.textContent = "Wind: " + dataresponse.list[i].wind.speed + " MPH"
            forecastWind.setAttribute('class', 'forecastCardsText')

            var forecastHumidity = document.createElement('p')
            forecastHumidity.textContent = "Humidty: " + dataresponse.list[i].main.humidity + "%"
            forecastHumidity.setAttribute('class', 'forecastCardsText')

            numberDayForecast.append(forecastDateText);
            numberDayForecast.append(fiveForecastEmoji);
            numberDayForecast.append(forecastTemp);
            numberDayForecast.append(forecastWind);
            numberDayForecast.append(forecastHumidity);
            forecastWeekDiv.append(numberDayForecast);

            i = i + 7
        

        }





     }



           
 })}

function clearSearch() {
    clearBtn.style.display = 'none';
    localStorage.clear();
    location.reload();
}





// event listener for search Button
searchBtn.addEventListener('click', search)
// event listener for clear button
clearBtn.addEventListener('click', clearSearch)
