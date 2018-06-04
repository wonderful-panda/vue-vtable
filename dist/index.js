(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-typed-component"), require("lodash"), require("vue"), require("vue-tsx-support"));
	else if(typeof define === 'function' && define.amd)
		define(["vue-typed-component", "lodash", "vue", "vue-tsx-support"], factory);
	else if(typeof exports === 'object')
		exports["vue-vlist"] = factory(require("vue-typed-component"), require("lodash"), require("vue"), require("vue-tsx-support"));
	else
		root["vue-vlist"] = factory(root["vue-typed-component"], root["lodash"], root["vue"], root["vue-tsx-support"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-strict-prop"] = factory();
	else
		root["vue-strict-prop"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var BuilderClass = /** @class */ (function () {
    function BuilderClass(opts) {
        this.opts = opts;
    }
    BuilderClass.prototype.default = function (value) {
        return __assign({}, this.opts, { required: false, default: value });
    };
    Object.defineProperty(BuilderClass.prototype, "required", {
        get: function () {
            return __assign({}, this.opts, { required: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BuilderClass.prototype, "optional", {
        get: function () {
            return __assign({}, this.opts, { required: false });
        },
        enumerable: true,
        configurable: true
    });
    BuilderClass.prototype.validator = function (validator) {
        return new BuilderClass(__assign({}, this.opts, { validator: validator }));
    };
    Object.defineProperty(BuilderClass.prototype, "or", {
        get: function () {
            var type = this.opts.type || [];
            var types = type instanceof Array ? type : [type];
            return createBuilderCollection(types);
        },
        enumerable: true,
        configurable: true
    });
    return BuilderClass;
}());
function createBuilder(baseTypes) {
    var types = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        types[_i - 1] = arguments[_i];
    }
    var newTypes = baseTypes.concat(types);
    return new BuilderClass({
        type: newTypes.length === 1 ? newTypes[0] : newTypes
    });
}
function createBuilderCollection(baseTypes) {
    var ret = (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return createBuilder.apply(void 0, [baseTypes].concat(args));
    });
    var namedBuilders = {
        ofFunction: function () {
            return createBuilder(baseTypes, Function);
        },
        ofArray: function () {
            return createBuilder(baseTypes, Array);
        },
        ofRoArray: function () {
            return createBuilder(baseTypes, Array);
        },
        ofObject: function () {
            return createBuilder(baseTypes, Object);
        },
        ofStringLiterals: function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return new BuilderClass({
                type: String,
                validator: function (v) { return values.indexOf(v) >= 0; }
            });
        },
        ofAny: function () {
            return new BuilderClass({});
        }
    };
    /* tslint:disable-next-line: prefer-object-spread */
    return Object.assign(ret, namedBuilders);
}
var rootBuilders = createBuilderCollection([]);
/* harmony default export */ __webpack_exports__["default"] = (rootBuilders);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUF3Q0E7SUFDSSxzQkFBb0IsSUFBb0I7UUFBcEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7SUFBRyxDQUFDO0lBQzVDLDhCQUFPLEdBQVAsVUFBUSxLQUFVO1FBQ2QsTUFBTSxjQUNDLElBQUksQ0FBQyxJQUFJLElBQ1osUUFBUSxFQUFFLEtBQUssRUFDZixPQUFPLEVBQUUsS0FBSyxJQUNoQjtJQUNOLENBQUM7SUFDRCxzQkFBSSxrQ0FBUTthQUFaO1lBQ0ksTUFBTSxjQUNDLElBQUksQ0FBQyxJQUFJLElBQ1osUUFBUSxFQUFFLElBQUksSUFDaEI7UUFDTixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLGtDQUFRO2FBQVo7WUFDSSxNQUFNLGNBQ0MsSUFBSSxDQUFDLElBQUksSUFDWixRQUFRLEVBQUUsS0FBSyxJQUNqQjtRQUNOLENBQUM7OztPQUFBO0lBQ0QsZ0NBQVMsR0FBVCxVQUFVLFNBQXVCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLFlBQVksY0FDaEIsSUFBSSxDQUFDLElBQUksSUFDWixTQUFTLFdBQUEsSUFDWCxDQUFDO0lBQ1AsQ0FBQztJQUNELHNCQUFJLDRCQUFFO2FBQU47WUFDSSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDbEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQWhDRCxJQWdDQztBQUVELHVCQUNJLFNBQWdDO0lBQ2hDLGVBQXdCO1NBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtRQUF4Qiw4QkFBd0I7O0lBRXhCLElBQU0sUUFBUSxHQUFPLFNBQVMsUUFBSyxLQUFLLENBQThCLENBQUM7SUFDdkUsTUFBTSxDQUFDLElBQUksWUFBWSxDQUFDO1FBQ3BCLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO0tBQ3ZELENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxpQ0FBMkMsU0FBZ0M7SUFDdkUsSUFBTSxHQUFHLEdBQTZCLENBQUM7UUFBQyxjQUF5QjthQUF6QixVQUF5QixFQUF6QixxQkFBeUIsRUFBekIsSUFBeUI7WUFBekIseUJBQXlCOztRQUFLLE9BQUEsYUFBYSxnQkFBQyxTQUFTLFNBQUssSUFBSTtJQUFoQyxDQUFpQyxDQUFRLENBQUM7SUFDaEgsSUFBTSxhQUFhLEdBQTRCO1FBQzNDLFVBQVUsRUFBVjtZQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFFBQWUsQ0FBbUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsT0FBTyxFQUFQO1lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELFNBQVMsRUFBVDtZQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxRQUFRLEVBQVI7WUFDSSxNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsZ0JBQWdCLEVBQWhCO1lBQW1DLGdCQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQsMkJBQWM7O1lBQzdDLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBSTtnQkFDdkIsSUFBSSxFQUFFLE1BQWE7Z0JBQ25CLFNBQVMsRUFBRSxVQUFDLENBQVMsSUFBSyxPQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBTSxDQUFDLElBQUksQ0FBQyxFQUEzQixDQUEyQjthQUN4RCxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsS0FBSztZQUNELE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBTSxFQUFFLENBQWlCLENBQUM7UUFDckQsQ0FBQztLQUNKLENBQUM7SUFDRixvREFBb0Q7SUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFFRCxJQUFNLFlBQVksR0FBRyx1QkFBdUIsQ0FBUSxFQUFFLENBQUMsQ0FBQztBQUN4RCxlQUFlLFlBQVksQ0FBQyJ9

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.px = px;
exports.supplier = supplier;
exports.ensureNotUndefined = ensureNotUndefined;
function px(value) {
    if (typeof value === "string" || value === undefined) {
        return value;
    } else {
        return value + "px";
    }
}
function supplier(value) {
    return function () {
        return value;
    };
}
function ensureNotUndefined(value) {
    if (value === undefined) {
        throw new Error("value is undefined");
    }
    return value;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/

module.exports = function mergeJSXProps (objs) {
  return objs.reduce(function (a, b) {
    var aa, bb, key, nestedKey, temp
    for (key in b) {
      aa = a[key]
      bb = b[key]
      if (aa && nestRE.test(key)) {
        // normalize class
        if (key === 'class') {
          if (typeof aa === 'string') {
            temp = aa
            a[key] = aa = {}
            aa[temp] = true
          }
          if (typeof bb === 'string') {
            temp = bb
            b[key] = bb = {}
            bb[temp] = true
          }
        }
        if (key === 'on' || key === 'nativeOn' || key === 'hook') {
          // merge functions
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey])
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb)
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb)
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey]
          }
        }
      } else {
        a[key] = b[key]
      }
    }
    return a
  }, {})
}

function mergeFn (a, b) {
  return function () {
    a.apply(this, arguments)
    b.apply(this, arguments)
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vlist = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vueResizesensor = __webpack_require__(14);

var resizeSensor = _interopRequireWildcard(_vueResizesensor);

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTypedComponent = __webpack_require__(2);

var tc = _interopRequireWildcard(_vueTypedComponent);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ResizeSensor = resizeSensor;
var Vlist = Vlist_1 = function (_tc$StatefulEvTypedCo) {
    _inherits(Vlist, _tc$StatefulEvTypedCo);

    function Vlist() {
        _classCallCheck(this, Vlist);

        return _possibleConstructorReturn(this, (Vlist.__proto__ || Object.getPrototypeOf(Vlist)).apply(this, arguments));
    }

    _createClass(Vlist, [{
        key: "data",
        value: function data() {
            return {
                scrollLeft: 0,
                scrollTop: 0,
                bodyWidth: 0,
                bodyHeight: 0,
                vScrollBarWidth: 0,
                hScrollBarHeight: 0
            };
        }
        /* styles */

    }, {
        key: "activated",

        /* hook */
        value: function activated() {
            this.updateBodySize();
            var _$refs$scrollable = this.$refs.scrollable,
                scrollLeft = _$refs$scrollable.scrollLeft,
                scrollTop = _$refs$scrollable.scrollTop;

            this.$data.scrollLeft = scrollLeft;
            this.$data.scrollTop = scrollTop;
        }
        /* methods */

    }, {
        key: "ensureVisible",
        value: function ensureVisible(index) {
            var rowHeight = this.$props.rowHeight;
            var bodyHeight = this.$data.bodyHeight;
            var scrollTop = this.$data.scrollTop;

            var scrollTopMax = rowHeight * index;
            var scrollTopMin = Math.max(rowHeight * index - bodyHeight + rowHeight, 0);
            if (scrollTopMax < scrollTop) {
                scrollTop = scrollTopMax;
            } else if (scrollTop < scrollTopMin) {
                scrollTop = scrollTopMin;
            } else {
                return;
            }
            var sc = this.$refs.scrollable;
            sc.scrollTop = scrollTop;
        }
    }, {
        key: "updateBodySize",
        value: function updateBodySize() {
            var sc = this.$refs.scrollable;
            var bound = sc.getBoundingClientRect();
            var bodyWidth = sc.clientWidth;
            var bodyHeight = sc.clientHeight;
            var vScrollBarWidth = Math.floor(bound.width - bodyWidth);
            var hScrollBarHeight = Math.floor(bound.height - bodyHeight);
            var data = this.$data;
            if (data.bodyWidth !== bodyWidth || data.bodyHeight !== bodyHeight || data.vScrollBarWidth !== vScrollBarWidth || data.hScrollBarHeight !== hScrollBarHeight) {
                data.bodyWidth = bodyWidth;
                data.bodyHeight = bodyHeight;
                data.vScrollBarWidth = vScrollBarWidth;
                data.hScrollBarHeight = hScrollBarHeight;
            }
        }
    }, {
        key: "onScroll",
        value: function onScroll(event) {
            var _$refs$scrollable2 = this.$refs.scrollable,
                scrollLeft = _$refs$scrollable2.scrollLeft,
                scrollTop = _$refs$scrollable2.scrollTop;

            this.$data.scrollLeft = scrollLeft;
            this.$data.scrollTop = scrollTop;
            this.$events.emit("scroll", { scrollLeft: scrollLeft, scrollTop: scrollTop, event: event });
        }
    }, {
        key: "onRowEvent",
        value: function onRowEvent(eventName, item, physicalIndex, event) {
            this.$events.emit("row" + eventName, {
                item: item,
                index: physicalIndex + this.firstIndex,
                event: event
            });
        }
    }, {
        key: "onContentHeightChanged",
        value: function onContentHeightChanged(newValue, _oldValue) {
            var hScrollBarHeight = this.$data.hScrollBarHeight;
            var height = this.$data.bodyHeight + hScrollBarHeight;
            if (0 < hScrollBarHeight === newValue < height) {
                // must re-check scrollbar visibilities
                this.updateBodySize();
            }
        }
    }, {
        key: "onContentWidthChanged",
        value: function onContentWidthChanged(newValue, _oldValue) {
            var vScrollBarWidth = this.$data.vScrollBarWidth;
            var width = this.$data.bodyWidth + vScrollBarWidth;
            if (0 < vScrollBarWidth === newValue < width) {
                // must re-check scrollbar visibilities
                this.updateBodySize();
            }
        }
        /* render */

    }, {
        key: "render",
        value: function render() {
            var h = arguments[0];

            return h(
                "div",
                { staticClass: "vlist-container", style: this.containerStyle },
                [h(
                    "div",
                    { staticClass: "vlist-header-row", style: this.headerStyle },
                    [this.$slots.header]
                ), h(
                    "div",
                    { staticClass: "vlist-scrollable", ref: "scrollable", style: this.scrollableStyle, on: {
                            "scroll": this.onScroll
                        }
                    },
                    [h(
                        ResizeSensor,
                        {
                            attrs: { debounce: 50 },
                            on: {
                                "resized": this.updateBodySize
                            }
                        },
                        []
                    ), h(
                        "div",
                        { staticClass: "vlist-content", ref: "content", style: this.contentStyle },
                        [h(
                            "div",
                            { staticClass: "vlist-spacer", style: this.spacerStyle },
                            []
                        ), this.rows]
                    )]
                )]
            );
        }
    }, {
        key: "containerStyle",
        get: function get() {
            return {
                display: "flex",
                flexFlow: "column nowrap",
                overflow: "hidden"
            };
        }
    }, {
        key: "headerStyle",
        get: function get() {
            return {
                display: "flex",
                flex: "0 0 auto",
                boxSizing: "border-box",
                minWidth: (0, _utils.px)(this.$props.contentWidth),
                position: "relative",
                left: (0, _utils.px)(this.$data.scrollLeft * -1),
                overflow: "hidden",
                padding: "0 " + (0, _utils.px)(this.$data.vScrollBarWidth) + " 0 0"
            };
        }
    }, {
        key: "scrollableStyle",
        get: function get() {
            return {
                overflow: "auto",
                position: "relative",
                flex: "1 1 0px",
                boxSizing: "border-box",
                margin: 0,
                padding: 0,
                border: 0
            };
        }
    }, {
        key: "contentStyle",
        get: function get() {
            return {
                display: "flex",
                flexFlow: "column nowrap",
                flex: "1 1 auto",
                position: "relative",
                boxSizing: "border-box",
                height: (0, _utils.px)(this.contentHeight),
                overflow: "hidden",
                minWidth: (0, _utils.px)(this.$props.contentWidth)
            };
        }
    }, {
        key: "spacerStyle",
        get: function get() {
            return {
                height: (0, _utils.px)(this.$props.rowHeight * this.firstIndex),
                flex: "0 0 auto"
            };
        }
    }, {
        key: "rowStyle",
        get: function get() {
            return {
                display: "flex",
                width: "100%",
                height: (0, _utils.px)(this.$props.rowHeight)
            };
        }
        /* computed */

    }, {
        key: "firstIndex",
        get: function get() {
            var value = Math.floor(this.$data.scrollTop / this.$props.rowHeight);
            var rowStyleCycle = this.$props.rowStyleCycle;

            if (rowStyleCycle && rowStyleCycle > 1) {
                value -= value % rowStyleCycle;
            }
            return value;
        }
    }, {
        key: "lastIndex",
        get: function get() {
            var _$data = this.$data,
                scrollTop = _$data.scrollTop,
                bodyHeight = _$data.bodyHeight;

            return Math.ceil((scrollTop + bodyHeight) / this.$props.rowHeight);
        }
    }, {
        key: "renderedItems",
        get: function get() {
            return this.$props.sliceItems(this.firstIndex, this.lastIndex + 1);
        }
    }, {
        key: "contentHeight",
        get: function get() {
            return this.$props.rowHeight * this.$props.itemCount;
        }
    }, {
        key: "rows",
        get: function get() {
            var _this2 = this;

            var h = this.$createElement;

            var props = this.$props;
            var row = this.$scopedSlots.row;
            return this.renderedItems.map(function (item, index) {
                return h(
                    "div",
                    { staticClass: "vlist-row", key: props.getItemKey(item), style: _this2.rowStyle, on: {
                            "click": function click(e) {
                                return _this2.onRowEvent("click", item, index, e);
                            },
                            "dblclick": function dblclick(e) {
                                return _this2.onRowEvent("dblclick", item, index, e);
                            },
                            "contextmenu": function contextmenu(e) {
                                return _this2.onRowEvent("contextmenu", item, index, e);
                            },
                            "dragenter": function dragenter(e) {
                                return _this2.onRowEvent("dragenter", item, index, e);
                            },
                            "dragleave": function dragleave(e) {
                                return _this2.onRowEvent("dragleave", item, index, e);
                            },
                            "dragstart": function dragstart(e) {
                                return _this2.onRowEvent("dragstart", item, index, e);
                            },
                            "dragend": function dragend(e) {
                                return _this2.onRowEvent("dragend", item, index, e);
                            },
                            "dragover": function dragover(e) {
                                return _this2.onRowEvent("dragover", item, index, e);
                            },
                            "drop": function drop(e) {
                                return _this2.onRowEvent("drop", item, index, e);
                            }
                        }
                    },
                    [row({ item: item, index: index + _this2.firstIndex })]
                );
            });
        }
    }]);

    return Vlist;
}(tc.StatefulEvTypedComponent);
exports.Vlist = Vlist = Vlist_1 = __decorate([tc.component(Vlist_1, {
    props: {
        getItemKey: _vueStrictProp2.default.ofFunction().required,
        contentWidth: (0, _vueStrictProp2.default)(Number).optional,
        rowStyleCycle: (0, _vueStrictProp2.default)(Number).default(1),
        rowHeight: (0, _vueStrictProp2.default)(Number).required,
        itemCount: (0, _vueStrictProp2.default)(Number).required,
        sliceItems: _vueStrictProp2.default.ofFunction().required
    },
    watch: {
        contentWidth: "onContentWidthChanged",
        contentHeight: "onContentHeightChanged"
    }
})], Vlist);
exports.Vlist = Vlist;

var Vlist_1;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VtableBase = undefined;

var _babelHelperVueJsxMergeProps = __webpack_require__(3);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(6);

var _ = _interopRequireWildcard(_lodash);

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTypedComponent = __webpack_require__(2);

var tc = _interopRequireWildcard(_vueTypedComponent);

var _utils = __webpack_require__(1);

var _vlist = __webpack_require__(4);

var _vtablerow = __webpack_require__(12);

var _vtablesplitter = __webpack_require__(13);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VtableBase = VtableBase_1 = function (_tc$StatefulEvTypedCo) {
    _inherits(VtableBase, _tc$StatefulEvTypedCo);

    function VtableBase() {
        _classCallCheck(this, VtableBase);

        return _possibleConstructorReturn(this, (VtableBase.__proto__ || Object.getPrototypeOf(VtableBase)).apply(this, arguments));
    }

    _createClass(VtableBase, [{
        key: "data",
        value: function data() {
            var widths = this.$props.widths;

            return {
                widths_: widths ? Object.assign({}, widths) : {},
                scrollLeft: 0,
                splitterPositions: [],
                draggingSplitter: -1
            };
        }
        /* style */

    }, {
        key: "headerCellStyle",
        value: function headerCellStyle(width) {
            return {
                minWidth: (0, _utils.px)(width),
                width: (0, _utils.px)(width),
                lineHeight: (0, _utils.px)(this.actualHeaderHeight),
                boxSizing: "border-box",
                margin: "0",
                overflow: "hidden"
            };
        }
    }, {
        key: "actualRowClass",
        value: function actualRowClass(item, index) {
            var _$props = this.$props,
                getRowClass = _$props.getRowClass,
                rowClass = _$props.rowClass;

            if (getRowClass) {
                return getRowClass(item, index);
            } else {
                return rowClass || "vtable-row";
            }
        }
    }, {
        key: "ensureVisible",

        /* methods */
        value: function ensureVisible(index) {
            this.$refs.vlist.ensureVisible(index);
        }
    }, {
        key: "onScroll",
        value: function onScroll(args) {
            this.updateScrollPosition(args);
            this.$events.emit("scroll", args);
        }
    }, {
        key: "updateScrollPosition",
        value: function updateScrollPosition(args) {
            this.$data.scrollLeft = args.scrollLeft;
        }
    }, {
        key: "getColumnWidth",
        value: function getColumnWidth(c) {
            var widths = this.$props.widths || this.$data.widths_;
            var width = widths[c.id];
            return width === undefined ? c.defaultWidth : width;
        }
    }, {
        key: "setColumnWidth",
        value: function setColumnWidth(c, width) {
            if (this.$props.widths) {
                this.$emit("update:widths", Object.assign({}, this.$props.widths, _defineProperty({}, c.id, width)));
            } else {
                _vue2.default.set(this.$data.widths_, c.id, width);
            }
        }
    }, {
        key: "onSplitterMouseDown",
        value: function onSplitterMouseDown(index, clientX) {
            var _this2 = this;

            var headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
            var column = this.$props.columns[index];
            var startWidth = headerCell.clientWidth;
            var startX = clientX;
            var minWidth = column.minWidth || 5;
            var onMouseMove = function onMouseMove(e) {
                e.preventDefault();
                e.stopPropagation();
                var offset = e.clientX - startX;
                var width = Math.max(startWidth + offset, minWidth);
                _this2.setColumnWidth(column, width);
                _this2.$data.draggingSplitter = index;
            };
            var onMouseUp = function onMouseUp() {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
                _this2.$data.draggingSplitter = -1;
            };
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            this.$data.draggingSplitter = index;
        }
        /* render */

    }, {
        key: "splitter",
        value: function splitter(index) {
            var _this3 = this;

            var h = this.$createElement;

            return h(
                _vtablesplitter.VtableSplitter,
                {
                    attrs: { dragging: index === this.$data.draggingSplitter, width: this.actualSplitterWidth, mousedownCallback: function mousedownCallback(clientX) {
                            return _this3.onSplitterMouseDown(index, clientX);
                        } }
                },
                []
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var h = arguments[0];

            var VlistT = _vlist.Vlist;
            var VtableRowT = _vtablerow.VtableRow;
            var _$props2 = this.$props,
                rowHeight = _$props2.rowHeight,
                itemCount = _$props2.itemCount,
                sliceItems = _$props2.sliceItems,
                rowStyleCycle = _$props2.rowStyleCycle,
                getItemKey = _$props2.getItemKey,
                columns = _$props2.columns;

            var emit = this.$events.emit;
            var on = Object.assign({}, this.$listeners, { scroll: this.onScroll });
            return h(
                VlistT,
                (0, _babelHelperVueJsxMergeProps2.default)([{ ref: "vlist", style: { flex: "1 1 auto" }, attrs: { rowHeight: rowHeight, itemCount: itemCount, sliceItems: sliceItems, rowStyleCycle: rowStyleCycle, contentWidth: this.contentWidth, getItemKey: getItemKey },
                    scopedSlots: {
                        row: function row(_ref) {
                            var item = _ref.item,
                                index = _ref.index;
                            return [h(
                                VtableRowT,
                                { "class": _this4.actualRowClass(item, index), attrs: { columns: columns, columnWidths: _this4.$props.widths || _this4.$data.widths_, item: item, index: index, height: rowHeight },
                                    scopedSlots: {
                                        splitter: function splitter(_ref2) {
                                            var i = _ref2.index;
                                            return [_this4.splitter(i)];
                                        },
                                        cell: _this4.$scopedSlots.cell
                                    } },
                                []
                            )];
                        }
                    } }, { on: on }]),
                [h(
                    "div",
                    { staticClass: "vtable-header", slot: "header", ref: "header", style: this.headerStyle },
                    [this.headerCells]
                )]
            );
        }
    }, {
        key: "headerStyle",
        get: function get() {
            return {
                display: "flex",
                position: "relative",
                flex: "1 1 auto",
                width: "100%",
                height: (0, _utils.px)(this.actualHeaderHeight),
                lineHeight: (0, _utils.px)(this.actualHeaderHeight),
                boxSizing: "border-box",
                margin: "0",
                whiteSpace: "none"
            };
        }
    }, {
        key: "actualSplitterWidth",
        get: function get() {
            return (0, _utils.ensureNotUndefined)(this.$props.splitterWidth);
        }
    }, {
        key: "actualHeaderHeight",
        get: function get() {
            var _$props3 = this.$props,
                headerHeight = _$props3.headerHeight,
                rowHeight = _$props3.rowHeight;

            return headerHeight && headerHeight > 0 ? headerHeight : rowHeight;
        }
    }, {
        key: "contentWidth",
        get: function get() {
            var _this5 = this;

            var widths = this.$props.widths || this.$data.widths_;
            return _.sumBy(this.$props.columns, function (c) {
                return (widths[c.id] || c.defaultWidth) + _this5.$props.splitterWidth;
            });
        }
    }, {
        key: "headerCells",
        get: function get() {
            var _this6 = this;

            var h = this.$createElement;

            var widths = this.$props.widths || this.$data.widths_;
            return _.map(this.$props.columns, function (c, index) {
                return [h(
                    "div",
                    { staticClass: "vtable-header-cell", "class": c.className, style: _this6.headerCellStyle(widths[c.id] || c.defaultWidth) },
                    [c.id || c.title]
                ), _this6.splitter(index)];
            });
        }
    }]);

    return VtableBase;
}(tc.StatefulEvTypedComponent);
exports.VtableBase = VtableBase = VtableBase_1 = __decorate([tc.component(VtableBase_1, {
    props: {
        rowHeight: (0, _vueStrictProp2.default)(Number).required,
        headerHeight: (0, _vueStrictProp2.default)(Number).optional,
        columns: _vueStrictProp2.default.ofRoArray().required,
        itemCount: (0, _vueStrictProp2.default)(Number).required,
        sliceItems: _vueStrictProp2.default.ofFunction().required,
        rowStyleCycle: (0, _vueStrictProp2.default)(Number).default(1),
        splitterWidth: (0, _vueStrictProp2.default)(Number).default(3),
        rowClass: (0, _vueStrictProp2.default)(String).optional,
        getRowClass: _vueStrictProp2.default.ofFunction().optional,
        getItemKey: _vueStrictProp2.default.ofFunction().required,
        widths: _vueStrictProp2.default.ofObject().optional
    }
})], VtableBase);
exports.VtableBase = VtableBase;

var VtableBase_1;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vtable = undefined;

var _babelHelperVueJsxMergeProps = __webpack_require__(3);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTypedComponent = __webpack_require__(2);

var tc = _interopRequireWildcard(_vueTypedComponent);

var _vtablebase = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var Vtable = Vtable_1 = function (_tc$EvTypedComponent) {
    _inherits(Vtable, _tc$EvTypedComponent);

    function Vtable() {
        _classCallCheck(this, Vtable);

        return _possibleConstructorReturn(this, (Vtable.__proto__ || Object.getPrototypeOf(Vtable)).apply(this, arguments));
    }

    _createClass(Vtable, [{
        key: "ensureVisible",

        /* methods */
        value: function ensureVisible(index) {
            this.$refs.base.ensureVisible(index);
        }
    }, {
        key: "sliceItems",
        value: function sliceItems(start, end) {
            return this.$props.items.slice(start, end);
        }
    }, {
        key: "render",
        value: function render() {
            var h = arguments[0];

            var VtableBaseT = _vtablebase.VtableBase;
            var _a = this.$props,
                items = _a.items,
                others = __rest(_a, ["items"]);
            var props = Object.assign({}, others, { itemCount: items.length, sliceItems: this.sliceItems });
            var on = this.$listeners;
            var scopedSlots = this.$scopedSlots;
            return h(
                VtableBaseT,
                (0, _babelHelperVueJsxMergeProps2.default)([{ ref: "base" }, { props: props, on: on, scopedSlots: scopedSlots }]),
                []
            );
        }
    }]);

    return Vtable;
}(tc.EvTypedComponent);
exports.Vtable = Vtable = Vtable_1 = __decorate([tc.component(Vtable_1, {
    props: {
        rowHeight: (0, _vueStrictProp2.default)(Number).required,
        headerHeight: (0, _vueStrictProp2.default)(Number).optional,
        columns: _vueStrictProp2.default.ofRoArray().required,
        items: _vueStrictProp2.default.ofRoArray().required,
        rowStyleCycle: (0, _vueStrictProp2.default)(Number).default(1),
        splitterWidth: (0, _vueStrictProp2.default)(Number).default(3),
        rowClass: (0, _vueStrictProp2.default)(String).optional,
        getRowClass: _vueStrictProp2.default.ofFunction().optional,
        getItemKey: _vueStrictProp2.default.ofFunction().required,
        widths: _vueStrictProp2.default.ofObject().optional
    }
})], Vtable);
exports.Vtable = Vtable;

var Vtable_1;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Vtreetable = exports.ExpandableCell = undefined;

var _babelHelperVueJsxMergeProps = __webpack_require__(3);

var _babelHelperVueJsxMergeProps2 = _interopRequireDefault(_babelHelperVueJsxMergeProps);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vue = __webpack_require__(7);

var _vue2 = _interopRequireDefault(_vue);

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTsxSupport = __webpack_require__(8);

var tsx = _interopRequireWildcard(_vueTsxSupport);

var _vueTypedComponent = __webpack_require__(2);

var tc = _interopRequireWildcard(_vueTypedComponent);

var _utils = __webpack_require__(1);

var _vtablebase = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};
    for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    }return t;
};

var m = tsx.modifiers;
var ExpandButton = tsx.component({
    name: "ExpandButton",
    functional: true,
    props: {
        expanded: (0, _vueStrictProp2.default)(Boolean).required,
        size: (0, _vueStrictProp2.default)(Number).required
    },
    render: function render(_h, _ref) {
        var props = _ref.props;
        var h = arguments[0];
        var expanded = props.expanded,
            size = props.size;

        var transform = "rotate(" + (expanded ? 90 : 0) + "deg)";
        var transition = "0.1s transform ease";
        var style = { transform: transform, transition: transition };
        return h(
            "svg",
            { "class": "vtreetable-button", attrs: { width: size, height: size },
                style: style },
            [h(
                "polygon",
                {
                    attrs: { transform: "translate(" + size / 2 + ", " + size / 2 + ")", points: "-1,-4 3,0 -1,4" }
                },
                []
            )]
        );
    }
}, ["expanded", "size"]);
var ExpandableCell = exports.ExpandableCell = tsx.component({
    name: "ExpandableCell",
    inject: ["toggleExpand", "indentWidth"],
    props: {
        nodeState: _vueStrictProp2.default.ofObject().required
    },
    render: function render() {
        var h = arguments[0];
        var _nodeState = this.nodeState,
            data = _nodeState.data,
            children = _nodeState.children,
            level = _nodeState.level,
            expanded = _nodeState.expanded;
        var toggleExpand = this.toggleExpand,
            indentWidth = this.indentWidth;

        var indent = (0, _utils.px)(level * indentWidth);
        var expandButtonStyle = {
            marginLeft: indent,
            marginRight: "4px",
            marginTop: "auto",
            marginBottom: "auto",
            textAlign: "center",
            minWidth: "12px",
            cursor: "pointer"
        };
        return h(
            "div",
            { style: { display: "flex" } },
            [h(
                "div",
                { style: expandButtonStyle, on: {
                        "click": m.stop.prevent(function () {
                            return toggleExpand(data);
                        })
                    }
                },
                [children ? h(
                    ExpandButton,
                    {
                        attrs: { expanded: expanded, size: 12 }
                    },
                    []
                ) : undefined]
            ), this.$slots.default]
        );
    }
}, ["nodeState"]);
var Vtreetable = Vtreetable_1 = function (_tc$StatefulEvTypedCo) {
    _inherits(Vtreetable, _tc$StatefulEvTypedCo);

    function Vtreetable() {
        _classCallCheck(this, Vtreetable);

        return _possibleConstructorReturn(this, (Vtreetable.__proto__ || Object.getPrototypeOf(Vtreetable)).apply(this, arguments));
    }

    _createClass(Vtreetable, [{
        key: "data",
        value: function data() {
            return {
                expandMap: {}
            };
        }
    }, {
        key: "addDescendentVisibleItems",
        value: function addDescendentVisibleItems(parent, level, arr) {
            var key = this.$props.getItemKey(parent.data).toString();
            var expanded = !!this.$data.expandMap[key];
            arr.push(Object.assign({}, parent, { expanded: expanded, level: level }));
            if (!expanded || !parent.children) {
                return;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = parent.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    this.addDescendentVisibleItems(child, level + 1, arr);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "sliceItems",
        value: function sliceItems(start, end) {
            return this.flattenVisibleItems.slice(start, end);
        }
    }, {
        key: "getItemKey_",
        value: function getItemKey_(_ref2) {
            var data = _ref2.data;

            return this.$props.getItemKey(data);
        }
    }, {
        key: "toggleExpand",
        value: function toggleExpand(data) {
            var expandMap = this.$data.expandMap;
            var key = this.$props.getItemKey(data).toString();
            var newValue = !expandMap[key];
            if (newValue) {
                _vue2.default.set(expandMap, key, true);
            } else {
                _vue2.default.delete(expandMap, key);
            }
        }
    }, {
        key: "expandAll",
        value: function expandAll() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.$props.rootNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var root = _step2.value;

                    this.expandAllDescendants(root);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "expandAllDescendants",
        value: function expandAllDescendants(from) {
            var expandMap = this.$data.expandMap;
            var key = this.$props.getItemKey(from.data).toString();
            _vue2.default.set(expandMap, key, true);
            if (from.children) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = from.children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var child = _step3.value;

                        this.expandAllDescendants(child);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }
    }, {
        key: "collapseAll",
        value: function collapseAll() {
            this.$data.expandMap = {};
        }
    }, {
        key: "render",
        value: function render() {
            var h = arguments[0];

            var VtableBaseT = _vtablebase.VtableBase;
            var _a = this.$props,
                rootNodes = _a.rootNodes,
                indentWidth = _a.indentWidth,
                others = __rest(_a, ["rootNodes", "indentWidth"]);
            var props = Object.assign({}, others, { itemCount: this.itemCount, sliceItems: this.sliceItems, getItemKey: this.getItemKey_ });
            return h(
                VtableBaseT,
                (0, _babelHelperVueJsxMergeProps2.default)([{ props: props, on: this.$listeners }, { scopedSlots: this.$scopedSlots }]),
                []
            );
        }
    }, {
        key: "flattenVisibleItems",
        get: function get() {
            var _this2 = this;

            var ret = [];
            this.$props.rootNodes.forEach(function (root) {
                return _this2.addDescendentVisibleItems(root, 0, ret);
            });
            return ret;
        }
    }, {
        key: "itemCount",
        get: function get() {
            return this.flattenVisibleItems.length;
        }
    }]);

    return Vtreetable;
}(tc.StatefulEvTypedComponent);
exports.Vtreetable = Vtreetable = Vtreetable_1 = __decorate([tc.component(Vtreetable_1, {
    props: {
        rowHeight: (0, _vueStrictProp2.default)(Number).required,
        headerHeight: (0, _vueStrictProp2.default)(Number).optional,
        indentWidth: (0, _vueStrictProp2.default)(Number).optional,
        columns: _vueStrictProp2.default.ofRoArray().required,
        rootNodes: _vueStrictProp2.default.ofRoArray().required,
        rowStyleCycle: (0, _vueStrictProp2.default)(Number).default(1),
        splitterWidth: (0, _vueStrictProp2.default)(Number).default(3),
        rowClass: (0, _vueStrictProp2.default)(String).optional,
        getRowClass: _vueStrictProp2.default.ofFunction().optional,
        widths: _vueStrictProp2.default.ofObject().optional,
        getItemKey: _vueStrictProp2.default.ofFunction().required
    },
    provide: function provide() {
        return {
            toggleExpand: this.toggleExpand,
            indentWidth: this.$props.indentWidth || this.$props.rowHeight
        };
    }
})], Vtreetable);
exports.Vtreetable = Vtreetable;

var Vtreetable_1;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpandableCell = exports.Vtreetable = exports.Vtable = exports.Vlist = undefined;
exports.vlistOf = vlistOf;
exports.vtableOf = vtableOf;
exports.vtreetableOf = vtreetableOf;

var _vlist = __webpack_require__(4);

Object.defineProperty(exports, "Vlist", {
    enumerable: true,
    get: function get() {
        return _vlist.Vlist;
    }
});

var _vtable = __webpack_require__(9);

Object.defineProperty(exports, "Vtable", {
    enumerable: true,
    get: function get() {
        return _vtable.Vtable;
    }
});

var _vtreetable = __webpack_require__(10);

Object.defineProperty(exports, "Vtreetable", {
    enumerable: true,
    get: function get() {
        return _vtreetable.Vtreetable;
    }
});
Object.defineProperty(exports, "ExpandableCell", {
    enumerable: true,
    get: function get() {
        return _vtreetable.ExpandableCell;
    }
});
function vlistOf() {
    return _vlist.Vlist;
}
function vtableOf() {
    return _vtable.Vtable;
}
function vtreetableOf() {
    return _vtreetable.Vtreetable;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VtableRow = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTypedComponent = __webpack_require__(2);

var tc = _interopRequireWildcard(_vueTypedComponent);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VtableRow = VtableRow_1 = function (_tc$TypedComponent) {
    _inherits(VtableRow, _tc$TypedComponent);

    function VtableRow() {
        _classCallCheck(this, VtableRow);

        return _possibleConstructorReturn(this, (VtableRow.__proto__ || Object.getPrototypeOf(VtableRow)).apply(this, arguments));
    }

    _createClass(VtableRow, [{
        key: "cellStyle",
        value: function cellStyle(width) {
            var w = (0, _utils.px)(width);
            return {
                minWidth: w,
                width: w,
                lineHeight: (0, _utils.px)(this.$props.height),
                margin: 0,
                boxSizing: "border-box",
                overflow: "hidden"
            };
        }
    }, {
        key: "render",
        value: function render() {
            var h = arguments[0];

            return h(
                "div",
                { style: this.rowStyle },
                [this.cells]
            );
        }
    }, {
        key: "rowStyle",
        get: function get() {
            return {
                display: "flex",
                flex: "1 1 auto",
                width: "100%",
                height: (0, _utils.px)(this.$props.height),
                lineHeight: (0, _utils.px)(this.$props.height),
                boxSizing: "border-box",
                margin: 0
            };
        }
    }, {
        key: "cells",
        get: function get() {
            var _this2 = this;

            var h = this.$createElement;
            var _$props = this.$props,
                item = _$props.item,
                columns = _$props.columns,
                columnWidths = _$props.columnWidths,
                index = _$props.index;

            return columns.map(function (c, columnIndex) {
                return [h(
                    "div",
                    { staticClass: "vtable-cell", "class": c.className, style: _this2.cellStyle(columnWidths[c.id] || c.defaultWidth) },
                    [_this2.$scopedSlots.cell({ index: index, item: item, columnId: c.id })]
                ), _this2.$scopedSlots.splitter({ index: columnIndex })];
            });
        }
    }]);

    return VtableRow;
}(tc.TypedComponent);
exports.VtableRow = VtableRow = VtableRow_1 = __decorate([tc.component(VtableRow_1, {
    props: {
        item: _vueStrictProp2.default.ofAny().required,
        columns: _vueStrictProp2.default.ofRoArray().required,
        columnWidths: _vueStrictProp2.default.ofObject().required,
        index: (0, _vueStrictProp2.default)(Number).validator(function (v) {
            return v >= 0;
        }).required,
        height: (0, _vueStrictProp2.default)(Number).validator(function (v) {
            return v > 0;
        }).required
    }
})], VtableRow);
exports.VtableRow = VtableRow;

var VtableRow_1;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VtableSplitter = undefined;

var _vueStrictProp = __webpack_require__(0);

var _vueStrictProp2 = _interopRequireDefault(_vueStrictProp);

var _vueTsxSupport = __webpack_require__(8);

var tsx = _interopRequireWildcard(_vueTsxSupport);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var m = tsx.modifiers;
var VtableSplitter = exports.VtableSplitter = tsx.component({
    functional: true,
    name: "VtableSplitter",
    props: {
        dragging: (0, _vueStrictProp2.default)(Boolean).required,
        width: (0, _vueStrictProp2.default)(Number).required,
        mousedownCallback: _vueStrictProp2.default.ofFunction().required
    },
    render: function render(_h, _ref) {
        var props = _ref.props;
        var h = arguments[0];
        var dragging = props.dragging,
            width = props.width,
            mousedownCallback = props.mousedownCallback;

        var className = dragging ? "vtable-dragging-splitter" : "vtable-splitter";
        var style = {
            minWidth: (0, _utils.px)(width),
            maxWidth: (0, _utils.px)(width),
            height: "100%",
            boxSizing: "border-box",
            cursor: "col-resize"
        };
        return h(
            "div",
            { "class": className, style: style, on: {
                    "click": m.stop,
                    "mousedown": m.stop.prevent(function (ev) {
                        return mousedownCallback(ev.clientX);
                    })
                }
            },
            []
        );
    }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(6);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: {
        visibility: "hidden"
    },
    parent: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        visibility: "hidden",
        zIndex: -1
    },
    expandChild: {
        position: "absolute",
        left: 0,
        top: 0,
        transition: "0s",
        width: "100000px",
        height: "100000px"
    },
    shrinkChild: {
        position: "absolute",
        left: 0,
        top: 0,
        transition: "0s",
        width: "200%",
        height: "200%"
    }
};

module.exports = {
    name: "resizesensor",
    props: {
        debounce: { type: Number, default: 50, validator: function validator(v) {
                return v >= 0;
            } }
    },
    render: function render(createElement) {
        function div(options, children) {
            return createElement("div", options, children);
        }
        return div({ class: "resize-sensor", style: styles.root }, [div({
            ref: "expand",
            style: styles.parent,
            on: { scroll: this.onScroll }
        }, [div({ style: styles.expandChild })]), div({
            ref: "shrink",
            style: styles.parent,
            on: { scroll: this.onScroll }
        }, [div({ style: styles.shrinkChild })])]);
    },

    computed: {
        emitResized: function emitResized() {
            var _this = this;

            return _lodash2.default.debounce(function () {
                return _this.$emit("resized");
            }, this.debounce);
        }
    },
    methods: {
        reset: function reset() {
            this.$refs.expand.scrollLeft = 100000;
            this.$refs.expand.scrollTop = 100000;
            this.$refs.shrink.scrollLeft = 100000;
            this.$refs.shrink.scrollTop = 100000;
        },
        onScroll: function onScroll() {
            this.emitResized();
            this.reset();
        }
    },
    mounted: function mounted() {
        this.reset();
    },
    activated: function activated() {
        this.reset();
    }
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map