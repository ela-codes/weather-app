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
/* harmony export */   "removeOldDisplay": () => (/* binding */ removeOldDisplay),
/* harmony export */   "resetSearchInput": () => (/* binding */ resetSearchInput)
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

function resetSearchInput() {
    const input = document.querySelector('#location-search')
    input.value = ''
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
        ;(0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.resetSearchInput)()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUEseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7VUNyQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pRzs7QUFFakc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksd0RBQWdCO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFnQjtBQUN4QjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7O0FBR0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQWlCOztBQUU3QixZQUFZLDBEQUFpQjtBQUM3QixVQUFVO0FBQ1YsWUFBWSx5REFBaUI7QUFDN0I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5VHh0Q29udGVudChoZWFkZXIsIGNvbnRlbnQsIGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpXG4gICAgY29uc3QgaDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaDQudGV4dENvbnRlbnQgPSBoZWFkZXJcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gU3RyaW5nKGNvbnRlbnQpXG4gICAgZGl2LmFwcGVuZChoNCwgdGV4dClcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdilcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlJbWdDb250ZW50KGltZ0ZpbGUsIGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjbGFzc05hbWUpXG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBpbWcuc3JjID0gaW1nRmlsZVxuXG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJylcbiAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlT2xkRGlzcGxheSgpIHtcbiAgICBjb25zdCBub2RlcyA9IG1haW4uY2hpbGROb2Rlc1xuICAgIGNvbnN0IGxlbmd0aCA9IG1haW4uY2hpbGROb2Rlcy5sZW5ndGgtMVxuXG4gICAgZm9yIChsZXQgaSA9IGxlbmd0aDsgaSA+PSAwIDsgaS0tKSB7XG4gICAgICAgIG5vZGVzW2ldLnJlbW92ZSgpIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0U2VhcmNoSW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9jYXRpb24tc2VhcmNoJylcbiAgICBpbnB1dC52YWx1ZSA9ICcnXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5VHh0Q29udGVudCwgZGlzcGxheUltZ0NvbnRlbnQsIHJlbW92ZU9sZERpc3BsYXksIHJlc2V0U2VhcmNoSW5wdXR9IGZyb20gJy4vdWkuanMnXG5cbmNvbnN0IGN1cnJJbmZvID0gW1xuICAgIFtcInRlbXBfY1wiLCBcIlwiXSxcbiAgICBbXCJjb25kaXRpb25cIiwgXCJcIl0sXG4gICAgW1wiZmVlbHNsaWtlX2NcIiwgXCJGZWVscyBMaWtlICjCsEMpXCJdLCBcbiAgICBbXCJodW1pZGl0eVwiLCBcIkh1bWlkaXR5XCJdLFxuICAgIFtcImxhc3RfdXBkYXRlZFwiLCBcIkxhc3QgVXBkYXRlZCBPblwiXSwgXG4gICAgW1wicHJlY2lwX21tXCIsIFwiUHJlY2lwaXRhdGlvbiAobW0pXCJdXG5dXG5cbmNvbnN0IGxvY2F0aW9uSW5mbyA9IFtcbiAgICBbXCJjb3VudHJ5XCIsIFwiQ291bnRyeVwiXSwgXG4gICAgW1wibG9jYWx0aW1lXCIsIFwiRGF0ZSAmIFRpbWVcIl0sXG4gICAgW1wibmFtZVwiLCBcIkNpdHlcIl0sIFxuICAgIFtcInJlZ2lvblwiLCBcIlByb3ZpbmNlXCJdXG5dXG5cbmxldCBjdXJyTG9jYXRpb24gPSAnTG9uZG9uJ1xuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHttb2RlOiAnY29ycyd9KVxuICAgICAgICBjb25zdCBkYXRhUHJvbWlzZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICByZXR1cm4gZGF0YVByb21pc2VcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIodXJsKVxuICAgICAgICBleHRyYWN0Q3VycldlYXRoZXIoZGF0YS5jdXJyZW50KVxuICAgICAgICBleHRyYWN0TG9jYXRpb24oZGF0YS5sb2NhdGlvbilcbiAgICAgICAgdXBkYXRlQmFja2dyb3VuZChkYXRhLmN1cnJlbnQuaXNfZGF5KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBidWlsZFVSTChsb2NhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT1jY2QzZGRjMTgyZTc0MTczOTQwMTIzNzQwMjMyOTAzJnE9XCIgLy9wdWJsaWMgZnJlZS11c2Ugd2VhdGhlciBhcGkga2V5XG4gICAgY29uc3QgcGFyYW0gPSBcIiZhcWk9bm9cIlxuICAgIHJldHVybiBrZXkgKyBsb2NhdGlvbiArIHBhcmFtXG59XG5cbmZ1bmN0aW9uIHNob3dOZXdMb2NhdGlvbihsb2NhdGlvbikge1xuICAgIHJlbW92ZU9sZERpc3BsYXkoKVxuICAgIGdldERhdGEoYnVpbGRVUkwobG9jYXRpb24pKVxufVxuXG5jb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCNsb2NhdGlvbi1zZWFyY2gnKVxuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgIGN1cnJMb2NhdGlvbiA9IHNlYXJjaC52YWx1ZVxuICAgICAgICByZXNldFNlYXJjaElucHV0KClcbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICB9XG59KVxuXG5nZXREYXRhKGJ1aWxkVVJMKGN1cnJMb2NhdGlvbikpXG5cblxuY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZScpXG5cbnRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHRvZ2dsZS5jaGVja2VkKSB7IC8vIGNoYW5nZSB0byBmYXJlbmhlaXRcbiAgICAgICAgY3VyckluZm9bMF0gPSBbXCJ0ZW1wX2ZcIiwgXCJcIl1cbiAgICAgICAgY3VyckluZm9bMl0gPSBbXCJmZWVsc2xpa2VfZlwiLCBcIkZlZWxzIExpa2UgKMKwRilcIl1cbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICAgICAgY29uc29sZS5sb2coY3VyckluZm8pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3VyckluZm9bMF0gPSBbXCJ0ZW1wX2NcIiwgXCJcIl1cbiAgICAgICAgY3VyckluZm9bMl0gPSBbXCJmZWVsc2xpa2VfY1wiLCBcIkZlZWxzIExpa2UgKMKwQylcIl1cbiAgICAgICAgc2hvd05ld0xvY2F0aW9uKGN1cnJMb2NhdGlvbilcbiAgICB9XG59KVxuXG5cbmZ1bmN0aW9uIGV4dHJhY3RDdXJyV2VhdGhlcihkYXRhKSB7XG4gICAgY3VyckluZm8uZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgaWYgKGluZm9bMF0gPT09IFwiY29uZGl0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlclVybCA9IFwiaHR0cHM6XCIgKyBkYXRhLmNvbmRpdGlvblsnaWNvbiddXG4gICAgICAgICAgICBkaXNwbGF5SW1nQ29udGVudChwcm9wZXJVcmwsIFwiY29uZGl0aW9uLWljb25cIilcblxuICAgICAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoXCJDb25kaXRpb25cIiwgZGF0YS5jb25kaXRpb25bJ3RleHQnXSwgXCJjb25kaXRpb24tdGV4dFwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoaW5mb1sxXSwgZGF0YVtpbmZvWzBdXSwgaW5mb1swXSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RMb2NhdGlvbihkYXRhKSB7XG4gICAgbG9jYXRpb25JbmZvLmZvckVhY2goaW5mbyA9PiB7XG4gICAgICAgIGRpc3BsYXlUeHRDb250ZW50KGluZm9bMV0sIGRhdGFbaW5mb1swXV0sIGluZm9bMF0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlQmFja2dyb3VuZChzdGF0dXMpIHtcbiAgICBjb25zb2xlLmxvZyhzdGF0dXMpXG4gICAgLy8gMCA9IG5pZ2h0LCAxID0gZGF5XG4gICAgY29uc3QgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFja2dyb3VuZCcpO1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHtcbiAgICAgICAgICAgIGJnLnNyYyA9IFwiLi9iYWNrZ3JvdW5kL2RheS5tcDRcIlxuICAgICAgICB9IGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgIGJnLnNyYyA9IFwiLi9iYWNrZ3JvdW5kL25pZ2h0Lm1wNFwiXG4gICAgICAgIH1cbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG5cbiAgICBjb25zdCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvYWZ0ZXJub29uLm1wNFwiXG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpXG4gICAgZGl2LmlubmVySFRNTCA9ICc8YnI+IFNvcnJ5LCBwbGVhc2UgdHJ5IHNlYXJjaGluZyBhZ2Fpbi4nXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9