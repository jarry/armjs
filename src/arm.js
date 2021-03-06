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
 * @reference: underscore, backbone
 * @dependency: jQuery
 * @author: lichunping(jarryli@gmail.com)
 * @version: 1.0.0
 * @date:   2014-03-09
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'exports'], function($, exports) {
            root.Arm = factory(root, exports, $ || root.$);
        });
    } else if (typeof exports !== 'undefined') {
        factory(root, exports, $);
    } else {
        root.Arm = factory(root, {}, (root.jQuery || root.Zepto ||
            root.$ || root.Arm_$ ) );
    }
}(this, function(root, Arm, $) {
    'use strict';
    Arm = Arm || {}
    var _Arm;
    root        = window || this;
    var _       = Arm._ || {};
    $           = $ || _;
    var doc     = document,
        breaker = {},
        console = root.console,
        logger  = console || {},
        version = '1.0.1';

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
    var HashMap, Map, ArrayList, List, Router, Model;

    // defined built-in objects
    var Module, Config, Util, Dao, Action, Modules;
    Arm.Class = null;
    Arm.View = null;
    // var Router, Cache, Storage;

    // base object for inherits by creating new object
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
        },
        isString: function(obj) {
            return ('[object String]' == objPro.toString.call(obj));
        },
        isNumber: function(obj) {
            return ('[object Number]' == objPro.toString.call(obj));
        },
        isBoolean: function(obj) {
            return ('[object Boolean]' == objPro.toString.call(obj));
        },
        isJSONType: function(obj) {
            if ( _.isString(obj) || _.isNumber(obj) || _.isBoolean(obj) ||
                _.isObject(obj) || _.isArray(obj) || obj === null ) {
                return true;
            }
            return false;
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
        stringifyJSON: function(json) {
            if (root.JSON) {
                return root.JSON.stringify(json);
            }
            return json;
        },
        parseJSON: function(json) {
            var parse;
            if (root.JSON) {
                parse = root.JSON.parse;
            } else {
                parse = $.parseJSON || function(data) {
                    return (new Function('return ' + data))();
                };
            }
            return parse(json);
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
            var isHashMap = (obj instanceof HashMap);
            if (_.isFunction(iterator)) {
                iterator = _.negate(iterator);
            } else {
                keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
                iterator = function(value, key) {
                    if (isHashMap) {
                        if (obj.hasOwnProperty(key)) {
                            return !_.contains(keys, key);
                        }
                    } else {
                        return !_.contains(keys, key);
                    }
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
            var keyMapIsStr = (typeof keyMap == 'string');
            var map = keyMapIsStr ? obj : keyMap;
            for (var attr in map) {
                if ( hasOwnProperty.call(obj, attr) ) {
                    if (keyMapIsStr) {
                        if (attr == keyMap) {
                            obj[attr] = formater(obj[attr], obj);
                        }
                    } else {
                        obj[attr] = (typeof map[attr] == 'function') ? map[attr](obj[attr], obj) :
                            (map[attr] === undefined || map[attr] === null) ? formater(obj[attr], obj) : map[attr];
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
            two = _.isArrayOrList(two) ? two : [two];
            for (var i = 0, l = a.length; i < l; i++) {
                if (_.indexOf(result, a[i], 0, comparer) >= 0) {
                    continue;
                }
                if (_.indexOf(two, a[i], 0, comparer) < 0) {
                    result.push(a[i]);
                }
            }
            if (two.toArray) {
                two = two.toArray();
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
        groupBy: function(arr, field, resultType) {
            resultType = resultType || 'map';
            var result = resultType == 'map' ? {} : [];
            var iterator = _.isFunction(field) ? field : function(obj) {
                return obj[field];
            };
            var _indexOfItemByValue = function(key, value, arr) {
                for (var i = 0, l = arr.length; i < l; i++) {
                    if (arr[i] && arr[i][0] && arr[i][0][key] === value) {
                        return i;
                    }
                }
                return -1;
            };
            _.each(arr, function(item, index) {
                var key = iterator(item, index);
                var idx;
                if (resultType != 'map') {
                    idx = _indexOfItemByValue(field, item[field], result);
                    if (idx >= 0) {
                        result[idx].push(item);
                    } else {
                        result.push(new ArrayList(item));
                    }
                } else {
                    result[key] = result[key] || new ArrayList();
                    result[key].push(item);
                }
            });
            return result;
        },
        indexBy: function(arr, field) {
            if (!_.isArrayOrList(arr) || !field) {
                return arr;
            }
            var tmp = {};
            _.each(arr, function(item) {
                if (tmp[item[field]] === undefined) {
                    tmp[item[field]] = item;
                }
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
            arr.sort(function (a, b) {
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
            return arr;
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
         * inherits by prototype, copy all methods from parent to child
         *
         * @function
         * @param {function} Child protoype class
         * @param {function} Parnet protoype class
         * @param {boolean} copy whether copy constructor properties and static properties
         */
        inherits: function(Child, Parent, copy) {
            copy = copy === undefined ? false : copy;
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
                    Super = parentProto.constructor;
                } else {
                    Super = function() {
                        Parent.apply(this, arguments);
                    };
                }
            }
            // copy static propertis
            if (copy === true) {
                for (var item in Parent) {
                    if (Child[item] === undefined) {
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
            Child.__super__ = Super;
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
        copy: function(obj, source, condition, includeOwn) {
            var prop;
            includeOwn = includeOwn || true;
            condition = condition || function(prop, obj, source) {
                // default do not override
                return !(prop in obj);
            };
            for (prop in source) {
                if (!includeOwn && !source.hasOwnProperty(prop)) {
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
            } else if ( !(obj instanceof HashMap) && _.isFunction(obj.clone)) {
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
            if (!url) {
                logger.error('ajax:, url is not correct.', options);
                return;
            }
            var contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
            var dataType = options.dataType || 'JSON';
            type = type.toUpperCase();
            dataType = dataType.toUpperCase();
            var cache = options.cache || false;
            var async = options.async || true;
            var _getXHR = function() {
                return new XMLHttpRequest() ||
                    new ActiveXObject('Msxml2.XMLHTTP') ||
                    new ActiveXObject('Microsoft.XMLHTTP');
            };
            var xhr = _getXHR();
            var data = '', value = '';
            if (typeof options.data == 'string') {
                data = options.data;
            } else {
                for (var item in options.data) {
                    value = (type == 'GET') ? encodeURIComponent(options.data[item]) : options.data[item];
                    data += (item + '=' + value + '&');
                }
                if (data.length > 0 && data[data.length - 1] == '&') {
                    data = data.substring(0, data.length - 1);
                }
            }

            if (type == 'GET' && (data !== '' || !cache) ) {
                var flag = url.indexOf('?') != -1 ? '&' : '?';
                url = url + flag;
            }
            if (type == 'GET' && 'string' == typeof data) {
                url += data;
            }
            if (type == 'GET' && !cache) {
                if (url.indexOf('?') != -1) {
                    url += '&';
                }
                url += '_=' + new Date().getTime();
            }

            xhr.open(type, url, async);
            xhr.setRequestHeader('Content-Type', contentType);
            for (var key in options.headers) {
                xhr.setRequestHeader(key, options.headers[key]);
            }
            xhr.upload.onprogress = function(e) {
                if ('function' == typeof options.progress) {
                    options.progress.apply(xhr, e);
                }
            };
            xhr.onreadystatechange = function() {
                var data = xhr.responseText || xhr.responseXML;
                if (data && dataType == 'JSON') {
                    data = _.parseJSON(data);
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
            type = typeof type == 'string' ? type : 'GET';
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
                type: type,
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
        // 1: arguments:[call function, param]
        // 2: arguments:[url, method, param, handle]. handle is an object or callback
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
                obj = _.accessProperty(Modules, obj);
            }
            return obj;
        },
        toJSON: function(obj) {
            if (_.isObject(obj)) {
                for (var attr in obj) {
                    if (!_.isJSONType(obj[attr])) {
                        delete obj[attr];
                    } else {
                        if (typeof obj[attr] == 'object') {
                            _util.toJSON(obj[attr]);
                        }
                    }
                }
                return obj;
            } else if (_.isArrayOrList(obj)) {
                _.each(obj, function(item, i) {
                    obj[i] = _util.toJSON(obj[i]);
                });
            }
            return obj;
        },
        getModuleByName: function(name) {
            if ('string' == typeof name) {
                var idx = name.indexOf('.');
                if (idx > 0) {
                    return _util.getObject(name.substring(0, idx));
                }
                return _util.getObject(name);
            }
            return name;
        },
        addModuleForName: function(name, moduleName) {
            if (name === '' || name === moduleName || !moduleName) {
                return name;
            }
            var module = '',
                hasModuleName = true,
                dotIdx = name.indexOf('.');
            if (dotIdx < 0) {
                hasModuleName = false;
            } else {
                module = name.substring(0, dotIdx);
                if (module !== moduleName) {
                    hasModuleName = false;
                }
            }
            // if the name string has not Module's name
            if (!hasModuleName) {
                return moduleName + '.' + name;
            }
            return name;
        },
        getModuleInfoByName: function(name) {
            name = name || '';
            var segements = name.split('.');
            var lastDotIdx = name.lastIndexOf('.');
            return {
                moduleName: segements[0],
                type: segements[segements.length - 1],
                subModuleName: name.substring(0, lastDotIdx),
                fullName: name
            };
        },
        extendBase: function(instance, base) {
            var ignoreKeys = ['name', 'module'];
            return _.copy(instance, base, function (prop, obj, source) {
                return (obj[prop] === undefined && !_.inArray(ignoreKeys, prop));
            });
        },
        addEvent: function(view, evt, selector, func) {
            var _call = function() {
                var args = slice.call(arguments, 0);
                if (view[func]) {
                    view[func].apply(view, args.concat(this));
                }
            };
            if (selector) {
                view.on(evt, selector, _call);
            } else {
                view.on(evt, _call);
            }
        },
        bindEvents: function(view, events) {
            var idx, func, evt, selector;
            if ('object' != typeof events) {
                return;
            }
            var _bind = function(evt, selector, funcList) {
                _.each(funcList, function(func) {
                    if (func) {
                        _util.addEvent(view, evt, selector, func);
                    }
                });
            };
            for (var item in events) {
                idx = item.indexOf(' ');
                idx = idx > 0 ? idx : item.length;
                evt = item.substr(0, idx);
                selector = item.substr(++idx);
                func = events[item];
                _bind(evt, selector, func.split(/[,; ]/));
            }
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
        extend: function(source) {
            return _.extend(this, source);
        },
        each: function(iterator, scope) {
            _.each(this, iterator, scope);
            return this;
        },
        clone: function() {
            return _.clone(true, this);
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
        equals: function(obj) {
            obj = obj instanceof HashMap ? obj : new HashMap(obj);
            return _.isEqual(this, obj);
        },
        clear: function(options) {
            return this.empty();
        },
        empty: function(options) {
            var attrs = {};
            for (var key in this) {
                delete attrs[key];
            }
            return this.set(attrs, _.extend({}, options));
        },
        update:  function(key, value, options) {
            if ('object' == typeof key) {
                for (var attr in  key) {
                    this[attr] = key[attr];
                }
            } else {
                this.set(key, value, options);
            }
        },
        // 1, arguments:[call function, params, handle[callback]]
        // 2, arguments:[url, type, params, handle]. handle is an object or callback
        fetch: function(url, type, params, handle) {
            var self = this;
            params = params || {};
            var len = arguments.length;
            var args = slice.call(arguments, 0);
            var _handle = _.extend({
                success: function(json) {
                    var data;
                    if (json === undefined) {
                        return self;
                    }

                    if ('string' === typeof json) {
                        try {
                            json = _.parseJSON(json);
                        } catch(ex) {
                            logger.error('fetch::', self, data, ex);
                        }
                    }

                    data = ('object' == typeof json.data) ? json.data : json;
                    self.empty();
                    self.update(data);
                    self.onFetch(data);
                }
            }, handle);
            if (len >= 4 && 'object' == typeof handle) {
                args.pop();
            }
            args.push(_handle);
            _.fetch.apply(self, args);
            return self;
        },
        onFetch: function(func) {
            logger.log('onFetch:', func, this);
            return this;
        },
        toPlain: function() {
            var result = {};
            var self = this;
            for (var attr in this) {
                if (this.hasOwnProperty(attr)) {
                    result[attr] = this[attr];
                    if (result[attr] instanceof HashMap || result[attr] instanceof ArrayList) {
                        result[attr] = result[attr].toPlain();
                    }
                }
            }
            return result;
        },
        toPlainJSON: function() {
            return _util.toJSON(this.toPlain());
        },
        toJSON: function() {
            return this.toPlainJSON();
        },
        toString: function() {
            try {
                return root.JSON ? _.stringifyJSON(this) : this.valueOf().toLocaleString();
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
        equals: function(obj) {
            obj = obj instanceof Model ? obj : new Model(obj);
            return _.isEqual(this, obj);
        }
    };
    _.inherits(Model, HashMap);

    // ArrayList: model's collection
    ArrayList = function ArrayList(models) {
        this.empty();
        if (models !== undefined && models !== null) {
            models = _.isArrayOrList(models) ? models : [models];
            this.add(models);
        }
        this.push();
    };
    ArrayList.prototype = {
        constructor: root.Array || ArrayList,
        valueOf: function() {
            return slice.call(this);
        },
        size: function() {
            return this.length;
        },
        get: function(index) {
            return this[index];
        },
        getBy: function(attr, value) {
            var result = [];
            var map = {};
            if ('string' == typeof attr) {
                map[attr] = value;
            } else {
                map = arguments[0];
            }
            var comparer = function(item, map) {
                for (var key in map) {
                    if (map[key] !== item[key]) {
                        return false;
                    }
                }
                return true;
            };
            for (var i = 0, l = this.length; i < l; i++) {
                if (comparer(this[i], map)) {
                    result.push(this.get(i));
                }
            }
            return result;
        },
        getById: function(id) {
            return this.getBy('id', id)[0];
        },
        getByAttribute: function(key) {
            return new ArrayList( _.getByAttribute(this, key) );
        },
        getByValue: function(value) {
            return new ArrayList( _.getByValue(this, value) );
        },
        getValue: function(key) {
            var values = this.getValues(key);
            return values[0];
        },
        getValues: function(key) {
            return this.map(function(item, i) {
                if (item[key] !== undefined) {
                    return item[key];
                }
            });
        },
        validModel: function(item) {
            if (this.__model__ === null) {
                return true;
            }
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
            ArrayList.prototype.__model__ = _.deepClone(list[0]);
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
            if (index !== undefined && index < this.length && item) {
                if (!(item instanceof Model)) {
                    item = new Model(item);
                }
                list[index] = item;
            }
            return this;
        },
        setBy: function(attr, value, options) {
            this.each(function(model) {
                model.set(attr, value, options);
            });
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
        hasBy: function(attr, value) {
            return this.containsBy(attr, value);
        },
        contains: function(item, comparer) {
            return _.contains(this, item, comparer);
        },
        containsBy: function(attr, value) {
            var result = false;
            var map = {};
            if ('string' == typeof attr) {
                map[attr] = value;
            } else {
                map = arguments[0];
            }
            if (_.isEmptyObject(map)) {
                return false;
            }
            var comparer = function(item, map) {
                for (var key in map) {
                    if (map[key] !== item[key]) {
                        return false;
                    }
                }
                return true;
            };
            return this.contains(map, comparer);
        },
        indexOf: function(item, from, comparer) {
            return _.indexOf(this, item, from, comparer);
        },
        lastIndexOf: function(item, from, comparer) {
            return _.lastIndexOf(this, item, from, comparer);
        },
        indexOfBy: function(attr, value) {
            var i = 0,
                l = this.length;

            while (i < l) {
                if (this[i][attr] === value) {
                    return i;
                }
                i++;
            }

            return -1;
        },
        'each': arrPro.forEach || function(iterator, scope) {
            _.each(this, iterator, scope);
            return this;
        },
        remove: function(start, end) {
            end = end || start + 1;
            if (end > 0 && start <= this.size()) {
                this.splice(start, end - start);
            }
            return this;
        },
        removeItem: function(item) {
            var index = this.indexOf(item);
            return this.remove(index);
        },
        removeBy: function(attr, value) {
            var self = this;
            var i = 0, l = this.length, model;
            while (l > i) {
                l--;
                model = this[l];
                if (model[attr] !== undefined && model[attr] === value) {
                    self.remove(l);
                }
            }
            return this;
        },
        removeById: function(id) {
            return this.removeBy('id', id);
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
        equals: function(obj) {
            obj = obj instanceof ArrayList ? obj : new ArrayList(obj);
            return _.isEqual(this, obj);
        },
        clone: function() {
            return new ArrayList(_.clone(this));
        },
        toString: function() {
            return root.JSON ? _.stringifyJSON(this) : 'function Array(){\n   [variant code]\n}';
        },
        toPlain: function() {
            var result = [];
            _.each(this, function(item) {
                if (item.toPlain) {
                    item = item.toPlain();
                }
                result.push(item);
            });
            return result;
        },
        toPlainJSON: function() {
            return _util.toJSON(this.toPlain());
        },
        toJSON: function() {
            return this.toPlainJSON();
        },
        toArray: function(options) {
            // return slice.call(this, options);
            var result = [];
            _.each(this, function(item) {
                result.push(item);
            });
            return result;
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
                if (a[filed] !== undefined && b[filed] !== undefined) {
                    return _.isEqual(a[filed], b[filed]);
                }
                return false;
            });
        },
        intersection: function(arr, comparer) {
            return new ArrayList(_.intersection(this, arr, comparer));
        },
        concat: function() {
            var args = slice.call(arguments, 0);
            var len = args.length;
            while(len--) {
                if (args[len].toArray) {
                    args[len] = args[len].toArray();
                }
            }
            return arrPro.concat.apply(this.toArray(), args);
        },
        union: function(arr, comparer) {
            return new ArrayList(_.union(this, arr, comparer));
        },
        indexBy: function(filed) {
            return new HashMap( _.indexBy(this, filed) );
        },
        groupBy: function(filed, resultType) {
            var args = slice.call(arguments, 0);
            args.unshift(this);
            var result = _.groupBy.apply(this, args);
            return (result instanceof Array) ? new ArrayList(result) : new HashMap(result);
        },
        sortBy: function(filed, order) {
            var arr = _.sortBy(this, filed, order);
            return new ArrayList(arr);
        },
        orderBy: function(filed, order) {
            return this.sortBy(filed, order);
        },
        changeIndex: function(fromIdx, toIdx) {
            if (fromIdx < this.length && fromIdx >= 0) {
                this.splice(toIdx, 0, this.splice(fromIdx, 1)[0]);
            }
            return this;
        },
        changeOrder: function(fromOrder, toOrder) {
            return this.changeIndex(fromOrder - 1, toOrder - 1);
        },
        swapOrder: function(fromOrder, toOrder) {
            if (fromOrder < 1 || toOrder < 1 || fromOrder > this.length ||
                toOrder > this.length || fromOrder == toOrder) {
                return this;
            }
            this.changeOrder(fromOrder, toOrder);
            if (fromOrder < toOrder) {
                this.changeOrder(toOrder - 1, fromOrder);
            } else {
                this.changeOrder(toOrder + 1, fromOrder);
            }
            return this;
        },
        setOrder: function(fromOrder, toOrder, orderKey) {
            orderKey = orderKey || 'order';
            this.sortBy(orderKey, 'asc');
            if (fromOrder === undefined || toOrder === undefined) {
                return this;
            }
            // set toOrder aviable
            if (toOrder < this.get(0)[orderKey]) {
                toOrder = this.get(0)[orderKey];
            } else if (toOrder > this.get(this.length - 1)[orderKey]) {
                toOrder = this.get(this.length - 1)[orderKey];
            }
            var fromIdx = this.indexOfBy(orderKey, fromOrder);
            if (fromIdx < 0) {
                return this;
            }
            var indexGap = Math.abs(fromOrder - toOrder);
            var increment = (fromOrder < toOrder) ? -1 : 1;
            var idxVar;
            // add or reduce 1 order for items in adjust range
            do {
                idxVar = (increment < 1) ? (fromIdx + indexGap) : (fromIdx - indexGap);
                if (this[idxVar] !== undefined) {
                    this[idxVar][orderKey] += increment;
                }
            } while(indexGap--);

            this[fromIdx][orderKey] = toOrder;

            return this;
        },
        extend: function(source) {
            return _.extend(this, source);
        },
        'fetch': Model.prototype.fetch,
        onFetch: function(data) {
            logger.log('onFetch:', data, this);
            return this;
        }
    };

    _.each(['entries', 'every', 'filter', 'forEach', 'join', 'keys',
        'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice',
        'some', 'sort', 'splice', 'unshift'], function(method) {
            ArrayList.prototype[method] = arrPro[method];
        }
    );

    // Module: one module of application, include sub modules
    Module = function Module(data, config) {
        this.create = Arm.create;
        _.extend(this, data);
    };
    Module.prototype = {
        constructor: Module,
        getAction: function() {
            return _util.getObject(this.name + '.Action');
        },
        getDao: function() {
            return _util.getObject(this.name + '.Dao');
        }
    };

    // Action: control object and declare instance for module
    Action = function Action(data, config) {
        config = config || {};
        _.extend(this, data);
        this.module = _util.getModuleByName(data.name);
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
        'new': function() {
            return this.get.apply(this, arguments);
        },
        getClass: function(name, options, isNew, type) {
            if ('object' == typeof name && name !== null) {
                options = name;
                // isNew   = options;
                name    = '';
            }
            type = type || 'Class';
            var module = this.module || {};
            name = name || module.name || '';
            var len  = name.length,
                typeLen = type.length;
            // remove the type while name contains type.
            if ( name.substr(len - typeLen - 1) === ('.' + type) ) {
                name = name.substring(0, len - (typeLen + 1));
            }

            var nameType = name.substr(len - type.length);
            var moduleInfo = {
                type: type,
                fullName: (nameType == type) ? name : name + '.' + type
            };
            // add type for name
            if (name.substr(len - typeLen) !== type) {
                name = (name + '.' + type);
            }

            return this.get( name, options, isNew, moduleInfo );
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
         * support Module.XView, Module.BClass, Module.XUtil, Module.NConfig
         * @param {object} [options], params of Class
         * @param {boolean} [isNew], create new instance
         * @param {object} [moduleInfo], module info from name for `getClass`
         * @returns {object} insance or static object
         */
        get: function(name, options, isNew, moduleInfo) {
            if (name === undefined || name === null) {
                return;
            }
            var self = this;
            var obj, module = self.module;
            // add the suffix that module's name to name param.
            if (!self.module) {
                logger.error('Action.get::', self, 'this Action has not defined `module`.');
            }
            name = _util.addModuleForName(name, module.name);
            // get moduleinfo from name param
            moduleInfo = moduleInfo || _util.getModuleInfoByName(name, module.name);

            var type = moduleInfo.type;
            var fullName = moduleInfo.fullName;

            // autocomplete module.name, both 'Module.Class' and 'Class' are available.
            fullName = (fullName.substring(0, module.name.length) != module.name) ?
                (module.name + '.' + fullName) : fullName;

            obj = _.accessProperty(Modules, fullName);

            // logger.log('Action.get:', arguments, fullName, obj, type);
            var _getInstance = function(Clazz, options, isNew, fullName) {
                if (typeof Clazz != 'function' || typeof fullName != 'string') {
                    logger.warn('[error]:getInstance:', Clazz, fullName, 'Clazz is undefined or fullName is undefined.');
                    return;
                }
                var cache = self.__instance__;
                var instance = cache[fullName];
                if(isNew === true) {
                    // create new instance forced
                    instance = new Clazz(options);
                    _Arm._data.push(instance);
                } else if(instance === undefined) {
                    // create new instance first
                    instance = new Clazz(options);
                    _Arm._data.push(instance);
                } else {
                    // only update
                    instance.update(options);
                }
                // set the lately instance
                cache[fullName] = instance;
                return instance;
            };

            // set XClass to Class for type, support `Module.XClass`,`Module.Sub.XView`.
            var types = ['Class', 'View'];
            _.each(types, function(item) {
                if (type.substr(type.length - item.length) === item) {
                    type = item;
                    return;
                }
            });

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
            var view;
            if (name instanceof Arm.View) {
                return name.run(options);
            } else if ('string' == typeof name) {
                view = self.getView(name, options);
                if (view.run) {
                    return view.run(instanceOption);
                } else {
                    logger.warn('instance run:: has not run method.', view);
                    return;
                }
            }
            view = self.getView();
            if (view.run) {
                return view.run(name);
            } else {
                logger.warn('instance run:: has not run method.', view);
            }
        },
        extend: function(source) {
            return _.extend(this, source);
        }
    };

    // Util: static method collection, resolve common problem for `View` or `Class`.
    Util = function Util(data) {
        _.extend(this, data);
        this.module = _util.getModuleByName(data.name);
        if (this.module) {
            this.action = this.module.getAction();
        }
    };
    Util.prototype = {
        constructor: Util,
        getAction: function() {
            return this.module.getAction();
        },
        extend: function(source) {
            return _.extend(this, source);
        }
    };
    // _.inherits(Util, HashMap);

   // basic data object: module config, key-value(literals) object
    Config = function Config(data) {
        _.extend(this, data);
        this.module = _util.getModuleByName(data.name);
        if (this.module) {
            this.action = this.module.getAction();
        }
    };
    Config.prototype = {
        constructor: Config,
        getAction: function() {
            return this.action;
        },
        extend: function(source) {
            return _.extend(this, source);
        }
    };
    // _.inherits(Config, HashMap);

    // Dao: front-end data interact with server by ajax or socket etc.
    Dao = function Dao(data) {
        _.extend(this, data);
        this.module = _util.getModuleByName(data.name);
        if (this.module) {
            this.action = this.module.getAction();
        }
    };
    Dao.prototype = {
        constructor: Dao,
        getAction: function() {
            return this.action;
        },
        extend: function(source) {
            return _.extend(this, source);
        }
    };

    // Class: service logic process class, split and combine data(JSON Model,ArrayList)
    Arm.Class = function() {
    };
    Arm.Class.prototype = {
        constructor: Arm.Class,
        update: function(options, properties) {
            _.extend(this.options, options);
            return this;
        },
        extend: function(methods) {
            return _.extend(this, methods);
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

    Modules = {};

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
            Modules[instance.name] = instance
            if (config.extendBase !== false) {
                return _util.extendBase(instance, Base);
            } else {
                return instance;
            }
        },
        _createConfig: function (data, config) {
            var instance = new Config(data, config);
            if (config.extendBase !== false) {
                return _util.extendBase(instance, Base.Config);
            } else {
                return instance;
            }
        },
        _createUtil: function (data, config) {
            var instance = new Util(data, config);
            if (config.extendBase !== false) {
                return _util.extendBase(instance, Base.Util);
            } else {
                return instance;
            }
        },
        _createAction: function (data, config) {
            data = data || {};
            data.module = _util.getModuleByName(data.name);
            if (!data.module instanceof Module) {
                logger.warn('createAction:', data, ' not defined module for `Action`.');
            }
            var instance = new Action(data, config);
            if (config.extendBase !== false) {
                return _util.extendBase(instance, Base.Action);
            } else {
                return instance;
            }
        },
        _createDao: function (data, config) {
            var instance = new Dao(data, config);
            if (config.extendBase !== false) {
                return _util.extendBase(instance, Base.Dao);
            } else {
                return instance;
            }
        },
        _createClass: function (data, config) {
            data = data || {};
            var properties = data.properties || {};
            data.module = _util.getModuleByName(data.name);
            var view = data.view || properties.view;
            if (!data.module instanceof Module) {
                logger.warn('createClass:', data, ' not defined module for `Class`.');
            }
            function Class(options) {
                options = options || {};
                this.name = data.name;
                _.extend(this, properties);
                this.module = data.module;
                if (this.module) {
                    this.action = this.module.getAction();
                    this.view = view;
                    this.dao = properties.dao || this.action.getDao();
                }
                this.options = _.deepClone(data.options) || {};
                _.extend(this.options, options);
                // _.extend(true, this.options, options); // deep extend
                this.construct = data.construct || data.init || this.init;
                this.construct.call(this);
            }
            // Class.prototype['__proto__'] = Arm.Class.prototype;
            // _.extend(Class.prototype, Arm.Class.prototype);
            if (data.extendBase !== false && Base.Class) {
                _.inherits(Class, Base.Class);
            }
            _.inherits(Class, Arm.Class);
            if (typeof Class.prototype.init != 'function') {
                Class.prototype.init = function(options) {};
            }
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
            Class.prototype.constructor = Class;
            Class.prototype.__super__ = Class.__super__ || Class;
            // Class.prototype.constructor.name = 'Class';
            return Class;
        },
        _createView: function (data, config) {
            data = data || {};
            var events;
            var properties = data.properties || {};
            data.module = _util.getModuleByName(data.name);
            var clazz = data['class'] || properties['class'];
            if (!data.module instanceof Module) {
                logger.warn('_createView:', data, ' not defined module for `View`.');
            }
            function View(options) {
                options = options || {};
                this.name = data.name;
                _.extend(this, properties);
                this.module = data.module;
                if (this.module) {
                    this.action = this.module.getAction();
                }
                this['class'] = clazz;
                this.options = _.deepClone(data.options) || {};
                _.extend(this.options, options);
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
                // data.events = { 'click .selector': 'func,foo'}
                _util.bindEvents(this, data.events);
                this.construct = data.construct || data.init || this.init;
                this.construct.call(this);
            }
            if (data.extendBase !== false && Base.View) {
                _.inherits(View, Base.View);
            }
            _.inherits(View, Arm.View);
            if (typeof View.prototype.init != 'function') {
                View.prototype.init = function(options) {
                    if (this.bindEvent) {
                        this.bindEvent(options);
                    }
                };
            }
            _.extend(View.prototype, {
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
                    data = data instanceof Arm.ArrayList ? data.slice(0) : data;
                    var content = 'object' == typeof data ? _.tmpl(tmplElement, data) : data;
                    process = process || function (content, ele, tmplElement, data) {
                        var html = content.html ? content.html() : content;
                        if (typeof $ == 'function') {
                            $(ele).html(content);
                        } else {
                            ele.innerHTML = html;
                        }
                        return html;
                    };
                    return process.call(this, content, ele, tmplElement, data);
                },
                getElement: function () {
                    if (this.options.element) {
                        return this.options.element;
                    } else if (this.options.$container) {
                        return this.options.$container[0];
                    }
                },
                getContainer: function () {
                    return this.options.$container || $(this.getElement());
                },
                on: function() {
                    this.getContainer().on.apply(this.getContainer(), arguments);
                },
                // trigger('click', [params] | '.selector' | element, [params])
                trigger: function (event, selector, args) {
                    if (!event) {
                        return;
                    }
                    var $container = this.getContainer();
                    var events = event.split(/[,; ]/);
                    // if selector is string or element, using delegate
                    if (_.isString(selector) || _.isElement(selector)) {
                        $container = $container.find(selector);
                    } else {
                        args = selector;
                    }
                    if ($container.trigger) {
                        _.each(events, function(evt) {
                            // @see jQuery trigger: function( type, data ) {
                            $container.trigger(evt, args);
                        });
                    }
                    return this;
                },
                triggerHandler: function(event, args) {
                    var $container = this.getContainer();
                    if ($container.triggerHandler) {
                        $container.triggerHandler(event, args);
                    }
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
                    var $container = this.getContainer();
                    if ($container && $container.on) {
                        // require events listen lib such as jQuery
                        if ('function' == typeof selector) {
                            this.on(name, selector);
                        } else {
                            this.on(name, selector, fn);
                        }
                    }
                    return this;
                };
            });
            View.inherits = function (parent) {
                return _.inherits(this, parent);
            };
            // copy method to  prototype, filter options, properties, events
            for (var item in data) {
                if (
                    item !== 'options' &&
                    item !== 'properties'
                ) {
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
            View.prototype.constructor = View;
            View.prototype.__super__ = View.__super__ || View;
            // View.prototype.constructor.name = 'View';
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
                logger.error('create error: arguments is not correct.');
            }
            return Obj;
        },
        // see Action.run
        run: function (action, view, options, instanceOption) {
            if ('string' == typeof action) {
                action = _.accessProperty(Modules, action);
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
    Arm.Map = Arm.HashMap;
    Arm.Model = Model;
    Arm.Collection = ArrayList;
    Arm.ArrayList = ArrayList;
    Arm.Module = Module;
    Arm.Config = Config;
    Arm.Util = Util;
    Arm.Dao = Dao;
    Arm.Action = Action;
    Arm.Modules = Modules;

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
