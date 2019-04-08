var Carafe=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){"use strict";var r,o=n(1);var i=new((r=o)&&r.__esModule?r:{default:r}).default;t.exports=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();n(2),n(6);var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(7));var i=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._version="0.7.1",this._jsonData={},this._metaData={cdns:{css:[],js:[]}},this._fmBridge=o,this._useStandardDataLoading=!0,this}return r(t,[{key:"setData",value:function(t){this._jsonData=t}},{key:"setMetaData",value:function(t){this._metaData=t}},{key:"setCssCdnArray",value:function(t){this._metaData.cdns.css=t}},{key:"setJsCdnArray",value:function(t){this._metaData.cdns.js=t}},{key:"setIsStandardDataLoading",value:function(){this._useStandardDataLoading=!0}},{key:"setLocalResourceDataLoading",value:function(){this._useStandardDataLoading=!1}},{key:"isStandardDataLoading",value:function(){return this._useStandardDataLoading}},{key:"getData",value:function(){return this._jsonData}},{key:"getMetaData",value:function(){return this._metaData}},{key:"getFMBridge",value:function(){return this._fmBridge}},{key:"ready",value:function(t){var e=this;new Promise(function(t,n){t(e.isStandardDataLoading()?void 0:e.fetchLocalFileResources())}).then(function(){return e.loadResources()}).then(function(){head.ready(function(){t(e.getData())})}).catch(function(){console.debug("error fetching metaData from configData")})}},{key:"loadResources",value:function(){var t=this.getMetaData();void 0!==t.cdns&&(void 0!==t.cdns.css&&head.load(t.cdns.css),void 0!==t.cdns.js&&head.js(t.cdns.js))}},{key:"fetchLocalFileResources",value:function(){var t=this,e=this.getJsonFromUrl("./data.json").then(function(e){t.setData(e)}),n=this.getJsonFromUrl("./config.json").then(function(e){void 0!==e.metaData&&t.setMetaData(e.metaData)});return Promise.all([e,n]).catch(function(){console.debug("error fetching local file data.json or config.json")})}},{key:"getTextFromUrl",value:function(t){return fetch(t).then(function(t){return t.text()}).catch(function(){console.debug("error fetching metaData from builtJs")})}},{key:"getJsonFromUrl",value:function(t){return fetch(t).then(function(t){return t.json()}).catch(function(){console.debug("error fetching json from "+t)})}}]),t}();e.default=i},function(t,e,n){"use strict";t.exports=n(3).polyfill()},function(t,e,n){(function(e,n){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.6+9869a4bc
 */var r;r=function(){"use strict";function t(t){return"function"==typeof t}var r=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=0,i=void 0,a=void 0,c=function(t,e){p[o]=t,p[o+1]=e,2===(o+=2)&&(a?a(v):_())},u="undefined"!=typeof window?window:void 0,s=u||{},l=s.MutationObserver||s.WebKitMutationObserver,f="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),d="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function h(){var t=setTimeout;return function(){return t(v,1)}}var p=new Array(1e3);function v(){for(var t=0;t<o;t+=2){(0,p[t])(p[t+1]),p[t]=void 0,p[t+1]=void 0}o=0}var m,y,g,b,_=void 0;function w(t,e){var n=this,r=new this.constructor(E);void 0===r[j]&&U(r);var o=n._state;if(o){var i=arguments[o-1];c(function(){return N(o,r,i,n._result)})}else F(n,r,t,e);return r}function T(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(E);return M(e,t),e}f?_=function(){return e.nextTick(v)}:l?(y=0,g=new l(v),b=document.createTextNode(""),g.observe(b,{characterData:!0}),_=function(){b.data=y=++y%2}):d?((m=new MessageChannel).port1.onmessage=v,_=function(){return m.port2.postMessage(0)}):_=void 0===u?function(){try{var t=Function("return this")().require("vertx");return void 0!==(i=t.runOnLoop||t.runOnContext)?function(){i(v)}:h()}catch(t){return h()}}():h();var j=Math.random().toString(36).substring(2);function E(){}var L=void 0,D=1,O=2,S={error:null};function A(t){try{return t.then}catch(t){return S.error=t,S}}function k(e,n,r){n.constructor===e.constructor&&r===w&&n.constructor.resolve===T?function(t,e){e._state===D?C(t,e._result):e._state===O?P(t,e._result):F(e,void 0,function(e){return M(t,e)},function(e){return P(t,e)})}(e,n):r===S?(P(e,S.error),S.error=null):void 0===r?C(e,n):t(r)?function(t,e,n){c(function(t){var r=!1,o=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(n,e,function(n){r||(r=!0,e!==n?M(t,n):C(t,n))},function(e){r||(r=!0,P(t,e))},t._label);!r&&o&&(r=!0,P(t,o))},t)}(e,n,r):C(e,n)}function M(t,e){var n,r;t===e?P(t,new TypeError("You cannot resolve a promise with itself")):(r=typeof(n=e),null===n||"object"!==r&&"function"!==r?C(t,e):k(t,e,A(e)))}function x(t){t._onerror&&t._onerror(t._result),R(t)}function C(t,e){t._state===L&&(t._result=e,t._state=D,0!==t._subscribers.length&&c(R,t))}function P(t,e){t._state===L&&(t._state=O,t._result=e,c(x,t))}function F(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+D]=n,o[i+O]=r,0===i&&t._state&&c(R,t)}function R(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,a=0;a<e.length;a+=3)r=e[a],o=e[a+n],r?N(n,r,o,i):o(i);t._subscribers.length=0}}function N(e,n,r,o){var i=t(r),a=void 0,c=void 0,u=void 0,s=void 0;if(i){if((a=function(t,e){try{return t(e)}catch(t){return S.error=t,S}}(r,o))===S?(s=!0,c=a.error,a.error=null):u=!0,n===a)return void P(n,new TypeError("A promises callback cannot return that same promise."))}else a=o,u=!0;n._state!==L||(i&&u?M(n,a):s?P(n,c):e===D?C(n,a):e===O&&P(n,a))}var J=0;function U(t){t[j]=J++,t._state=void 0,t._result=void 0,t._subscribers=[]}var B=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(E),this.promise[j]||U(this.promise),r(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&C(this.promise,this._result))):P(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;this._state===L&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===T){var o=A(t);if(o===w&&t._state!==L)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===I){var i=new n(E);k(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===L&&(this._remaining--,t===O?P(r,n):this._result[e]=n),0===this._remaining&&C(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;F(t,void 0,function(t){return n._settledAt(D,e,t)},function(t){return n._settledAt(O,e,t)})},t}(),I=function(){function e(t){this[j]=J++,this._result=this._state=void 0,this._subscribers=[],E!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e(function(e){M(t,e)},function(e){P(t,e)})}catch(e){P(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this.constructor;return t(e)?this.then(function(t){return n.resolve(e()).then(function(){return t})},function(t){return n.resolve(e()).then(function(){throw t})}):this.then(e,e)},e}();return I.prototype.then=w,I.all=function(t){return new B(this,t).promise},I.race=function(t){var e=this;return r(t)?new e(function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}):new e(function(t,e){return e(new TypeError("You must pass an array to race."))})},I.resolve=T,I.reject=function(t){var e=new this(E);return P(e,t),e},I._setScheduler=function(t){a=t},I._setAsap=function(t){c=t},I._asap=c,I.polyfill=function(){var t=void 0;if(void 0!==n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=I},I.Promise=I,I},t.exports=r()}).call(this,n(4),n(5))},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function c(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var u,s=[],l=!1,f=-1;function d(){l&&u&&(l=!1,u.length?s=u.concat(s):f=-1,s.length&&h())}function h(){if(!l){var t=c(d);l=!0;for(var e=s.length;e;){for(u=s,s=[];++f<e;)u&&u[f].run();f=-1,e=s.length}u=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new p(t,e)),1!==s.length||l||c(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){
/*! head.load - v1.0.3 */
!function(t,e){"use strict";var n,r=t.document,o=[],i={},a={},c="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||t.opera,u=t.head_conf&&t.head_conf.head||"head",s=t[u]=t[u]||function(){s.ready.apply(null,arguments)},l=1,f=2,d=3,h=4;function p(){}function v(t,e){if(t){"object"==typeof t&&(t=[].slice.call(t));for(var n=0,r=t.length;n<r;n++)e.call(t,t[n],n)}}function m(t,n){var r=Object.prototype.toString.call(n).slice(8,-1);return n!==e&&null!==n&&r===t}function y(t){return m("Function",t)}function g(t){return m("Array",t)}function b(t){(t=t||p)._done||(t(),t._done=1)}function _(t){var e,n,r,o,i={};if("object"==typeof t)for(var c in t)t[c]&&(i={name:c,url:t[c]});else i={name:(e=t,n=e.split("/"),r=n[n.length-1],o=r.indexOf("?"),-1!==o?r.substring(0,o):r),url:t};var u=a[i.name];return u&&u.url===i.url?u:(a[i.name]=i,i)}function w(t){for(var e in t=t||a)if(t.hasOwnProperty(e)&&t[e].state!==h)return!1;return!0}function T(t,n){t.state===e&&(t.state=l,t.onpreload=[],E({url:t.url,type:"cache"},function(){!function(t){t.state=f,v(t.onpreload,function(t){t.call()})}(t)}))}function j(t,e){e=e||p,t.state!==h?t.state!==d?t.state!==l?(t.state=d,E(t,function(){t.state=h,e(),v(i[t.name],function(t){b(t)}),n&&w()&&v(i.ALL,function(t){b(t)})})):t.onpreload.push(function(){j(t,e)}):s.ready(t.name,e):e()}function E(e,n){function o(e){e=e||t.event,a.onload=a.onreadystatechange=a.onerror=null,n()}function i(o){("load"===(o=o||t.event).type||/loaded|complete/.test(a.readyState)&&(!r.documentMode||r.documentMode<9))&&(t.clearTimeout(e.errorTimeout),t.clearTimeout(e.cssTimeout),a.onload=a.onreadystatechange=a.onerror=null,n())}var a,c,u;n=n||p,"css"===(c=e.url,(u=(c=c||"").split("?")[0].split("."))[u.length-1].toLowerCase())?((a=r.createElement("link")).type="text/"+(e.type||"css"),a.rel="stylesheet",a.href=e.url,e.cssRetries=0,e.cssTimeout=t.setTimeout(function n(){if(e.state!==h&&e.cssRetries<=20){for(var o=0,c=r.styleSheets.length;o<c;o++)if(r.styleSheets[o].href===a.href)return void i({type:"load"});e.cssRetries++,e.cssTimeout=t.setTimeout(n,250)}},500)):((a=r.createElement("script")).type="text/"+(e.type||"javascript"),a.src=e.url),a.onload=a.onreadystatechange=i,a.onerror=o,a.async=!1,a.defer=!1,e.errorTimeout=t.setTimeout(function(){o({type:"timeout"})},7e3);var s=r.head||r.getElementsByTagName("head")[0];s.insertBefore(a,s.lastChild)}function L(){if(!r.body)return t.clearTimeout(s.readyTimeout),void(s.readyTimeout=t.setTimeout(L,50));n||(n=!0,function(){for(var t=r.getElementsByTagName("script"),e=0,n=t.length;e<n;e++){var o=t[e].getAttribute("data-headjs-load");if(o)return void s.load(o)}}(),v(o,function(t){b(t)}))}function D(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",D,!1),L()):"complete"===r.readyState&&(r.detachEvent("onreadystatechange",D),L())}if("complete"===r.readyState)L();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",D,!1),t.addEventListener("load",L,!1);else{r.attachEvent("onreadystatechange",D),t.attachEvent("onload",L);var O=!1;try{O=!t.frameElement&&r.documentElement}catch(t){}O&&O.doScroll&&function e(){if(!n){try{O.doScroll("left")}catch(n){return t.clearTimeout(s.readyTimeout),void(s.readyTimeout=t.setTimeout(e,50))}L()}}()}s.load=s.js=c?function(){var t=arguments,e=t[t.length-1],n={};return y(e)||(e=null),g(t[0])?(t[0].push(e),s.load.apply(null,t[0]),s):(v(t,function(t,r){t!==e&&(t=_(t),n[t.name]=t)}),v(t,function(t,r){t!==e&&j(t=_(t),function(){w(n)&&b(e)})}),s)}:function(){var t=arguments,e=t[t.length-1],n=[].slice.call(t,1),r=n[0];return y(e)||(e=null),g(t[0])?(t[0].push(e),s.load.apply(null,t[0]),s):(r?(v(n,function(t){!y(t)&&t&&T(_(t))}),j(_(t[0]),y(r)?r:function(){s.load.apply(null,n)})):j(_(t[0])),s)},s.test=function(t,e,n,r){var o="object"==typeof t?t:{test:t,success:!!e&&(g(e)?e:[e]),failure:!!n&&(g(n)?n:[n]),callback:r||p},i=!!o.test;return i&&o.success?(o.success.push(o.callback),s.load.apply(null,o.success)):!i&&o.failure?(o.failure.push(o.callback),s.load.apply(null,o.failure)):r(),s},s.ready=function(t,e){if(t===r)return n?b(e):o.push(e),s;if(y(t)&&(e=t,t="ALL"),g(t)){var c={};return v(t,function(t){c[t]=a[t],s.ready(t,function(){w(c)&&b(e)})}),s}if("string"!=typeof t||!y(e))return s;var u=a[t];if(u&&u.state===h||"ALL"===t&&w()&&n)return b(e),s;var l=i[t];return l?l.push(e):l=i[t]=[e],s},s.ready(r,function(){w()&&v(i.ALL,function(t){b(t)}),s.feature&&s.feature("domloaded",!0)})}(window)},function(t,e,n){!function(t){"use strict";function e(t,e){var n=arguments;if(null==t)throw new TypeError("Cannot convert first argument to object");for(var r=Object(t),o=1;o<arguments.length;o++){var i=n[o];if(null!=i)for(var a=Object.keys(Object(i)),c=0,u=a.length;c<u;c++){var s=a[c],l=Object.getOwnPropertyDescriptor(i,s);void 0!==l&&l.enumerable&&(r[s]=i[s])}}return r}var n=function(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:e})};window.clipboardData&&(window.onerror=function(t,e,n,r,o){var i=document.createElement("div"),a=document.createElement("h1");a.innerHTML="Error!",i.appendChild(a);var c=document.createElement("p");c.innerHTML=t,i.appendChild(c);var u=document.createElement("p"),s=e.indexOf("#");e=e.substring(0,s),u.innerHTML=e,i.appendChild(u);var l=document.createElement("ul"),f=document.createElement("li");f.innerHTML="line number: "+n,l.appendChild(f);var d=document.createElement("li");d.innerHTML="column number: "+r,l.appendChild(d),i.appendChild(l);var h=document.getElementsByTagName("body")[0];i.setAttribute("style","color:red; font-size:small"),h.appendChild(i)}),n();var r=function(){var t=decodeURIComponent(location.hash.substr(1));try{t=JSON.parse(t)}catch(t){}return console.log("initialProps"),console.log(t),t}(),o=function(t,e,n,r){var o=encodeURIComponent(n);console.log("calling FM script",e),console.log("----\x3efile",t),console.log("----\x3eparameter!",n),o.length>1e3&&window.clipboardData&&(window.clipboardData.setData("Text",n),o="giant");var i="fmp://$/"+t+"?script="+e+"&param="+o,a=window.location.href,c=document.getElementsByTagName("body")[0],u=document.createElement("a");u.href=i,u.style.display="none",c.appendChild(u),u.click(),u.parentNode.removeChild(u),a.indexOf("#")>-1&&setTimeout(function(){window.location.href=a},1)};t.initialProps=r,t.callFMScript=o,t.externalAPI=function(t){void 0===t&&(t={});var e=function(e){console.log("hash changed");var n=decodeURIComponent(location.hash.substr(1));if(window.clipboardData&&"giant"===n&&(n=(n=window.clipboardData.getData("Text")).substr(1)),n){window.location.hash="",n=n.split("h^").join("#"),n=JSON.parse(n),console.log(n);var r=n.function,i=n.parameter;try{i=JSON.parse(i)}catch(t){}var a,c=n.callback&&n.callback.file?n.callback.file:"",u=n.callback&&n.callback.script?n.callback.script:"";console.log("----\x3e function: "+r),console.log("----\x3e parameter:",i),console.log("----\x3e callback:",{file:c,script:u}),a=t[r]?t[r](i):{errorCode:-2,type:"WebViewerAPI",descriptor:"function not found: "+r};var s=function(t){console.log("RESULT",t),u&&("string"==typeof t||t instanceof String||(t=JSON.stringify(t)),o(c,u,t))};return a&&a.then&&"function"==typeof a.then?a.then(s):s(a)}console.log("----\x3e hash was empty")};return{addMethods:function(e){Object.assign(t,e)},start:function(){console.log("webviewer api listening"),window.addEventListener("hashchange",e,!1)},stop:function(){window.removeEventListener("hashchange",e,!1)}}},Object.defineProperty(t,"__esModule",{value:!0})}(e)}]);
//# sourceMappingURL=Carafe.js.map