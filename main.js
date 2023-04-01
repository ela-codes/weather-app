/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const weatherDiv = document.querySelector('.weather')

const url = "https://api.weatherapi.com/v1/current.json?key=ccd3ddc182e74173940123740232903&q=Winnipeg&aqi=no"


async function fetchWeather(url) {
    try {
        const response = await fetch(url, {mode: 'cors'})
        const dataPromise = await response.json()
        return dataPromise
    } catch(error) {
        console.log(error)
    }
}

const currInfo = ["feelslike_c", "feelslike_f", 
                "humidity", "is_day", "last_updated", 
                "precip_mm", "temp_c", "temp_f"]

const locationInfo = ["country", "localtime", "name", 
                    "region", "tz_id"]
    

const weather = fetchWeather(url).then(data => {
    console.log(data)
    extractCurrWeather(data.current)
    extractLocation(data.location)
})

function extractCurrWeather(data) {
    const currKeys = Object.keys(data.condition)

    for (let key of currKeys) {
        if (key === "icon") {
            const properUrl = "https:" + data.condition[key]
            displayImgContent(properUrl)
        } else if (key === "text") {
            displayTxtContent(key, data.condition[key])
        }
        // console.log(`${key}: ${data.condition[key]}`)
    }

    currInfo.forEach(info => {
        displayTxtContent(info, data[info])
        // console.log(`${info}: ${data[info]}`)
    })
}

function extractLocation(data) {
    locationInfo.forEach(info => {
        displayTxtContent(info, data[info])
        // console.log(`${info}: ${data[info]}`)
    })
}

const main = document.querySelector('.weather')

function displayTxtContent(header, content) {
    const div = document.createElement('div')
    const h4 = document.createElement('h4')
    const text = document.createElement('div')
    h4.textContent = header
    text.textContent = String(content)
    div.append(h4, text)
    main.appendChild(div)
    
}

function displayImgContent(imgFile) {
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = imgFile
    div.appendChild(img)
    main.appendChild(div)
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsMkNBQTJDLGFBQWE7QUFDeEQ7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsMEJBQTBCLElBQUksSUFBSSxvQkFBb0I7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixLQUFLLElBQUksV0FBVztBQUM5QyxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEtBQUssSUFBSSxXQUFXO0FBQzlDLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2VhdGhlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcblxuY29uc3QgdXJsID0gXCJodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PWNjZDNkZGMxODJlNzQxNzM5NDAxMjM3NDAyMzI5MDMmcT1XaW5uaXBlZyZhcWk9bm9cIlxuXG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlcih1cmwpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6ICdjb3JzJ30pXG4gICAgICAgIGNvbnN0IGRhdGFQcm9taXNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgIHJldHVybiBkYXRhUHJvbWlzZVxuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgfVxufVxuXG5jb25zdCBjdXJySW5mbyA9IFtcImZlZWxzbGlrZV9jXCIsIFwiZmVlbHNsaWtlX2ZcIiwgXG4gICAgICAgICAgICAgICAgXCJodW1pZGl0eVwiLCBcImlzX2RheVwiLCBcImxhc3RfdXBkYXRlZFwiLCBcbiAgICAgICAgICAgICAgICBcInByZWNpcF9tbVwiLCBcInRlbXBfY1wiLCBcInRlbXBfZlwiXVxuXG5jb25zdCBsb2NhdGlvbkluZm8gPSBbXCJjb3VudHJ5XCIsIFwibG9jYWx0aW1lXCIsIFwibmFtZVwiLCBcbiAgICAgICAgICAgICAgICAgICAgXCJyZWdpb25cIiwgXCJ0el9pZFwiXVxuICAgIFxuXG5jb25zdCB3ZWF0aGVyID0gZmV0Y2hXZWF0aGVyKHVybCkudGhlbihkYXRhID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIGV4dHJhY3RDdXJyV2VhdGhlcihkYXRhLmN1cnJlbnQpXG4gICAgZXh0cmFjdExvY2F0aW9uKGRhdGEubG9jYXRpb24pXG59KVxuXG5mdW5jdGlvbiBleHRyYWN0Q3VycldlYXRoZXIoZGF0YSkge1xuICAgIGNvbnN0IGN1cnJLZXlzID0gT2JqZWN0LmtleXMoZGF0YS5jb25kaXRpb24pXG5cbiAgICBmb3IgKGxldCBrZXkgb2YgY3VycktleXMpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gXCJpY29uXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlclVybCA9IFwiaHR0cHM6XCIgKyBkYXRhLmNvbmRpdGlvbltrZXldXG4gICAgICAgICAgICBkaXNwbGF5SW1nQ29udGVudChwcm9wZXJVcmwpXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInRleHRcIikge1xuICAgICAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoa2V5LCBkYXRhLmNvbmRpdGlvbltrZXldKVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2tleX06ICR7ZGF0YS5jb25kaXRpb25ba2V5XX1gKVxuICAgIH1cblxuICAgIGN1cnJJbmZvLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgIGRpc3BsYXlUeHRDb250ZW50KGluZm8sIGRhdGFbaW5mb10pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAke2luZm99OiAke2RhdGFbaW5mb119YClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBleHRyYWN0TG9jYXRpb24oZGF0YSkge1xuICAgIGxvY2F0aW9uSW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICBkaXNwbGF5VHh0Q29udGVudChpbmZvLCBkYXRhW2luZm9dKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHtpbmZvfTogJHtkYXRhW2luZm9dfWApXG4gICAgfSlcbn1cblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcblxuZnVuY3Rpb24gZGlzcGxheVR4dENvbnRlbnQoaGVhZGVyLCBjb250ZW50KSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb25zdCBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoNC50ZXh0Q29udGVudCA9IGhlYWRlclxuICAgIHRleHQudGV4dENvbnRlbnQgPSBTdHJpbmcoY29udGVudClcbiAgICBkaXYuYXBwZW5kKGg0LCB0ZXh0KVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KVxuICAgIFxufVxuXG5mdW5jdGlvbiBkaXNwbGF5SW1nQ29udGVudChpbWdGaWxlKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy5zcmMgPSBpbWdGaWxlXG4gICAgZGl2LmFwcGVuZENoaWxkKGltZylcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdilcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=