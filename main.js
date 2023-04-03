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
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_0__.removeOldDisplay)()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQSx5QkFBeUIsU0FBUztBQUNsQztBQUNBO0FBQ0E7Ozs7OztVQ2hDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTitFOztBQUUvRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUksd0RBQWdCO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwwREFBaUI7O0FBRTdCLFlBQVksMERBQWlCO0FBQzdCLFVBQVU7QUFDVixZQUFZLHlEQUFpQjtBQUM3QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx5REFBaUI7QUFDekIsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUeHRDb250ZW50KGhlYWRlciwgY29udGVudCwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoNC50ZXh0Q29udGVudCA9IGhlYWRlclxuICAgIHRleHQudGV4dENvbnRlbnQgPSBTdHJpbmcoY29udGVudClcbiAgICBkaXYuYXBwZW5kKGg0LCB0ZXh0KVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUltZ0NvbnRlbnQoaW1nRmlsZSwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy5zcmMgPSBpbWdGaWxlXG5cbiAgICBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAnKVxuICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVPbGREaXNwbGF5KCkge1xuICAgIGNvbnN0IG5vZGVzID0gbWFpbi5jaGlsZE5vZGVzXG4gICAgY29uc3QgbGVuZ3RoID0gbWFpbi5jaGlsZE5vZGVzLmxlbmd0aC0xXG5cbiAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID49IDAgOyBpLS0pIHtcbiAgICAgICAgbm9kZXNbaV0ucmVtb3ZlKCkgXG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZGlzcGxheVR4dENvbnRlbnQsIGRpc3BsYXlJbWdDb250ZW50LCByZW1vdmVPbGREaXNwbGF5fSBmcm9tICcuL3VpLmpzJ1xuXG5jb25zdCB1cmwgPSBcImh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9Y2NkM2RkYzE4MmU3NDE3Mzk0MDEyMzc0MDIzMjkwMyZxPUxvbmRvbiZhcWk9bm9cIiAvL3B1YmxpYyBmcmVlLXVzZSB3ZWF0aGVyIGFwaSBrZXlcblxuY29uc3QgY3VyckluZm8gPSBbXG4gICAgW1widGVtcF9jXCIsIFwiXCJdLFxuICAgIFtcImNvbmRpdGlvblwiLCBcIlwiXSxcbiAgICBbXCJmZWVsc2xpa2VfY1wiLCBcIkZlZWxzIExpa2UgKMKwQylcIl0sIFxuICAgIFtcImh1bWlkaXR5XCIsIFwiSHVtaWRpdHlcIl0sXG4gICAgW1wibGFzdF91cGRhdGVkXCIsIFwiTGFzdCBVcGRhdGVkIE9uXCJdLCBcbiAgICBbXCJwcmVjaXBfbW1cIiwgXCJQcmVjaXBpdGF0aW9uIChtbSlcIl1cbl1cblxuY29uc3QgbG9jYXRpb25JbmZvID0gW1xuICAgIFtcImNvdW50cnlcIiwgXCJDb3VudHJ5XCJdLCBcbiAgICBbXCJsb2NhbHRpbWVcIiwgXCJEYXRlICYgVGltZVwiXSxcbiAgICBbXCJuYW1lXCIsIFwiQ2l0eVwiXSwgXG4gICAgW1wicmVnaW9uXCIsIFwiUHJvdmluY2VcIl1cbl1cblxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIodXJsKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHttb2RlOiAnY29ycyd9KVxuICAgICAgICBjb25zdCBkYXRhUHJvbWlzZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgICAgICByZXR1cm4gZGF0YVByb21pc2VcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIodXJsKVxuICAgICAgICBleHRyYWN0Q3VycldlYXRoZXIoZGF0YS5jdXJyZW50KVxuICAgICAgICBleHRyYWN0TG9jYXRpb24oZGF0YS5sb2NhdGlvbilcbiAgICAgICAgdXBkYXRlQmFja2dyb3VuZChkYXRhLmN1cnJlbnQuaXNfZGF5KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBoYW5kbGVFcnJvcihlcnIpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBidWlsZFVSTChsb2NhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT1jY2QzZGRjMTgyZTc0MTczOTQwMTIzNzQwMjMyOTAzJnE9XCJcbiAgICBjb25zdCBwYXJhbSA9IFwiJmFxaT1ub1wiXG4gICAgcmV0dXJuIGtleSArIGxvY2F0aW9uICsgcGFyYW1cbn1cblxuZnVuY3Rpb24gc2hvd05ld0xvY2F0aW9uKCkge1xuICAgIHJlbW92ZU9sZERpc3BsYXkoKVxuICAgIGdldERhdGEoYnVpbGRVUkwoc2VhcmNoLnZhbHVlKSlcbn1cblxuY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQjbG9jYXRpb24tc2VhcmNoJylcbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMykgc2hvd05ld0xvY2F0aW9uKClcbn0pXG5cbmdldERhdGEodXJsKVxuXG5cblxuZnVuY3Rpb24gZXh0cmFjdEN1cnJXZWF0aGVyKGRhdGEpIHtcbiAgICBjdXJySW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICBpZiAoaW5mb1swXSA9PT0gXCJjb25kaXRpb25cIikge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVyVXJsID0gXCJodHRwczpcIiArIGRhdGEuY29uZGl0aW9uWydpY29uJ11cbiAgICAgICAgICAgIGRpc3BsYXlJbWdDb250ZW50KHByb3BlclVybCwgXCJjb25kaXRpb24taWNvblwiKVxuXG4gICAgICAgICAgICBkaXNwbGF5VHh0Q29udGVudChcIkNvbmRpdGlvblwiLCBkYXRhLmNvbmRpdGlvblsndGV4dCddLCBcImNvbmRpdGlvbi10ZXh0XCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaXNwbGF5VHh0Q29udGVudChpbmZvWzFdLCBkYXRhW2luZm9bMF1dLCBpbmZvWzBdKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZXh0cmFjdExvY2F0aW9uKGRhdGEpIHtcbiAgICBsb2NhdGlvbkluZm8uZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgZGlzcGxheVR4dENvbnRlbnQoaW5mb1sxXSwgZGF0YVtpbmZvWzBdXSwgaW5mb1swXSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB1cGRhdGVCYWNrZ3JvdW5kKHN0YXR1cykge1xuICAgIGNvbnNvbGUubG9nKHN0YXR1cylcbiAgICAvLyAwID0gbmlnaHQsIDEgPSBkYXlcbiAgICBjb25zdCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYWNrZ3JvdW5kJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkge1xuICAgICAgICAgICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvZGF5Lm1wNFwiXG4gICAgICAgIH0gaWYgKHN0YXR1cyA9PT0gMCkge1xuICAgICAgICAgICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvbmlnaHQubXA0XCJcbiAgICAgICAgfVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGhhbmRsZUVycm9yKGVycilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycilcblxuICAgIGNvbnN0IGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JhY2tncm91bmQnKTtcbiAgICBiZy5zcmMgPSBcIi4vYmFja2dyb3VuZC9hZnRlcm5vb24ubXA0XCJcblxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcbiAgICBkaXYuaW5uZXJIVE1MID0gJzxicj4gU29ycnksIHBsZWFzZSB0cnkgc2VhcmNoaW5nIGFnYWluLidcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=