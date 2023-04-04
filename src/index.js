import { displayTxtContent, displayImgContent, removeOldDisplay} from './ui.js'

const currInfo = [
    ["temp_c", ""],
    ["condition", ""],
    ["feelslike_c", "Feels Like (°C)"], 
    ["humidity", "Humidity"],
    ["last_updated", "Last Updated On"], 
    ["precip_mm", "Precipitation (mm)"]
]

const locationInfo = [
    ["country", "Country"], 
    ["localtime", "Date & Time"],
    ["name", "City"], 
    ["region", "Province"]
]

let currLocation = 'London'

async function fetchWeather(url) {
    try {
        const response = await fetch(url, {mode: 'cors'})
        const dataPromise = await response.json()
        return dataPromise
    } catch(err) {
        handleError(err)
    }
}

async function getData(url) {
    try {
        const data = await fetchWeather(url)
        extractCurrWeather(data.current)
        extractLocation(data.location)
        updateBackground(data.current.is_day)
    } catch (err) {
        handleError(err)
    }
}

function buildURL(location) {
    const key = "https://api.weatherapi.com/v1/current.json?key=ccd3ddc182e74173940123740232903&q=" //public free-use weather api key
    const param = "&aqi=no"
    return key + location + param
}

function showNewLocation(location) {
    removeOldDisplay()
    getData(buildURL(location))
}

const search = document.querySelector('input#location-search')
search.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        currLocation = search.value
        showNewLocation(currLocation)
    }
})

getData(buildURL(currLocation))


const toggle = document.querySelector('.toggle')

toggle.addEventListener('change', () => {
    if (toggle.checked) { // change to farenheit
        currInfo[0] = ["temp_f", ""]
        currInfo[2] = ["feelslike_f", "Feels Like (°F)"]
        showNewLocation(currLocation)
        console.log(currInfo)
    } else {
        currInfo[0] = ["temp_c", ""]
        currInfo[2] = ["feelslike_c", "Feels Like (°C)"]
        showNewLocation(currLocation)
    }
})


function extractCurrWeather(data) {
    currInfo.forEach(info => {
        if (info[0] === "condition") {
            const properUrl = "https:" + data.condition['icon']
            displayImgContent(properUrl, "condition-icon")

            displayTxtContent("Condition", data.condition['text'], "condition-text")
        } else {
            displayTxtContent(info[1], data[info[0]], info[0])
        }
    })
}

function extractLocation(data) {
    locationInfo.forEach(info => {
        displayTxtContent(info[1], data[info[0]], info[0])
    })
}

function updateBackground(status) {
    console.log(status)
    // 0 = night, 1 = day
    const bg = document.querySelector('#background');
    try {
        if (status === 1) {
            bg.src = "./background/day.mp4"
        } if (status === 0) {
            bg.src = "./background/night.mp4"
        }
    } catch(err) {
        handleError(err)
    }
}

function handleError(err) {
    console.log(err)

    const bg = document.querySelector('#background');
    bg.src = "./background/afternoon.mp4"

    const div = document.querySelector('.weather')
    div.innerHTML = '<br> Sorry, please try searching again.'
}