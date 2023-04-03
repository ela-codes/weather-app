import { displayTxtContent, displayImgContent, removeOldDisplay} from './ui.js'

const url = "https://api.weatherapi.com/v1/current.json?key=ccd3ddc182e74173940123740232903&q=London&aqi=no" //public free-use weather api key

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
    const key = "https://api.weatherapi.com/v1/current.json?key=ccd3ddc182e74173940123740232903&q="
    const param = "&aqi=no"
    return key + location + param
}

function showNewLocation() {
    removeOldDisplay()
    getData(buildURL(search.value))
}

const search = document.querySelector('input#location-search')
search.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) showNewLocation()
})

getData(url)



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