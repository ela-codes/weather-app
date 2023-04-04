/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayImgContent": () => (/* binding */ displayImgContent),
/* harmony export */   "displayTxtContent": () => (/* binding */ displayTxtContent),
/* harmony export */   "removeOldDisplay": () => (/* binding */ removeOldDisplay)
/* harmony export */ });
const main = document.querySelector('.weather')

function displayTxtContent(header, content, className) {
    const div = document.createElement('div')
    div.setAttribute('class', className)
    const h4 = document.createElement('h4')
    const text = document.createElement('div')
    h4.textContent = header
    text.textContent = String(content)
    div.append(h4, text)
    main.appendChild(div)
    
}

function displayImgContent(imgFile, className) {
    const div = document.createElement('div')
    div.setAttribute('class', className)
    const img = document.createElement('img')
    img.src = imgFile

    img.setAttribute('width', '100')
    div.appendChild(img)
    main.appendChild(div)
}

function removeOldDisplay() {
    const nodes = main.childNodes
    const length = main.childNodes.length-1

    for (let i = length; i >= 0 ; i--) {
        nodes[i].remove() 
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");


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
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.removeOldDisplay)()
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
            ;(0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.displayImgContent)(properUrl, "condition-icon")

            ;(0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.displayTxtContent)("Condition", data.condition['text'], "condition-text")
        } else {
            (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.displayTxtContent)(info[1], data[info[0]], info[0])
        }
    })
}

function extractLocation(data) {
    locationInfo.forEach(info => {
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.displayTxtContent)(info[1], data[info[0]], info[0])
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBO0FBQ0E7Ozs7Ozs7O1VDaENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOK0U7O0FBRS9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsYUFBYTtBQUN4RDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHdEQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7OztBQUdBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFpQjs7QUFFN0IsWUFBWSwwREFBaUI7QUFDN0IsVUFBVTtBQUNWLFlBQVkseURBQWlCO0FBQzdCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHlEQUFpQjtBQUN6QixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXInKVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVR4dENvbnRlbnQoaGVhZGVyLCBjb250ZW50LCBjbGFzc05hbWUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKVxuICAgIGNvbnN0IGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKVxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGg0LnRleHRDb250ZW50ID0gaGVhZGVyXG4gICAgdGV4dC50ZXh0Q29udGVudCA9IFN0cmluZyhjb250ZW50KVxuICAgIGRpdi5hcHBlbmQoaDQsIHRleHQpXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpXG4gICAgXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5SW1nQ29udGVudChpbWdGaWxlLCBjbGFzc05hbWUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lKVxuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaW1nLnNyYyA9IGltZ0ZpbGVcblxuICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCcpXG4gICAgZGl2LmFwcGVuZENoaWxkKGltZylcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdilcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU9sZERpc3BsYXkoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBtYWluLmNoaWxkTm9kZXNcbiAgICBjb25zdCBsZW5ndGggPSBtYWluLmNoaWxkTm9kZXMubGVuZ3RoLTFcblxuICAgIGZvciAobGV0IGkgPSBsZW5ndGg7IGkgPj0gMCA7IGktLSkge1xuICAgICAgICBub2Rlc1tpXS5yZW1vdmUoKSBcbiAgICB9XG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZGlzcGxheVR4dENvbnRlbnQsIGRpc3BsYXlJbWdDb250ZW50LCByZW1vdmVPbGREaXNwbGF5fSBmcm9tICcuL3VpLmpzJ1xuXG5jb25zdCBjdXJySW5mbyA9IFtcbiAgICBbXCJ0ZW1wX2NcIiwgXCJcIl0sXG4gICAgW1wiY29uZGl0aW9uXCIsIFwiXCJdLFxuICAgIFtcImZlZWxzbGlrZV9jXCIsIFwiRmVlbHMgTGlrZSAowrBDKVwiXSwgXG4gICAgW1wiaHVtaWRpdHlcIiwgXCJIdW1pZGl0eVwiXSxcbiAgICBbXCJsYXN0X3VwZGF0ZWRcIiwgXCJMYXN0IFVwZGF0ZWQgT25cIl0sIFxuICAgIFtcInByZWNpcF9tbVwiLCBcIlByZWNpcGl0YXRpb24gKG1tKVwiXVxuXVxuXG5jb25zdCBsb2NhdGlvbkluZm8gPSBbXG4gICAgW1wiY291bnRyeVwiLCBcIkNvdW50cnlcIl0sIFxuICAgIFtcImxvY2FsdGltZVwiLCBcIkRhdGUgJiBUaW1lXCJdLFxuICAgIFtcIm5hbWVcIiwgXCJDaXR5XCJdLCBcbiAgICBbXCJyZWdpb25cIiwgXCJQcm92aW5jZVwiXVxuXVxuXG5sZXQgY3VyckxvY2F0aW9uID0gJ0xvbmRvbidcblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7bW9kZTogJ2NvcnMnfSlcbiAgICAgICAgY29uc3QgZGF0YVByb21pc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgcmV0dXJuIGRhdGFQcm9taXNlXG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZXJyKVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh1cmwpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2hXZWF0aGVyKHVybClcbiAgICAgICAgZXh0cmFjdEN1cnJXZWF0aGVyKGRhdGEuY3VycmVudClcbiAgICAgICAgZXh0cmFjdExvY2F0aW9uKGRhdGEubG9jYXRpb24pXG4gICAgICAgIHVwZGF0ZUJhY2tncm91bmQoZGF0YS5jdXJyZW50LmlzX2RheSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaGFuZGxlRXJyb3IoZXJyKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYnVpbGRVUkwobG9jYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBcImh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9Y2NkM2RkYzE4MmU3NDE3Mzk0MDEyMzc0MDIzMjkwMyZxPVwiIC8vcHVibGljIGZyZWUtdXNlIHdlYXRoZXIgYXBpIGtleVxuICAgIGNvbnN0IHBhcmFtID0gXCImYXFpPW5vXCJcbiAgICByZXR1cm4ga2V5ICsgbG9jYXRpb24gKyBwYXJhbVxufVxuXG5mdW5jdGlvbiBzaG93TmV3TG9jYXRpb24obG9jYXRpb24pIHtcbiAgICByZW1vdmVPbGREaXNwbGF5KClcbiAgICBnZXREYXRhKGJ1aWxkVVJMKGxvY2F0aW9uKSlcbn1cblxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjbG9jYXRpb24tc2VhcmNoJylcbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICBjdXJyTG9jYXRpb24gPSBzZWFyY2gudmFsdWVcbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICB9XG59KVxuXG5nZXREYXRhKGJ1aWxkVVJMKGN1cnJMb2NhdGlvbikpXG5cblxuY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG5cbnRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7IC8vIGNoYW5nZSB0byBmYXJlbmhlaXRcbiAgICAgICAgY3VyckluZm9bMF0gPSBbXCJ0ZW1wX2ZcIiwgXCJcIl1cbiAgICAgICAgY3VyckluZm9bMl0gPSBbXCJmZWVsc2xpa2VfZlwiLCBcIkZlZWxzIExpa2UgKMKwRilcIl1cbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICAgICAgY29uc29sZS5sb2coY3VyckluZm8pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VyckluZm9bMF0gPSBbXCJ0ZW1wX2NcIiwgXCJcIl1cbiAgICAgICAgY3VyckluZm9bMl0gPSBbXCJmZWVsc2xpa2VfY1wiLCBcIkZlZWxzIExpa2UgKMKwQylcIl1cbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICB9XG59KVxuXG5cbmZ1bmN0aW9uIGV4dHJhY3RDdXJyV2VhdGhlcihkYXRhKSB7XG4gICAgY3VyckluZm8uZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgaWYgKGluZm9bMF0gPT09IFwiY29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlclVybCA9IFwiaHR0cHM6XCIgKyBkYXRhLmNvbmRpdGlvblsnaWNvbiddXG4gICAgICAgICAgICBkaXNwbGF5SW1nQ29udGVudChwcm9wZXJVcmwsIFwiY29uZGl0aW9uLWljb25cIilcblxuICAgICAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoXCJDb25kaXRpb25cIiwgZGF0YS5jb25kaXRpb25bJ3RleHQnXSwgXCJjb25kaXRpb24tdGV4dFwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoaW5mb1sxXSwgZGF0YVtpbmZvWzBdXSwgaW5mb1swXSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RMb2NhdGlvbihkYXRhKSB7XG4gICAgbG9jYXRpb25JbmZvLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgIGRpc3BsYXlUeHRDb250ZW50KGluZm9bMV0sIGRhdGFbaW5mb1swXV0sIGluZm9bMF0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlQmFja2dyb3VuZChzdGF0dXMpIHtcbiAgICBjb25zb2xlLmxvZyhzdGF0dXMpXG4gICAgLy8gMCA9IG5pZ2h0LCAxID0gZGF5XG4gICAgY29uc3QgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFja2dyb3VuZCcpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgIGJnLnNyYyA9IFwiLi9iYWNrZ3JvdW5kL2RheS5tcDRcIlxuICAgICAgICB9IGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgIGJnLnNyYyA9IFwiLi9iYWNrZ3JvdW5kL25pZ2h0Lm1wNFwiXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG5cbiAgICBjb25zdCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvYWZ0ZXJub29uLm1wNFwiXG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpXG4gICAgZGl2LmlubmVySFRNTCA9ICc8YnI+IFNvcnJ5LCBwbGVhc2UgdHJ5IHNlYXJjaGluZyBhZ2Fpbi4nXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9