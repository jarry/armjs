!function(t,n){"function"==typeof define&&define.amd?define(["jquery","exports"],function(e,r){t.Arm=n(t,r,e||t.$)}):"undefined"!=typeof exports?n(t,exports,$):t.Arm=n(t,{},t.jQuery||t.Zepto||t.ender||t.$||t.mooltools||t.Arm_$)}(this,function(t,n,e){"use strict"
var r,i,o,s,u,a,c,f,l,h,p,d,g,y,m,v,O,b,w,x,A,B,_,C,j,N,S,M,E,V,J,P,L,k,q,T,D,F
return t=window||this,i=n._||{},e=e||i,o=document,s={},u=t.console,a=u||{},c="1.0.0",a.log||(a.log=function(){},a.warn=function(){},a.error=function(){}),n="undefined"!=typeof exports?exports:t.Arm={},n.Class=null,n.View=null,v=t.Base||{},O=Array.prototype,b=Object.prototype,w=String.prototype,x=Function.prototype,A=O.push,B=O.slice,_=O.splice,C=O.concat,j=b.toString,N=b.hasOwnProperty,S=O.forEach,M=O.map,E=O.reduce,V=O.filter,J=O.every,P=O.some,L=O.indexOf,k=O.lastIndexOf,q=Array.isArray,T=Object.keys,D=x.bind,i={isArray:q||function(t){return"[object Array]"==b.toString.call(t)},isArrayOrList:function(t){return i.isArray(t)||t instanceof l},isObjectOrMap:function(t){return i.isObject(t)||t instanceof f},isObject:function(t){return"[object Object]"==b.toString.call(t)},isString:function(t){return"[object String]"==b.toString.call(t)},isNumber:function(t){return"[object Number]"==b.toString.call(t)},isBoolean:function(t){return"[object Boolean]"==b.toString.call(t)},isJSONType:function(t){return i.isString(t)||i.isNumber(t)||i.isBoolean(t)||i.isObject(t)||i.isArray(t)||null===t?!0:!1},isDate:function(t){return"[object Date]"==b.toString.call(t)},isFunction:function(t){return"[object Function]"==b.toString.call(t)},isElement:function(t){return!(!t||!(t.nodeName||t.prop&&t.attr&&t.find))},isPlainObject:function(t){return"object"!=typeof t||t.nodeType||t.window==window?!1:t.constructor&&!N.call(t.constructor.prototype,"isPrototypeOf")?!1:!0},isUndefined:function(t){return void 0===t},isEmptyObject:function(t){for(var n in t)return!1
return!0},stringifyJSON:function(n){return t.JSON?t.JSON.stringify(n):n},parseJSON:function(n){var r
return(r=t.JSON?t.JSON.parse:e.parseJSON||function(t){return Function("return "+t)()})(n)},isEqual:function(t,n){var e,r,o,s,u=0,a=i.isEqual
if(t===n)return!0
if(void 0!==t&&void 0===n||void 0===t&&void 0!==n)return!1
if(o=j.call(t),o!=j.call(n))return!1
if(t.constructor!==n.constructor)return!1
if(t.length&&t.length!=n.length)return!1
for(e in n)u++
for(e in n)if(u--,0>u)return!1
switch(o){case"[object String]":return t==n+""
case"[object Object]":for(s in t)if(!a(t[s],n[s]))return!1
break
case"[object Number]":return t!=+t?n!=+n:0===t?1/t===1/n:t==+n
case"[object Date]":case"[object Boolean]":return+t==+n
case"[object RegExp]":return t.source==n.source&&t.global==n.global&&t.multiline==n.multiline&&t.ignoreCase==n.ignoreCase
case"[object Array]":for(r=0,u=t.length;u>r;r++)if(!a(t[r],n[r]))return!1}return""+t.valueOf()==""+n.valueOf()},hashCode:function(t){var n,e,r=0
if(t=t||this,t=i.isString(t)?t:""+t,0===t.length)return r
for(n=0;n<t.length;n++)e=t.charCodeAt(n),r=(r<<5)-r+e,r&=r
return r},keys:T||function(t){var n,e
if(!i.isObjectOrMap(t)&&!i.isArrayOrList(t))return[]
n=[]
for(e in t)i.has(t,e)&&n.push(e)
return n},values:function(t){for(var n=i.keys(t),e=0,r=n.length,o=Array(r);r>e;e++)o[e]=t[n[e]]
return o},pairs:function(t){for(var n=i.keys(t),e=0,r=n.length,o=Array(r);r>e;e++)o[e]=[n[e],t[n[e]]]
return o},invert:function(t){for(var n={},e=i.keys(t),r=0,o=e.length;o>r;r++)n[t[e[r]]]=e[r]
return n},negate:function(t){return function(){return!t.apply(this,arguments)}},pick:function(t,n,e){var r,o,s,u,a,c={}
if(i.isFunction(n))for(o in t)s=t[o],n.call(e,s,o,t)&&(c[o]=s)
else for(r=C.apply([],B.call(arguments,1)),u=0,a=r.length;a>u;u++)o=r[u],o in t&&(c[o]=t[o])
return c},omit:function(t,n,e){var r,o=t instanceof f
return i.isFunction(n)?n=i.negate(n):(r=i.map(C.apply([],B.call(arguments,1)),String),n=function(n,e){return o?t.hasOwnProperty(e)?!i.contains(r,e):void 0:!i.contains(r,e)}),i.pick(t,n,e)},makeMap:function(t,n){var e,r,i,o
for(n=n||",",e={},r=t.split(n),i=0,o=r.length;o>i;i++)e[r[i]]=!0
return e},has:function(t,n){return N.call(t,n)},accessProperty:function(t,n){var e,r,i,o
if(void 0!==n){for(e=n.split("."),i=0,o=e.length;o>i&&(r=t[e[i]],void 0!==r);i++)t=r
return r}},map:function(t,n,e){var r=[]
return void 0===t||null===t?r:(i.each(t,function(t,i,o){r.push(n.call(e,t,i,o))}),r)},filter:function(t,n,e){var r=[]
return void 0===t||null===t?r:(i.each(t,function(t,i,o){n.call(e,t,i,o)&&r.push(t)}),r)},indexOf:function(t,n,e,r){var o,s
if(void 0===t||null===t||void 0===n)return-1
for(r=r||function(t,n){return i.isEqual(t,n)},o=t.length,s=e>-1&&o>=e?e:0;o>s;s++)if(r(t[s],n))return s
return-1},lastIndexOf:function(t,n,e,r){if(void 0===t||null===t||void 0===n)return-1
r=r||function(t,n){return i.isEqual(t,n)}
var o=t.length
for(o=e>-1&&o>=e?e:o;o--;)if(r(t[o],n))return o
return-1},unique:function(t,n){var e,r
for(t=t||[],n=n||function(t,n){return i.isEqual(t,n)},e=t.length;--e>0;)for(r=0;e>r;r++)if(n(t[e],t[r])){t.splice(e,1)
break}return t},intersection:function(t,n,e){var r,o,s,u,a,c,f
for(e=e||function(t,n){return i.isEqual(t,n)},r=[],o=t||[],s=n?B.call(n):[],u=0,a=o.length;a>u;u++)if(i.indexOf(r,o[u],0,e)<0)for(c=0,f=s.length;f>c;c++)e(o[u],s[c])&&(r.push(o[u]),s.splice(c,1))
return r},getByAttribute:function(t,n){var e=[]
return n=i.isArrayOrList(n)?n:[n],i.each(t,function(t){for(var r in t)if(N.call(t,r)&&i.indexOf(n,r)>=0){e.push(t)
break}}),e},getByValue:function(t,n){var e=[]
return n=i.isArrayOrList(n)?n:[n],i.each(t,function(t){for(var r in t)if(N.call(t,r)&&i.indexOf(n,t[r])>=0){e.push(t)
break}}),e},format:function(t,n,e){var r,i,o
e=e||function(t,n){return t},r="string"==typeof n,i=r?t:n
for(o in i)N.call(t,o)&&(r?o==n&&(t[o]=e(t[o],t)):t[o]="function"==typeof i[o]?i[o](t[o],t):void 0===i[o]||null===i[o]?e(t[o],t):i[o])
return t},union:function(t,n,e){var r,o,s,u
for(e=e||function(t,n){return i.isEqual(t,n)},r=[],o=t?B.call(t):[],n=i.isArrayOrList(n)?n:[n],s=0,u=o.length;u>s;s++)i.indexOf(r,o[s],0,e)<0&&i.indexOf(n,o[s],0,e)<0&&r.push(o[s])
return n.toArray&&(n=n.toArray()),r.concat(n)},inArray:function(t,n){return-1!=i.indexOf(t,n)},contains:function(t,n,e){return void 0===t||null===t?!1:t.length===+t.length?i.indexOf(t,n,0,e)>=0:!1},groupBy:function(t,n,e){var r,o,s
return e=e||"map",r="map"==e?{}:[],o=i.isFunction(n)?n:function(t){return t[n]},s=function(t,n,e){for(var r=0,i=e.length;i>r;r++)if(e[r]&&e[r][0]&&e[r][0][t]===n)return r
return-1},i.each(t,function(t,i){var u,a=o(t,i)
"map"!=e?(u=s(n,t[n],r),0>u?r.push(new l(t)):r[u].push(t)):(r[a]=r[a]||new l,r[a].push(t))}),r},indexBy:function(t,n){if(!i.isArrayOrList(t)||!n)return t
var e={}
return i.each(t,function(t){void 0===e[t[n]]&&(e[t[n]]=t)}),e},sort:function(t){return t.sort(function(t,n){return t-n}),t},sortBy:function(t,n,e){return i.isArrayOrList(t)||t instanceof l?(t.sort(function(t,r){var i=t[n],o=r[n]
return void 0===i||null===i?"desc"==e?1:-1:void 0===o||null===o?"desc"==e?-1:1:i>o?"desc"==e?-1:1:o>i?"desc"==e?1:-1:0}),t):t},orderBy:function(t,n,e){return i.sortBy.apply(i,B.call(arguments))},each:function(t,n,e){if(void 0===t||null===t)return t
var r,o,u
if(t.length===+t.length){for(r=0,o=t.length;o>r;r++)if(n.call(e,t[r],r,t)===s)return t}else for(u=i.keys(t),r=0,o=u.length;o>r;r++)if(n.call(e,t[u[r]],u[r],t)===s)return t
return t},inherits:function(t,n,e){function r(){}var o,s,u,a
if(i.isUndefined(t)||i.isUndefined(n))return t
if(s=n.prototype,u=t.prototype,e===!0&&(t=s&&s.hasOwnProperty("constructor")?s.constructor:function(){n.apply(this,arguments)}),e===!0)for(a in n)void 0!==t[a]&&(t[a]=n[a])
return r.prototype=s,o=t.prototype=new r,s&&i.extend(o,u),t.prototype.constructor=t,t.__super__=n.prototype,t.extend=function(n){for(var e in n)o[e]=n[e]
return t},t},extend:function(t,n,e){var r,o,s,u,a,c
return t!==!0&&isNaN(t)?(s=t,r=["blank"].concat(B.call(arguments))):(r=arguments,o=t,s=n),i.each(B.call(r,2),function(t){if(t)for(var n in t)c=s[n],u=t[n],(t.hasOwnProperty(n)||!(t instanceof f||t instanceof l))&&c!==u&&(o>0&&(i.isObjectOrMap(u)||i.isArrayOrList(u))?(o=o===!0?o:o-1,a=i.isObjectOrMap(u)?i.isObjectOrMap(c)?c:{}:i.isArrayOrList(c)?c:[],s[n]=i.extend(o,a,u)):s[n]=u)}),s},copy:function(t,n,e,r){var i
r=r||!0,e=e||function(t,n,e){return!(t in n)}
for(i in n){if(!r&&!n.hasOwnProperty(i))break
e(i,t,n)&&(t[i]=n[i])}return t},clone:function(t,n){return arguments[0]===!0?i.deepClone(n):(n=arguments[0],i.isObjectOrMap(n)?i.isArrayOrList(n)?n.slice():i.extend({},n):n)},deepClone:function(t,n){var e,r
if(!t||"object"!=typeof t)return t
if(i.isString(t))return w.slice.call(t)
if(i.isDate(t))return new Date(t.valueOf())
if(!(t instanceof f)&&i.isFunction(t.clone))return t.clone()
if(n=n||!0,i.isArrayOrList(t))e=B.call(t)
else{if(t.constructor!=={}.constructor)return t
e=i.extend({},t)}if(!i.isUndefined(n)&&(n>0||n===!0))for(r in e)n=n===!0?n:n-1,e[r]=i.deepClone(e[r],n)
return e},ajax:function(t){var n,e,r,o,s,u,c,f,l,h,p,d,g
if(t=t||{},n=t.type||"GET",e=t.url,!e)return void a.error("ajax:, url is not correct.",t)
if(r=t.contentType||"application/x-www-form-urlencoded; charset=UTF-8",o=t.dataType||"JSON",n=n.toUpperCase(),o=o.toUpperCase(),s=t.cache||!1,u=t.async||!0,c=function(){return new XMLHttpRequest||new ActiveXObject("Msxml2.XMLHTTP")||new ActiveXObject("Microsoft.XMLHTTP")},f=c(),l="",h="","string"==typeof t.data)l=t.data
else{for(p in t.data)h="GET"==n?encodeURIComponent(t.data[p]):t.data[p],l+=p+"="+h+"&"
l.length>0&&"&"==l[l.length-1]&&(l=l.substring(0,l.length-1))}"GET"!=n||""===l&&s||(d=-1!=e.indexOf("?")?"&":"?",e+=d),"GET"==n&&"string"==typeof l&&(e+=l),"GET"!=n||s||(-1!=e.indexOf("?")&&(e+="&"),e+="_="+(new Date).getTime()),f.open(n,e,u),f.setRequestHeader("Content-Type",r)
for(g in t.headers)f.setRequestHeader(g,t.headers[g])
return f.upload.onprogress=function(n){"function"==typeof t.progress&&t.progress.apply(f,n)},f.onreadystatechange=function(){var n,e=f.responseText||f.responseXML
e&&"JSON"==o&&(e=i.parseJSON(e)),4==f.readyState&&(n=f.status,n>=200&&300>n||304==n||1223==n||0===n?t.success&&t.success.call(f,e):t.error&&t.error.call(f,e))},f.send(l||null),f},send:function(t,n,r,o,s){var u,c,f,l
n="string"==typeof n?n:"GET","function"==typeof o?u=o:(o=o||{},c=o.success||function(t){a.log(t)},f=o.error||function(t){a.error(t)}),(l=e.ajax||i.ajax)({url:t,type:n,cache:s||!1,data:r,progress:o.progress,success:function(t){var n=u||c
n.call(this,t)},error:function(t){var n=u||f
n.call(this,t)}})},fetch:function(){var t,n
"function"==typeof arguments[0]?(t=arguments[0],n=B.call(arguments,1)):n=arguments,t?t.apply(t,n):i.send.apply(this,n)},exports:function(t,n){for(var e in n)"_"!==e[0]&&i.isFunction(n[e])&&(t[e]=n[e])},curry:function(t,n){var e=B.call(arguments,1)
return function(){return t.apply(n,e.concat(B.call(arguments,0)))}},currySelf:function(){var t=this,n=B.call(arguments,0)
return function(){return t.apply(t.scope,n.concat(B.call(arguments,0)))}},bind:D||function(t,n){var e,r=arguments.length
return n=n||this,e=B.call(arguments,r),function(){var r=e.concat(B.call(arguments,0))
return n.apply(t,r)}},before:function(t,n){n=n||this
var e=function(){return t.apply(this,arguments),n.apply(this,arguments)}
return e.before=i.before,e.after=i.after,e},after:function(t,n){n=n||this
var e=function(){var e=n.apply(this,arguments),r=B.call(arguments,0).concat([e])
return t.apply(this,r),e}
return e.before=i.before,e.after=i.after,e},around:function(t,n){function e(){return t.apply(n,arguments)}return n=n||this,e.before=i.before,e.after=i.after,e.around=i.around,e},tmpl:function(t,n){return"function"==typeof e?e(t).tmpl(n):null}},F={getObject:function(n){return"string"==typeof n&&n.length>0&&(n=i.accessProperty(t,n)),n},toJSON:function(t){if(i.isObject(t)){for(var n in t)i.isJSONType(t[n])?"object"==typeof t[n]&&F.toJSON(t[n]):delete t[n]
return t}return i.isArrayOrList(t)&&i.each(t,function(n,e){t[e]=F.toJSON(t[e])}),t},getModuleByName:function(t){if("string"==typeof t){var n=t.indexOf(".")
return n>0?F.getObject(t.substring(0,n)):F.getObject(t)}return t},addModuleForName:function(t,n){if(""===t||t===n||!n)return t
var e="",r=!0,i=t.indexOf(".")
return 0>i?r=!1:(e=t.substring(0,i),e!==n&&(r=!1)),r?t:n+"."+t},getModuleInfoByName:function(t){var n,e
return t=t||"",n=t.split("."),e=t.lastIndexOf("."),{moduleName:n[0],type:n[n.length-1],subModuleName:t.substring(0,e),fullName:t}},extendBase:function(t,n){var e=["name","module"]
return i.copy(t,n,function(t,n,r){return void 0===n[t]&&!i.inArray(e,t)})},addEvent:function(t,n,e,r){var i=function(){var n=B.call(arguments,0)
t[r]&&t[r].apply(t,n.concat(this))}
e?t.on(n,e,i):t.on(n,i)},bindEvents:function(t,n){var e,r,o,s,u,a
if("object"==typeof n){u=function(n,e,r){i.each(r,function(r){r&&F.addEvent(t,n,e,r)})}
for(a in n)e=a.indexOf(" "),e=e>0?e:a.length,o=a.substr(0,e),s=a.substr(++e),r=n[a],u(o,s,r.split(/[,; ]/))}}},f=function(t){i.extend(this,t)},f.prototype={constructor:t.Map||f,hashCode:function(){return i.hashCode(""+this)},size:function(){return this.keys().length},containsKey:function(t){return this.has(t)},containsValue:function(t){for(var n in this)if(this.hasOwnProperty(n)&&this[n]===t)return!0
return!1},unset:function(t,n){return this.set(t,void 0,i.extend({},n,{unset:!0}))},has:function(t){return void 0!==this.get(t)},get:function(t){return this.hasOwnProperty(t)?this[t]:void 0},format:function(t,n){return i.format(this,t,n)},getByAttribute:function(t){if(void 0!==t){var n=[],e=this
return t=i.isArrayOrList(t)?t:[t],i.each(t,function(t){N.call(e,t)&&n.push(e[t])}),n}},getByValue:function(t){var n,e,r
if(void 0!==t){n=[],e=this,t=i.isArrayOrList(t)?t:[t]
for(r in e)N.call(e,r)&&i.indexOf(t,e[r])>=0&&n.push(r)
return n}},extend:function(t){return i.extend(this,t)},each:function(t,n){return i.each(this,t,n),this},clone:function(){return i.clone(!0,this)},put:function(t,n){return this.set(t,n)},set:function(t,n,e){var r,o,s
if(void 0===t||null===t)return this
i.isObjectOrMap(t)?r=t:(r={})[t]=n,e=e||{},s=e.unset
for(o in r)n=r[o],s?delete this[o]:this[o]=n
return this},isEmpty:function(){for(var t in this)if(N.call(this,t))return!1
return!0},remove:function(t,n){return this.unset(t,n)},equals:function(t){return t=t instanceof f?t:new f(t),i.isEqual(this,t)},clear:function(t){return this.empty()},empty:function(t){var n,e={}
for(n in this)delete e[n]
return this.set(e,i.extend({},t))},update:function(t,n,e){if("object"==typeof t)for(var r in t)this[r]=t[r]
else this.set(t,n,e)},fetch:function(t,n,e,r){var o,s,u,c=this
return e=e||{},o=arguments.length,s=B.call(arguments,0),u=i.extend({success:function(t){var n
if(void 0===t)return c
if("string"==typeof t)try{t=i.parseJSON(t)}catch(e){a.error("fetch::",c,n,e)}n="object"==typeof t.data?t.data:t,c.empty(),c.update(n),c.onFetch(n)}},r),4>o||"object"!=typeof r||s.pop(),s.push(u),i.fetch.apply(c,s),c},onFetch:function(t){return a.log("onFetch:",t,this),this},toPlain:function(){var t,n={}
for(t in this)this.hasOwnProperty(t)&&(n[t]=this[t],(n[t]instanceof f||n[t]instanceof l)&&(n[t]=n[t].toPlain()))
return n},toPlainJSON:function(){return F.toJSON(this.toPlain())},toJSON:function(){return this.toPlainJSON()},toString:function(){try{return t.JSON?i.stringifyJSON(this):this.valueOf().toLocaleString()}catch(n){a.error(n)}}},i.each(["keys","values","pairs","invert","pick","omit"],function(t){f.prototype[t]=function(){var n=[this].concat(B.call(arguments))
return i[t].apply(i,n)}}),h=function(t){i.extend(this,t)},h.prototype={constructor:t.Map||h,attributeKey:"id",attributeType:"type",equals:function(t){return t=t instanceof h?t:new h(t),i.isEqual(this,t)}},i.inherits(h,f),l=function(t){this.empty(),void 0!==t&&null!==t&&(t=i.isArrayOrList(t)?t:[t],this.add(t)),this.push()},l.prototype={constructor:t.Array||l,valueOf:function(){return B.call(this)},size:function(){return this.length},get:function(t){return this[t]},getBy:function(t,n){var e,r,i,o=[],s={}
for("string"==typeof t?s[t]=n:s=arguments[0],e=function(t,n){for(var e in n)if(n[e]!==t[e])return!1
return!0},r=0,i=this.length;i>r;r++)e(this[r],s)&&o.push(this.get(r))
return o},getById:function(t){return this.getBy("id",t)[0]},getByAttribute:function(t){return new l(i.getByAttribute(this,t))},getByValue:function(t){return new l(i.getByValue(this,t))},getValue:function(t){var n=this.getValues(t)
return n[0]},getValues:function(t){return this.map(function(n,e){return void 0!==n[t]?n[t]:void 0})},validModel:function(t){if(null===this.__model__)return!0
for(var n in this.__model__)if(!t.hasOwnProperty(n))return!1
return!0},add:function(t,n){var e,r,o,s
if(void 0===t||null===t)return this
for(r=i.isArrayOrList(t)?t:[t],l.prototype.__model__=i.deepClone(r[0]),o=0,s=r.length;s>o;o++)e=r[o],"object"==typeof e&&(e instanceof h||(e=new h(r[o])),(!n||this.validModel(t))&&this.push(e))
return this},addAll:function(t){return this.add(t)},set:function(t,n){var e=this
return void 0!==t&&t<this.length&&n&&(n instanceof h||(n=new h(n)),e[t]=n),this},setBy:function(t,n,e){return this.each(function(r){r.set(t,n,e)}),this},update:function(t,n){if(i.isArrayOrList(t))this.empty(),this.addAll(t)
else if("object"==typeof t){var e=this.indexOf(t)
return this.set(e,n)}return this},insert:function(t,n){var e,r,o,s=i.isArrayOrList(n)?n:[n]
for(r=0,o=s.length;o>r;r++)e=s[r],e instanceof h||(e=new h(s[r])),this.splice(t,0,e),t+=1
return this},has:function(t,n){return this.contains(t,n)},hasBy:function(t,n){return this.containsBy(t,n)},contains:function(t,n){return i.contains(this,t,n)},containsBy:function(t,n){var e,r={}
return"string"==typeof t?r[t]=n:r=arguments[0],i.isEmptyObject(r)?!1:(e=function(t,n){for(var e in n)if(n[e]!==t[e])return!1
return!0},this.contains(r,e))},indexOf:function(t,n,e){return i.indexOf(this,t,n,e)},lastIndexOf:function(t,n,e){return i.lastIndexOf(this,t,n,e)},indexOfBy:function(t,n){for(var e=0,r=this.length;r>e;){if(this[e][t]===n)return e
e++}return-1},each:O.forEach||function(t,n){return i.each(this,t,n),this},remove:function(t,n){return n=n||t+1,n>0&&t<=this.size()&&this.splice(t,n-t),this},removeItem:function(t){var n=this.indexOf(t)
return this.remove(n)},removeBy:function(t,n){for(var e,r=this,i=0,o=this.length;o>i;)o--,e=this[o],void 0!==e[t]&&e[t]===n&&r.remove(o)
return this},removeById:function(t){return this.removeBy("id",t)},clear:function(){this.empty()
for(var t in this)delete this[t]
return this},isEmpty:function(){return 0===this.length},empty:function(){return this.remove(0,this.length)},equals:function(t){return t=t instanceof l?t:new l(t),i.isEqual(this,t)},clone:function(){return new l(i.clone(this))},toString:function(){return t.JSON?i.stringifyJSON(this):"function Array(){\n   [variant code]\n}"},toPlain:function(){var t=[]
return i.each(this,function(n){n.toPlain&&(n=n.toPlain()),t.push(n)}),t},toPlainJSON:function(){return F.toJSON(this.toPlain())},toJSON:function(){return this.toPlainJSON()},toArray:function(t){var n=[]
return i.each(this,function(t){n.push(t)}),n},format:function(t,n){return i.each(this,function(e){i.format(e,t,n)}),this},unique:function(t){return new l(i.unique(this,t))},uniqueBy:function(t){return this.unique(function(n,e){return void 0!==n[t]&&void 0!==e[t]?i.isEqual(n[t],e[t]):!1})},intersection:function(t,n){return new l(i.intersection(this,t,n))},concat:function(){for(var t=B.call(arguments,0),n=t.length;n--;)t[n].toArray&&(t[n]=t[n].toArray())
return O.concat.apply(this.toArray(),t)},union:function(t,n){return new l(i.union(this,t,n))},indexBy:function(t){return new f(i.indexBy(this,t))},groupBy:function(t,n){var e,r=B.call(arguments,0)
return r.unshift(this),e=i.groupBy.apply(this,r),e instanceof Array?new l(e):new f(e)},sortBy:function(t,n){var e=i.sortBy(this,t,n)
return new l(e)},orderBy:function(t,n){return this.sortBy(t,n)},changeIndex:function(t,n){return t<this.length&&t>=0&&this.splice(n,0,this.splice(t,1)[0]),this},changeOrder:function(t,n){return this.changeIndex(t-1,n-1)},swapOrder:function(t,n){return 1>t||1>n||t>this.length||n>this.length||t==n?this:(this.changeOrder(t,n),n>t?this.changeOrder(n-1,t):this.changeOrder(n+1,t),this)},setOrder:function(t,n,e){var r,i,o,s
if(e=e||"order",this.sortBy(e,"asc"),void 0===t||void 0===n)return this
if(n<this.get(0)[e]?n=this.get(0)[e]:n>this.get(this.length-1)[e]&&(n=this.get(this.length-1)[e]),r=this.indexOfBy(e,t),0>r)return this
i=Math.abs(t-n),o=n>t?-1:1
do s=1>o?r+i:r-i,void 0!==this[s]&&(this[s][e]+=o)
while(i--)
return this[r][e]=n,this},extend:function(t){return i.extend(this,t)},fetch:h.prototype.fetch,onFetch:function(t){return a.log("onFetch:",t,this),this}},i.each(["entries","every","filter","forEach","join","keys","map","pop","push","reduce","reduceRight","reverse","shift","slice","some","sort","splice","unshift"],function(t){l.prototype[t]=O[t]}),p=function(t,e){this.create=n.create,i.extend(this,t)},p.prototype={constructor:p,getAction:function(){return F.getObject(this.name+".Action")},getDao:function(){return F.getObject(this.name+".Dao")}},m=function(t,n){n=n||{},i.extend(this,t),this.module=F.getModuleByName(t.name),this.__instance__={}},m.prototype={constructor:m,getModule:function(n){return t[n]||this.module},getInstance:function(){return this.get.apply(this,arguments)},"new":function(){return this.get.apply(this,arguments)},getClass:function(t,n,e,r){var i,o,s,u,a
return"object"==typeof t&&null!==t&&(n=t,t=""),r=r||"Class",i=this.module||{},t=t||i.name||"",o=t.length,s=r.length,t.substr(o-s-1)==="."+r&&(t=t.substring(0,o-(s+1))),u=t.substr(o-r.length),a={type:r,fullName:u==r?t:t+"."+r},t.substr(o-s)!==r&&(t=t+"."+r),this.get(t,n,e,a)},getView:function(t,n,e){return this.getClass(t,n,e,"View")},getDao:function(t,n,e){return this.getClass(t,n,e,"Dao")},getUtil:function(t,n,e){return this.getClass(t,n,e,"Util")},getConfig:function(t,n,e){return this.getClass(t,n,e,"Config")},get:function(n,e,o,s){var u,c,f,l,h,p,d
if(void 0!==n&&null!==n)switch(u=this,f=u.module,u.module||a.error("Action.get::",u,"this Action has not defined `module`."),n=F.addModuleForName(n,f.name),s=s||F.getModuleInfoByName(n,f.name),l=s.type,h=s.fullName,h=h.substring(0,f.name.length)!=f.name?f.name+"."+h:h,c=i.accessProperty(t,h),p=function(t,n,e,i){var o,s
return"function"!=typeof t||"string"!=typeof i?void a.warn("[error]:getInstance:",t,i,"Clazz is undefined or fullName is undefined."):(o=u.__instance__,s=o[i],e===!0?(s=new t(n),r._data.push(s)):void 0===s?(s=new t(n),r._data.push(s)):s.update(n),o[i]=s,s)},d=["Class","View"],i.each(d,function(t){return l.substr(l.length-t.length)===t?void(l=t):void 0}),l){case"Class":return p(c,e,o,h)
case"View":return p(c,e,o,h)
default:return c}},init:function(){this.get.apply(this,arguments)},run:function(t,e,r){var i,o=this
return t instanceof n.View?t.run(e):"string"==typeof t?(i=o.getView(t,e),i.run?i.run(r):void a.warn("instance run:: has not run method.",i)):(i=o.getView(),i.run?i.run(t):void a.warn("instance run:: has not run method.",i))},extend:function(t){return i.extend(this,t)}},g=function(t){i.extend(this,t),this.module=F.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())},g.prototype={constructor:g,getAction:function(){return this.module.getAction()},extend:function(t){return i.extend(this,t)}},d=function(t){i.extend(this,t),this.module=F.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())},d.prototype={constructor:d,getAction:function(){return this.action},extend:function(t){return i.extend(this,t)}},y=function(t){i.extend(this,t),this.module=F.getModuleByName(t.name),this.module&&(this.action=this.module.getAction())},y.prototype={constructor:y,getAction:function(){return this.action},extend:function(t){return i.extend(this,t)}},n.Class=function(){},n.Class.prototype={constructor:n.Class,update:function(t,n){return i.extend(this.options,t),this},extend:function(t){return i.extend(this,t)},getAction:function(){return this.action},getClass:function(t){return t?this.action.getClass(t):this["class"]||this.action.getClass()},getView:function(t){return t?this.action.getView(t):this.view||this.action.getView()},getUtil:function(t){return t?this.action.getUtil(t):this.util||this.action.getUtil()},getConfig:function(t){return t?this.action.getConfig(t):this.config||this.action.getConfig()},getDao:function(t){return t?this.action.getDao(t):this.dao||this.action.getDao()}},n.View=function(t){},i.extend(n.View.prototype,n.Class.prototype),n.View.prototype.constructor=n.View,r={_data:[],_createHashMap:function(t,n){return new f(t,n)},_createArrayList:function(t,n){return new l(t,n)},_createModel:function(t,n){return new h(t,n)},_createModule:function(t,n){"string"!=typeof t.name&&a.warn("createModule:",t," not input name of `Module`.")
var e=new p(t,n)
return n.extendBase!==!1?F.extendBase(e,v):e},_createConfig:function(t,n){var e=new d(t,n)
return n.extendBase!==!1?F.extendBase(e,v.Config):e},_createUtil:function(t,n){var e=new g(t,n)
return n.extendBase!==!1?F.extendBase(e,v.Util):e},_createAction:function(t,n){t=t||{},t.module=F.getModuleByName(t.name),!t.module instanceof p&&a.warn("createAction:",t," not defined module for `Action`.")
var e=new m(t,n)
return n.extendBase!==!1?F.extendBase(e,v.Action):e},_createDao:function(t,n){var e=new y(t,n)
return n.extendBase!==!1?F.extendBase(e,v.Dao):e},_createClass:function(t,e){function r(n){n=n||{},this.name=t.name,i.extend(this,o),this.module=t.module,this.module&&(this.action=this.module.getAction(),this.view=s,this.dao=o.dao||this.action.getDao()),this.options=i.deepClone(t.options)||{},i.extend(this.options,n),this.construct=t.construct||t.init||this.init,this.construct.call(this)}var o,s,u,c
t=t||{},o=t.properties||{},t.module=F.getModuleByName(t.name),s=t.view||o.view,!t.module instanceof p&&a.warn("createClass:",t," not defined module for `Class`."),t.extendBase!==!1&&v.Class&&i.inherits(r,v.Class),i.inherits(r,n.Class),"function"!=typeof r.prototype.init&&(r.prototype.init=function(t){}),r.inherits=function(t){return i.inherits(this,t)},r.prototype.getView=function(){return this.view||this.getAction().getView()}
for(u in t)"options"!==u&&"properties"!==u&&(r.prototype[u]=t[u])
for(c in r.prototype)"function"==typeof r.prototype[c]&&(r.prototype[c].bind=i.bind,r.prototype[c].curry=i.currySelf,r.prototype[c].before=i.before,r.prototype[c].after=i.after)
return r.prototype.constructor=r,r.prototype.__super__=r.__super__||r,r},_createView:function(t,r){function o(n){n=n||{},this.name=t.name,i.extend(this,u),this.module=t.module,this.module&&(this.action=this.module.getAction()),this["class"]=c,this.options=i.deepClone(t.options)||{},i.extend(this.options,n),!this.options.element&&this.options.$container&&(this.options.element=this.options.$container[0]),!this.options.$container&&this.options.element&&e&&(this.options.$container=e(this.options.element)),i.isElement(this.options.element)||a.warn("new View init:",this,"is not defined element or $container."),F.bindEvents(this,t.events),this.construct=t.construct||t.init||this.init,this.construct.call(this)}var s,u,c,f,l
t=t||{},u=t.properties||{},t.module=F.getModuleByName(t.name),c=t["class"]||u["class"],!t.module instanceof p&&a.warn("_createView:",t," not defined module for `View`."),t.extendBase!==!1&&v.View&&i.inherits(o,v.View),i.inherits(o,n.View),"function"!=typeof o.prototype.init&&(o.prototype.init=function(t){this.bindEvent&&this.bindEvent(t)}),i.extend(o.prototype,{find:function(t){return this.getContainer().find?this.getContainer().find(t):this.getContainer().querySelectorAll(t)},render:function(t,r,o,s){t=t||this.getElement(),o=o instanceof n.ArrayList?o.slice(0):o
var u="object"==typeof o?i.tmpl(r,o):o
return s=s||function(t,n,r,i){var o=t.html?t.html():t
return"function"==typeof e?e(n).html(t):n.innerHTML=o,o},s.call(this,u,t,r,o)},getElement:function(){return this.options.element?this.options.element:this.options.$container?this.options.$container[0]:void 0},getContainer:function(){return this.options.$container||e(this.getElement())},on:function(){this.getContainer().on.apply(this.getContainer(),arguments)},trigger:function(t,n,e){var r,o
if(t)return r=this.getContainer(),o=t.split(/[,; ]/),i.isString(n)||i.isElement(n)?r=r.find(n):e=n,r.trigger&&i.each(o,function(t){r.trigger(t,e)}),this},triggerHandler:function(t,n){var e=this.getContainer()
e.triggerHandler&&e.triggerHandler(t,n)},getClass:function(){return this["class"]||this.getAction().getClass()}}),s=["mouseup","mousemove","mousedown","mouseover","mouseleave","mouseout","click","dbclick","drag","dragstart","dragend","drop","keydown","keypress","keyup"],i.each(s,function(t){o.prototype[t]=function(n,e){var r=this.getContainer()
return r&&r.on&&("function"==typeof n?this.on(t,n):this.on(t,n,e)),this}}),o.inherits=function(t){return i.inherits(this,t)}
for(f in t)"options"!==f&&"properties"!==f&&(o.prototype[f]=t[f])
for(l in o.prototype)"function"==typeof o.prototype[l]&&(o.prototype[l].bind=i.bind,o.prototype[l].curry=i.currySelf,o.prototype[l].before=i.before,o.prototype[l].after=i.after)
return o.prototype.constructor=o,o.prototype.__super__=o.__super__||o,o},create:function(t,n,e){e=e||{}
var i
return t&&r["_create"+t]?(i=r["_create"+t](n,e),"Class"!=t&&"View"!==t&&r._data.push(i)):a.error("create error: arguments is not correct."),i},run:function(e,r,o,s){"string"==typeof e&&(e=i.accessProperty(t,e)),e instanceof n.Action&&e.run(r,o,s)}},i.exports(n,r),n._=i,n.HashMap=f,n.Map=n.HashMap,n.Model=h,n.Collection=l,n.ArrayList=l,n.Module=p,n.Config=d,n.Util=g,n.Dao=y,n.Action=m,n.getBase=function(){return v},n.setBase=function(t){v=t},n.data=function(t,e){var o=[]
return t?(i.each(r._data,function(e){n[t]&&e instanceof n[t]&&o.push(e)}),o):r._data},n})