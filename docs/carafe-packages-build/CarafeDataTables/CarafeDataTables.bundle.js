var Carafe=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=17)}({0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(1));n(2);var o=function(){function e(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),e.instance||(e.instance=this),this._data={},this._fmBridge=a,this._isFileMakerWebViewer=!1,this._isJsFiddle=!1,e.instance}return r(e,[{key:"setData",value:function(e){this._data=e}},{key:"setIsFileMakerWebViewer",value:function(){this._isFileMakerWebViewer=!0}},{key:"setIsJsFiddle",value:function(){this._isJsFiddle=!0}},{key:"isFileMakerWebViewer",value:function(){return this._isFileMakerWebViewer}},{key:"getData",value:function(){return this._data}},{key:"getFMBridge",value:function(){return this._fmBridge}},{key:"getJSON",value:function(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="json",n.onload=function(){200===n.status&&t(n.response)},n.send()}},{key:"css",value:function(e){return head.load(e)}},{key:"js",value:function(e){return head.js(e)}},{key:"callCallback",value:function(e){var t=this.getData();this._isJsFiddle||(void 0!==t.carafe&&void 0!==t.carafe.css&&this.css(t.carafe.css),void 0!==t.carafe&&void 0!==t.carafe.js&&this.js(t.carafe.js)),head.ready(function(){e(t)})}},{key:"ready",value:function(e){var t=this;head.ready(function(){t.isFileMakerWebViewer()||t._isJsFiddle?t.callCallback(e):t.getJSON("./ExampleData.json",function(n){t.setData(n),t.callCallback(e)})})}}]),e}();t.default=o},1:function(e,t,n){!function(e){"use strict";function t(e,t){var n=arguments;if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var r=Object(e),a=1;a<arguments.length;a++){var o=n[a];if(void 0!==o&&null!==o)for(var i=Object.keys(Object(o)),l=0,c=i.length;l<c;l++){var u=i[l],s=Object.getOwnPropertyDescriptor(o,u);void 0!==s&&s.enumerable&&(r[u]=o[u])}}return r}var n=function(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:t})};window.clipboardData&&(window.onerror=function(e,t,n,r,a){var o=document.createElement("div"),i=document.createElement("h1");i.innerHTML="Error!",o.appendChild(i);var l=document.createElement("p");l.innerHTML=e,o.appendChild(l);var c=document.createElement("p"),u=t.indexOf("#");t=t.substring(0,u),c.innerHTML=t,o.appendChild(c);var s=document.createElement("ul"),d=document.createElement("li");d.innerHTML="line number: "+n,s.appendChild(d);var f=document.createElement("li");f.innerHTML="column number: "+r,s.appendChild(f),o.appendChild(s);var p=document.getElementsByTagName("body")[0];o.setAttribute("style","color:red; font-size:small"),p.appendChild(o)}),n();var r=function(){var e=decodeURIComponent(location.hash.substr(1));try{e=JSON.parse(e)}catch(e){}return console.log("initialProps"),console.log(e),e}(),a=function(e,t,n,r){var a=encodeURIComponent(n);console.log("calling FM script",t),console.log("----\x3efile",e),console.log("----\x3eparameter!",n),a.length>1e3&&window.clipboardData&&(window.clipboardData.setData("Text",n),a="giant");var o="fmp://$/"+e+"?script="+t+"&param="+a,i=window.location.href,l=document.getElementsByTagName("body")[0],c=document.createElement("a");c.href=o,c.style.display="none",l.appendChild(c),c.click(),c.parentNode.removeChild(c),i.indexOf("#")>-1&&setTimeout(function(){window.location.href=i},1)};e.initialProps=r,e.callFMScript=a,e.externalAPI=function(e){void 0===e&&(e={});var t=function(t){console.log("hash changed");var n=decodeURIComponent(location.hash.substr(1));if(window.clipboardData&&"giant"===n&&(n=(n=window.clipboardData.getData("Text")).substr(1)),n){window.location.hash="",n=n.split("h^").join("#"),n=JSON.parse(n),console.log(n);var r=n.function,o=n.parameter;try{o=JSON.parse(o)}catch(e){}var i,l=n.callback&&n.callback.file?n.callback.file:"",c=n.callback&&n.callback.script?n.callback.script:"";console.log("----\x3e function: "+r),console.log("----\x3e parameter:",o),console.log("----\x3e callback:",{file:l,script:c});var u=function(e){console.log("RESULT",e),c&&("string"==typeof e||e instanceof String||(e=JSON.stringify(e)),a(l,c,e))};return(i=e[r]?e[r](o):{errorCode:-2,type:"WebViewerAPI",descriptor:"function not found: "+r})&&i.then&&"function"==typeof i.then?i.then(u):u(i)}console.log("----\x3e hash was empty")};return{addMethods:function(t){Object.assign(e,t)},start:function(){console.log("webviewer api listening"),window.addEventListener("hashchange",t,!1)},stop:function(){window.removeEventListener("hashchange",t,!1)}}},Object.defineProperty(e,"__esModule",{value:!0})}(t)},17:function(e,t,n){"use strict";var r,a=n(0);var o=new((r=a)&&r.__esModule?r:{default:r}).default;e.exports=o},2:function(e,t){
/*! head.load - v1.0.3 */
!function(e,t){"use strict";var n,r=e.document,a=[],o={},i={},l="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||e.opera,c=e.head_conf&&e.head_conf.head||"head",u=e[c]=e[c]||function(){u.ready.apply(null,arguments)},s=1,d=2,f=3,p=4;function h(){}function v(e,t){if(e){"object"==typeof e&&(e=[].slice.call(e));for(var n=0,r=e.length;n<r;n++)t.call(e,e[n],n)}}function y(e,n){var r=Object.prototype.toString.call(n).slice(8,-1);return n!==t&&null!==n&&r===e}function m(e){return y("Function",e)}function b(e){return y("Array",e)}function g(e){(e=e||h)._done||(e(),e._done=1)}function w(e){var t,n,r,a,o={};if("object"==typeof e)for(var l in e)e[l]&&(o={name:l,url:e[l]});else o={name:(t=e,n=t.split("/"),r=n[n.length-1],a=r.indexOf("?"),-1!==a?r.substring(0,a):r),url:e};var c=i[o.name];return c&&c.url===o.url?c:(i[o.name]=o,o)}function T(e){for(var t in e=e||i)if(e.hasOwnProperty(t)&&e[t].state!==p)return!1;return!0}function j(e,n){e.state===t&&(e.state=s,e.onpreload=[],E({url:e.url,type:"cache"},function(){!function(e){e.state=d,v(e.onpreload,function(e){e.call()})}(e)}))}function k(e,t){t=t||h,e.state!==p?e.state!==f?e.state!==s?(e.state=f,E(e,function(){e.state=p,t(),v(o[e.name],function(e){g(e)}),n&&T()&&v(o.ALL,function(e){g(e)})})):e.onpreload.push(function(){k(e,t)}):u.ready(e.name,t):t()}function E(t,n){function a(t){t=t||e.event,i.onload=i.onreadystatechange=i.onerror=null,n()}function o(a){("load"===(a=a||e.event).type||/loaded|complete/.test(i.readyState)&&(!r.documentMode||r.documentMode<9))&&(e.clearTimeout(t.errorTimeout),e.clearTimeout(t.cssTimeout),i.onload=i.onreadystatechange=i.onerror=null,n())}var i,l,c;n=n||h,"css"===(l=t.url,(c=(l=l||"").split("?")[0].split("."))[c.length-1].toLowerCase())?((i=r.createElement("link")).type="text/"+(t.type||"css"),i.rel="stylesheet",i.href=t.url,t.cssRetries=0,t.cssTimeout=e.setTimeout(function n(){if(t.state!==p&&t.cssRetries<=20){for(var a=0,l=r.styleSheets.length;a<l;a++)if(r.styleSheets[a].href===i.href)return void o({type:"load"});t.cssRetries++,t.cssTimeout=e.setTimeout(n,250)}},500)):((i=r.createElement("script")).type="text/"+(t.type||"javascript"),i.src=t.url),i.onload=i.onreadystatechange=o,i.onerror=a,i.async=!1,i.defer=!1,t.errorTimeout=e.setTimeout(function(){a({type:"timeout"})},7e3);var u=r.head||r.getElementsByTagName("head")[0];u.insertBefore(i,u.lastChild)}function O(){if(!r.body)return e.clearTimeout(u.readyTimeout),void(u.readyTimeout=e.setTimeout(O,50));n||(n=!0,function(){for(var e=r.getElementsByTagName("script"),t=0,n=e.length;t<n;t++){var a=e[t].getAttribute("data-headjs-load");if(a)return void u.load(a)}}(),v(a,function(e){g(e)}))}function _(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",_,!1),O()):"complete"===r.readyState&&(r.detachEvent("onreadystatechange",_),O())}if("complete"===r.readyState)O();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",_,!1),e.addEventListener("load",O,!1);else{r.attachEvent("onreadystatechange",_),e.attachEvent("onload",O);var M=!1;try{M=!e.frameElement&&r.documentElement}catch(e){}M&&M.doScroll&&function t(){if(!n){try{M.doScroll("left")}catch(n){return e.clearTimeout(u.readyTimeout),void(u.readyTimeout=e.setTimeout(t,50))}O()}}()}u.load=u.js=l?function(){var e=arguments,t=e[e.length-1],n={};return m(t)||(t=null),b(e[0])?(e[0].push(t),u.load.apply(null,e[0]),u):(v(e,function(e,r){e!==t&&(e=w(e),n[e.name]=e)}),v(e,function(e,r){e!==t&&k(e=w(e),function(){T(n)&&g(t)})}),u)}:function(){var e=arguments,t=e[e.length-1],n=[].slice.call(e,1),r=n[0];return m(t)||(t=null),b(e[0])?(e[0].push(t),u.load.apply(null,e[0]),u):(r?(v(n,function(e){!m(e)&&e&&j(w(e))}),k(w(e[0]),m(r)?r:function(){u.load.apply(null,n)})):k(w(e[0])),u)},u.test=function(e,t,n,r){var a="object"==typeof e?e:{test:e,success:!!t&&(b(t)?t:[t]),failure:!!n&&(b(n)?n:[n]),callback:r||h},o=!!a.test;return o&&a.success?(a.success.push(a.callback),u.load.apply(null,a.success)):!o&&a.failure?(a.failure.push(a.callback),u.load.apply(null,a.failure)):r(),u},u.ready=function(e,t){if(e===r)return n?g(t):a.push(t),u;if(m(e)&&(t=e,e="ALL"),b(e)){var l={};return v(e,function(e){l[e]=i[e],u.ready(e,function(){T(l)&&g(t)})}),u}if("string"!=typeof e||!m(t))return u;var c=i[e];if(c&&c.state===p||"ALL"===e&&T()&&n)return g(t),u;var s=o[e];return s?s.push(t):s=o[e]=[t],u},u.ready(r,function(){T()&&v(o.ALL,function(e){g(e)}),u.feature&&u.feature("domloaded",!0)})}(window)}});
//# sourceMappingURL=CarafeDataTables.bundle.js.map