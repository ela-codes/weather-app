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
    ["last_updated", "Last Updated On (Local)"], 
    ["precip_mm", "Precipitation (mm)"]
]

const locationInfo = [
    ["country", "Country"], 
    ["name", "City"], 
    ["region", "Province"]
]

let currLocation = 'London'
let currDayStatus = 1

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
        updateBackground(currDayStatus, data.current.is_day)
        currDayStatus = data.current.is_day
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

function updateBackground(currStatus, newStatus) {
    if (newStatus !== currStatus) { // if same, no need to load again
        // 0 = night, 1 = day
        const bg = document.querySelector('#background');
        try {
            if (newStatus === 1) {
                bg.src = "./background/day.mp4"
            } if (newStatus === 0) {
                bg.src = "./background/night.mp4"
            }
        } catch(err) {
            handleError(err)
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUEseUJBQXlCLFNBQVM7QUFDbEM7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmtHOztBQUVsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDLGFBQWE7QUFDeEQ7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHdEQUFnQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBZ0I7QUFDeEI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7OztBQUdBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDBEQUFpQjs7QUFFN0IsWUFBWSwwREFBaUI7QUFDN0IsVUFBVTtBQUNWLFlBQVkseURBQWlCO0FBQzdCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxRQUFRLHlEQUFpQjtBQUN6QixLQUFLO0FBQ0w7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUeHRDb250ZW50KGhlYWRlciwgY29udGVudCwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoNC50ZXh0Q29udGVudCA9IGhlYWRlclxuICAgIHRleHQudGV4dENvbnRlbnQgPSBTdHJpbmcoY29udGVudClcbiAgICBkaXYuYXBwZW5kKGg0LCB0ZXh0KVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUltZ0NvbnRlbnQoaW1nRmlsZSwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy5zcmMgPSBpbWdGaWxlXG5cbiAgICBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAnKVxuICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVPbGREaXNwbGF5KCkge1xuICAgIGNvbnN0IG5vZGVzID0gbWFpbi5jaGlsZE5vZGVzXG4gICAgY29uc3QgbGVuZ3RoID0gbWFpbi5jaGlsZE5vZGVzLmxlbmd0aC0xXG5cbiAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID49IDAgOyBpLS0pIHtcbiAgICAgICAgbm9kZXNbaV0ucmVtb3ZlKCkgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRTZWFyY2hJbnB1dCgpIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2NhdGlvbi1zZWFyY2gnKVxuICAgIGlucHV0LnZhbHVlID0gJydcbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5VHh0Q29udGVudCwgZGlzcGxheUltZ0NvbnRlbnQsIHJlbW92ZU9sZERpc3BsYXksIHJlc2V0U2VhcmNoSW5wdXQgfSBmcm9tICcuL3VpLmpzJ1xuXG5jb25zdCBjdXJySW5mbyA9IFtcbiAgICBbXCJ0ZW1wX2NcIiwgXCJcIl0sXG4gICAgW1wiY29uZGl0aW9uXCIsIFwiXCJdLFxuICAgIFtcImZlZWxzbGlrZV9jXCIsIFwiRmVlbHMgTGlrZSAowrBDKVwiXSwgXG4gICAgW1wiaHVtaWRpdHlcIiwgXCJIdW1pZGl0eVwiXSxcbiAgICBbXCJsYXN0X3VwZGF0ZWRcIiwgXCJMYXN0IFVwZGF0ZWQgT24gKExvY2FsKVwiXSwgXG4gICAgW1wicHJlY2lwX21tXCIsIFwiUHJlY2lwaXRhdGlvbiAobW0pXCJdXG5dXG5cbmNvbnN0IGxvY2F0aW9uSW5mbyA9IFtcbiAgICBbXCJjb3VudHJ5XCIsIFwiQ291bnRyeVwiXSwgXG4gICAgW1wibmFtZVwiLCBcIkNpdHlcIl0sIFxuICAgIFtcInJlZ2lvblwiLCBcIlByb3ZpbmNlXCJdXG5dXG5cbmxldCBjdXJyTG9jYXRpb24gPSAnTG9uZG9uJ1xubGV0IGN1cnJEYXlTdGF0dXMgPSAxXG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlcih1cmwpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6ICdjb3JzJ30pXG4gICAgICAgIGNvbnN0IGRhdGFQcm9taXNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgICAgIHJldHVybiBkYXRhUHJvbWlzZVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVycilcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldERhdGEodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoV2VhdGhlcih1cmwpXG4gICAgICAgIGV4dHJhY3RDdXJyV2VhdGhlcihkYXRhLmN1cnJlbnQpXG4gICAgICAgIGV4dHJhY3RMb2NhdGlvbihkYXRhLmxvY2F0aW9uKVxuICAgICAgICB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJEYXlTdGF0dXMsIGRhdGEuY3VycmVudC5pc19kYXkpXG4gICAgICAgIGN1cnJEYXlTdGF0dXMgPSBkYXRhLmN1cnJlbnQuaXNfZGF5XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVycilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkVVJMKGxvY2F0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gXCJodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PWNjZDNkZGMxODJlNzQxNzM5NDAxMjM3NDAyMzI5MDMmcT1cIiAvL3B1YmxpYyBmcmVlLXVzZSB3ZWF0aGVyIGFwaSBrZXlcbiAgICBjb25zdCBwYXJhbSA9IFwiJmFxaT1ub1wiXG4gICAgcmV0dXJuIGtleSArIGxvY2F0aW9uICsgcGFyYW1cbn1cblxuZnVuY3Rpb24gc2hvd05ld0xvY2F0aW9uKGxvY2F0aW9uKSB7XG4gICAgcmVtb3ZlT2xkRGlzcGxheSgpXG4gICAgZ2V0RGF0YShidWlsZFVSTChsb2NhdGlvbikpXG59XG5cbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0I2xvY2F0aW9uLXNlYXJjaCcpXG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgY3VyckxvY2F0aW9uID0gc2VhcmNoLnZhbHVlXG4gICAgICAgIHJlc2V0U2VhcmNoSW5wdXQoKVxuICAgICAgICBzaG93TmV3TG9jYXRpb24oY3VyckxvY2F0aW9uKVxuICAgIH1cbn0pXG5cbmdldERhdGEoYnVpbGRVUkwoY3VyckxvY2F0aW9uKSlcblxuXG5jb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9nZ2xlJylcblxudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBpZiAodG9nZ2xlLmNoZWNrZWQpIHsgLy8gY2hhbmdlIHRvIGZhcmVuaGVpdFxuICAgICAgICBjdXJySW5mb1swXSA9IFtcInRlbXBfZlwiLCBcIlwiXVxuICAgICAgICBjdXJySW5mb1syXSA9IFtcImZlZWxzbGlrZV9mXCIsIFwiRmVlbHMgTGlrZSAowrBGKVwiXVxuICAgICAgICBzaG93TmV3TG9jYXRpb24oY3VyckxvY2F0aW9uKVxuICAgICAgICBjb25zb2xlLmxvZyhjdXJySW5mbylcbiAgICB9IGVsc2Uge1xuICAgICAgICBjdXJySW5mb1swXSA9IFtcInRlbXBfY1wiLCBcIlwiXVxuICAgICAgICBjdXJySW5mb1syXSA9IFtcImZlZWxzbGlrZV9jXCIsIFwiRmVlbHMgTGlrZSAowrBDKVwiXVxuICAgICAgICBzaG93TmV3TG9jYXRpb24oY3VyckxvY2F0aW9uKVxuICAgIH1cbn0pXG5cblxuZnVuY3Rpb24gZXh0cmFjdEN1cnJXZWF0aGVyKGRhdGEpIHtcbiAgICBjdXJySW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICBpZiAoaW5mb1swXSA9PT0gXCJjb25kaXRpb25cIikge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVyVXJsID0gXCJodHRwczpcIiArIGRhdGEuY29uZGl0aW9uWydpY29uJ11cbiAgICAgICAgICAgIGRpc3BsYXlJbWdDb250ZW50KHByb3BlclVybCwgXCJjb25kaXRpb24taWNvblwiKVxuXG4gICAgICAgICAgICBkaXNwbGF5VHh0Q29udGVudChcIkNvbmRpdGlvblwiLCBkYXRhLmNvbmRpdGlvblsndGV4dCddLCBcImNvbmRpdGlvbi10ZXh0XCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5VHh0Q29udGVudChpbmZvWzFdLCBkYXRhW2luZm9bMF1dLCBpbmZvWzBdKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZXh0cmFjdExvY2F0aW9uKGRhdGEpIHtcbiAgICBsb2NhdGlvbkluZm8uZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoaW5mb1sxXSwgZGF0YVtpbmZvWzBdXSwgaW5mb1swXSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB1cGRhdGVCYWNrZ3JvdW5kKGN1cnJTdGF0dXMsIG5ld1N0YXR1cykge1xuICAgIGlmIChuZXdTdGF0dXMgIT09IGN1cnJTdGF0dXMpIHsgLy8gaWYgc2FtZSwgbm8gbmVlZCB0byBsb2FkIGFnYWluXG4gICAgICAgIC8vIDAgPSBuaWdodCwgMSA9IGRheVxuICAgICAgICBjb25zdCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobmV3U3RhdHVzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvZGF5Lm1wNFwiXG4gICAgICAgICAgICB9IGlmIChuZXdTdGF0dXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBiZy5zcmMgPSBcIi4vYmFja2dyb3VuZC9uaWdodC5tcDRcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgaGFuZGxlRXJyb3IoZXJyKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnIpIHtcbiAgICBjb25zb2xlLmxvZyhlcnIpXG5cbiAgICBjb25zdCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvYWZ0ZXJub29uLm1wNFwiXG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlcicpXG4gICAgZGl2LmlubmVySFRNTCA9ICc8YnI+IFNvcnJ5LCBwbGVhc2UgdHJ5IHNlYXJjaGluZyBhZ2Fpbi4nXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9