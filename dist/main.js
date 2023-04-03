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
/* harmony export */   "displayTxtContent": () => (/* binding */ displayTxtContent)
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ3ZCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZEOztBQUU3RDs7O0FBR0E7QUFDQTtBQUNBLDJDQUEyQyxhQUFhO0FBQ3hEO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQWlCOztBQUU3QixZQUFZLDBEQUFpQjtBQUM3QixVQUFVO0FBQ1YsUUFBUSx5REFBaUI7QUFDekI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFFBQVEseURBQWlCO0FBQ3pCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3VpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyJylcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUeHRDb250ZW50KGhlYWRlciwgY29udGVudCwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0JylcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoNC50ZXh0Q29udGVudCA9IGhlYWRlclxuICAgIHRleHQudGV4dENvbnRlbnQgPSBTdHJpbmcoY29udGVudClcbiAgICBkaXYuYXBwZW5kKGg0LCB0ZXh0KVxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUltZ0NvbnRlbnQoaW1nRmlsZSwgY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNsYXNzTmFtZSlcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy5zcmMgPSBpbWdGaWxlXG5cbiAgICBpbWcuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAnKVxuICAgIGRpdi5hcHBlbmRDaGlsZChpbWcpXG4gICAgbWFpbi5hcHBlbmRDaGlsZChkaXYpXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBkaXNwbGF5VHh0Q29udGVudCwgZGlzcGxheUltZ0NvbnRlbnR9IGZyb20gJy4vdWkuanMnXG5cbmNvbnN0IHVybCA9IFwiaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvY3VycmVudC5qc29uP2tleT1jY2QzZGRjMTgyZTc0MTczOTQwMTIzNzQwMjMyOTAzJnE9V2lubmlwZWcmYXFpPW5vXCIgLy9wdWJsaWMgZnJlZS11c2Ugd2VhdGhlciBhcGkga2V5XG5cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyKHVybCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7bW9kZTogJ2NvcnMnfSlcbiAgICAgICAgY29uc3QgZGF0YVByb21pc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICAgICAgcmV0dXJuIGRhdGFQcm9taXNlXG4gICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICB9XG59XG5cbmNvbnN0IGN1cnJJbmZvID0gW1xuICAgIFtcInRlbXBfY1wiLCBcIlwiXSxcbiAgICBbXCJjb25kaXRpb25cIiwgXCJcIl0sXG4gICAgW1wiZmVlbHNsaWtlX2NcIiwgXCJGZWVscyBMaWtlICjCsEMpXCJdLCBcbiAgICBbXCJodW1pZGl0eVwiLCBcIkh1bWlkaXR5XCJdLFxuICAgIFtcImxhc3RfdXBkYXRlZFwiLCBcIkxhc3QgVXBkYXRlZCBPblwiXSwgXG4gICAgW1wicHJlY2lwX21tXCIsIFwiUHJlY2lwaXRhdGlvbiAobW0pXCJdXG5dXG5cbmNvbnN0IGxvY2F0aW9uSW5mbyA9IFtcbiAgICBbXCJjb3VudHJ5XCIsIFwiQ291bnRyeVwiXSwgXG4gICAgW1wibG9jYWx0aW1lXCIsIFwiRGF0ZSAmIFRpbWVcIl0sXG4gICAgW1wibmFtZVwiLCBcIkNpdHlcIl0sIFxuICAgIFtcInJlZ2lvblwiLCBcIlByb3ZpbmNlXCJdXG5dXG4gICAgXG5cbmNvbnN0IHdlYXRoZXIgPSBmZXRjaFdlYXRoZXIodXJsKS50aGVuKGRhdGEgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgZXh0cmFjdEN1cnJXZWF0aGVyKGRhdGEuY3VycmVudClcbiAgICBleHRyYWN0TG9jYXRpb24oZGF0YS5sb2NhdGlvbilcbiAgICB1cGRhdGVCYWNrZ3JvdW5kKGRhdGEuY3VycmVudC5pc19kYXkpXG59KVxuXG5mdW5jdGlvbiBleHRyYWN0Q3VycldlYXRoZXIoZGF0YSkge1xuICAgIC8vIHdlYXRoZXIgdGVtcHNcbiAgICBjdXJySW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICBpZiAoaW5mb1swXSA9PT0gXCJjb25kaXRpb25cIikge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVyVXJsID0gXCJodHRwczpcIiArIGRhdGEuY29uZGl0aW9uWydpY29uJ11cbiAgICAgICAgICAgIGRpc3BsYXlJbWdDb250ZW50KHByb3BlclVybCwgXCJjb25kaXRpb24taWNvblwiKVxuXG4gICAgICAgICAgICBkaXNwbGF5VHh0Q29udGVudChcIkNvbmRpdGlvblwiLCBkYXRhLmNvbmRpdGlvblsndGV4dCddLCBcImNvbmRpdGlvbi10ZXh0XCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc3BsYXlUeHRDb250ZW50KGluZm9bMV0sIGRhdGFbaW5mb1swXV0sIGluZm9bMF0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBleHRyYWN0TG9jYXRpb24oZGF0YSkge1xuICAgIGxvY2F0aW9uSW5mby5mb3JFYWNoKGluZm8gPT4ge1xuICAgICAgICBkaXNwbGF5VHh0Q29udGVudChpbmZvWzFdLCBkYXRhW2luZm9bMF1dLCBpbmZvWzBdKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJhY2tncm91bmQoc3RhdHVzKSB7XG4gICAgLy8gMCA9IG5pZ2h0LCAxID0gZGF5XG4gICAgY29uc3QgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmFja2dyb3VuZCcpXG4gICAgaWYgKHN0YXR1cyA9PT0gMSkge1xuICAgICAgICBiZy5zcmMgPSBcIi4vYmFja2dyb3VuZC9kYXkubXA0XCJcbiAgICB9IGlmIChzdGF0dXMgPT09IDApIHtcbiAgICAgICAgYmcuc3JjID0gXCIuL2JhY2tncm91bmQvbmlnaHQubXA0XCJcbiAgICB9IGVsc2Uge1xuICAgICAgICBiZy5zcmMgPSBcIi4vYmFja2dyb3VuZC9hZnRlcm5vb24ubXA0XCJcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=