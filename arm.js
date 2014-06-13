/*!
 * The open module JavaScript framework
 * 
 * @license Licensed under MIT license
 * @class   JavaScript MVC frameworks for enterprise application development
 * @name    Arm
 * @file:   Arm.js
 * @path:   js-src/lib
 * @desc:   A lightweight, object-oriented JS framework for quickly creating clearly and structured web applications.
 *          <ol>
 *          <li>basic objects type: HashMap, ArrayList, Model</li>
 *          <li>built-in objects: Module, Util, Config, Action, Dao, Class, View</li>
 *          <li>create objects</li>
 *          <li>run action</li>
 *          </ol>
 * @reference: underscore, jQuery, backbone, emberjs, angularjs
 * @author: jarryli@gmail.com
 * @version: 0.1.0
 * @date:   2014-03-09
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'exports'], function($, exports) {
            root.Arm = factory(root, exports, $);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports, $);
    } else {
        root.Arm = factory(root, {}, (root.jQuery || root.Zepto ||
            root.ender || root.$ || root.mooltools || root.Arm_$ ) );
    }
}(this, function(root, Arm, $) {
    var _Arm;
    root        = window || this;
    var _       = Arm._ || {};
    $           = $ || _;
    var doc     = document,
        breaker = {},
        console = root.console,
        logger  = console || {};
    var jsonParse, jsonStringify;
    if (root.JSON) {
        jsonParse     = JSON.parse;
        jsonStringify = JSON.stringify;
    } else {
        jsonParse = $.parseJSON || function(data) {
            return (new Function('return ' + data))();
        };
    }

    if (!logger.log) {
        logger.log = function() {};
        logger.warn = function() {};
        logger.error = function() {};
    }

    if(typeof exports !== 'undefined') {
        Arm = exports;
    } else {
        Arm = root.Arm = {};
    }

    // defined basic data objects
    var HashMap, ArrayList, Model;

    // defined built-in objects
    var Module, Config, Util, Dao, Action;
    Arm.Class = null;
    Arm.View = null;
    // var Router, Cache, Storage;

    // base object for inheirts by creating new object
    var Base = root['Base'] || {};

    var arrPro  = Array.prototype,
        objPro  = Object.prototype,
        strPro  = String.prototype,
        fnPro = Function.prototype;

    var push             = arrPro.push,
        slice            = arrPro.slice,
        splice           = arrPro.splice,
        concat           = arrPro.concat,
        toString         = objPro.toString,
        hasOwnProperty   = objPro.hasOwnProperty;

    // shortcut
    var _forEach = arrPro.forEach,
        _map = arrPro.map,
        _reduce = arrPro.reduce,
        _reduceRight = arrPro.reduceRight,
        _filter = arrPro.filter,
        _every = arrPro.every,
        _some = arrPro.some,
        _indexOf = arrPro.indexOf,
        _lastIndexOf = arrPro.lastIndexOf,
        _isArray = Array.isArray,
        _keys = Object.keys,
        _bind = fnPro.bind;

    // common static methods collection
    _ = {
        isArray: _isArray || function(obj) {
            return ('[object Array]' == objPro.toString.call(obj));
        },
        isArrayOrList: function(obj) {
            return _.isArray(obj) || obj instanceof ArrayList;
        },
        isObjectOrMap: function(obj) {
            return _.isObject(obj) || obj instanceof HashMap;
        },
        isObject: function(obj) {
            return ('[object Object]' == objPro.toString.call(obj));
            // return ( obj !== null && typeof obj === 'object' ) || (typeof obj === 'function');
        },
        isString: function(obj) {
            return ('[object String]' == objPro.toString.call(obj));
        },
        isNumber: function(obj) {
            return ('[object Number]' == objPro.toString.call(obj));
        },
        isDate: function(obj) {
            return ('[object Date]' == objPro.toString.call(obj));
        },
        isFunction: function(obj) {
            return ('[object Function]' == objPro.toString.call(obj));
        },
        isElement: function(obj) {
            return !!(obj && (obj.nodeName || (obj.prop && obj.attr && obj.find)));
        },
        isPlainObject: function(obj) {
            if ( typeof( obj ) !== 'object' || obj.nodeType || obj.window == window ) {
                return false;
            }
            if (obj.constructor && !hasOwnProperty.call( obj.constructor.prototype, 'isPrototypeOf' ) ) {
                return false;
            }
            return true;
        },
        isUndefined: function(obj) {
            return obj === void 0;
        },
        isEmptyObject: function(obj) {
            for (var item in obj) {
                return false;
            }
            return true;
        },
        isEqual: function ( one, two ) {
            var prop, i, l = 0;
            var callee = _.isEqual;
            if (one === two) {
                return true;
            }
            if ( (one !== undefined && two === undefined) || (one === undefined && two !== undefined) ) {
                return false;
            }
            var className = toString.call(one);
            if (className != toString.call(two)) {
                return false;
            }
            if (one.constructor !== two.constructor ) {
                return false;
            }

            if ( one.length && (one.length != two.length) ) {
                return false;
            }

            for (prop in two) {
                l++;
            }
            for (prop in two ) {
                l--;
                if (l < 0) {
                    return false;
                }
            }
            switch (className) {
            case '[object String]':
                return one == String(two);
            case '[object Object]':
                for (var attr in one) {
                    if ( !callee(one[attr], two[attr]) ) {
                        return false;
                    }
                }
                break;
            case '[object Number]':
                return one != +one ? two != +two : (one === 0 ? 1 / one === 1 / two : one == +two);
            case '[object Date]':
            case '[object Boolean]':
                return +one == +two;
            case '[object RegExp]':
                return one.source == two.source &&
                    one.global == two.global &&
                    one.multiline == two.multiline &&
                    one.ignoreCase == two.ignoreCase;
            case '[object Array]':
                for (i = 0, l = one.length; i < l; i++) {
                    if ( !callee(one[i], two[i]) ) {
                        return false;
                    }
                }
                break;
            default:
                break;
            }

            return ( one.valueOf().toString() === two.valueOf().toString() );

        },
        hashCode: function(value) {
            var hash = 0;
            value = value || this;
            value = _.isString(value) ? value : value.toString();
            if (value.length === 0) {
                return hash;
            }
            for (var i = 0; i < value.length; i++) {
                var character = value.charCodeAt(i);
                hash = ((hash << 5) - hash) + character;
                hash = hash & hash;
            }
            return hash;
        },
        keys: _keys || function(obj) {
            if (!_.isObjectOrMap(obj) && !_.isArrayOrList(obj)) {
                return [];
            }
            var keys = [];
            for (var key in obj) {
                if (_.has(obj, key)) {
                    keys.push(key);
                }
            }
            return keys;
        },
        values: function(obj) {
            var keys = _.keys(obj);
            var i = 0, l = keys.length;
            var values = new Array(l);
            for (; i < l; i++) {
                values[i] = obj[keys[i]];
            }
            return values;
        },
        pairs: function(obj) {
            var keys = _.keys(obj);
            var i = 0, l = keys.length;
            var pairs = new Array(l);
            for (; i < l; i++) {
                pairs[i] = [keys[i], obj[keys[i]]];
            }
            return pairs;
        },
        invert: function(obj) {
            var result = {};
            var keys = _.keys(obj);
            var i = 0, l = keys.length;
            for (; i < l; i++) {
                result[obj[keys[i]]] = keys[i];
            }
            return result;
        },
        negate: function(predicate) {
            return function() {
                return !predicate.apply(this, arguments);
            };
        },
        pick: function(obj, iterator, context) {
            var result = {};
            var keys, key, value;
            if (_.isFunction(iterator)) {
                for (key in obj) {
                    value = obj[key];
                    if (iterator.call(context, value, key, obj)) {
                        result[key] = value;
                    }
                }
            } else {
                keys = concat.apply([], slice.call(arguments, 1));
                var i = 0, l = keys.length;
                for (; i < l; i++) {
                    key = keys[i];
                    if (key in obj) {
                        result[key] = obj[key];
                    }
                }
            }
            return result;
        },
        omit: function(obj, iterator, context) {
            var keys;
            if (_.isFunction(iterator)) {
                iterator = _.negate(iterator);
            } else {
                keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
                iterator = function(value, key) {
                    return !_.contains(keys, key);
                };
            }
            return _.pick(obj, iterator, context);
        },
        makeMap: function(str, flag) {
            flag = flag || ',';
            var obj = {},
                items = str.split(flag);
            var i = 0, l = items.length;
            for (; i < l; i++) {
                obj[items[i]] = true;
            }
            return obj;
        },
        has: function(obj, key) {
            return hasOwnProperty.call(obj, key);
        },
        accessProperty: function(obj, path) {
            if (path === undefined) {
                return;
            }
            var objs = path.split('.'),
                cursor;
            var i = 0, l = objs.length;
            for (; i < l; i++) {
                cursor = obj[objs[i]];
                if (cursor === undefined) {
                    break;
                }
                obj = cursor;
            }
            return cursor;
        },
        map: function(obj, iterator, context) {
            var results = [];
            if (obj === undefined || obj === null) {
                return results;
            }
            _.each(obj, function(value, index, list) {
                results.push( iterator.call(context, value, index, list) );
            });
            return results;
        },
        filter: function(obj, iterator, context) {
            var results = [];
            if (obj === undefined || obj === null) {
                return results;
            }
            _.each(obj, function(value, index, list) {
                if (iterator.call(context, value, index, list)) {
                    results.push(value);
                }
            });
            return results;
        },
        indexOf: function(array, item, from, comparer) {
            if (array === undefined || array === null || item === undefined) {
                return -1;
            }
            comparer = comparer || function(a, b) {
                return _.isEqual(a, b);
            };
            var l = array.length;
            var i = (from > -1 && from <= l) ? from : 0;
            for (; i < l; i++) {
                if ( comparer(array[i], item) ) {
                    return i;
                }
            }
            return -1;
        },
        lastIndexOf: function(array, item, from, comparer) {
            if (array === undefined || array === null || item === undefined) {
                return -1;
            }
            comparer = comparer || function(a, b) {
                return _.isEqual(a, b);
            };
            var l = array.length;
            l = (from > -1 && from <= l) ? from : l;
            while (l--) {
                if ( comparer(array[l], item) ) {
                    return l;
                }
            }
            return -1;
        },
        unique: function(arr, comparer) {
            arr = arr || [];
            comparer = comparer || function(a, b) {
                return _.isEqual(a, b);
            };
            var l = arr.length;
            while (--l > 0) {
                for (var i = 0; i < l; i++) {
                    if ( comparer(arr[l], arr[i]) ) {
                        arr.splice(l, 1);
                        break;
                    }
                }
            }
            return arr;
        },
        intersection: function(one, two, comparer) {
            comparer = comparer || function(a, b) {
                return _.isEqual(a, b);
            };
            var result = [];
            var a = one || [];
            var b = two ? slice.call(two) : [];
            for (var i = 0, l = a.length; i < l; i++) {
                if (_.indexOf(result, a[i], 0, comparer) >= 0) {
                    continue;
                }
                for (var j = 0, len = b.length; j < len; j++) {
                    if (comparer(a[i], b[j])) {
                        result.push(a[i]);
                        b.splice(j, 1);
                    }
                }
            }
            return result;
        },
        getByAttribute: function(arr, key) {
            var result = [];
            key = _.isArrayOrList(key) ? key : [key];
            _.each(arr, function(item) {
                for (var attr in item) {
                    if (hasOwnProperty.call(item, attr) && (_.indexOf(key, attr) >= 0)) {
                        result.push(item);
                        break;
                    }
                }
            });
            return result;
        },
        getByValue: function(arr, value) {
            var result = [];
            value = _.isArrayOrList(value) ? value : [value];
            _.each(arr, function(item) {
                for (var attr in item) {
                    if (hasOwnProperty.call(item, attr) && (_.indexOf(value, item[attr]) >= 0)) {
                        result.push(item);
                        break;
                    }
                }
            });
            return result;
        },
        format: function(obj, keyMap, formater) {
            formater = formater || function(value, obj) {
                return value;
            };
            var keyMapIsStr = typeof keyMap == 'string';
            var map = keyMapIsStr ? obj : keyMap;
            for (var attr in map) {
                if ( hasOwnProperty.call(obj, attr) ) {
                    if (keyMapIsStr) {
                        if (attr == keyMap) {
                            obj[attr] = formater(obj[attr], obj);
                        }
                    } else {
                        obj[attr] = typeof map[attr] == 'function' ? map[attr](obj[attr], obj) :
                            formater(map[attr] || obj[attr], obj);
                    }
                }
            }
            return obj;
        },
        union: function(one, two, comparer) {
            comparer = comparer || function(a, b) {
                return _.isEqual(a, b);
            };
            var result = [];
            var a = one ? slice.call(one) : [];
            for (var i = 0, l = a.length; i < l; i++) {
                if (_.indexOf(result, a[i], 0, comparer) >= 0) {
                    continue;
                }
                if (_.indexOf(two, a[i], 0, comparer) < 0) {
                    result.push(a[i]);
                }
            }
            return result.concat(two);
        },
        inArray: function(array, item) {
            return (_.indexOf(array, item) != -1);
        },
        contains: function(obj, target, comparer) {
            if (obj === undefined || obj === null) {
                return false;
            }
            if (obj.length === +obj.length) {
                return _.indexOf(obj, target, 0, comparer) >= 0;
            }
            return false;
        },
        groupBy: function(arr, field) {
            var result = {};
            var iterator = _.isFunction(field) ? field : function(obj) {
                return obj[field];
            };
            _.each(arr, function(item, index) {
                var key = iterator(item, index);
                result[key] = result[key] || [];
                result[key].push(item);
            });
            return result;
        },
        indexBy: function(arr, field) {
            if (!_.isArrayOrList(arr) || !field) {
                return arr;
            }
            var tmp = {};
            _.each(arr, function(item) {
                tmp[item[field]] = item;
            });
            return tmp;
        },
        sort: function(arr) {
            arr.sort(function(a, b) {
                return a - b;
            });
            return arr;
        },
        sortBy: function(arr, field, order) {
            if (!_.isArrayOrList(arr) && !(arr instanceof ArrayList)) {
                return arr;
            }
            var tmp = arr.slice(0);
            tmp.sort(function (a, b) {
                var left = a[field], right = b[field];
                // default is asc
                if (left === undefined || left === null) {
                    return order == 'desc' ? 1 : -1;
                }
                if (right === undefined || right === null) {
                    return order == 'desc' ? - 1 : 1;
                }
                if (left > right) {
                    return order == 'desc' ? - 1 : 1;
                }
                if (left < right) {
                    return order == 'desc' ? 1 : -1;
                }
                return 0;
            });
            return tmp;
        },
        orderBy: function(arr, field, order) {
            return _.sortBy.apply(_, slice.call(arguments));
        },
        each: function(obj, iterator, context) {
            if (obj === undefined || obj === null) {
                return obj;
            }
            var i, l, keys;
            if (obj.length === +obj.length) {
                for (i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context, obj[i], i, obj) === breaker) {
                        return obj;
                    }
                }
            } else {
                keys = _.keys(obj);
                for (i = 0, l = keys.length; i < l; i++) {
                    if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) {
                        return obj;
                    }
                }
            }
            return obj;
        },
        /**
         * inheirts by prototype, copy all methods from parent to child
         *
         * @function
         * @param {function} Child protoype class
         * @param {function} Parnet protoype class
         * @param {boolean} copy whether copy constructor properties and static properties
         */
        inherits: function(Child, Parent, copy) {
            if (_.isUndefined(Child) || _.isUndefined(Parent)) {
                return Child;
            }
            var proto;
            var parentProto = Parent.prototype;
            var childProto = Child.prototype;
            function Super() {}
            // copy properties for constructor and override Child
            if (copy === true) {
                if (parentProto && parentProto.hasOwnProperty('constructor')) {
                    Child = parentProto.constructor;
                } else {
                    Child = function() {
                        Parent.apply(this, arguments);
                    };
                }
            }
            // copy static propertis
            if (copy === true) {
                for (var item in Parent) {
                    if (Child[item] !== undefined) {
                        Child[item] = Parent[item];
                    }
                }
            }
            Super.prototype = parentProto;
            proto = Child.prototype = new Super();
            if (parentProto) {
                _.extend(proto, childProto);
            }
            Child.prototype.constructor = Child;
            Child.__super__ = Parent.prototype;
            Child.extend = function(methods) {
                for (var attr in methods) {
                    proto[attr] = methods[attr];
                }
                return Child;
            };
            return Child;
        },
        extend: function(first, obj, source) {
            var args,
                depth,
                origin,
                src,
                clone,
                dest;
            if (first === true || !isNaN(first)) {
                args = arguments;
                depth = first;
                origin = obj;
            } else {
                origin = first;
                args = ['blank'].concat(slice.call(arguments));
            }
            _.each(slice.call(args, 2), function(source) {
                if (source) {
                    for (var prop in source) {
                        dest = origin[prop];
                        src = source[prop];
                        // don't extend prototype for HashMap or ArrayList
                        if (!source.hasOwnProperty(prop) &&
                            ( source instanceof HashMap || source instanceof ArrayList )
                            ) {
                            continue;
                        }
                        if (dest === src) {
                            continue;
                        }
                        if (depth > 0 &&
                            (_.isObjectOrMap(src) || _.isArrayOrList(src))) {
                            depth = depth === true ? depth : depth - 1;
                            if (_.isObjectOrMap(src)) {
                                clone = _.isObjectOrMap(dest) ? dest : {};
                            } else {
                                clone = _.isArrayOrList(dest) ? dest : [];
                            }
                            origin[prop] = _.extend(depth, clone, src);
                        } else {
                            origin[prop] = src;
                        }
                    }
                }
            });
            return origin;
        },
        copy: function(obj, source, condition) {
            var prop;
            condition = condition || function(prop, obj, source) {
                // default do not override
                return !(prop in obj);
            };
            for (prop in source) {
                if (!source.hasOwnProperty(prop)) {
                    break;
                }
                if (condition(prop, obj, source)) {
                    obj[prop] = source[prop];
                }
            }
            return obj;
        },
        clone: function(depth, obj) {
            if (arguments[0] === true) {
                return _.deepClone(obj);
            } else {
                obj = arguments[0];
            }
            if (!_.isObjectOrMap(obj)) {
                return obj;
            }
            return _.isArrayOrList(obj) ? obj.slice() : _.extend({}, obj);
        },
        deepClone: function(obj, depth) {
            if (!obj || (typeof obj !== 'object')) {
                return obj;
            } else if (_.isString(obj)) {
                return strPro.slice.call(obj);
            } else if (_.isDate(obj)) {
                return new Date(obj.valueOf());
            } else if (_.isFunction(obj.clone)) {
                return obj.clone();
            }
            var clone;
            depth = depth || true;
            if (_.isArrayOrList(obj)) {
                clone = slice.call(obj);
            } else if (obj.constructor !== {}.constructor) {
                return obj;
            } else {
                clone = _.extend({}, obj);
            }
            if ( !_.isUndefined(depth) && (depth > 0 || depth === true) ) {
                for (var key in clone) {
                    depth = depth === true ? depth : depth - 1;
                    clone[key] = _.deepClone(clone[key], depth);
                }
            }
            return clone;
        },
        ajax: function(options) {
            options = options || {};
            var type = options.type || 'GET';
            var url = options.url;
            var contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
            var dataType = options.dataType || 'JSON';
            dataType = dataType.toUpperCase();
            var cache = options.cache || false;
            var async = options.async || true;
            var _getXHR = function() {
                return new XMLHttpRequest() ||
                    new ActiveXObject('Msxml2.XMLHTTP') ||
                    new ActiveXObject('Microsoft.XMLHTTP');
            };
            var xhr = _getXHR();
            var data, value;
            if (typeof options.data == 'object') {
                for (var item in options.data) {
                    value = type == 'GET' ? encodeURIComponent(options.data[item]) : options.data[item];
                    data += (item + '=' + value + '&');
                }
                if (data.length > 0 && data[data.length - 1] == '&') {
                    data = data.substr(0, data.length - 1);
                }
            }
            data = data || options.data;
            if (!cache && url && dataType == 'JSON') {
                var flag = url.indexOf('?') != -1 ? '&' : '?';
                url = url + flag +  data + '&' + '_=' + new Date().getTime();
            }

            xhr.open(type, url, async);
            xhr.setRequestHeader('Content-Type', contentType);
            for (var key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
            xhr.upload.onprogress = function(e) {
                options.progress.apply(xhr, e);
            };
            xhr.onreadystatechange = function() {
                var data = xhr.responseText || xhr.responseXML;
                if (data && dataType == 'JSON') {
                    data = jsonParse(data);
                }
                if (xhr.readyState == 4) {
                    var stat = xhr.status;
                    if ((stat >= 200 && stat < 300) || stat == 304 ||
                        stat == 1223 || stat === 0) {
                        if (options.success) {
                            options.success.call(xhr, data);
                        }
                    } else {
                        if (options.error) {
                            options.error.call(xhr, data);
                        }
                    }
                }
            };
            xhr.send(data || null);
            return xhr;
        },
        send: function(url, type, data, handle, cache) {
            var callback, success, error;
            if (typeof handle == 'function') {
                callback = handle;
            } else {
                handle = handle || {};
                success = handle.success || function(json) {
                    logger.log(json);
                };
                error = handle.error || function(err) {
                    logger.error(err);
                };
            }
            var ajax = $.ajax || _.ajax;
            ajax({
                url: url,
                type: type || 'GET',
                cache: cache || false,
                data: data,
                progress: handle.progress,
                success: function(json) {
                    var cb = callback || success;
                    cb.call(this, json);
                },
                error: function(err) {
                    var cb = callback || error;
                    cb.call(this, err);
                }
            });
        },
        // 1: call function, data, handle[callback]
        // 2: url, type, data, handle. handle is an object or callback
        fetch: function() {
            var fn, args;
            if ('function' == typeof arguments[0]) {
                fn = arguments[0];
                args = slice.call(arguments, 1);
            } else {
                args = arguments;
            }
            if (fn) {
                fn.apply(fn, args);
            } else {
                _.send.apply(this, args);
            }
        },
        exports: function(obj, origin) {
            for (var item in origin) {
                if (item[0] !== '_' && _.isFunction(origin[item])) {
                    obj[item] = origin[item];
                }
            }
        },
        curry: function(fn, scope) {
            var args = slice.call(arguments, 1);
            return function() {
                return fn.apply(scope, args.concat(slice.call(arguments, 0)));
            };
        },
        currySelf: function() {
            var fn = this;
            var args = slice.call(arguments, 0);
            return function() {
                return fn.apply(fn.scope, args.concat(slice.call(arguments, 0)));
            };
        },
        bind: _bind || function(scope, fn) {
            var idx = arguments.length;
            fn = fn || this;
            var args = slice.call(arguments, idx);
            return function() {
                var _args = args.concat(slice.call(arguments, 0));
                return fn.apply(scope, _args);
            };
        },
        before: function(fn, scope) {
            scope = scope || this;
            var method = function() {
                fn.apply(this, arguments);
                return scope.apply(this, arguments);
            };
            method.before = _.before;
            method.after  = _.after;
            return method;
        },
        after: function(fn, scope) {
            scope = scope || this;
            var method = function() {
                var result = scope.apply(this, arguments);
                var arg = slice.call(arguments, 0).concat([result]);
                fn.apply(this, arg);
                return result;
            };
            method.before = _.before;
            method.after  = _.after;
            return method;
        },
        around: function(fn, scope) {
            scope = scope || this;
            function method() {
                return fn.apply(scope, arguments);
            }
            method.before = _.before;
            method.after  = _.after;
            method.around = _.around;
            return method;
        },
        tmpl: function(tmplElement, data) {
            if ('function' == typeof $) {
                return $(tmplElement).tmpl(data);
            }
            return null;
        }
    };

    // private static methods
    var _util = {
        getObject: function(obj) {
            if ('string' == typeof obj && obj.length > 0) {
                obj = _.accessProperty(root, obj);
            }
            return obj;
        },
        getModuleInfoByName: function(name) {
            name = name || '';
            var segements = name.split('.');
            var lastDotIdx = name.lastIndexOf('.');
            return {
                moduleName: segements[0],
                type: segements[segements.length - 1],
                subModuleName: name.substr(0, lastDotIdx),
                fullName: name
            };
        }
    };

    // HashMap: key-value map
    HashMap = function HashMap(data) {
        _.extend(this, data);
    };
    HashMap.prototype = {
        constructor: HashMap,
        hashCode: function() {
            return _.hashCode(this.toString());
        },
        size: function() {
            return this.keys().length;
        },
        containsKey: function(attr) {
            return this.has(attr);
        },
        containsValue: function(value) {
            for (var attr in this) {
                if (this.hasOwnProperty(attr) && this[attr] === value) {
                    return true;
                }
            }
            return false;
        },
        unset: function(attr, options) {
            return this.set(attr, void 0, _.extend({}, options, { unset: true } ) );
        },
        has: function(attr) {
            return this.get(attr) !== undefined;
        },
        get : function(attr) {
            if (this.hasOwnProperty(attr)) {
                return this[attr];
            }
        },
        format: function(keyMap, formater) {
            return _.format(this, keyMap, formater);
        },
        getByAttribute: function(key) {
            if (key === undefined) {
                return;
            }
            var result = [], self = this;
            key = _.isArrayOrList(key) ? key : [key];
            _.each(key, function(attr) {
                if (hasOwnProperty.call(self, attr)) {
                    result.push(self[attr]);
                }
            });
            return result;
        },
        getByValue: function(value) {
            if (value === undefined) {
                return;
            }
            var result = [], self = this;
            value = _.isArrayOrList(value) ? value : [value];
            for (var attr in self) {
                if (hasOwnProperty.call(self, attr) && _.indexOf(value, self[attr]) >= 0) {
                    result.push(attr);
                }
            }
            return result;
        },
        clone: function() {
            return _.clone(this);
        },
        put: function(key, value) {
            return this.set(key, value);
        },
        set: function(key, val, options) {
            var attrs, attr, unset;
            if (key === undefined || key === null) {
                return this;
            }
            if (_.isObjectOrMap(key)) {
                attrs = key;
            } else {
                (attrs = {})[key] = val;
            }
            options = options || {};
            unset = options.unset;
            for (attr in attrs) {
                val = attrs[attr];
                if (unset) {
                    delete this[attr];
                } else {
                    this[attr] = val;
                }
            }
            return this;
        },
        isEmpty: function() {
            for (var attr in this) {
                if (hasOwnProperty.call(this, attr)) {
                    return false;
                }
            }
            return true;
        },
        remove: function(attr, options) {
            return this.unset(attr, options);
        },
        clear: function(options) {
            var attrs = {};
            for (var key in this) {
                attrs[key] = void 0;
            }
            return this.set(attrs, _.extend({}, options));
        },
        toString: function() {
            try {
                return root.JSON ? jsonStringify(this) : this.valueOf().toLocaleString();
            } catch (e) {
                logger.error(e);
            }
        }
    };
    _.each(['keys', 'values', 'pairs', 'invert', 'pick', 'omit'], function(method) {
        HashMap.prototype[method] = function() {
            var args = [this].concat(slice.call(arguments));
            return _[method].apply(_, args);
        };
    });

    // Model: JSON object, key(literals)-value(literals) object
    Model = function Model(data) {
        _.extend(this, data);
    };
    Model.prototype = {
        constructor: Model,
        // defined attributeKey and Type for data serialize
        attributeKey: 'id',
        attributeType: 'type',
        update:  function(key, value, options) {
            if ('object' == typeof key) {
                for (var attr in  key) {
                    this[attr] = key[attr];
                }
            } else {
                this.set(key, value, options);
            }
        },
        equals: function(obj) {
            obj = obj instanceof Model ? obj : new Model(obj);
            return _.isEqual(this, obj);
        },
        // 1: call function, data, handle[callback]
        // 2: url, type, data, handle. handle is an object or callback
        fetch: function(url, type, data, handle) {
            var self = this;
            type = type || 'GET';
            data = data || {};
            var len = arguments.length;
            var args = slice.call(arguments, 0);
            handle = handle || {
                success: function(json) {
                    if (json === undefined) {
                        return self;
                    }
                    var data = ('object' == typeof json.data) ? json.data : json;
                    self.update(data);
                    self.onFetch(data);
                }
            };
            if (len >= 4 && 'object' == typeof handle) {
                args.pop();
            }
            args.push(handle);
            _.fetch.apply(self, args);
            return self;
        },
        onFetch: function(data) {
            logger.log('onFetch:', data, this);
            return this;
        }
    };
    _.inherits(Model, HashMap);

    // ArrayList: model's collection
    ArrayList = function ArrayList(models) {
        this.empty();
        this.length = 0;
        if (models !== undefined && models !== null) {
            models = _.isArrayOrList(models) ? models : [models];
            this.__model__ = _.deepClone(models[0]);
        }
        this.add(models);
    };
    ArrayList.prototype = {
        constructor: ArrayList,
        __model__: null,
        valueOf: function() {
            return slice.call(this);
        },
        size: function() {
            return this.length;
        },
        get: function(index) {
            return this[index];
        },
        getById: function(id) {
            if (!this[id]) {
                return;
            }
            for (var i = 0, l = this.length; i < l; i++) {
                if (id == this[i].id) {
                    return this.get(i);
                }
            }
            return id;
        },
        getByAttribute: function(key) {
            return new ArrayList( _.getByAttribute(this, key) );
        },
        getByValue: function(value) {
            return new ArrayList( _.getByValue(this, value) );
        },
        validModel: function(item) {
            for (var prop in this.__model__) {
                if (!item.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        },
        add: function(item, valid) {
            if (item === undefined || item === null) {
                return this;
            }
            var model,
                list = _.isArrayOrList(item) ? item : [item];
            var i = 0, l = list.length;
            for (; i < l; i++) {
                model = list[i];
                if ('object' != typeof model) {
                    continue;
                }
                if (!(model instanceof Model)) {
                    model = new Model(list[i]);
                }
                if (!valid || this.validModel(item)) {
                    this.push(model);
                }
            }
            return this;
        },
        addAll: function(list) {
            return this.add(list);
        },
        set: function(index, item) {
            var list = this;
            if (index && index < this.length && item) {
                list[index] = item;
            }
            return this;
        },
        update: function(origin, item) {
            if (_.isArrayOrList(origin)) {
                this.empty();
                this.addAll(origin);
            } else if ('object' == typeof origin) {
                var index = this.indexOf(origin);
                return this.set(index, item);
            }
            return this;
        },
        insert: function(index, item) {
            var model,
                list = _.isArrayOrList(item) ? item : [item];
            for (var i = 0, l = list.length; i < l; i++) {
                model = list[i];
                if (!(model instanceof Model)) {
                    model = new Model(list[i]);
                }
                this.splice(index, 0, model);
                index += 1;
            }
            return this;
        },
        has: function(item, comparer) {
            return this.contains(item, comparer);
        },
        contains: function(item, comparer) {
            return _.contains(this, item, comparer);
        },
        indexOf: function(item, from, comparer) {
            return _.indexOf(this, item, from, comparer);
        },
        lastIndexOf: function(item, from, comparer) {
            return _.lastIndexOf(this, item, from, comparer);
        },
        remove: function(start, end) {
            end = end || start + 1;
            if (end > 0 && start <= this.size()) {
                return this.splice(start, end - start);
            }
            return this;
        },
        removeItem: function(item) {
            var index = this.indexOf(item);
            return this.remove(index);
        },
        clear: function() {
            this.empty();
            for (var item in this) {
                delete this[item];
            }
            return this;
        },
        isEmpty: function() {
            return this.length === 0;
        },
        empty: function() {
            return this.remove(0, this.length);
        },
        clone: function() {
            return new ArrayList(_.clone(this));
        },
        toString: function() {
            return root.JSON ? jsonStringify(this) : 'function Array(){\n   [variant code]\n}';
        },
        toArray: function(options) {
            return slice.call(this, options);
        },
        format: function(keyMap, formater) {
            _.each(this, function(model) {
                _.format(model, keyMap, formater);
            });
            return this;
        },
        unique: function(comparer) {
            return new ArrayList(_.unique(this, comparer));
        },
        uniqueBy: function(filed) {
            return this.unique(function(a, b) {
                return _.isEqual(a[filed], b[filed]);
            });
        },
        intersection: function(arr, comparer) {
            return new ArrayList(_.intersection(this, arr, comparer));
        },
        union: function(arr, comparer) {
            return new ArrayList(_.union(this, arr, comparer));
        },
        indexBy: function(filed) {
            return new HashMap( _.indexBy(this, filed) );
        },
        groupBy: function(filed) {
            return new HashMap( _.groupBy(this, filed) );
        },
        sortBy: function(filed, order) {
            var arr = _.sortBy(this, filed, order);
            return new ArrayList(arr);
        },
        orderBy: function(filed, order) {
            return this.sortBy(filed, order);
        },
        'fetch': Model.prototype.fetch,
        onFetch: function(data) {
            logger.log('onFetch:', data, this);
            return this;
        }
    };

    _.each(['shift', 'push', 'sort', 'pop', 'reverse', 'join',
        'splice', 'concat', 'slice', 'forEach', 'map', 'some', 'every',
        'filter', 'reduce', '_reduceRight'], function(method) {
            ArrayList.prototype[method] = arrPro[method];
        }
    );

    // Module: one module of application, include sub modules 
    Module = function Module(data, config) {
        this.create = Arm.create;
        _.extend(this, data);
    };
    Module.prototype = {
        constructor: Module
    };

    // Action: control object and declare instance for module
    Action = function Action(data, config) {
        config = config || {};
        _.extend(this, data);
        if ('string' == typeof this.module && this.module.length > 0) {
            this.module = _.accessProperty(root, this.module);
        }
        this.__instance__ = {};
    };
    Action.prototype = {
        constructor: Action,
        getModule: function(name) {
            return root[name] || this.module;
        },
        getInstance: function() {
            return this.get.apply(this, arguments);
        },
        getClass: function(name, options, isNew, type) {
            if ('object' == typeof name && name !== null) {
                options = name;
                isNew   = options;
                name    = '';
            }
            type = type || 'Class';
            var module = this.module || {};
            name = name || module.name || '';
            var len  = name.length;
            var nameType = name.substr(len - type.length, len);
            var moduleInfo = {
                type: type,
                fullName: (nameType == type) ? name : name + '.' + type
            };
            return this.get((name + '.' + type), options, isNew, moduleInfo);
        },
        getView: function(name, options, isNew) {
            return this.getClass(name, options, isNew, 'View');
        },
        getDao: function(name, options, isNew) {
            return this.getClass(name, options, isNew, 'Dao');
        },
        getUtil: function(name, options, isNew) {
            return this.getClass(name, options, isNew, 'Util');
        },
        getConfig: function(name, options, isNew) {
            return this.getClass(name, options, isNew, 'Config');
        },
        /**
         * Get instance from Class,View or the static object such as Util, Config, Dao
         * @function
         * @param {string} name, object's name as 'Module', 'Module.X.Class'
         * @param {object} [options], params of Class
         * @param {boolean} [isNew], create new instance
         * @param {object} [moduleInfo], module info from name
         * @returns {object} insance or static object
         */
        get: function(name, options, isNew, moduleInfo) {
            if (name === undefined || name === null) {
                return;
            }
            var self = this;
            moduleInfo = moduleInfo || _util.getModuleInfoByName(name);
            var type = moduleInfo.type;
            var fullName = moduleInfo.fullName;
            var obj, module = self.module;
            // autocomplete module.name, both 'Module.Class' and 'Class' are available.
            fullName = (fullName.substr(0, module.name.length) != module.name) ?
                (module.name + '.' + fullName) : fullName;
            obj = _.accessProperty(root, fullName);
            // logger.log('Action.get:', arguments, fullName, obj);
            var _getInstance = function(Clazz, options, isNew, fullName) {
                if (typeof Clazz != 'function' || typeof fullName != 'string') {
                    logger.log('[error]:getInstance:', 'Clazz is underfed or fullName is undefined.');
                    return;
                }
                var cache = self.__instance__;
                var instance = cache[fullName];
                if(isNew === true) {
                    cache[fullName] = new Clazz(options);
                    _Arm._data.push(instance);
                    return cache[fullName];
                }
                if(instance === undefined) {
                    instance = new Clazz(options);
                    // add instance of `Class` to Arm.data
                    _Arm._data.push(instance);
                } else {
                    instance.update(options);
                }
                cache[fullName] = instance;
                return instance;
            };

            switch(type) {
            case 'Class':
                return _getInstance(obj, options, isNew, fullName);
            case 'View':
                return _getInstance(obj, options, isNew, fullName);
            default:
                return obj;
            }
        },
        init: function() {
            this.get.apply(this, arguments);
        },
        /**
         * execute run method from View's instance
         * @function
         * @param {string} [name] object's name as view instance or 'X.View'
         * @param {object} [options] params of run method
         * @param {object} [instanceOption] params of instance
         * @usage
         *     Module.Action.run(instance, {run options})
         *     Module.Action.run('Sub.View', {instance options}, {run options})
         *     Module.Action.run({run options}), call default View's run
         */
        run: function(name, options, instanceOption) {
            var self = this;
            if (name instanceof Arm.View) {
                return name.run(options);
            } else if ('string' == typeof name) {
                return self.getView(name, options).run(instanceOption);
            }
            return self.getView().run(name);
        }
    };

    // Util: static method collection, resolve common problem for `View` or `Class`.
    Util = function Util(data) {
        _.extend(this, data);
        this.action = _util.getObject(this.action);
    };
    Util.prototype = {
        constructor: Util,
        getAction: function() {
            return this.action;
        }
    };
    // _.inherits(Util, HashMap);

   // basic data object: module config, key-value(literals) object
    Config = function Config(data) {
        _.extend(this, data);
        this.action = _util.getObject(this.action);
    };
    Config.prototype = {
        constructor: Config,
        getAction: function() {
            return this.action;
        }
    };
    // _.inherits(Config, HashMap);

    // Dao: front-end data interact with server by ajax or socket etc.
    Dao = function Dao(data) {
        _.extend(this, data);
        this.action = _util.getObject(this.action);
    };
    Dao.prototype = {
        constructor: Dao,
        getAction: function() {
            return this.action;
        }
    };

    // Class: service logic process class, split and combine data(JSON Model,ArrayList)
    Arm.Class = function() {
    };
    Arm.Class.prototype = {
        constructor: Arm.Class,
        update: function(options, properties) {
            _.extend(true, this.options, options);
            return this;
        },
        extend: function(methods) {
            if (_.isObjectOrMap) {
                return _.extend(this, methods);
            }
            return this;
        },
        getAction: function() {
            return this.action;
        },
        getClass: function(name) {
            return name ? this.action.getClass(name) : this['class'] || this.action.getClass();
        },
        getView: function(name) {
            return name ? this.action.getView(name) : this.view || this.action.getView();
        },
        getUtil: function(name) {
            return name ? this.action.getUtil(name) : this.util || this.action.getUtil();
        },
        getConfig: function(name) {
            return name ? this.action.getConfig(name) : this.config || this.action.getConfig();
        },
        getDao: function(name) {
            return name ? this.action.getDao(name) : this.dao || this.action.getDao();
        }
    };

    // View: user interface logic process class, bind event and modify DOM
    Arm.View = function(options) {
    };
    _.extend(Arm.View.prototype, Arm.Class.prototype);
    Arm.View.prototype.constructor = Arm.View;

    _Arm = {
        _data: [],
        _createHashMap: function (data, config) {
            return new HashMap(data, config);
        },
        _createArrayList: function (data, config) {
            return new ArrayList(data, config);
        },
        _createModel: function (data, config) {
            return new Model(data, config);
        },
        _createModule: function (data, config) {
            if ('string' != typeof data.name) {
                logger.warn('createModule:', data, ' not input name of `Module`.');
            }
            var instance = new Module(data, config);
            if (config.extendBase !== false) {
                var ignoreKeys = ['name', 'version'];
                return _.copy(instance, Base, function (prop, obj, source) {
                    return (obj[prop] === undefined && !_.inArray(ignoreKeys, prop));
                });
            } else {
                return instance;
            }
        },
        _createConfig: function (data, config) {
            var instance = new Config(data, config);
            if (config.extendBase !== false) {
                return _.copy(instance, Base.Config);
            } else {
                return instance;
            }
        },
        _createUtil: function (data, config) {
            var instance = new Util(data, config);
            if (config.extendBase !== false) {
                return _.copy(instance, Base.Util);
            } else {
                return instance;
            }
        },
        _createAction: function (data, config) {
            data = data || {};
            if ('string' == typeof data.module) {
                data.module = _.accessProperty(root, data.module);
            }
            if ('object' != typeof data.module) {
                logger.warn('createAction:', data, ' not defined module for `Action`.');
            }
            var instance = new Action(data, config);
            if (config.extendBase !== false) {
                var ignoreKeys = ['module'];
                return _.copy(instance, Base, function (prop, obj, source) {
                    return (obj[prop] === undefined && !_.inArray(ignoreKeys, prop));
                });
            } else {
                return instance;
            }
        },
        _createDao: function (data, config) {
            var instance = new Dao(data, config);
            if (config.extendBase !== false) {
                return _.copy(instance, Base.Dao);
            } else {
                return instance;
            }
        },
        _createClass: function (data, config) {
            data = data || {};
            var properties = data.properties || {};
            var action = data.action || properties.action;
            var view = data.view || properties.view;
            action = _util.getObject(action);
            if (!action instanceof Arm.Action) {
                logger.warn('createClass:', data, ' not defined action for `Class`.');
            }
            function Class(options) {
                options = options || {};
                _.extend(this, properties);
                this.action = action;
                this.view   = view;
                this.options = _.deepClone(data.options) || {};
                _.extend(true, this.options, options);
                this.construct = data.construct || data.init || function () {};
                this.construct.call(this);
            }
            // Class.prototype['__proto__'] = Arm.Class.prototype;
            // _.extend(Class.prototype, Arm.Class.prototype);
            _.inherits(Class, Arm.Class);
            Class.prototype.constructor = Class;
            Class.prototype.__super__ = Class.__super__ || Class;
            Class.prototype.constructor.name = 'Class';
            Class.inherits = function (parent) {
                return _.inherits(this, parent);
            };
            Class.prototype.getView = function () {
                return this.view || this.getAction().getView();
            };
            // copy method to  prototype
            for (var item in data) {
                if (item !== 'options' && item !== 'properties') {
                    Class.prototype[item] = data[item];
                }
            }
            // bind, currying, after, before
            for (var fn in Class.prototype) {
                if ('function' == typeof Class.prototype[fn]) {
                    Class.prototype[fn].bind = _.bind;
                    Class.prototype[fn].curry = _.currySelf;
                    Class.prototype[fn].before = _.before;
                    Class.prototype[fn].after = _.after;
                }
            }
            return Class;
        },
        _createView: function (data, config) {
            data = data || {};
            var events;
            var properties = data.properties || {};
            var action = data.action || properties.action;
            var clazz = data['class'] || properties['class'];
            action = _util.getObject(action);
            if (!action instanceof Arm.Action) {
                logger.warn('createView:', data, ' not defined action for `View`.');
            }
            function View(options) {
                options = options || {};
                _.extend(this, properties);
                this.action = action;
                this['class'] = clazz;
                this.options = _.deepClone(data.options) || {};
                _.extend(true, this.options, options);
                // validate element or $container
                if (!this.options.element && this.options.$container) {
                    this.options.element = this.options.$container[0];
                }
                if (!this.options.$container && this.options.element && $) {
                    this.options.$container = $(this.options.element);
                }
                if (!_.isElement(this.options.element)) {
                    logger.warn('new View init:', this, 'is not defined element or $container.');
                }
                this.construct = data.construct || data.init || function () {};
                this.construct.call(this);
            }
            _.inherits(View, Arm.View);
            _.extend(View.prototype, {
                init: function (options) {
                    if (this.bindEvent) {
                        this.bindEvent(options);
                    }
                },
                // every view should own bindEvent for bind events
                // bindEvent: function(options) { },
                // every view should own run for Action
                // run: function(options) { },
                find: function (selector) {
                    return this.getContainer().find ? this.getContainer().find(selector) :
                        this.getContainer().querySelectorAll(selector);
                },
                render: function (ele, tmplElement, data, process) {
                    ele = ele || this.getElement();
                    var content = _.isObjectOrMap(data) ? _.tmpl(tmplElement, data) : data;
                    process = process || function (content, ele, tmplElement, data) {
                        ele.innerHTML = content;
                        return content;
                    };
                    return process.call(this, content, ele, tmplElement, data);
                },
                getElement: function () {
                    return this.options.element;
                },
                getContainer: function () {
                    return this.options.$container;
                },
                trigger: function (event, data, elem, onlyHandlers) {
                    var $container = this.getContainer();
                    if ($container && $container.trigger) {
                        this.options.$container.trigger(event, data, elem, onlyHandlers);
                    }
                    return this;
                },
                getClass: function () {
                    return this['class'] || this.getAction().getClass();
                }
            });
            // set function events for `View`
            events = ['mouseup', 'mousemove', 'mousedown', 'mouseover', 'mouseleave', 'mouseout',
                'click', 'dbclick', 'drag', 'dragstart', 'dragend', 'drop',
                'keydown', 'keypress', 'keyup'
            ];
            _.each(events, function (name) {
                View.prototype[name] = function (selector, fn) {
                    var $container = this.options.$container;
                    if ($container && $container.on) {
                        // require events listen lib such as jQuery
                        if ('function' == typeof selector) {
                            $container.on(name, selector);
                        } else {
                            $container.on(name, selector, fn);
                        }
                    }
                    return this;
                };
            });
            View.prototype.constructor = View;
            View.prototype.__super__ = View.__super__ || View;
            View.prototype.constructor.name = 'View';
            View.inherits = function (parent) {
                return _.inherits(this, parent);
            };
            // copy method to  prototype
            for (var item in data) {
                if (item !== 'options' && item !== 'properties') {
                    View.prototype[item] = data[item];
                }
            }
            for (var fn in View.prototype) {
                if ('function' == typeof View.prototype[fn]) {
                    View.prototype[fn].bind = _.bind;
                    View.prototype[fn].curry = _.currySelf;
                    View.prototype[fn].before = _.before;
                    View.prototype[fn].after = _.after;
                }
            }
            return View;
        },
        /**
         * create object
         * Model, ArrayList, HashMap,
         * Action, Class, View, Dao, Util, Config,
         * @function
         * @param {function} Parnet protoype class
         * @param {string} type, object type
         * @param {object} data, method list
         * @param {object} [config], special config
         * @returns {object} result
         * @usage
         *    var Module.Action = Arm.create('Action', { method }, { config })
         *    var Module.Sub.Class = Arm.create('Class', { method }, { config })
         */
        create: function (type, data, config) {
            config = config || {};
            var Obj;
            if (type && _Arm['_create' + type]) {
                Obj = _Arm['_create' + type](data, config);
                if (type != 'Class' && type !== 'View') {
                    _Arm._data.push(Obj);
                }
            } else {
                logger.log('create error: arguments is not correct.');
            }
            return Obj;
        },
        // see Action.run
        run: function (action, view, options, instanceOption) {
            if ('string' == typeof action) {
                action = _.accessProperty(root, action);
            }
            if (action instanceof Arm.Action) {
                action.run(view, options, instanceOption);
            }
        }
    };
    // exports method
    _.exports(Arm, _Arm);

    Arm._ = _;
    Arm.HashMap = HashMap;
    Arm.Model = Model;
    Arm.Collection = ArrayList;
    Arm.ArrayList = ArrayList;
    Arm.Module = Module;
    Arm.Config = Config;
    Arm.Util = Util;
    Arm.Dao = Dao;
    Arm.Action = Action;

    Arm.getBase = function() {
        return Base;
    };
    Arm.setBase = function(base) {
        Base = base;
    };
    Arm.data = function(type, options) {
        var result = [];
        if (!type) {
            return _Arm._data;
        } else {
            _.each(_Arm._data, function(item) {
                if (Arm[type] && item instanceof Arm[type]) {
                    result.push(item);
                }
            });
        }
        return result;
    };
    return Arm;
}));