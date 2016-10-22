(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["vue-vlist"] = factory(require("vue"), require("lodash"));
	else
		root["vue-vlist"] = factory(root["vue"], root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const vlist_1 = __webpack_require__(1);
	const vtable_1 = __webpack_require__(10);
	module.exports = {
	    Vlist: vlist_1.default, Vtable: vtable_1.default
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Vue = __webpack_require__(2);
	const resizeSensor = __webpack_require__(3);
	const vueit_1 = __webpack_require__(5);
	const utils_1 = __webpack_require__(7);
	const validation_1 = __webpack_require__(8);
	let Vlist = class Vlist extends Vue {
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
	            minWidth: utils_1.px(this.contentWidth),
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
	            minWidth: utils_1.px(this.contentWidth)
	        };
	    }
	    get spacerStyle() {
	        return {
	            height: utils_1.px(this.rowHeight * this.firstIndex),
	            flex: "0 0 auto"
	        };
	    }
	    ;
	    get rowStyle() {
	        return {
	            display: "flex",
	            width: "100%",
	            height: utils_1.px(this.rowHeight)
	        };
	    }
	    /* computed */
	    get firstIndex() {
	        let value = Math.floor(this.$data.scrollTop / this.rowHeight);
	        if (this.rowStyleCycle > 1) {
	            value -= (value % this.rowStyleCycle);
	        }
	        return value;
	    }
	    get lastIndex() {
	        const { scrollTop, bodyHeight } = this.$data;
	        return Math.ceil((scrollTop + bodyHeight) / this.rowHeight);
	    }
	    get renderedItems() {
	        return this.items.slice(this.firstIndex, this.lastIndex + 1);
	    }
	    get contentHeight() {
	        return this.rowHeight * this.items.length;
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
	        const args = { scrollLeft, scrollTop };
	        this.$data.scrollLeft = scrollLeft;
	        this.$data.scrollTop = scrollTop;
	        this.$emit("scroll", args);
	    }
	    onRowClick(item, index, event) {
	        this.$emit("row-click", { item, index, event });
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
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], Vlist.prototype, "rowComponent", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Array)
	], Vlist.prototype, "items", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Function)
	], Vlist.prototype, "getItemKey", void 0);
	__decorate([
	    vueit_1.prop({ type: [Number, String] }), 
	    __metadata('design:type', Object)
	], Vlist.prototype, "contentWidth", void 0);
	__decorate([
	    vueit_1.prop, 
	    __metadata('design:type', Object)
	], Vlist.prototype, "ctx", void 0);
	__decorate([
	    vueit_1.prop.required({ validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], Vlist.prototype, "rowHeight", void 0);
	__decorate([
	    vueit_1.prop.default(1, { validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], Vlist.prototype, "rowStyleCycle", void 0);
	__decorate([
	    vueit_1.prop, 
	    __metadata('design:type', Object)
	], Vlist.prototype, "style", void 0);
	__decorate([
	    vueit_1.watch("contentHeight"), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object]), 
	    __metadata('design:returntype', void 0)
	], Vlist.prototype, "onContentHeightChanged", null);
	__decorate([
	    vueit_1.watch("contentWidth"), 
	    __metadata('design:type', Function), 
	    __metadata('design:paramtypes', [Object, Object]), 
	    __metadata('design:returntype', void 0)
	], Vlist.prototype, "onContentWidthChanged", null);
	Vlist = __decorate([
	    vueit_1.component({
	        compiledTemplate: __webpack_require__(9),
	        components: { resizeSensor },
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
	    }), 
	    __metadata('design:paramtypes', [])
	], Vlist);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Vlist;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _lodash = __webpack_require__(4);
	
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(6), __webpack_require__(2));
		else if(typeof define === 'function' && define.amd)
			define(["reflect-metadata", "vue"], factory);
		else if(typeof exports === 'object')
			exports["vueit"] = factory(require("reflect-metadata"), require("vue"));
		else
			root["vueit"] = factory(root["reflect-metadata"], root["vue"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
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
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		__webpack_require__(1);
		var Vue = __webpack_require__(2);
		
		var AnnotatedOptions = function AnnotatedOptions() {
		    _classCallCheck(this, AnnotatedOptions);
		
		    this.props = {};
		    this.watch = {};
		    this.events = {};
		};
		
		var AnnotatedOptionsKey = "vueit:component-options";
		var DesignTypeKey = "design:type";
		var DesignParamTypesKey = "design:paramtypes";
		var internalHooks = ["data", "render", "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "activated", "deactivated", "beforeDestroy", "destroyed"];
		function warn(msg) {
		    console.warn("[vueit warn]: " + msg);
		}
		function error(msg) {
		    console.error("[vueit error]: " + msg);
		}
		function makeComponent(target, option) {
		    option = Object.assign({}, option);
		    option.name = option.name || target["name"];
		    if (option.compiledTemplate) {
		        option.render = option.compiledTemplate.render;
		        option.staticRenderFns = option.compiledTemplate.staticRenderFns;
		        if (option.template) {
		            warn("\"compiledtemplate\" and \"template\" are exclusive. \"template\" is ignored: " + target.name);
		            delete option.template;
		        }
		    }
		    ;
		    var proto = target.prototype;
		    Object.getOwnPropertyNames(proto).filter(function (name) {
		        return name !== "constructor";
		    }).forEach(function (name) {
		        // hooks
		        if (internalHooks.indexOf(name) > -1) {
		            option[name] = proto[name];
		        }
		        var descriptor = Object.getOwnPropertyDescriptor(proto, name);
		        if (typeof descriptor.value === "function") {
		            // methods
		            (option.methods || (option.methods = {}))[name] = descriptor.value;
		        } else if (descriptor.get || descriptor.set) {
		            // computed
		            (option.computed || (option.computed = {}))[name] = {
		                get: descriptor.get,
		                set: descriptor.set
		            };
		        }
		    });
		    var ann = Reflect.getOwnMetadata(AnnotatedOptionsKey, proto);
		    if (ann != null) {
		        // props
		        option.props = option.props || ann.props;
		        // watch
		        option.watch = option.watch || ann.watch;
		    }
		    // find super
		    var superProto = Object.getPrototypeOf(proto);
		    var Super = superProto instanceof Vue ? superProto.constructor : Vue;
		    return Super.extend(option);
		}
		function makefunctionalComponent(target) {
		    var obj = "render" in target ? target : target.prototype;
		    var render = obj.render;
		    if (render.length != 2) {
		        error("\"render\" function must have 2 parameters: " + target.name);
		        return;
		    }
		    var ao = Reflect.getOwnMetadata(AnnotatedOptionsKey, obj);
		    var props = ao ? ao.props : {};
		    var options = {
		        name: target.name,
		        functional: true,
		        props: props,
		        render: props ? function (h, context) {
		            return render.bind(context.props)(h, context);
		        } : render
		    };
		    return Vue.extend(options);
		}
		function getParamNames(source) {
		    var withoutComment = source.replace(/(\/\*.*?\*\/)|(\/\/.*$)/mg, "");
		    var matched = /\(\s*(.*?)\s*\)/.exec(withoutComment);
		    if (!matched) {
		        return [];
		    }
		    return matched[1].split(/\s*,\s*/g);
		}
		function getAnnotatedOptions(target) {
		    var ann = Reflect.getOwnMetadata(AnnotatedOptionsKey, target);
		    if (ann == null) {
		        ann = new AnnotatedOptions();
		        Reflect.defineMetadata(AnnotatedOptionsKey, ann, target);
		    }
		    return ann;
		}
		function trySetPropTypeValidation(target, propertyKey, opts, type) {
		    if ([String, Number, Boolean, Function, Array].indexOf(type) <= -1) {
		        return;
		    }
		    if (typeof opts.type !== "undefined") {
		        if ([String, Number, Boolean, Function, Array].indexOf(opts.type) >= 0 && opts.type !== type) {
		            warn("specified type validation does not match design type: " + target.constructor.name + "." + propertyKey);
		        }
		        return;
		    }
		    opts.type = type;
		}
		function defineProp(target, propertyKey, options) {
		    options = Object.assign({}, options);
		    var type = Reflect.getOwnMetadata(DesignTypeKey, target, propertyKey);
		    trySetPropTypeValidation(target, propertyKey, options, type);
		    getAnnotatedOptions(target).props[propertyKey] = options;
		}
		function defineWatch(target, propertyKey, option) {
		    var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
		    if (typeof descriptor.value !== "function") {
		        warn("@watch() can decorate only function: " + target.constructor.name + "." + propertyKey);
		        return;
		    }
		    getAnnotatedOptions(target).watch[option.name] = {
		        handler: descriptor.value,
		        deep: option.deep,
		        immediate: option.immediate
		    };
		}
		var prop = function prop() {
		    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		        args[_key] = arguments[_key];
		    }
		
		    if (args.length <= 1) {
		        var _ret = function () {
		            // Used with argument list. Like `@prop()` or `@prop({ ... })`
		            var options = args[0] || {};
		            return {
		                v: function v(target, propertyKey) {
		                    return defineProp(target, propertyKey.toString(), options);
		                }
		            };
		        }();
		
		        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
		    } else {
		        // Used without argument list. Like `@prop`
		        var target = args[0];
		        var propertyKey = args[1].toString();
		        defineProp(target, propertyKey, {});
		    }
		};
		prop.required = function () {
		    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
		        args[_key2] = arguments[_key2];
		    }
		
		    if (args.length <= 1) {
		        // Used with argument list. Like `@prop.required()` or `@prop.required({ ... })`
		        return prop(Object.assign({ required: true }, args[0]));
		    } else {
		        // Used without argument list. Like `@prop.required`
		        return prop({ required: true }).apply(null, args);
		    }
		};
		prop.default = function (defaultValue, options) {
		    return prop(Object.assign({ default: defaultValue }, options));
		};
		var vueit = {
		    component: function component(option) {
		        return function (target) {
		            return makeComponent(target, option || {});
		        };
		    },
		
		    functionalComponent: makefunctionalComponent,
		    prop: prop,
		    watch: function watch(option) {
		        return function (target, propertyKey) {
		            return defineWatch(target, propertyKey.toString(), typeof option === "string" ? { name: option } : option);
		        };
		    }
		};
		module.exports = vueit;
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    "use strict";
	    var hasOwn = Object.prototype.hasOwnProperty;
	    // feature test for Object.create support
	    var supportsCreate = typeof Object.create === "function";
	    // feature test for __proto__ support
	    var supportsProto = (function () {
	        var sentinel = {};
	        function __() { }
	        __.prototype = sentinel;
	        var instance = new __();
	        return instance.__proto__ === sentinel;
	    })();
	    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
	        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
	            function () { return MakeDictionary({}); };
	    var HashMap;
	    (function (HashMap) {
	        var downLevel = !supportsCreate && !supportsProto;
	        HashMap.has = downLevel
	            ? function (map, key) { return hasOwn.call(map, key); }
	            : function (map, key) { return key in map; };
	        HashMap.get = downLevel
	            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	            : function (map, key) { return map[key]; };
	    })(HashMap || (HashMap = {}));
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
	    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    var Metadata = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param targetKey (Optional) The property key to decorate.
	      * @param targetDescriptor (Optional) The property descriptor for the target key
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Example = Reflect.decorate(decoratorsArray, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(Example, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(Example.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, targetKey, targetDescriptor) {
	        if (!IsUndefined(targetDescriptor)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            if (IsUndefined(targetKey))
	                throw new TypeError();
	            if (!IsObject(targetDescriptor))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	        }
	        else if (!IsUndefined(targetKey)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	        }
	        else {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsConstructor(target))
	                throw new TypeError();
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class Example {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, targetKey) {
	            if (!IsUndefined(targetKey)) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                targetKey = ToPropertyKey(targetKey);
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	            }
	            else {
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
	            }
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param targetKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryMetadataKeys(target, targetKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryOwnMetadataKeys(target, targetKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, targetKey) {
	        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        if (!metadataMap.delete(metadataKey))
	            return false;
	        if (metadataMap.size > 0)
	            return true;
	        var targetMetadata = Metadata.get(target);
	        targetMetadata.delete(targetKey);
	        if (targetMetadata.size > 0)
	            return true;
	        Metadata.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated)) {
	                if (!IsConstructor(decorated))
	                    throw new TypeError();
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated)) {
	                if (!IsObject(decorated))
	                    throw new TypeError();
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            decorator(target, propertyKey);
	        }
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-
	    function GetOrCreateMetadataMap(target, targetKey, create) {
	        var targetMetadata = Metadata.get(target);
	        if (!targetMetadata) {
	            if (!create)
	                return undefined;
	            targetMetadata = new _Map();
	            Metadata.set(target, targetMetadata);
	        }
	        var keyMetadata = targetMetadata.get(targetKey);
	        if (!keyMetadata) {
	            if (!create)
	                return undefined;
	            keyMetadata = new _Map();
	            targetMetadata.set(targetKey, keyMetadata);
	        }
	        return keyMetadata;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return true;
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = GetPrototypeOf(O);
	        if (parent === null)
	            return ownKeys;
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0)
	            return ownKeys;
	        if (ownKeys.length <= 0)
	            return parentKeys;
	        var keys = new _Set();
	        for (var _i = 0; _i < ownKeys.length; _i++) {
	            var key = ownKeys[_i];
	            keys.add(key);
	        }
	        for (var _a = 0; _a < parentKeys.length; _a++) {
	            var key = parentKeys[_a];
	            keys.add(key);
	        }
	        return getKeys(keys);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
	    function OrdinaryOwnMetadataKeys(target, targetKey) {
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        var keys = [];
	        if (metadataMap)
	            forEach(metadataMap, function (_, key) { return keys.push(key); });
	        return keys;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	    function IsArray(x) {
	        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	    function IsConstructor(x) {
	        return typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	    function ToPropertyKey(value) {
	        return IsSymbol(value) ? value : String(value);
	    }
	    function GetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype)
	            return proto;
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	        // Try to determine the superclass Exampleonstructor. Compatible implementations
	        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype)
	            return proto;
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype)
	            return proto;
	        // If the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function")
	            return proto;
	        // If we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O)
	            return proto;
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    function IteratorStep(iterator) {
	        var result = iterator.next();
	        return result.done ? undefined : result;
	    }
	    function IteratorClose(iterator) {
	        var f = iterator["return"];
	        if (f)
	            f.call(iterator);
	    }
	    function forEach(source, callback, thisArg) {
	        var entries = source.entries;
	        if (typeof entries === "function") {
	            var iterator = entries.call(source);
	            var result;
	            try {
	                while (result = IteratorStep(iterator)) {
	                    var _a = result.value, key = _a[0], value = _a[1];
	                    callback.call(thisArg, value, key, source);
	                }
	            }
	            finally {
	                if (result)
	                    IteratorClose(iterator);
	            }
	        }
	        else {
	            var forEach_1 = source.forEach;
	            if (typeof forEach_1 === "function") {
	                forEach_1.call(source, callback, thisArg);
	            }
	        }
	    }
	    function getKeys(source) {
	        var keys = [];
	        forEach(source, function (_, key) { keys.push(key); });
	        return keys;
	    }
	    // naive MapIterator shim
	    function CreateMapIterator(keys, values, kind) {
	        var index = 0;
	        return {
	            next: function () {
	                if ((keys || values) && index < (keys || values).length) {
	                    var current = index++;
	                    switch (kind) {
	                        case "key": return { value: keys[current], done: false };
	                        case "value": return { value: values[current], done: false };
	                        case "key+value": return { value: [keys[current], values[current]], done: false };
	                    }
	                }
	                keys = undefined;
	                values = undefined;
	                return { value: undefined, done: true };
	            },
	            "throw": function (error) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                throw error;
	            },
	            "return": function (value) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                return { value: value, done: true };
	            }
	        };
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        return (function () {
	            function Map() {
	                this._keys = [];
	                this._values = [];
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            }
	            Object.defineProperty(Map.prototype, "size", {
	                get: function () { return this._keys.length; },
	                enumerable: true,
	                configurable: true
	            });
	            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	            Map.prototype.get = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                return index >= 0 ? this._values[index] : undefined;
	            };
	            Map.prototype.set = function (key, value) {
	                var index = this._find(key, /*insert*/ true);
	                this._values[index] = value;
	                return this;
	            };
	            Map.prototype.delete = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                if (index >= 0) {
	                    var size = this._keys.length;
	                    for (var i = index + 1; i < size; i++) {
	                        this._keys[i - 1] = this._keys[i];
	                        this._values[i - 1] = this._values[i];
	                    }
	                    this._keys.length--;
	                    this._values.length--;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                    return true;
	                }
	                return false;
	            };
	            Map.prototype.clear = function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            };
	            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, "key"); };
	            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, "value"); };
	            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, "key+value"); };
	            Map.prototype._find = function (key, insert) {
	                if (this._cacheKey === key)
	                    return this._cacheIndex;
	                var index = this._keys.indexOf(key);
	                if (index < 0 && insert) {
	                    index = this._keys.length;
	                    this._keys.push(key);
	                    this._values.push(undefined);
	                }
	                return this._cacheKey = key, this._cacheIndex = index;
	            };
	            return Map;
	        })();
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        return (function () {
	            function Set() {
	                this._map = new _Map();
	            }
	            Object.defineProperty(Set.prototype, "size", {
	                get: function () { return this._map.size; },
	                enumerable: true,
	                configurable: true
	            });
	            Set.prototype.has = function (value) { return this._map.has(value); };
	            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	            Set.prototype.delete = function (value) { return this._map.delete(value); };
	            Set.prototype.clear = function () { this._map.clear(); };
	            Set.prototype.keys = function () { return this._map.keys(); };
	            Set.prototype.values = function () { return this._map.values(); };
	            Set.prototype.entries = function () { return this._map.entries(); };
	            return Set;
	        })();
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var keys = createDictionary();
	        var rootKey = CreateUniqueKey();
	        return (function () {
	            function WeakMap() {
	                this._key = CreateUniqueKey();
	            }
	            WeakMap.prototype.has = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.has(table, this._key) : false;
	            };
	            WeakMap.prototype.get = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.get(table, this._key) : undefined;
	            };
	            WeakMap.prototype.set = function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                table[this._key] = value;
	                return this;
	            };
	            WeakMap.prototype.delete = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? delete table[this._key] : false;
	            };
	            WeakMap.prototype.clear = function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            };
	            return WeakMap;
	        })();
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i)
	                buffer[i] = Math.random() * 0xff | 0;
	            return buffer;
	        }
	        function GenRandomBytes(size) {
	            if (typeof Uint8Array === "function") {
	                if (typeof crypto !== "undefined")
	                    return crypto.getRandomValues(new Uint8Array(size));
	                if (typeof msCrypto !== "undefined")
	                    return msCrypto.getRandomValues(new Uint8Array(size));
	                return FillRandomBytes(new Uint8Array(size), size);
	            }
	            return FillRandomBytes(new Array(size), size);
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8)
	                    result += "-";
	                if (byte < 16)
	                    result += "0";
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	        function CreateUniqueKey() {
	            var key;
	            do
	                key = "@@WeakMap@@" + CreateUUID();
	            while (HashMap.has(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create)
	                    return undefined;
	                Object.defineProperty(target, rootKey, { value: createDictionary() });
	            }
	            return target[rootKey];
	        }
	    }
	    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	    function MakeDictionary(obj) {
	        obj.__DICTIONARY_MODE__ = 1;
	        delete obj.____DICTIONARY_MODE__;
	        return obj;
	    }
	    // patch global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    if (hasOwn.call(Reflect, p)) {
	                        __global.Reflect[p] = Reflect[p];
	                    }
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof window !== "undefined" ? window :
	        typeof WorkerGlobalScope !== "undefined" ? self :
	            typeof global !== "undefined" ? global :
	                Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	function px(value) {
	    if (typeof value === "string") {
	        return value;
	    }
	    else {
	        return `${value}px`;
	    }
	}
	exports.px = px;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	function positive(n) {
	    return typeof n === "number" && n > 0;
	}
	exports.positive = positive;
	;
	function notNegative(n) {
	    return typeof n === "number" && n >= 0;
	}
	exports.notNegative = notNegative;
	;


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	    module.exports = {
	      render: function(){with(this){return _h('div',{staticClass:"vlist-container",style:([containerStyle, style])},[_h('div',{staticClass:"vlist-header-row",style:(headerStyle)},[_t("header")]),_h('div',{ref:"scrollable",staticClass:"vlist-scrollable",style:(scrollableStyle),on:{"scroll":onScroll}},[_h('resize-sensor',{attrs:{"debounce":50},on:{"resized":updateBodySize}}),_h('div',{ref:"content",staticClass:"vlist-content",style:(contentStyle)},[_h('div',{staticClass:"vlist-spacer",style:(spacerStyle)}),_l((renderedItems),function(item,index){return _h('div',{key:getItemKey(item),staticClass:"vlist-row",style:(rowStyle),on:{"click":function($event){onRowClick(item, index + firstIndex, $event)}}},[_h(rowComponent,{tag:"component",attrs:{"item":item,"index":index + firstIndex,"height":rowHeight,"ctx":ctx}})])})])])])}},
	      staticRenderFns: []
	    };
	  

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Vue = __webpack_require__(2);
	const _ = __webpack_require__(4);
	const utils_1 = __webpack_require__(7);
	const vueit_1 = __webpack_require__(5);
	const vlist_1 = __webpack_require__(1);
	const vtablerow_1 = __webpack_require__(11);
	const vtablesplitter_1 = __webpack_require__(13);
	const validation_1 = __webpack_require__(8);
	let Vtable = class Vtable extends Vue {
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
	            margin: 0,
	            textWrap: "none"
	        };
	    }
	    headerCellStyle(width) {
	        return {
	            minWidth: utils_1.px(width),
	            width: utils_1.px(width),
	            lineHeight: utils_1.px(this.actualHeaderHeight),
	            boxSizing: "border-box",
	            margin: 0,
	            overflow: "hidden"
	        };
	    }
	    /** ctx object will be passed to vlist */
	    get listCtx() {
	        const rowClass = this.rowClass;
	        return {
	            ctx: this.ctx,
	            columns: this.columns,
	            getRowClass: this.getRowClass ? this.getRowClass : (item, index) => rowClass,
	            splitterWidth: this.splitterWidth,
	            widths: this.$data.widths,
	            draggingSplitter: this.$data.draggingSplitter,
	            onSplitterMouseDown: this.onSplitterMouseDown
	        };
	    }
	    get actualHeaderHeight() {
	        return this.headerHeight > 0 ? this.headerHeight : this.rowHeight;
	    }
	    get contentWidth() {
	        return _.sumBy(this.$data.widths, w => w + this.splitterWidth);
	    }
	    /* methods */
	    updateScrollPosition(args) {
	        this.$data.scrollLeft = args.scrollLeft;
	    }
	    onSplitterMouseDown(index, event) {
	        event.preventDefault();
	        event.stopPropagation();
	        const headerCell = this.$refs.header.querySelectorAll("div.vtable-header-cell")[index];
	        const column = this.columns[index];
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
	        this.$emit("row-click", arg);
	    }
	};
	__decorate([
	    vueit_1.prop.required({ validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], Vtable.prototype, "rowHeight", void 0);
	__decorate([
	    vueit_1.prop.default(0), 
	    __metadata('design:type', Number)
	], Vtable.prototype, "headerHeight", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Array)
	], Vtable.prototype, "columns", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Array)
	], Vtable.prototype, "items", void 0);
	__decorate([
	    vueit_1.prop.default(1, { validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], Vtable.prototype, "rowStyleCycle", void 0);
	__decorate([
	    vueit_1.prop.default(3, { validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], Vtable.prototype, "splitterWidth", void 0);
	__decorate([
	    vueit_1.prop.default("vtable-row"), 
	    __metadata('design:type', String)
	], Vtable.prototype, "rowClass", void 0);
	__decorate([
	    vueit_1.prop, 
	    __metadata('design:type', Function)
	], Vtable.prototype, "getRowClass", void 0);
	__decorate([
	    vueit_1.prop, 
	    __metadata('design:type', Object)
	], Vtable.prototype, "ctx", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Function)
	], Vtable.prototype, "getItemKey", void 0);
	Vtable = __decorate([
	    vueit_1.component({
	        compiledTemplate: __webpack_require__(15),
	        components: { vlist: vlist_1.default, vtablerow: vtablerow_1.default, vtablesplitter: vtablesplitter_1.default },
	        data() {
	            return {
	                widths: this.columns.map(c => c.defaultWidth),
	                scrollLeft: 0,
	                splitterPositions: [],
	                draggingSplitter: -1
	            };
	        }
	    }), 
	    __metadata('design:paramtypes', [])
	], Vtable);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Vtable;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Vue = __webpack_require__(2);
	const vueit_1 = __webpack_require__(5);
	const utils_1 = __webpack_require__(7);
	const vtablecell_1 = __webpack_require__(12);
	const vtablesplitter_1 = __webpack_require__(13);
	const validation_1 = __webpack_require__(8);
	let VtableRow = class VtableRow extends Vue {
	    get rowStyle() {
	        return {
	            display: "flex",
	            flex: "1 1 auto",
	            width: "100%",
	            height: utils_1.px(this.height),
	            lineHeight: utils_1.px(this.height),
	            boxSizing: "border-box",
	            margin: 0
	        };
	    }
	};
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], VtableRow.prototype, "item", void 0);
	__decorate([
	    vueit_1.prop.required({ validator: validation_1.notNegative }), 
	    __metadata('design:type', Number)
	], VtableRow.prototype, "index", void 0);
	__decorate([
	    vueit_1.prop.required({ validator: validation_1.positive }), 
	    __metadata('design:type', Number)
	], VtableRow.prototype, "height", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], VtableRow.prototype, "ctx", void 0);
	VtableRow = __decorate([
	    vueit_1.component({
	        compiledTemplate: __webpack_require__(14),
	        components: { vtablecell: vtablecell_1.default, vtablesplitter: vtablesplitter_1.default }
	    }), 
	    __metadata('design:paramtypes', [])
	], VtableRow);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = VtableRow;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Vue = __webpack_require__(2);
	const vueit_1 = __webpack_require__(5);
	const utils_1 = __webpack_require__(7);
	let VtableCell = class VtableCell extends Vue {
	    render(h, context) {
	        const column = this.ctx.columns[this.columnIndex];
	        const w = utils_1.px(this.ctx.widths[this.columnIndex]);
	        const style = {
	            minWidth: w,
	            width: w,
	            lineHeight: utils_1.px(this.height),
	            margin: 0,
	            boxSizing: "border-box",
	            overflow: "hidden"
	        };
	        return h("div", { class: ["vtable-cell", column.className], style }, [
	            column.render(h, this.item, this.index, this.ctx.ctx)
	        ]);
	    }
	};
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], VtableCell.prototype, "item", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Number)
	], VtableCell.prototype, "index", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Number)
	], VtableCell.prototype, "columnIndex", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Number)
	], VtableCell.prototype, "height", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], VtableCell.prototype, "ctx", void 0);
	VtableCell = __decorate([
	    vueit_1.functionalComponent, 
	    __metadata('design:paramtypes', [])
	], VtableCell);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = VtableCell;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	const Vue = __webpack_require__(2);
	const vueit_1 = __webpack_require__(5);
	const utils_1 = __webpack_require__(7);
	let vtablesplitter = class vtablesplitter extends Vue {
	    render(h, context) {
	        const className = (this.ctx.draggingSplitter === this.index
	            ? "vtable-dragging-splitter" : "vtable-splitter");
	        const style = {
	            minWidth: utils_1.px(this.ctx.splitterWidth),
	            maxWidth: utils_1.px(this.ctx.splitterWidth),
	            height: "100%",
	            boxSizing: "border-box",
	            cursor: "col-resize"
	        };
	        const on = {
	            mousedown: ev => this.ctx.onSplitterMouseDown(this.index, ev)
	        };
	        return h("div", { class: className, style, on });
	    }
	};
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Number)
	], vtablesplitter.prototype, "index", void 0);
	__decorate([
	    vueit_1.prop.required, 
	    __metadata('design:type', Object)
	], vtablesplitter.prototype, "ctx", void 0);
	vtablesplitter = __decorate([
	    vueit_1.functionalComponent, 
	    __metadata('design:paramtypes', [])
	], vtablesplitter);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = vtablesplitter;
	;


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	    module.exports = {
	      render: function(){with(this){return _h('div',{class:ctx.getRowClass(item, index),style:(rowStyle)},[_l((ctx.columns),function(c,columnIndex){return [_h('vtablecell',{attrs:{"item":item,"index":index,"column-index":columnIndex,"height":height,"ctx":ctx}}),_h('vtablesplitter',{attrs:{"index":columnIndex,"ctx":ctx}})]})])}},
	      staticRenderFns: []
	    };
	  

/***/ },
/* 15 */
/***/ function(module, exports) {

	
	    module.exports = {
	      render: function(){with(this){return _h('vlist',{style:({ flex: '1 1 auto' }),attrs:{"row-height":rowHeight,"row-component":$options.components.vtablerow,"items":items,"row-style-cycle":rowStyleCycle,"content-width":contentWidth,"ctx":listCtx,"get-item-key":getItemKey},on:{"scroll":updateScrollPosition,"row-click":onRowClick}},[_h('div',{ref:"header",slot:"header",staticClass:"vtable-header",style:(headerStyle)},[_l((columns),function(c,index){return [_h('div',{staticClass:"vtable-header-cell",class:c.className,style:(headerCellStyle(listCtx.widths[index]))},[_s(c.title)]),_h('vtablesplitter',{attrs:{"index":index,"ctx":listCtx}})]})])])}},
	      staticRenderFns: []
	    };
	  

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map