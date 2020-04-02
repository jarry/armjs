var e,r;e=this,r=function(f,a,c){"use strict";var l;a=a||{},f=window||this;var h=a._||{};c=c||h;document;var p,d,s,y,r,i,o,u,g={},v=f.console||{};v.log||(v.log=function(){},v.warn=function(){},v.error=function(){}),(a="undefined"!=typeof exports?exports:f.Arm={}).Class=null,a.View=null;var m=f.Base||{},e=Array.prototype,n=Object.prototype,O=String.prototype,t=Function.prototype,b=(e.push,e.slice),w=(e.splice,e.concat),x=n.toString,A=n.hasOwnProperty,B=(e.forEach,e.map,e.reduce,e.filter,e.every,e.some,e.indexOf,e.lastIndexOf,Array.isArray),_=Object.keys,C=t.bind;h={isArray:B||function(t){return"[object Array]"==n.toString.call(t)},isArrayOrList:function(t){return h.isArray(t)||t instanceof d},isObjectOrMap:function(t){return h.isObject(t)||t instanceof p},isObject:function(t){return"[object Object]"==n.toString.call(t)},isString:function(t){return"[object String]"==n.toString.call(t)},isNumber:function(t){return"[object Number]"==n.toString.call(t)},isBoolean:function(t){return"[object Boolean]"==n.toString.call(t)},isJSONType:function(t){return!!(h.isString(t)||h.isNumber(t)||h.isBoolean(t)||h.isObject(t)||h.isArray(t)||null===t)},isDate:function(t){return"[object Date]"==n.toString.call(t)},isFunction:function(t){return"[object Function]"==n.toString.call(t)},isElement:function(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))},isPlainObject:function(t){return"object"==typeof t&&!t.nodeType&&t.window!=window&&!(t.constructor&&!A.call(t.constructor.prototype,"isPrototypeOf"))},isUndefined:function(t){return void 0===t},isEmptyObject:function(t){for(var n in t)return!1;return!0},stringifyJSON:function(t){return f.JSON?f.JSON.stringify(t):t},parseJSON:function(t){return(f.JSON?f.JSON.parse:c.parseJSON||function(t){return new Function("return "+t)()})(t)},isEqual:function(t,n){var e,r,i=0,o=h.isEqual;if(t===n)return!0;if(void 0!==t&&void 0===n||void 0===t&&void 0!==n)return!1;var s=x.call(t);if(s!=x.call(n))return!1;if(t.constructor!==n.constructor)return!1;if(t.length&&t.length!=n.length)return!1;for(e in n)i++;for(e in n)if(--i<0)return!1;switch(s){case"[object String]":return t==String(n);case"[object Object]":for(var u in t)if(!o(t[u],n[u]))return!1;break;case"[object Number]":return t!=+t?n!=+n:0===t?1/t==1/n:t==+n;case"[object Date]":case"[object Boolean]":return+t==+n;case"[object RegExp]":return t.source==n.source&&t.global==n.global&&t.multiline==n.multiline&&t.ignoreCase==n.ignoreCase;case"[object Array]":for(r=0,i=t.length;r<i;r++)if(!o(t[r],n[r]))return!1}return t.valueOf().toString()===n.valueOf().toString()},hashCode:function(t){var n=0;if(t=t||this,0===(t=h.isString(t)?t:t.toString()).length)return n;for(var e=0;e<t.length;e++){n=(n<<5)-n+t.charCodeAt(e),n&=n}return n},keys:_||function(t){if(!h.isObjectOrMap(t)&&!h.isArrayOrList(t))return[];var n=[];for(var e in t)h.has(t,e)&&n.push(e);return n},values:function(t){for(var n=h.keys(t),e=0,r=n.length,i=new Array(r);e<r;e++)i[e]=t[n[e]];return i},pairs:function(t){for(var n=h.keys(t),e=0,r=n.length,i=new Array(r);e<r;e++)i[e]=[n[e],t[n[e]]];return i},invert:function(t){for(var n={},e=h.keys(t),r=0,i=e.length;r<i;r++)n[t[e[r]]]=e[r];return n},negate:function(t){return function(){return!t.apply(this,arguments)}},pick:function(t,n,e){var r,i,o,s={};if(h.isFunction(n))for(i in t)o=t[i],n.call(e,o,i,t)&&(s[i]=o);else for(var u=0,a=(r=w.apply([],b.call(arguments,1))).length;u<a;u++)(i=r[u])in t&&(s[i]=t[i]);return s},omit:function(e,t,n){var r,i=e instanceof p;return t=h.isFunction(t)?h.negate(t):(r=h.map(w.apply([],b.call(arguments,1)),String),function(t,n){return!i||e.hasOwnProperty(n)?!h.contains(r,n):void 0}),h.pick(e,t,n)},makeMap:function(t,n){n=n||",";for(var e={},r=t.split(n),i=0,o=r.length;i<o;i++)e[r[i]]=!0;return e},has:function(t,n){return A.call(t,n)},accessProperty:function(t,n){if(void 0!==n){for(var e,r=n.split("."),i=0,o=r.length;i<o&&void 0!==(e=t[r[i]]);i++)t=e;return e}},map:function(t,r,i){var o=[];return null==t||h.each(t,function(t,n,e){o.push(r.call(i,t,n,e))}),o},filter:function(t,r,i){var o=[];return null==t||h.each(t,function(t,n,e){r.call(i,t,n,e)&&o.push(t)}),o},indexOf:function(t,n,e,r){if(null==t||void 0===n)return-1;r=r||function(t,n){return h.isEqual(t,n)};for(var i=t.length,o=-1<e&&e<=i?e:0;o<i;o++)if(r(t[o],n))return o;return-1},lastIndexOf:function(t,n,e,r){if(null==t||void 0===n)return-1;r=r||function(t,n){return h.isEqual(t,n)};var i=t.length;for(i=-1<e&&e<=i?e:i;i--;)if(r(t[i],n))return i;return-1},unique:function(t,n){n=n||function(t,n){return h.isEqual(t,n)};for(var e=(t=t||[]).length;0<--e;)for(var r=0;r<e;r++)if(n(t[e],t[r])){t.splice(e,1);break}return t},intersection:function(t,n,e){e=e||function(t,n){return h.isEqual(t,n)};for(var r=[],i=t||[],o=n?b.call(n):[],s=0,u=i.length;s<u;s++)if(!(0<=h.indexOf(r,i[s],0,e)))for(var a=0,c=o.length;a<c;a++)e(i[s],o[a])&&(r.push(i[s]),o.splice(a,1));return r},getByAttribute:function(t,e){var r=[];return e=h.isArrayOrList(e)?e:[e],h.each(t,function(t){for(var n in t)if(A.call(t,n)&&0<=h.indexOf(e,n)){r.push(t);break}}),r},getByValue:function(t,e){var r=[];return e=h.isArrayOrList(e)?e:[e],h.each(t,function(t){for(var n in t)if(A.call(t,n)&&0<=h.indexOf(e,t[n])){r.push(t);break}}),r},format:function(t,n,e){e=e||function(t,n){return t};var r="string"==typeof n,i=r?t:n;for(var o in i)A.call(t,o)&&(r?o==n&&(t[o]=e(t[o],t)):t[o]="function"==typeof i[o]?i[o](t[o],t):void 0===i[o]||null===i[o]?e(t[o],t):i[o]);return t},union:function(t,n,e){e=e||function(t,n){return h.isEqual(t,n)};var r=[],i=t?b.call(t):[];n=h.isArrayOrList(n)?n:[n];for(var o=0,s=i.length;o<s;o++)0<=h.indexOf(r,i[o],0,e)||h.indexOf(n,i[o],0,e)<0&&r.push(i[o]);return n.toArray&&(n=n.toArray()),r.concat(n)},inArray:function(t,n){return-1!=h.indexOf(t,n)},contains:function(t,n,e){return null!=t&&(t.length===+t.length&&0<=h.indexOf(t,n,0,e))},groupBy:function(t,i,o){var s="map"==(o=o||"map")?{}:[],u=h.isFunction(i)?i:function(t){return t[i]};return h.each(t,function(t,n){var e,r=u(t,n);"map"!=o?0<=(e=function(t,n,e){for(var r=0,i=e.length;r<i;r++)if(e[r]&&e[r][0]&&e[r][0][t]===n)return r;return-1}(i,t[i],s))?s[e].push(t):s.push(new d(t)):(s[r]=s[r]||new d,s[r].push(t))}),s},indexBy:function(t,n){if(!h.isArrayOrList(t)||!n)return t;var e={};return h.each(t,function(t){void 0===e[t[n]]&&(e[t[n]]=t)}),e},sort:function(t){return t.sort(function(t,n){return t-n}),t},sortBy:function(t,i,o){return(h.isArrayOrList(t)||t instanceof d)&&t.sort(function(t,n){var e=t[i],r=n[i];return null==e?"desc"==o?1:-1:null==r||r<e?"desc"==o?-1:1:e<r?"desc"==o?1:-1:0}),t},orderBy:function(t,n,e){return h.sortBy.apply(h,b.call(arguments))},each:function(t,n,e){if(null==t)return t;var r,i,o;if(t.length===+t.length){for(r=0,i=t.length;r<i;r++)if(n.call(e,t[r],r,t)===g)return t}else for(r=0,i=(o=h.keys(t)).length;r<i;r++)if(n.call(e,t[o[r]],o[r],t)===g)return t;return t},inherits:function(e,t,n){if(n=void 0!==n&&n,h.isUndefined(e)||h.isUndefined(t))return e;var r,i=t.prototype,o=e.prototype;function s(){}if(!0===n&&(s=i&&i.hasOwnProperty("constructor")?i.constructor:function(){t.apply(this,arguments)}),!0===n)for(var u in t)void 0===e[u]&&(e[u]=t[u]);return s.prototype=i,r=e.prototype=new s,i&&h.extend(r,o),(e.prototype.constructor=e).__super__=s,e.extend=function(t){for(var n in t)r[n]=t[n];return e},e},extend:function(t,n,e){var r,i,o,s,u,a;return!0!==t&&isNaN(t)?(o=t,r=["blank"].concat(b.call(arguments))):(r=arguments,i=t,o=n),h.each(b.call(r,2),function(t){if(t)for(var n in t)a=o[n],s=t[n],!t.hasOwnProperty(n)&&(t instanceof p||t instanceof d)||a!==s&&(0<i&&(h.isObjectOrMap(s)||h.isArrayOrList(s))?(i=!0===i?i:i-1,u=h.isObjectOrMap(s)?h.isObjectOrMap(a)?a:{}:h.isArrayOrList(a)?a:[],o[n]=h.extend(i,u,s)):o[n]=s)}),o},copy:function(t,n,e,r){var i;for(i in r=r||!0,e=e||function(t,n,e){return!(t in n)},n){if(!r&&!n.hasOwnProperty(i))break;e(i,t,n)&&(t[i]=n[i])}return t},clone:function(t,n){return!0===t?h.deepClone(n):(n=t,h.isObjectOrMap(n)?h.isArrayOrList(n)?n.slice():h.extend({},n):n)},deepClone:function(t,n){if(!t||"object"!=typeof t)return t;if(h.isString(t))return O.slice.call(t);if(h.isDate(t))return new Date(t.valueOf());if(!(t instanceof p)&&h.isFunction(t.clone))return t.clone();var e;if(n=n||!0,h.isArrayOrList(t))e=b.call(t);else{if(t.constructor!=={}.constructor)return t;e=h.extend({},t)}if(!h.isUndefined(n)&&(0<n||!0===n))for(var r in e)n=!0===n?n:n-1,e[r]=h.deepClone(e[r],n);return e},ajax:function(e){var t=(e=e||{}).type||"GET",n=e.url;if(n){var r=e.contentType||"application/x-www-form-urlencoded; charset=UTF-8",i=e.dataType||"JSON";t=t.toUpperCase(),i=i.toUpperCase();var o=e.cache||!1,s=e.async||!0,u=new XMLHttpRequest||new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP"),a="";if("string"==typeof e.data)a=e.data;else{for(var c in e.data)a+=c+"="+("GET"==t?encodeURIComponent(e.data[c]):e.data[c])+"&";0<a.length&&"&"==a[a.length-1]&&(a=a.substring(0,a.length-1))}if("GET"==t&&(""!==a||!o)){var f=-1!=n.indexOf("?")?"&":"?";n+=f}for(var l in"GET"==t&&"string"==typeof a&&(n+=a),"GET"!=t||o||(-1!=n.indexOf("?")&&(n+="&"),n+="_="+(new Date).getTime()),u.open(t,n,s),u.setRequestHeader("Content-Type",r),e.headers)u.setRequestHeader(l,e.headers[l]);return u.upload.onprogress=function(t){"function"==typeof e.progress&&e.progress.apply(u,t)},u.onreadystatechange=function(){var t=u.responseText||u.responseXML;if(t&&"JSON"==i&&(t=h.parseJSON(t)),4==u.readyState){var n=u.status;200<=n&&n<300||304==n||1223==n||0===n?e.success&&e.success.call(u,t):e.error&&e.error.call(u,t)}},u.send(a||null),u}v.error("ajax:, url is not correct.",e)},send:function(t,n,e,r,i){var o,s,u;n="string"==typeof n?n:"GET","function"==typeof r?o=r:(s=(r=r||{}).success||function(t){v.log(t)},u=r.error||function(t){v.error(t)}),(c.ajax||h.ajax)({url:t,type:n,cache:i||!1,data:e,progress:r.progress,success:function(t){(o||s).call(this,t)},error:function(t){(o||u).call(this,t)}})},fetch:function(){var t,n;n="function"==typeof arguments[0]?(t=arguments[0],b.call(arguments,1)):arguments,t?t.apply(t,n):h.send.apply(this,n)},exports:function(t,n){for(var e in n)"_"!==e[0]&&h.isFunction(n[e])&&(t[e]=n[e])},curry:function(t,n){var e=b.call(arguments,1);return function(){return t.apply(n,e.concat(b.call(arguments,0)))}},currySelf:function(){var t=this,n=b.call(arguments,0);return function(){return t.apply(t.scope,n.concat(b.call(arguments,0)))}},bind:C||function(n,e){var t=arguments.length;e=e||this;var r=b.call(arguments,t);return function(){var t=r.concat(b.call(arguments,0));return e.apply(n,t)}},before:function(t,n){n=n||this;function e(){return t.apply(this,arguments),n.apply(this,arguments)}return e.before=h.before,e.after=h.after,e},after:function(e,r){r=r||this;function t(){var t=r.apply(this,arguments),n=b.call(arguments,0).concat([t]);return e.apply(this,n),t}return t.before=h.before,t.after=h.after,t},around:function(t,n){function e(){return t.apply(n,arguments)}return n=n||this,e.before=h.before,e.after=h.after,e.around=h.around,e},tmpl:function(t,n){return"function"==typeof c?c(t).tmpl(n):null}};var S={getObject:function(t){return"string"==typeof t&&0<t.length&&(t=h.accessProperty(f,t)),t},toJSON:function(e){if(h.isObject(e)){for(var t in e)h.isJSONType(e[t])?"object"==typeof e[t]&&S.toJSON(e[t]):delete e[t];return e}return h.isArrayOrList(e)&&h.each(e,function(t,n){e[n]=S.toJSON(e[n])}),e},getModuleByName:function(t){if("string"!=typeof t)return t;var n=t.indexOf(".");return 0<n?S.getObject(t.substring(0,n)):S.getObject(t)},addModuleForName:function(t,n){if(""===t||t===n||!n)return t;var e=!0,r=t.indexOf(".");return(r<0||t.substring(0,r)!==n)&&(e=!1),e?t:n+"."+t},getModuleInfoByName:function(t){var n=(t=t||"").split("."),e=t.lastIndexOf(".");return{moduleName:n[0],type:n[n.length-1],subModuleName:t.substring(0,e),fullName:t}},extendBase:function(t,n){var r=["name","module"];return h.copy(t,n,function(t,n,e){return void 0===n[t]&&!h.inArray(r,t)})},addEvent:function(n,t,e,r){function i(){var t=b.call(arguments,0);n[r]&&n[r].apply(n,t.concat(this))}e?n.on(t,e,i):n.on(t,i)},bindEvents:function(r,t){var n;if("object"==typeof t){var e=function(n,e,t){h.each(t,function(t){t&&S.addEvent(r,n,e,t)})};for(var i in t)n=0<(n=i.indexOf(" "))?n:i.length,e(i.substr(0,n),i.substr(++n),t[i].split(/[,; ]/))}}};return(p=function(t){h.extend(this,t)}).prototype={constructor:p,hashCode:function(){return h.hashCode(this.toString())},size:function(){return this.keys().length},containsKey:function(t){return this.has(t)},containsValue:function(t){for(var n in this)if(this.hasOwnProperty(n)&&this[n]===t)return!0;return!1},unset:function(t,n){return this.set(t,void 0,h.extend({},n,{unset:!0}))},has:function(t){return void 0!==this.get(t)},get:function(t){if(this.hasOwnProperty(t))return this[t]},format:function(t,n){return h.format(this,t,n)},getByAttribute:function(t){if(void 0!==t){var n=[],e=this;return t=h.isArrayOrList(t)?t:[t],h.each(t,function(t){A.call(e,t)&&n.push(e[t])}),n}},getByValue:function(t){if(void 0!==t){var n=[];for(var e in t=h.isArrayOrList(t)?t:[t],this)A.call(this,e)&&0<=h.indexOf(t,this[e])&&n.push(e);return n}},extend:function(t){return h.extend(this,t)},each:function(t,n){return h.each(this,t,n),this},clone:function(){return h.clone(!0,this)},put:function(t,n){return this.set(t,n)},set:function(t,n,e){var r,i,o;if(null==t)return this;for(i in h.isObjectOrMap(t)?r=t:(r={})[t]=n,o=(e=e||{}).unset,r)n=r[i],o?delete this[i]:this[i]=n;return this},isEmpty:function(){for(var t in this)if(A.call(this,t))return!1;return!0},remove:function(t,n){return this.unset(t,n)},equals:function(t){return t=t instanceof p?t:new p(t),h.isEqual(this,t)},clear:function(t){return this.empty()},empty:function(t){var n={};for(var e in this)delete n[e];return this.set(n,h.extend({},t))},update:function(t,n,e){if("object"==typeof t)for(var r in t)this[r]=t[r];else this.set(t,n,e)},fetch:function(t,n,e,r){var i=this;e=e||{};var o=arguments.length,s=b.call(arguments,0),u=h.extend({success:function(t){var n;if(void 0===t)return i;if("string"==typeof t)try{t=h.parseJSON(t)}catch(t){v.error("fetch::",i,n,t)}n="object"==typeof t.data?t.data:t,i.empty(),i.update(n),i.onFetch(n)}},r);return 4<=o&&"object"==typeof r&&s.pop(),s.push(u),h.fetch.apply(i,s),i},onFetch:function(t){return v.log("onFetch:",t,this),this},toPlain:function(){var t={};for(var n in this)this.hasOwnProperty(n)&&(t[n]=this[n],(t[n]instanceof p||t[n]instanceof d)&&(t[n]=t[n].toPlain()));return t},toPlainJSON:function(){return S.toJSON(this.toPlain())},toJSON:function(){return this.toPlainJSON()},toString:function(){try{return f.JSON?h.stringifyJSON(this):this.valueOf().toLocaleString()}catch(t){v.error(t)}}},h.each(["keys","values","pairs","invert","pick","omit"],function(n){p.prototype[n]=function(){var t=[this].concat(b.call(arguments));return h[n].apply(h,t)}}),(s=function(t){h.extend(this,t)}).prototype={constructor:s,attributeKey:"id",attributeType:"type",equals:function(t){return t=t instanceof s?t:new s(t),h.isEqual(this,t)}},h.inherits(s,p),(d=function(t){this.empty(),null!=t&&(t=h.isArrayOrList(t)?t:[t],this.add(t)),this.push()}).prototype={constructor:f.Array||d,valueOf:function(){return b.call(this)},size:function(){return this.length},get:function(t){return this[t]},getBy:function(t,n){var e=[],r={};"string"==typeof t?r[t]=n:r=t;for(var i=function(t,n){for(var e in n)if(n[e]!==t[e])return!1;return!0},o=0,s=this.length;o<s;o++)i(this[o],r)&&e.push(this.get(o));return e},getById:function(t){return this.getBy("id",t)[0]},getByAttribute:function(t){return new d(h.getByAttribute(this,t))},getByValue:function(t){return new d(h.getByValue(this,t))},getValue:function(t){return this.getValues(t)[0]},getValues:function(e){return this.map(function(t,n){if(void 0!==t[e])return t[e]})},validModel:function(t){if(null===this.__model__)return!0;for(var n in this.__model__)if(!t.hasOwnProperty(n))return!1;return!0},add:function(t,n){if(null==t)return this;var e,r=h.isArrayOrList(t)?t:[t];d.prototype.__model__=h.deepClone(r[0]);for(var i=0,o=r.length;i<o;i++)"object"==typeof(e=r[i])&&(e instanceof s||(e=new s(r[i])),n&&!this.validModel(t)||this.push(e));return this},addAll:function(t){return this.add(t)},set:function(t,n){return void 0!==t&&t<this.length&&n&&(n instanceof s||(n=new s(n)),this[t]=n),this},setBy:function(n,e,r){return this.each(function(t){t.set(n,e,r)}),this},update:function(t,n){if(h.isArrayOrList(t))this.empty(),this.addAll(t);else if("object"==typeof t){var e=this.indexOf(t);return this.set(e,n)}return this},insert:function(t,n){for(var e,r=h.isArrayOrList(n)?n:[n],i=0,o=r.length;i<o;i++)(e=r[i])instanceof s||(e=new s(r[i])),this.splice(t,0,e),t+=1;return this},has:function(t,n){return this.contains(t,n)},hasBy:function(t,n){return this.containsBy(t,n)},contains:function(t,n){return h.contains(this,t,n)},containsBy:function(t,n){var e={};if("string"==typeof t?e[t]=n:e=t,h.isEmptyObject(e))return!1;return this.contains(e,function(t,n){for(var e in n)if(n[e]!==t[e])return!1;return!0})},indexOf:function(t,n,e){return h.indexOf(this,t,n,e)},lastIndexOf:function(t,n,e){return h.lastIndexOf(this,t,n,e)},indexOfBy:function(t,n){for(var e=0,r=this.length;e<r;){if(this[e][t]===n)return e;e++}return-1},each:e.forEach||function(t,n){return h.each(this,t,n),this},remove:function(t,n){return 0<(n=n||t+1)&&t<=this.size()&&this.splice(t,n-t),this},removeItem:function(t){var n=this.indexOf(t);return this.remove(n)},removeBy:function(t,n){for(var e,r=this.length;0<r;)void 0!==(e=this[--r])[t]&&e[t]===n&&this.remove(r);return this},removeById:function(t){return this.removeBy("id",t)},clear:function(){for(var t in this.empty(),this)delete this[t];return this},isEmpty:function(){return 0===this.length},empty:function(){return this.remove(0,this.length)},equals:function(t){return t=t instanceof d?t:new d(t),h.isEqual(this,t)},clone:function(){return new d(h.clone(this))},toString:function(){return f.JSON?h.stringifyJSON(this):"function Array(){\n   [variant code]\n}"},toPlain:function(){var n=[];return h.each(this,function(t){t.toPlain&&(t=t.toPlain()),n.push(t)}),n},toPlainJSON:function(){return S.toJSON(this.toPlain())},toJSON:function(){return this.toPlainJSON()},toArray:function(t){var n=[];return h.each(this,function(t){n.push(t)}),n},format:function(n,e){return h.each(this,function(t){h.format(t,n,e)}),this},unique:function(t){return new d(h.unique(this,t))},uniqueBy:function(e){return this.unique(function(t,n){return void 0!==t[e]&&void 0!==n[e]&&h.isEqual(t[e],n[e])})},intersection:function(t,n){return new d(h.intersection(this,t,n))},concat:function(){for(var t=b.call(arguments,0),n=t.length;n--;)t[n].toArray&&(t[n]=t[n].toArray());return e.concat.apply(this.toArray(),t)},union:function(t,n){return new d(h.union(this,t,n))},indexBy:function(t){return new p(h.indexBy(this,t))},groupBy:function(t,n){var e=b.call(arguments,0);e.unshift(this);var r=h.groupBy.apply(this,e);return new(r instanceof Array?d:p)(r)},sortBy:function(t,n){var e=h.sortBy(this,t,n);return new d(e)},orderBy:function(t,n){return this.sortBy(t,n)},changeIndex:function(t,n){return t<this.length&&0<=t&&this.splice(n,0,this.splice(t,1)[0]),this},changeOrder:function(t,n){return this.changeIndex(t-1,n-1)},swapOrder:function(t,n){return t<1||n<1||t>this.length||n>this.length||t==n||(this.changeOrder(t,n),t<n?this.changeOrder(n-1,t):this.changeOrder(n+1,t)),this},setOrder:function(t,n,e){if(e=e||"order",this.sortBy(e,"asc"),void 0===t||void 0===n)return this;n<this.get(0)[e]?n=this.get(0)[e]:n>this.get(this.length-1)[e]&&(n=this.get(this.length-1)[e]);var r=this.indexOfBy(e,t);if(r<0)return this;for(var i,o=Math.abs(t-n),s=t<n?-1:1;void 0!==this[i=s<1?r+o:r-o]&&(this[i][e]+=s),o--;);return this[r][e]=n,this},extend:function(t){return h.extend(this,t)},fetch:s.prototype.fetch,onFetch:function(t){return v.log("onFetch:",t,this),this}},h.each(["entries","every","filter","forEach","join","keys","map","pop","push","reduce","reduceRight","reverse","shift","slice","some","sort","splice","unshift"],function(t){d.prototype[t]=e[t]}),(y=function(t){this.create=a.create,h.extend(this,t)}).prototype={constructor:y,getAction:function(){return S.getObject(this.name+".Action")},getDao:function(){return S.getObject(this.name+".Dao")}},(u=function(t){h.extend(this,t),this.module=S.getModuleByName(t.name),this.__instance__={}}).prototype={constructor:u,getModule:function(t){return f[t]||this.module},getInstance:function(){return this.get.apply(this,arguments)},new:function(){return this.get.apply(this,arguments)},getClass:function(t,n,e,r){"object"==typeof t&&null!==t&&(n=t,t=""),r=r||"Class";var i=this.module||{},o=(t=t||i.name||"").length,s=r.length;t.substr(o-s-1)==="."+r&&(t=t.substring(0,o-(s+1)));var u={type:r,fullName:t.substr(o-r.length)==r?t:t+"."+r};return t.substr(o-s)!==r&&(t=t+"."+r),this.get(t,n,e,u)},getView:function(t,n,e){return this.getClass(t,n,e,"View")},getDao:function(t,n,e){return this.getClass(t,n,e,"Dao")},getUtil:function(t,n,e){return this.getClass(t,n,e,"Util")},getConfig:function(t,n,e){return this.getClass(t,n,e,"Config")},get:function(t,n,e,r){if(null!=t){var i,s=this,o=s.module;s.module||v.error("Action.get::",s,"this Action has not defined `module`."),t=S.addModuleForName(t,o.name);var u=(r=r||S.getModuleInfoByName(t,o.name)).type,a=r.fullName;a=a.substring(0,o.name.length)!=o.name?o.name+"."+a:a,i=h.accessProperty(f,a);var c=function(t,n,e,r){if("function"==typeof t&&"string"==typeof r){var i=s.__instance__,o=i[r];return!0===e||void 0===o?(o=new t(n),l._data.push(o)):o.update(n),i[r]=o}v.warn("[error]:getInstance:",t,r,"Clazz is undefined or fullName is undefined.")};switch(h.each(["Class","View"],function(t){u.substr(u.length-t.length)!==t||(u=t)}),u){case"Class":case"View":return c(i,n,e,a);default:return i}}},init:function(){this.get.apply(this,arguments)},run:function(t,n,e){var r;return t instanceof a.View?t.run(n):"string"==typeof t?(r=this.getView(t,n)).run?r.run(e):void v.warn("instance run:: has not run method.",r):(r=this.getView()).run?r.run(t):void v.warn("instance run:: has not run method.",r)},extend:function(t){return h.extend(this,t)}},(i=function(t){h.extend(this,t),this.module=S.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())}).prototype={constructor:i,getAction:function(){return this.module.getAction()},extend:function(t){return h.extend(this,t)}},(r=function(t){h.extend(this,t),this.module=S.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())}).prototype={constructor:r,getAction:function(){return this.action},extend:function(t){return h.extend(this,t)}},(o=function(t){h.extend(this,t),this.module=S.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())}).prototype={constructor:o,getAction:function(){return this.action},extend:function(t){return h.extend(this,t)}},a.Class=function(){},a.Class.prototype={constructor:a.Class,update:function(t,n){return h.extend(this.options,t),this},extend:function(t){return h.extend(this,t)},getAction:function(){return this.action},getClass:function(t){return t?this.action.getClass(t):this.class||this.action.getClass()},getView:function(t){return t?this.action.getView(t):this.view||this.action.getView()},getUtil:function(t){return t?this.action.getUtil(t):this.util||this.action.getUtil()},getConfig:function(t){return t?this.action.getConfig(t):this.config||this.action.getConfig()},getDao:function(t){return t?this.action.getDao(t):this.dao||this.action.getDao()}},a.View=function(t){},h.extend(a.View.prototype,a.Class.prototype),a.View.prototype.constructor=a.View,l={_data:[],_createHashMap:function(t,n){return new p(t,n)},_createArrayList:function(t,n){return new d(t,n)},_createModel:function(t,n){return new s(t)},_createModule:function(t,n){"string"!=typeof t.name&&v.warn("createModule:",t," not input name of `Module`.");var e=new y(t);return!1!==n.extendBase?S.extendBase(e,m):e},_createConfig:function(t,n){var e=new r(t);return!1!==n.extendBase?S.extendBase(e,m.Config):e},_createUtil:function(t,n){var e=new i(t);return!1!==n.extendBase?S.extendBase(e,m.Util):e},_createAction:function(t,n){(t=t||{}).module=S.getModuleByName(t.name),!t.module instanceof y&&v.warn("createAction:",t," not defined module for `Action`.");var e=new u(t);return!1!==n.extendBase?S.extendBase(e,m.Action):e},_createDao:function(t,n){var e=new o(t);return!1!==n.extendBase?S.extendBase(e,m.Dao):e},_createClass:function(n,t){var e=(n=n||{}).properties||{};n.module=S.getModuleByName(n.name);var r=n.view||e.view;function i(t){t=t||{},this.name=n.name,h.extend(this,e),this.module=n.module,this.module&&(this.action=this.module.getAction(),this.view=r,this.dao=e.dao||this.action.getDao()),this.options=h.deepClone(n.options)||{},h.extend(this.options,t),this.construct=n.construct||n.init||this.init,this.construct.call(this)}for(var o in!n.module instanceof y&&v.warn("createClass:",n," not defined module for `Class`."),!1!==n.extendBase&&m.Class&&h.inherits(i,m.Class),h.inherits(i,a.Class),"function"!=typeof i.prototype.init&&(i.prototype.init=function(t){}),i.inherits=function(t){return h.inherits(this,t)},i.prototype.getView=function(){return this.view||this.getAction().getView()},n)"options"!==o&&"properties"!==o&&(i.prototype[o]=n[o]);for(var s in i.prototype)"function"==typeof i.prototype[s]&&(i.prototype[s].bind=h.bind,i.prototype[s].curry=h.currySelf,i.prototype[s].before=h.before,i.prototype[s].after=h.after);return(i.prototype.constructor=i).prototype.__super__=i.__super__||i,i},_createView:function(n,t){var e,r=(n=n||{}).properties||{};n.module=S.getModuleByName(n.name);var i=n.class||r.class;function o(t){t=t||{},this.name=n.name,h.extend(this,r),this.module=n.module,this.module&&(this.action=this.module.getAction()),this.class=i,this.options=h.deepClone(n.options)||{},h.extend(this.options,t),!this.options.element&&this.options.$container&&(this.options.element=this.options.$container[0]),!this.options.$container&&this.options.element&&c&&(this.options.$container=c(this.options.element)),h.isElement(this.options.element)||v.warn("new View init:",this,"is not defined element or $container."),S.bindEvents(this,n.events),this.construct=n.construct||n.init||this.init,this.construct.call(this)}for(var s in!n.module instanceof y&&v.warn("_createView:",n," not defined module for `View`."),!1!==n.extendBase&&m.View&&h.inherits(o,m.View),h.inherits(o,a.View),"function"!=typeof o.prototype.init&&(o.prototype.init=function(t){this.bindEvent&&this.bindEvent(t)}),h.extend(o.prototype,{find:function(t){return this.getContainer().find?this.getContainer().find(t):this.getContainer().querySelectorAll(t)},render:function(t,n,e,r){t=t||this.getElement();var i="object"==typeof(e=e instanceof a.ArrayList?e.slice(0):e)?h.tmpl(n,e):e;return(r=r||function(t,n,e,r){var i=t.html?t.html():t;return"function"==typeof c?c(n).html(t):n.innerHTML=i,i}).call(this,i,t,n,e)},getElement:function(){return this.options.element?this.options.element:this.options.$container?this.options.$container[0]:void 0},getContainer:function(){return this.options.$container||c(this.getElement())},on:function(){this.getContainer().on.apply(this.getContainer(),arguments)},trigger:function(t,n,e){if(t){var r=this.getContainer(),i=t.split(/[,; ]/);return h.isString(n)||h.isElement(n)?r=r.find(n):e=n,r.trigger&&h.each(i,function(t){r.trigger(t,e)}),this}},triggerHandler:function(t,n){var e=this.getContainer();e.triggerHandler&&e.triggerHandler(t,n)},getClass:function(){return this.class||this.getAction().getClass()}}),e=["mouseup","mousemove","mousedown","mouseover","mouseleave","mouseout","click","dbclick","drag","dragstart","dragend","drop","keydown","keypress","keyup"],h.each(e,function(r){o.prototype[r]=function(t,n){var e=this.getContainer();return e&&e.on&&("function"==typeof t?this.on(r,t):this.on(r,t,n)),this}}),o.inherits=function(t){return h.inherits(this,t)},n)"options"!==s&&"properties"!==s&&(o.prototype[s]=n[s]);for(var u in o.prototype)"function"==typeof o.prototype[u]&&(o.prototype[u].bind=h.bind,o.prototype[u].curry=h.currySelf,o.prototype[u].before=h.before,o.prototype[u].after=h.after);return(o.prototype.constructor=o).prototype.__super__=o.__super__||o,o},create:function(t,n,e){var r;return e=e||{},t&&l["_create"+t]?(r=l["_create"+t](n,e),"Class"!=t&&"View"!==t&&l._data.push(r)):v.error("create error: arguments is not correct."),r},run:function(t,n,e,r){"string"==typeof t&&(t=h.accessProperty(f,t)),t instanceof a.Action&&t.run(n,e,r)}},h.exports(a,l),a._=h,a.HashMap=p,a.Map=a.HashMap,a.Model=s,a.Collection=d,a.ArrayList=d,a.Module=y,a.Config=r,a.Util=i,a.Dao=o,a.Action=u,a.getBase=function(){return m},a.setBase=function(t){m=t},a.data=function(n,t){var e=[];return n?(h.each(l._data,function(t){a[n]&&t instanceof a[n]&&e.push(t)}),e):l._data},a},"function"==typeof define&&define.amd?define(["exports"],function(t,n){e.Arm=r(e,n,t||e.$)}):"undefined"!=typeof exports?r(e,exports,$):e.Arm=r(e,{},e.jQuery||e.Zepto||e.$||e.Arm_$);