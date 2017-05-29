(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["vue-vlist"] = factory(require("vue"), require("lodash"));
	else
		root["vue-vlist"] = factory(root["vue"], root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function px(value) {
    if (typeof value === "string" || value === undefined) {
        return value;
    }
    else {
        return `${value}px`;
    }
}
exports.px = px;
function supplier(value) {
    return () => value;
}
exports.supplier = supplier;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = __webpack_require__(3);
var vue_class_component_1 = __webpack_require__(12);
// for component which has props
var TypedComponent = (function (_super) {
    __extends(TypedComponent, _super);
    function TypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TypedComponent;
}(Vue));
TypedComponent = __decorate([
    vue_class_component_1.default({})
], TypedComponent);
exports.TypedComponent = TypedComponent;
// for component which has props and events
var EvTypedComponent = (function (_super) {
    __extends(EvTypedComponent, _super);
    function EvTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EvTypedComponent;
}(Vue));
EvTypedComponent = __decorate([
    vue_class_component_1.default({
        beforeCreate: function () {
            this.$events = {
                emit: this.$emit.bind(this),
                on: this.$on.bind(this),
                once: this.$once.bind(this),
                off: this.$off.bind(this)
            };
        }
    })
], EvTypedComponent);
exports.EvTypedComponent = EvTypedComponent;
// for component which has props and data
var StatefulTypedComponent = (function (_super) {
    __extends(StatefulTypedComponent, _super);
    function StatefulTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StatefulTypedComponent;
}(TypedComponent));
exports.StatefulTypedComponent = StatefulTypedComponent;
// for component which has props, events and data
var StatefulEvTypedComponent = (function (_super) {
    __extends(StatefulEvTypedComponent, _super);
    function StatefulEvTypedComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StatefulEvTypedComponent;
}(EvTypedComponent));
exports.StatefulEvTypedComponent = StatefulEvTypedComponent;
exports.component = vue_class_component_1.default;
/*
 * Typesafe helper to define functional component
 */
function functionalComponent(name, props, render) {
    return Vue.extend({
        functional: true,
        name: name,
        props: props,
        render: render
    });
}
exports.functionalComponent = functionalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQTJCO0FBQzNCLDJEQUE2QztBQTZDN0MsZ0NBQWdDO0FBRWhDLElBQWEsY0FBYztJQUFnQixrQ0FBRztJQUE5Qzs7SUFFQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBMkMsR0FBRyxHQUU3QztBQUZZLGNBQWM7SUFEMUIsNkJBQVUsQ0FBc0IsRUFBRSxDQUFDO0dBQ3ZCLGNBQWMsQ0FFMUI7QUFGWSx3Q0FBYztBQUkzQiwyQ0FBMkM7QUFXM0MsSUFBYSxnQkFBZ0I7SUFBd0Isb0NBQUc7SUFBeEQ7O0lBR0EsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUhELENBQXFELEdBQUcsR0FHdkQ7QUFIWSxnQkFBZ0I7SUFWNUIsNkJBQVUsQ0FBNkI7UUFDcEMsWUFBWTtZQUNSLElBQUksQ0FBQyxPQUFPLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDM0IsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUM1QixDQUFDO1FBQ04sQ0FBQztLQUNKLENBQUM7R0FDVyxnQkFBZ0IsQ0FHNUI7QUFIWSw0Q0FBZ0I7QUFLN0IseUNBQXlDO0FBQ3pDO0lBQWtFLDBDQUFxQjtJQUF2Rjs7SUFHQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBa0UsY0FBYyxHQUcvRTtBQUhxQix3REFBc0I7QUFLNUMsaURBQWlEO0FBQ2pEO0lBQTRFLDRDQUErQjtJQUEzRzs7SUFHQSxDQUFDO0lBQUQsK0JBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBNEUsZ0JBQWdCLEdBRzNGO0FBSHFCLDREQUF3QjtBQWFqQyxRQUFBLFNBQVMsR0FBdUIsNkJBQVUsQ0FBQztBQUd4RDs7R0FFRztBQUNILDZCQUNvQixJQUFZLEVBQ1osS0FBNkIsRUFDN0IsTUFBd0M7SUFDeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixJQUFJLE1BQUE7UUFDSixLQUFLLEVBQUUsS0FBWTtRQUNuQixNQUFNLFFBQUE7S0FDVCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVkQsa0RBVUMifQ==

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function createPropOptionBuilder(type, createValidators) {
    function createPartial(base) {
        return Object.assign({
            Validator: function (validator) { return (__assign({}, base, { validator: validator })); }
        }, base, createValidators(base));
    }
    return Object.assign({
        Required: createPartial({ type: type, required: true }),
        Default: function (value) { return createPartial({ type: type, default: value }); }
    }, createPartial({ type: type }));
}
exports.Str = createPropOptionBuilder(String, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        $in: function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return $(function (v) { return values.indexOf(v) >= 0; });
        },
        $match: function (pattern) { return $(function (v) { return pattern.test(v); }); }
    };
});
exports.Num = createPropOptionBuilder(Number, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        $lessThan: function (max) { return $(function (v) { return v < max; }); },
        $greaterThan: function (min) { return $(function (v) { return min < v; }); },
        $lessEqual: function (max) { return $(function (v) { return v <= max; }); },
        $greaterEqual: function (min) { return $(function (v) { return min <= v; }); },
        $between: function (min, max) { return $(function (v) { return min <= v && v <= max; }); },
        $nonZero: function () { return $(function (v) { return v !== 0; }); },
        $positive: function () { return $(function (v) { return v > 0; }); },
        $nonNegative: function () { return $(function (v) { return v >= 0; }); },
    };
});
exports.Arr = createPropOptionBuilder(Array, function (base) {
    var $ = function (validator) { return (__assign({}, base, { validator: validator })); };
    return {
        $maxLength: function (max) { return $(function (v) { return v.length <= max; }); },
        $notEmpty: function () { return $(function (v) { return v.length > 0; }); },
        $all: function (test) { return $(function (v) {
            for (var i = 0; i < v.length; ++i) {
                if (!test(v[i])) {
                    return false;
                }
            }
            return true;
        }); }
    };
});
exports.Bool = createPropOptionBuilder(Boolean, function (base) { return undefined; });
exports.Func = createPropOptionBuilder(Function, function (base) { return undefined; });
exports.Obj = createPropOptionBuilder(Object, function (base) { return undefined; });
exports.Any = createPropOptionBuilder(null, function (base) { return undefined; });
function ofType(type) {
    return createPropOptionBuilder(type, function (base) { return undefined; });
}
exports.ofType = ofType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQWdCQSxpQ0FBaUQsSUFBYyxFQUFFLGdCQUE4QztJQUMzRyx1QkFBdUIsSUFBcUI7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDakIsU0FBUyxFQUFFLFVBQUMsU0FBdUIsSUFBSyxPQUFBLENBQUEsYUFBc0IsSUFBSSxJQUFFLFNBQVMsV0FBQSxHQUFFLENBQUEsRUFBdkMsQ0FBdUM7U0FDbEYsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNqRCxPQUFPLFlBQUMsS0FBZSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDL0UsRUFBRSxhQUFhLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBT1ksUUFBQSxHQUFHLEdBQUcsdUJBQXVCLENBQTRDLE1BQU0sRUFBRSxVQUFBLElBQUk7SUFDOUYsSUFBTSxDQUFDLEdBQUcsVUFBQyxTQUE0QixJQUFLLE9BQUEsY0FBTSxJQUFJLElBQUUsU0FBUyxXQUFBLElBQUcsRUFBeEIsQ0FBd0IsQ0FBQztJQUNyRSxNQUFNLENBQUM7UUFDSCxHQUFHLEVBQUU7WUFBQyxnQkFBUztpQkFBVCxVQUFTLEVBQVQscUJBQVMsRUFBVCxJQUFTO2dCQUFULDJCQUFTOztZQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFB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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeSensor = __webpack_require__(13);
const tc = __webpack_require__(1);
const p = __webpack_require__(2);
const utils_1 = __webpack_require__(0);
let Vlist = class Vlist extends tc.StatefulEvTypedComponent {
    data() {
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
    get containerStyle() {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            overflow: "hidden"
        };
    }
    get headerStyle() {
        return {
            display: "flex",
            flex: "0 0 auto",
            boxSizing: "border-box",
            minWidth: utils_1.px(this.$props.contentWidth),
            position: "relative",
            left: utils_1.px(this.$data.scrollLeft * -1),
            overflow: "hidden",
            padding: `0 ${utils_1.px(this.$data.vScrollBarWidth)} 0 0`
        };
    }
    get scrollableStyle() {
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
    get contentStyle() {
        return {
            display: "flex",
            flexFlow: "column nowrap",
            flex: "1 1 auto",
            position: "relative",
            boxSizing: "border-box",
            height: utils_1.px(this.contentHeight),
            overflow: "hidden",
            minWidth: utils_1.px(this.$props.contentWidth)
        };
    }
    get spacerStyle() {
        return {
            height: utils_1.px(this.$props.rowHeight * this.firstIndex),
            flex: "0 0 auto"
        };
    }
    ;
    get rowStyle() {
        return {
            display: "flex",
            width: "100%",
            height: utils_1.px(this.$props.rowHeight)
        };
    }
    /* computed */
    get firstIndex() {
        let value = Math.floor(this.$data.scrollTop / this.$props.rowHeight);
        const { rowStyleCycle } = this.$props;
        if (rowStyleCycle && rowStyleCycle > 1) {
            value -= (value % rowStyleCycle);
        }
        return value;
    }
    get lastIndex() {
        const { scrollTop, bodyHeight } = this.$data;
        return Math.ceil((scrollTop + bodyHeight) / this.$props.rowHeight);
    }
    get renderedItems() {
        return this.$props.items.slice(this.firstIndex, this.lastIndex + 1);
    }
    get contentHeight() {
        return this.$props.rowHeight * this.$props.items.length;
    }
    /* methods */
    updateBodySize() {
        const sc = this.$refs.scrollable;
        const bound = sc.getBoundingClientRect();
        const bodyWidth = sc.clientWidth;
        const bodyHeight = sc.clientHeight;
        const vScrollBarWidth = Math.floor(bound.width - bodyWidth);
        const hScrollBarHeight = Math.floor(bound.height - bodyHeight);
        const data = this.$data;
        if (data.bodyWidth !== bodyWidth ||
            data.bodyHeight !== bodyHeight ||
            data.vScrollBarWidth !== vScrollBarWidth ||
            data.hScrollBarHeight !== hScrollBarHeight) {
            data.bodyWidth = bodyWidth;
            data.bodyHeight = bodyHeight;
            data.vScrollBarWidth = vScrollBarWidth;
            data.hScrollBarHeight = hScrollBarHeight;
        }
    }
    ;
    onScroll(event) {
        const { scrollLeft, scrollTop } = this.$refs.scrollable;
        this.$data.scrollLeft = scrollLeft;
        this.$data.scrollTop = scrollTop;
        this.$events.emit("scroll", { scrollLeft, scrollTop, event });
    }
    onRowClick(item, index, event) {
        this.$events.emit("row-click", { item, index, event });
    }
    onContentHeightChanged(newValue, oldValue) {
        const hScrollBarHeight = this.$data.hScrollBarHeight;
        const height = this.$data.bodyHeight + hScrollBarHeight;
        if ((0 < hScrollBarHeight) === (newValue < height)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }
    onContentWidthChanged(newValue, oldValue) {
        const vScrollBarWidth = this.$data.vScrollBarWidth;
        const width = this.$data.bodyWidth + vScrollBarWidth;
        if ((0 < vScrollBarWidth) === (newValue < width)) {
            // must re-check scrollbar visibilities
            this.updateBodySize();
        }
    }
};
Vlist = __decorate([
    tc.component(Object.assign({}, __webpack_require__(14), { components: { resizeSensor }, props: {
            rowComponent: p.Any.Required,
            items: p.Arr.Required,
            getItemKey: p.Func.Required,
            contentWidth: p.ofType([Number, String]),
            ctx: p.Any,
            rowHeight: p.Num.Required.$positive(),
            rowStyleCycle: p.Num.Default(1).$positive(),
            style: p.Obj
        }, watch: {
            contentWidth: "onContentWidthChanged",
            contentHeight: "onContentHeightChanged"
        } }))
], Vlist);
exports.default = Vlist;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tc = __webpack_require__(1);
const p = __webpack_require__(2);
const utils_1 = __webpack_require__(0);
exports.default = tc.functionalComponent("VtableSplitter", {
    index: p.Num.Required,
    ctx: p.Obj.Required
}, (h, { props }) => {
    const className = (props.ctx.draggingSplitter === props.index
        ? "vtable-dragging-splitter" : "vtable-splitter");
    const style = {
        minWidth: utils_1.px(props.ctx.splitterWidth),
        maxWidth: utils_1.px(props.ctx.splitterWidth),
        height: "100%",
        boxSizing: "border-box",
        cursor: "col-resize"
    };
    const on = {
        mousedown: (ev) => props.ctx.onSplitterMouseDown(props.index, ev)
    };
    return h("div", { class: className, style, on });
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vue = __webpack_require__(3);
const _ = __webpack_require__(6);
const utils_1 = __webpack_require__(0);
const tc = __webpack_require__(1);
const p = __webpack_require__(2);
const vlist_1 = __webpack_require__(4);
const vtablerow_1 = __webpack_require__(11);
const vtablesplitter_1 = __webpack_require__(5);
let Vtable = class Vtable extends tc.StatefulEvTypedComponent {
    data() {
        return {
            widths: this.$props.columns.map(c => c.defaultWidth),
            scrollLeft: 0,
            splitterPositions: [],
            draggingSplitter: -1
        };
    }
    /* style */
    get headerStyle() {
        return {
            display: "flex",
            position: "relative",
            flex: "1 1 auto",
            width: "100%",
            height: utils_1.px(this.actualHeaderHeight),
            lineHeight: utils_1.px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: "0",
            whiteSpace: "none"
        };
    }
    headerCellStyle(width) {
        return {
            minWidth: utils_1.px(width),
            width: utils_1.px(width),
            lineHeight: utils_1.px(this.actualHeaderHeight),
            boxSizing: "border-box",
            margin: "0",
            overflow: "hidden"
        };
    }
    /** ctx object will be passed to vlist */
    get listCtx() {
        const { ctx, rowClass, columns, getRowClass, splitterWidth } = this.$props;
        return {
            ctx,
            columns,
            getRowClass: (item, index) => (getRowClass(item, index) || rowClass),
            splitterWidth,
            widths: this.$data.widths,
            draggingSplitter: this.$data.draggingSplitter,
            onSplitterMouseDown: this.onSplitterMouseDown
        };
    }
    get actualHeaderHeight() {
        const { headerHeight, rowHeight } = this.$props;
        return (headerHeight > 0) ? headerHeight : rowHeight;
    }
    get contentWidth() {
        return _.sumBy(this.$data.widths, w => w + this.$props.splitterWidth);
    }
    /* methods */
    updateScrollPosition(args) {
        this.$data.scrollLeft = args.scrollLeft;
    }
    onSplitterMouseDown(index, event) {
        event.preventDefault();
        event.stopPropagation();
        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
        const column = this.$props.columns[index];
        const startWidth = headerCell.clientWidth;
        const startX = event.screenX;
        const minWidth = column.minWidth || 5;
        const onMouseMove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const offset = e.screenX - startX;
            const width = Math.max(startWidth + offset, minWidth);
            Vue.set(this.$data.widths, index, width);
            this.$data.draggingSplitter = index;
        };
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            this.$data.draggingSplitter = -1;
        };
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        this.$data.draggingSplitter = index;
    }
    onRowClick(arg) {
        this.$events.emit("row-click", arg);
    }
};
Vtable = __decorate([
    tc.component(Object.assign({}, __webpack_require__(15), { components: { vlist: vlist_1.default, vtablerow: vtablerow_1.default, vtablesplitter: vtablesplitter_1.default }, props: {
            rowHeight: p.Num.Required.$positive(),
            headerHeight: p.Num.Default(0).$nonNegative(),
            columns: p.Arr.Required,
            items: p.Arr.Required,
            rowStyleCycle: p.Num.Default(1).$positive(),
            splitterWidth: p.Num.Default(3).$positive(),
            rowClass: p.Str.Default("vtable-row"),
            getRowClass: p.Func.Default(utils_1.supplier(() => undefined)),
            ctx: p.Any,
            getItemKey: p.Func.Required
        } }))
], Vtable);
exports.default = Vtable;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const vlist_1 = __webpack_require__(4);
const vtable_1 = __webpack_require__(7);
module.exports = {
    Vlist: vlist_1.default, Vtable: vtable_1.default
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tc = __webpack_require__(1);
const p = __webpack_require__(2);
const utils_1 = __webpack_require__(0);
;
exports.default = tc.functionalComponent("VtableCell", {
    item: p.Any.Required,
    index: p.Num.Required,
    columnIndex: p.Num.Required,
    height: p.Num.Required,
    ctx: p.Obj.Required
}, (h, { props }) => {
    const column = props.ctx.columns[props.columnIndex];
    const w = utils_1.px(props.ctx.widths[props.columnIndex]);
    const style = {
        minWidth: w,
        width: w,
        lineHeight: utils_1.px(props.height),
        margin: 0,
        boxSizing: "border-box",
        overflow: "hidden"
    };
    return h("div", { class: ["vtable-cell", column.className], style }, [
        column.render(h, props.item, props.index, props.ctx.ctx)
    ]);
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tc = __webpack_require__(1);
const p = __webpack_require__(2);
const utils_1 = __webpack_require__(0);
const vtablecell_1 = __webpack_require__(10);
const vtablesplitter_1 = __webpack_require__(5);
let VtableRow = class VtableRow extends tc.TypedComponent {
    get rowStyle() {
        return {
            display: "flex",
            flex: "1 1 auto",
            width: "100%",
            height: utils_1.px(this.$props.height),
            lineHeight: utils_1.px(this.$props.height),
            boxSizing: "border-box",
            margin: 0
        };
    }
};
VtableRow = __decorate([
    tc.component(Object.assign({}, __webpack_require__(16), { components: { vtablecell: vtablecell_1.default, vtablesplitter: vtablesplitter_1.default }, props: {
            item: p.Any.Required,
            index: p.Num.Required.$nonNegative(),
            height: p.Num.Required.$positive(),
            ctx: p.Obj.Required
        } }))
], VtableRow);
exports.default = VtableRow;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-class-component v5.0.1
  * (c) 2015-2017 Evan You
  * @license MIT
  */


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(__webpack_require__(3));

function createDecorator(factory) {
    return function (_, key, index) {
        if (typeof index !== 'number') {
            index = undefined;
        }
        $decoratorQueue.push(function (options) { return factory(options, key, index); });
    };
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    Component.prototype._init = function () {
        var _this = this;
        var keys = Object.getOwnPropertyNames(vm);
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { return vm[key] = value; }
                });
            }
        });
    };
    var data = new Component();
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render'
];
var $decoratorQueue = [];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        }
        else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    $decoratorQueue.forEach(function (fn) { return fn(options); });
    $decoratorQueue = [];
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    return Super.extend(options);
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
(function (Component) {
    function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    }
    Component.registerHooks = registerHooks;
})(Component || (Component = {}));
var Component$1 = Component;

exports['default'] = Component$1;
exports.createDecorator = createDecorator;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 13 */
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
    child: {
        position: "absolute",
        left: 0,
        top: 0,
        transition: "0s"
    }
};

module.exports = {
    name: "resizesensor",
    props: {
        debounce: { type: Number, default: 50, validator: function validator(v) {
                return v >= 0;
            } }
    },
    data: function data() {
        var _this = this;

        return {
            emitResized: _lodash2.default.debounce(function () {
                return _this.$emit("resized");
            }, this.debounce)
        };
    },
    render: function render(createElement) {
        function div(options) {
            for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                children[_key - 1] = arguments[_key];
            }

            return createElement("div", options, children);
        }
        return div({ "class": "resize-sensor", style: styles.root }, div({ ref: "expand", style: styles.parent, on: { scroll: this.onScroll } }, div({ style: _lodash2.default.assign({ width: "100000px", height: "100000px" }, styles.child) })), div({ ref: "shrink", style: styles.parent, on: { scroll: this.onScroll } }, div({ style: _lodash2.default.assign({ width: "200%", height: "200%" }, styles.child) })));
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
    }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {


    module.exports = {
      render: function(){with(this){return _c('div',{staticClass:"vlist-container",style:([containerStyle, style])},[_c('div',{staticClass:"vlist-header-row",style:(headerStyle)},[_t("header")],2),_c('div',{ref:"scrollable",staticClass:"vlist-scrollable",style:(scrollableStyle),on:{"scroll":onScroll}},[_c('resize-sensor',{attrs:{"debounce":50},on:{"resized":updateBodySize}}),_c('div',{ref:"content",staticClass:"vlist-content",style:(contentStyle)},[_c('div',{staticClass:"vlist-spacer",style:(spacerStyle)}),_l((renderedItems),function(item,index){return _c('div',{key:getItemKey(item),staticClass:"vlist-row",style:(rowStyle),on:{"click":function($event){onRowClick(item, index + firstIndex, $event)}}},[_c(rowComponent,{tag:"component",attrs:{"item":item,"index":index + firstIndex,"height":rowHeight,"ctx":ctx}})],1)})],2)],1)])}},
      staticRenderFns: []
    };
  

/***/ }),
/* 15 */
/***/ (function(module, exports) {


    module.exports = {
      render: function(){with(this){return _c('vlist',{style:({ flex: '1 1 auto' }),attrs:{"row-height":rowHeight,"row-component":$options.components.vtablerow,"items":items,"row-style-cycle":rowStyleCycle,"content-width":contentWidth,"ctx":listCtx,"get-item-key":getItemKey},on:{"scroll":updateScrollPosition,"row-click":onRowClick}},[_c('div',{ref:"header",staticClass:"vtable-header",style:(headerStyle),slot:"header"},[_l((columns),function(c,index){return [_c('div',{staticClass:"vtable-header-cell",class:c.className,style:(headerCellStyle(listCtx.widths[index]))},[_v(_s(c.title))]),_c('vtablesplitter',{attrs:{"index":index,"ctx":listCtx}})]})],2)])}},
      staticRenderFns: []
    };
  

/***/ }),
/* 16 */
/***/ (function(module, exports) {


    module.exports = {
      render: function(){with(this){return _c('div',{class:ctx.getRowClass(item, index),style:(rowStyle)},[_l((ctx.columns),function(c,columnIndex){return [_c('vtablecell',{attrs:{"item":item,"index":index,"column-index":columnIndex,"height":height,"ctx":ctx}}),_c('vtablesplitter',{attrs:{"index":columnIndex,"ctx":ctx}})]})],2)}},
      staticRenderFns: []
    };
  

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map