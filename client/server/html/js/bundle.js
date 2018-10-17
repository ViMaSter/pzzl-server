/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/Piece.ts":
/*!***************************!*\
  !*** ./src/game/Piece.ts ***!
  \***************************/
/*! exports provided: MouseListener, Piece, PieceGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MouseListener", function() { return MouseListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Piece", function() { return Piece; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieceGrid", function() { return PieceGrid; });
/* harmony import */ var util_Vector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util/Vector2 */ "./src/util/Vector2.ts");

var MouseListener = /** @class */ (function () {
    function MouseListener() {
        this.lastPosition = new util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](-1, -1);
        this.updateListener = [];
        window.addEventListener("mousemove", this.updateMousePosition.bind(this));
        window.addEventListener("mousedown", this.updateMousePosition.bind(this));
        window.addEventListener("touchmove", this.updateTouchPosition.bind(this), { capture: true, passive: false });
        window.addEventListener("touchstart", this.updateTouchPosition.bind(this), { capture: true, passive: false });
    }
    MouseListener.prototype.UpdatePosition = function (newPosition) {
        var deltaPosition = util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"].delta(newPosition, this.lastPosition);
        this.Update(this.lastPosition, newPosition, deltaPosition);
        this.lastPosition = newPosition;
    };
    MouseListener.prototype.updateMousePosition = function (event) {
        var newPosition = new util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](event.clientX, event.clientY);
        this.UpdatePosition(newPosition);
        event.preventDefault();
    };
    MouseListener.prototype.updateTouchPosition = function (event) {
        event.preventDefault();
        if (event.touches.item(0) == null) {
            return;
        }
        var firstTouch = event.touches.item(0);
        var newPosition = new util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](firstTouch.screenX, firstTouch.screenY);
        this.UpdatePosition(newPosition);
    };
    MouseListener.prototype.attach = function (newListener) {
        var listenerIndex = this.updateListener.indexOf(newListener);
        if (listenerIndex != -1) {
            console.error("Attempting to attach an lister that's already attached");
            return;
        }
        this.updateListener.push(newListener);
    };
    MouseListener.prototype.deattach = function (newListener) {
        var listenerIndex = this.updateListener.indexOf(newListener);
        if (listenerIndex == -1) {
            console.warn("Attempting to remove a listener that wasn't queued");
        }
        this.updateListener.splice(listenerIndex, 1);
    };
    MouseListener.prototype.Update = function (lastPosition, newPosition, deltaPosition) {
        var _this = this;
        this.updateListener.forEach(function (listener) {
            listener(_this.lastPosition, newPosition, deltaPosition);
        });
    };
    return MouseListener;
}());

var Piece = /** @class */ (function () {
    function Piece(position, onSelect, onDeselect) {
        var _this = this;
        this.position = new util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](-1, -1);
        this.position = position;
        this.element = document.createElement("canvas");
        this.element.classList.add("piece");
        this.element.dataset.x = position.x + "";
        this.element.dataset.y = position.y + "";
        this.element.addEventListener("touchstart", function () { onSelect(_this); });
        this.element.addEventListener("mousedown", function () { onSelect(_this); });
        window.addEventListener("touchend", function () { onDeselect(_this); });
        window.addEventListener("mouseup", function () { onDeselect(_this); });
    }
    Piece.prototype.moveBy = function (delta) {
        var oldPosition = util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"].fromString(this.element.style.left || "0", this.element.style.top || "0");
        this.element.style.left = (oldPosition.x + delta.x) + "px";
        this.element.style.top = (oldPosition.y + delta.y) + "px";
    };
    return Piece;
}());

var PieceGrid = /** @class */ (function () {
    function PieceGrid(dimensions, onSelect, onDeselect) {
        this.data = [];
        this.maxSize = dimensions;
        for (var x = 0; x < this.maxSize.x; x++) {
            this.data[x] = [];
            for (var y = 0; y < this.maxSize.y; y++) {
                var position = new util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](x, y);
                this.data[x][y] = new Piece(position, onSelect, onDeselect);
            }
        }
    }
    PieceGrid.prototype.item = function (position) {
        if (position.x >= this.maxSize.x) {
            console.error("Attempting to access grid column " + position.x + ", which is bigger than " + (this.maxSize.x - 1) + "!");
            return null;
        }
        if (position.y >= this.maxSize.y) {
            console.error("Attempting to access grid row " + position.y + ", which is bigger than " + (this.maxSize.y - 1) + "!");
            return null;
        }
        return this.data[position.x][position.y];
    };
    PieceGrid.prototype.itemFromElement = function (element) {
        if (typeof element.dataset.x == "undefined" || typeof element.dataset.y == "undefined") {
            console.error("Cannot look up element %o in grid, as it's not a valid piece!", element);
        }
        return this.item(util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"].fromString(element.dataset.x, element.dataset.y));
    };
    return PieceGrid;
}());



/***/ }),

/***/ "./src/game/Puzzle.ts":
/*!****************************!*\
  !*** ./src/game/Puzzle.ts ***!
  \****************************/
/*! exports provided: Puzzle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Puzzle", function() { return Puzzle; });
/* harmony import */ var _util_Vector2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../util/Vector2 */ "./src/util/Vector2.ts");
/* harmony import */ var _Piece__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Piece */ "./src/game/Piece.ts");


var Puzzle = /** @class */ (function () {
    function Puzzle(rootElement, dimensions) {
        this.activePiece = null;
        this.rootElement = rootElement;
        this.playingField = this.rootElement.querySelector("#playingfield");
        this.listener = new _Piece__WEBPACK_IMPORTED_MODULE_1__["MouseListener"]();
        this.pieces = new _Piece__WEBPACK_IMPORTED_MODULE_1__["PieceGrid"](dimensions, this.onSelectItem.bind(this), this.onDeselectItem.bind(this));
        this.GenerateGrid();
        this.listener.attach(this.Update.bind(this));
    }
    Puzzle.prototype.GenerateGrid = function () {
        for (var x = 0; x < this.pieces.maxSize.x; x++) {
            for (var y = 0; y < this.pieces.maxSize.y; y++) {
                var position = new _util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"](x, y);
                var item = this.pieces.item(position);
                if (item == null) {
                    break;
                }
                this.playingField.appendChild(item.element);
            }
        }
    };
    Puzzle.prototype.onSelectItem = function (piece) {
        console.log("Selecting element %o [%d, %d]", piece.element, piece.position.x, piece.position.y);
        if (this.activePiece != null) {
            console.error("Cannot select a new piece, as there is still another one selected");
            return;
        }
        this.activePiece = piece;
    };
    Puzzle.prototype.onDeselectItem = function (piece) {
        if (this.activePiece == null) {
            return;
        }
        console.log("Attempting to deselect element %o [%d, %d]", piece.element, piece.position.x, piece.position.y);
        this.fixPosition(this.activePiece);
        this.activePiece = null;
    };
    Puzzle.prototype.fixPosition = function (piece) {
        var pieceBounds = piece.element.getBoundingClientRect();
        var boardBounds = this.rootElement.getBoundingClientRect();
        var helperPadding = 10;
        var overlap = new _util_Vector2__WEBPACK_IMPORTED_MODULE_0__["Vector2"]();
        if (pieceBounds.left < boardBounds.left) {
            overlap.x += boardBounds.left - pieceBounds.left + helperPadding;
        }
        if (pieceBounds.right > boardBounds.right) {
            overlap.x -= pieceBounds.right - boardBounds.right + helperPadding;
        }
        if (pieceBounds.top < boardBounds.top) {
            overlap.y += boardBounds.top - pieceBounds.top + helperPadding;
        }
        if (pieceBounds.bottom > boardBounds.bottom) {
            overlap.y -= pieceBounds.bottom - boardBounds.bottom + helperPadding;
        }
        console.log("Correcting piece %o by [%d, %d] to stay in frame", piece, overlap.x, overlap.y);
        piece.moveBy(overlap);
    };
    Puzzle.prototype.Update = function (lastPosition, newPosition, deltaPosition) {
        if (this.activePiece == null) {
            return;
        }
        this.activePiece.moveBy(deltaPosition);
    };
    return Puzzle;
}());

;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Vector2_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/Vector2.ts */ "./src/util/Vector2.ts");
/* harmony import */ var _game_Puzzle_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/Puzzle.ts */ "./src/game/Puzzle.ts");


window.addEventListener("load", function () {
    var PuzzleLogic = new _game_Puzzle_ts__WEBPACK_IMPORTED_MODULE_1__["Puzzle"](document.querySelector("#puzzle"), new _util_Vector2_ts__WEBPACK_IMPORTED_MODULE_0__["Vector2"](5, 5));
});


/***/ }),

/***/ "./src/util/Vector2.ts":
/*!*****************************!*\
  !*** ./src/util/Vector2.ts ***!
  \*****************************/
/*! exports provided: Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    Vector2.fromString = function (x, y) {
        return new Vector2(parseInt(x), parseInt(y));
    };
    Vector2.delta = function (posA, posB) {
        return new Vector2(posA.x - posB.x, posA.y - posB.y);
    };
    return Vector2;
}());



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvUGllY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvUHV6emxlLnRzIiwid2VicGFjazovLy8uL3NyYy9tYWluLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlsL1ZlY3RvcjIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQStDO0FBSS9DO0lBSUM7UUFGQSxpQkFBWSxHQUFhLElBQUksb0RBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLG1CQUFjLEdBQTZCLEVBQUUsQ0FBQztRQUc3QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJ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TUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtJQUUvQixJQUFNLFdBQVcsR0FBWSxJQUFJLHNEQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQWdCLEVBQUUsSUFBSSx3REFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDTkg7QUFBQTtBQUFBO0lBSUMsaUJBQVksQ0FBYyxFQUFFLENBQWM7UUFBOUIseUJBQWM7UUFBRSx5QkFBYztRQUYxQyxNQUFDLEdBQVksQ0FBQyxDQUFDO1FBQ2YsTUFBQyxHQUFZLENBQUMsQ0FBQztRQUdkLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBQ00sa0JBQVUsR0FBakIsVUFBa0IsQ0FBVSxFQUFFLENBQVU7UUFFdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNNLGFBQUssR0FBWixVQUFhLElBQWMsRUFBRSxJQUFjO1FBRTFDLE9BQU8sSUFBSSxPQUFPLENBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQ2YsQ0FBQztJQUNILENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiaW1wb3J0IHtWZWN0b3IyIGFzIFZlY3RvcjJ9IGZyb20gXCJ1dGlsL1ZlY3RvcjJcIlxyXG5cclxuZXhwb3J0IHR5cGUgTW91c2VMaXN0ZW5lckNhbGxiYWNrID0gKGxhc3RQb3NpdGlvbiA6IFZlY3RvcjIsIG5ld1Bvc2l0aW9uIDogVmVjdG9yMiwgZGVsdGFQb3NpdGlvbiA6IFZlY3RvcjIpID0+IHZvaWQ7XHJcbmV4cG9ydCB0eXBlIFRvZ2dsZUl0ZW1DYWxsYmFjayA9IChwaWVjZSA6IFBpZWNlKSA9PiB2b2lkO1xyXG5leHBvcnQgY2xhc3MgTW91c2VMaXN0ZW5lclxyXG57XHJcblx0bGFzdFBvc2l0aW9uIDogVmVjdG9yMiA9IG5ldyBWZWN0b3IyKC0xLCAtMSk7XHJcblx0dXBkYXRlTGlzdGVuZXIgOiBNb3VzZUxpc3RlbmVyQ2FsbGJhY2tbXSA9IFtdO1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLnVwZGF0ZU1vdXNlUG9zaXRpb24uYmluZCh0aGlzKSk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLnVwZGF0ZU1vdXNlUG9zaXRpb24uYmluZCh0aGlzKSk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLnVwZGF0ZVRvdWNoUG9zaXRpb24uYmluZCh0aGlzKSwge2NhcHR1cmU6IHRydWUsIHBhc3NpdmU6IGZhbHNlfSk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy51cGRhdGVUb3VjaFBvc2l0aW9uLmJpbmQodGhpcyksIHtjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiBmYWxzZX0pO1xyXG5cdH1cclxuXHRwcml2YXRlIFVwZGF0ZVBvc2l0aW9uKG5ld1Bvc2l0aW9uIDogVmVjdG9yMilcclxuXHR7XHJcblx0XHRjb25zdCBkZWx0YVBvc2l0aW9uID0gVmVjdG9yMi5kZWx0YShuZXdQb3NpdGlvbiwgdGhpcy5sYXN0UG9zaXRpb24pO1xyXG5cdFx0dGhpcy5VcGRhdGUodGhpcy5sYXN0UG9zaXRpb24sIG5ld1Bvc2l0aW9uLCBkZWx0YVBvc2l0aW9uKVxyXG5cdFx0dGhpcy5sYXN0UG9zaXRpb24gPSBuZXdQb3NpdGlvbjtcclxuXHR9XHJcblx0cHJpdmF0ZSB1cGRhdGVNb3VzZVBvc2l0aW9uKGV2ZW50IDogTW91c2VFdmVudClcclxuXHR7XHJcblx0XHRjb25zdCBuZXdQb3NpdGlvbiA6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMiAoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcblx0XHR0aGlzLlVwZGF0ZVBvc2l0aW9uKG5ld1Bvc2l0aW9uKTtcclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0fVxyXG5cdHByaXZhdGUgdXBkYXRlVG91Y2hQb3NpdGlvbihldmVudCA6IFRvdWNoRXZlbnQpXHJcblx0e1xyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGlmIChldmVudC50b3VjaGVzLml0ZW0oMCkgPT0gbnVsbClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgZmlyc3RUb3VjaCA6IFRvdWNoID0gZXZlbnQudG91Y2hlcy5pdGVtKDApIGFzIFRvdWNoO1xyXG5cdFx0Y29uc3QgbmV3UG9zaXRpb24gOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoZmlyc3RUb3VjaC5zY3JlZW5YLCBmaXJzdFRvdWNoLnNjcmVlblkpO1xyXG5cdFx0dGhpcy5VcGRhdGVQb3NpdGlvbihuZXdQb3NpdGlvbik7XHJcblx0fVxyXG5cclxuXHRhdHRhY2gobmV3TGlzdGVuZXIgOiBNb3VzZUxpc3RlbmVyQ2FsbGJhY2spXHJcblx0e1xyXG5cdFx0Y29uc3QgbGlzdGVuZXJJbmRleCA9IHRoaXMudXBkYXRlTGlzdGVuZXIuaW5kZXhPZihuZXdMaXN0ZW5lcik7XHJcblx0XHRpZiAobGlzdGVuZXJJbmRleCAhPSAtMSlcclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkF0dGVtcHRpbmcgdG8gYXR0YWNoIGFuIGxpc3RlciB0aGF0J3MgYWxyZWFkeSBhdHRhY2hlZFwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy51cGRhdGVMaXN0ZW5lci5wdXNoKG5ld0xpc3RlbmVyKTtcclxuXHR9XHJcblxyXG5cdGRlYXR0YWNoKG5ld0xpc3RlbmVyIDogTW91c2VMaXN0ZW5lckNhbGxiYWNrKVxyXG5cdHtcclxuXHRcdGNvbnN0IGxpc3RlbmVySW5kZXggPSB0aGlzLnVwZGF0ZUxpc3RlbmVyLmluZGV4T2YobmV3TGlzdGVuZXIpO1xyXG5cdFx0aWYgKGxpc3RlbmVySW5kZXggPT0gLTEpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUud2FybihcIkF0dGVtcHRpbmcgdG8gcmVtb3ZlIGEgbGlzdGVuZXIgdGhhdCB3YXNuJ3QgcXVldWVkXCIpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy51cGRhdGVMaXN0ZW5lci5zcGxpY2UobGlzdGVuZXJJbmRleCwgMSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIFVwZGF0ZShsYXN0UG9zaXRpb24gOiBWZWN0b3IyLCBuZXdQb3NpdGlvbiA6IFZlY3RvcjIsIGRlbHRhUG9zaXRpb24gOiBWZWN0b3IyKVxyXG5cdHtcclxuXHRcdHRoaXMudXBkYXRlTGlzdGVuZXIuZm9yRWFjaCgobGlzdGVuZXIgOiBNb3VzZUxpc3RlbmVyQ2FsbGJhY2spID0+XHJcblx0XHR7XHJcblx0XHRcdGxpc3RlbmVyKHRoaXMubGFzdFBvc2l0aW9uLCBuZXdQb3NpdGlvbiwgZGVsdGFQb3NpdGlvbik7XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBpZWNlXHJcbntcclxuXHRlbGVtZW50IDogSFRNTEVsZW1lbnQ7XHJcblx0cG9zaXRpb24gOiBWZWN0b3IyID0gbmV3IFZlY3RvcjIoLTEsIC0xKTtcclxuXHRjb25zdHJ1Y3Rvcihwb3NpdGlvbiA6IFZlY3RvcjIsIG9uU2VsZWN0IDogVG9nZ2xlSXRlbUNhbGxiYWNrLCBvbkRlc2VsZWN0IDogVG9nZ2xlSXRlbUNhbGxiYWNrKVxyXG5cdHtcclxuXHRcdHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHRcdHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBpZWNlXCIpO1x0XHJcblx0XHR0aGlzLmVsZW1lbnQuZGF0YXNldC54ID0gcG9zaXRpb24ueCArIFwiXCI7XHJcblx0XHR0aGlzLmVsZW1lbnQuZGF0YXNldC55ID0gcG9zaXRpb24ueSArIFwiXCI7XHJcblxyXG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXHRcInRvdWNoc3RhcnRcIixcdCgpPT57b25TZWxlY3QodGhpcyl9KTtcclxuXHRcdHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFx0XCJtb3VzZWRvd25cIixcdCgpPT57b25TZWxlY3QodGhpcyl9KTtcclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFx0XHRcInRvdWNoZW5kXCIsXHRcdCgpPT57b25EZXNlbGVjdCh0aGlzKX0pO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXHRcdFwibW91c2V1cFwiLFx0XHQoKT0+e29uRGVzZWxlY3QodGhpcyl9KTtcclxuXHR9XHJcblx0bW92ZUJ5KGRlbHRhIDogVmVjdG9yMilcclxuXHR7XHJcblx0XHRjb25zdCBvbGRQb3NpdGlvbiA9IFZlY3RvcjIuZnJvbVN0cmluZyh0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCB8fCBcIjBcIiwgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCB8fCBcIjBcIik7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IChvbGRQb3NpdGlvbi54ICsgZGVsdGEueCkgKyBcInB4XCI7XHJcblx0XHR0aGlzLmVsZW1lbnQuc3R5bGUudG9wID0gKG9sZFBvc2l0aW9uLnkgKyBkZWx0YS55KSArIFwicHhcIjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQaWVjZUdyaWRcclxue1xyXG5cdGRhdGEgOiBQaWVjZVtdW10gPSBbXTtcclxuXHRtYXhTaXplIDogVmVjdG9yMjtcclxuXHRjb25zdHJ1Y3RvcihkaW1lbnNpb25zIDogVmVjdG9yMiwgb25TZWxlY3QgOiBUb2dnbGVJdGVtQ2FsbGJhY2ssIG9uRGVzZWxlY3QgOiBUb2dnbGVJdGVtQ2FsbGJhY2spXHJcblx0e1xyXG5cdFx0dGhpcy5tYXhTaXplID0gZGltZW5zaW9ucztcclxuXHRcdGZvciAobGV0IHggOiBudW1iZXIgPSAwOyB4IDwgdGhpcy5tYXhTaXplLng7IHgrKylcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5kYXRhW3hdID0gW107XHJcblx0XHRcdGZvciAobGV0IHkgOiBudW1iZXIgPSAwOyB5IDwgdGhpcy5tYXhTaXplLnk7IHkrKylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGNvbnN0IHBvc2l0aW9uID0gbmV3IFZlY3RvcjIoeCwgeSk7XHJcblx0XHRcdFx0dGhpcy5kYXRhW3hdW3ldID0gbmV3IFBpZWNlKHBvc2l0aW9uLCBvblNlbGVjdCwgb25EZXNlbGVjdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGl0ZW0ocG9zaXRpb24gOiBWZWN0b3IyKSA6IFBpZWNlIHwgbnVsbFxyXG5cdHtcclxuXHRcdGlmIChwb3NpdGlvbi54ID49IHRoaXMubWF4U2l6ZS54KVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBBdHRlbXB0aW5nIHRvIGFjY2VzcyBncmlkIGNvbHVtbiAke3Bvc2l0aW9uLnh9LCB3aGljaCBpcyBiaWdnZXIgdGhhbiAke3RoaXMubWF4U2l6ZS54LTF9IWApO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHRcdGlmIChwb3NpdGlvbi55ID49IHRoaXMubWF4U2l6ZS55KVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGBBdHRlbXB0aW5nIHRvIGFjY2VzcyBncmlkIHJvdyAke3Bvc2l0aW9uLnl9LCB3aGljaCBpcyBiaWdnZXIgdGhhbiAke3RoaXMubWF4U2l6ZS55LTF9IWApO1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kYXRhW3Bvc2l0aW9uLnhdW3Bvc2l0aW9uLnldO1xyXG5cdH1cclxuXHJcblx0aXRlbUZyb21FbGVtZW50KGVsZW1lbnQgOiBIVE1MRWxlbWVudClcclxuXHR7XHJcblx0XHRpZiAodHlwZW9mIGVsZW1lbnQuZGF0YXNldC54ID09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGVsZW1lbnQuZGF0YXNldC55ID09IFwidW5kZWZpbmVkXCIpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJDYW5ub3QgbG9vayB1cCBlbGVtZW50ICVvIGluIGdyaWQsIGFzIGl0J3Mgbm90IGEgdmFsaWQgcGllY2UhXCIsIGVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuaXRlbShWZWN0b3IyLmZyb21TdHJpbmcoZWxlbWVudC5kYXRhc2V0LnggYXMgc3RyaW5nLCBlbGVtZW50LmRhdGFzZXQueSBhcyBzdHJpbmcpKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQge1ZlY3RvcjIgYXMgVmVjdG9yMn0gZnJvbSBcIi4vLi4vdXRpbC9WZWN0b3IyXCJcclxuaW1wb3J0ICogYXMgUHV6emxlUGllY2UgZnJvbSBcIi4vUGllY2VcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFB1enpsZVxyXG57XHJcblx0cm9vdEVsZW1lbnQgOiBIVE1MRWxlbWVudDtcclxuXHRwbGF5aW5nRmllbGQgOiBIVE1MRWxlbWVudDtcclxuXHRwaWVjZXMgOiBQdXp6bGVQaWVjZS5QaWVjZUdyaWQ7XHJcblx0YWN0aXZlUGllY2UgOiBQdXp6bGVQaWVjZS5QaWVjZSB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRsaXN0ZW5lciA6IFB1enpsZVBpZWNlLk1vdXNlTGlzdGVuZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHJvb3RFbGVtZW50IDogSFRNTEVsZW1lbnQsIGRpbWVuc2lvbnMgOiBWZWN0b3IyKVxyXG5cdHtcclxuXHRcdHRoaXMucm9vdEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+cm9vdEVsZW1lbnQ7XHJcblx0XHR0aGlzLnBsYXlpbmdGaWVsZCA9IDxIVE1MRWxlbWVudD50aGlzLnJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGxheWluZ2ZpZWxkXCIpO1xyXG5cclxuXHRcdHRoaXMubGlzdGVuZXIgPSBuZXcgUHV6emxlUGllY2UuTW91c2VMaXN0ZW5lcigpO1xyXG5cdFx0dGhpcy5waWVjZXMgPSBuZXcgUHV6emxlUGllY2UuUGllY2VHcmlkKGRpbWVuc2lvbnMsIHRoaXMub25TZWxlY3RJdGVtLmJpbmQodGhpcyksIHRoaXMub25EZXNlbGVjdEl0ZW0uYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5HZW5lcmF0ZUdyaWQoKTtcclxuXHJcblx0XHR0aGlzLmxpc3RlbmVyLmF0dGFjaCh0aGlzLlVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgR2VuZXJhdGVHcmlkKClcclxuXHR7XHJcblx0XHRmb3IgKGxldCB4IDogbnVtYmVyID0gMDsgeCA8IHRoaXMucGllY2VzLm1heFNpemUueDsgeCsrKVxyXG5cdFx0e1xyXG5cdFx0XHRmb3IgKGxldCB5IDogbnVtYmVyID0gMDsgeSA8IHRoaXMucGllY2VzLm1heFNpemUueTsgeSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Y29uc3QgcG9zaXRpb24gPSBuZXcgVmVjdG9yMih4LCB5KTtcclxuXHRcdFx0XHRjb25zdCBpdGVtID0gdGhpcy5waWVjZXMuaXRlbShwb3NpdGlvbik7XHJcblx0XHRcdFx0aWYgKGl0ZW0gPT0gbnVsbClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5wbGF5aW5nRmllbGQuYXBwZW5kQ2hpbGQoKGl0ZW0gYXMgUHV6emxlUGllY2UuUGllY2UpLmVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uU2VsZWN0SXRlbShwaWVjZSA6IFB1enpsZVBpZWNlLlBpZWNlKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKFwiU2VsZWN0aW5nIGVsZW1lbnQgJW8gWyVkLCAlZF1cIiwgcGllY2UuZWxlbWVudCwgcGllY2UucG9zaXRpb24ueCwgcGllY2UucG9zaXRpb24ueSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuYWN0aXZlUGllY2UgIT0gbnVsbClcclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNhbm5vdCBzZWxlY3QgYSBuZXcgcGllY2UsIGFzIHRoZXJlIGlzIHN0aWxsIGFub3RoZXIgb25lIHNlbGVjdGVkXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hY3RpdmVQaWVjZSA9IHBpZWNlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkRlc2VsZWN0SXRlbShwaWVjZSA6IFB1enpsZVBpZWNlLlBpZWNlKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmFjdGl2ZVBpZWNlID09IG51bGwpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLmxvZyhcIkF0dGVtcHRpbmcgdG8gZGVzZWxlY3QgZWxlbWVudCAlbyBbJWQsICVkXVwiLCBwaWVjZS5lbGVtZW50LCBwaWVjZS5wb3NpdGlvbi54LCBwaWVjZS5wb3NpdGlvbi55KTtcclxuXHRcdHRoaXMuZml4UG9zaXRpb24oPFB1enpsZVBpZWNlLlBpZWNlPnRoaXMuYWN0aXZlUGllY2UpO1xyXG5cclxuXHRcdHRoaXMuYWN0aXZlUGllY2UgPSBudWxsO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBmaXhQb3NpdGlvbihwaWVjZSA6IFB1enpsZVBpZWNlLlBpZWNlKVxyXG5cdHtcclxuXHRcdGNvbnN0IHBpZWNlQm91bmRzID0gcGllY2UuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGNvbnN0IGJvYXJkQm91bmRzID0gdGhpcy5yb290RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdGNvbnN0IGhlbHBlclBhZGRpbmcgPSAxMDtcclxuXHJcblx0XHRsZXQgb3ZlcmxhcCA6IFZlY3RvcjIgPSBuZXcgVmVjdG9yMigpO1xyXG5cdFx0aWYgKHBpZWNlQm91bmRzLmxlZnQgPCBib2FyZEJvdW5kcy5sZWZ0KVxyXG5cdFx0e1xyXG5cdFx0XHRvdmVybGFwLnggKz0gYm9hcmRCb3VuZHMubGVmdCAtIHBpZWNlQm91bmRzLmxlZnQgKyBoZWxwZXJQYWRkaW5nO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHBpZWNlQm91bmRzLnJpZ2h0ID4gYm9hcmRCb3VuZHMucmlnaHQpXHJcblx0XHR7XHJcblx0XHRcdG92ZXJsYXAueCAtPSBwaWVjZUJvdW5kcy5yaWdodCAtIGJvYXJkQm91bmRzLnJpZ2h0ICsgaGVscGVyUGFkZGluZztcclxuXHRcdH1cclxuXHRcdGlmIChwaWVjZUJvdW5kcy50b3AgPCBib2FyZEJvdW5kcy50b3ApXHJcblx0XHR7XHJcblx0XHRcdG92ZXJsYXAueSArPSBib2FyZEJvdW5kcy50b3AgLSBwaWVjZUJvdW5kcy50b3AgKyBoZWxwZXJQYWRkaW5nO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHBpZWNlQm91bmRzLmJvdHRvbSA+IGJvYXJkQm91bmRzLmJvdHRvbSlcclxuXHRcdHtcclxuXHRcdFx0b3ZlcmxhcC55IC09IHBpZWNlQm91bmRzLmJvdHRvbSAtIGJvYXJkQm91bmRzLmJvdHRvbSArIGhlbHBlclBhZGRpbmc7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJDb3JyZWN0aW5nIHBpZWNlICVvIGJ5IFslZCwgJWRdIHRvIHN0YXkgaW4gZnJhbWVcIiwgcGllY2UsIG92ZXJsYXAueCwgb3ZlcmxhcC55KTtcclxuXHRcdHBpZWNlLm1vdmVCeShvdmVybGFwKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgVXBkYXRlKGxhc3RQb3NpdGlvbiA6IFZlY3RvcjIsIG5ld1Bvc2l0aW9uIDogVmVjdG9yMiwgZGVsdGFQb3NpdGlvbiA6IFZlY3RvcjIpXHJcblx0e1xyXG5cdFx0aWYgKHRoaXMuYWN0aXZlUGllY2UgPT0gbnVsbClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWN0aXZlUGllY2UubW92ZUJ5KGRlbHRhUG9zaXRpb24pO1xyXG5cdH1cclxufTsiLCJpbXBvcnQge1ZlY3RvcjIgYXMgVmVjdG9yMn0gZnJvbSBcIi4vdXRpbC9WZWN0b3IyLnRzXCJcclxuaW1wb3J0IHtQdXp6bGUgYXMgUHV6emxlfSBmcm9tIFwiLi9nYW1lL1B1enpsZS50c1wiXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT5cclxue1xyXG5cdGNvbnN0IFB1enpsZUxvZ2ljIDogUHV6emxlID0gbmV3IFB1enpsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3B1enpsZVwiKSBhcyBIVE1MRWxlbWVudCwgbmV3IFZlY3RvcjIoNSwgNSkpO1xyXG59KTtcclxuIiwiZXhwb3J0IGNsYXNzIFZlY3RvcjJcclxue1xyXG5cdHggOiBudW1iZXIgPSAwO1xyXG5cdHkgOiBudW1iZXIgPSAwO1xyXG5cdGNvbnN0cnVjdG9yKHggOiBudW1iZXIgPSAwLCB5IDogbnVtYmVyID0gMClcclxuXHR7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHR9XHJcblx0c3RhdGljIGZyb21TdHJpbmcoeCA6IHN0cmluZywgeSA6IHN0cmluZykgOiBWZWN0b3IyXHJcblx0e1xyXG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IyKHBhcnNlSW50KHgpLCBwYXJzZUludCh5KSk7XHJcblx0fVxyXG5cdHN0YXRpYyBkZWx0YShwb3NBIDogVmVjdG9yMiwgcG9zQiA6IFZlY3RvcjIpIDogVmVjdG9yMlxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgVmVjdG9yMihcclxuXHRcdFx0cG9zQS54IC0gcG9zQi54LFxyXG5cdFx0XHRwb3NBLnkgLSBwb3NCLnlcclxuXHRcdCk7XHJcblx0fVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=