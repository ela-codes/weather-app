import { displayTxtContent, displayImgContent} from './ui.js'

const url = "https://api.weatherapi.com/v1/current.json?key=ccd3ddc182e74173940123740232903&q=Winnipeg&aqi=no" //public free-use weather api key


async function fetchWeather(url) {
    try {
        const response = await fetch(url, {mode: 'cors'})
        const dataPromise = await response.json()
        return dataPromise
    } catch(error) {
        console.log(error)
    }
}

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
    

const weather = fetchWeather(url).then(data => {
    console.log(data)
    extractCurrWeather(data.current)
    extractLocation(data.location)
    updateBackground(data.current.is_day)
})

function extractCurrWeather(data) {
    // weather temps
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
    // 0 = night, 1 = day
    const bg = document.querySelector('#background')
    if (status === 1) {
        bg.src = "./background/day.mp4"
    } if (status === 0) {
        bg.src = "./background/night.mp4"
    } else {
        bg.src = "./background/afternoon.mp4"
    }
}
