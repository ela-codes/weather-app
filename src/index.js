const weatherDiv = document.querySelector('.weather')

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