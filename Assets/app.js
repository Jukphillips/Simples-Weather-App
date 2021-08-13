// Declaring search button
var searchBtn = document.getElementById('searchButton')
//Declaring clear button
var clearBtn = document.getElementById('clearButton')
// Declaring search results container
var searchResultCon = document.getElementById('searchResults')


// declaring input var


// declaring recent searches bar
var recentSearches = document.getElementById('recentSearches')



//declaring array of stored cities
citiesList = []



//search function
function search(event) {
    event.preventDefault();
    var userInput = document.getElementById('searchInput').value.trim();
   
    
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

function clearSearch() {
    clearBtn.style.display = 'none';
    localStorage.clear();
    location.reload();
}





// event listener for search Button
searchBtn.addEventListener('click', search)
// event listener for clear button
clearBtn.addEventListener('click', clearSearch)
