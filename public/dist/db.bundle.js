/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/assets/js/indexedDb.js":
/*!***************************************!*\
  !*** ./public/assets/js/indexedDb.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"saveRecord\": () => (/* binding */ saveRecord)\n/* harmony export */ });\nvar db;\nvar request = indexedDB.open('budget-tracker', 1);\n\nrequest.onupgradeneeded = function (event) {\n  var db = event.target.result;\n  db.createObjectStore('new_transaction', {\n    autoIncrement: true\n  });\n};\n\nrequest.onsuccess = function (event) {\n  db = event.target.result;\n\n  if (navigator.onLine) {\n    uploadTransaction();\n  }\n};\n\nrequest.onerror = function (event) {\n  console.log(event.target.errorCode);\n};\n\nfunction saveRecord(record) {\n  var transaction = db.transaction(['new_transaction'], 'readwrite');\n  var transObjectStore = transaction.objectStore('new_transaction');\n  transObjectStore.add(record);\n}\n;\n\nfunction uploadTransaction() {\n  var transaction = db.transaction(['new_transaction'], 'readwrite');\n  var transObjectStore = transaction.objectStore('new_transaction');\n  var getAll = transObjectStore.getAll();\n\n  getAll.onsuccess = function () {\n    if (getAll.result.length > 0) {\n      fetch('/api/transaction/bulk', {\n        method: 'POST',\n        body: JSON.stringify(getAll.result),\n        headers: {\n          Accept: 'application/json, text/plain, */*',\n          'Content-Type': 'application/json'\n        }\n      }).then(function (response) {\n        return response.json();\n      }).then(function (serverResponse) {\n        if (serverResponse.message) {\n          throw new Error(serverResponse);\n        }\n\n        var transaction = db.transaction(['new_transaction'], 'readwrite');\n        var transObjectStore = transaction.objectStore('new_transaction');\n        transObjectStore.clear();\n        alert('Offline transactions now submitted.');\n      })[\"catch\"](function (err) {\n        console.log(err);\n      });\n    }\n  };\n}\n\n;\n\nfunction deletePending() {\n  var transaction = db.transaction([\"new_transaction\"], \"readwrite\");\n  var transObjectStore = transaction.objectStore(\"new_transaction\");\n  transObjectStore.clear();\n}\n\nwindow.addEventListener('online', uploadTransaction);\n\n//# sourceURL=webpack://budget-app/./public/assets/js/indexedDb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/assets/js/indexedDb.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;