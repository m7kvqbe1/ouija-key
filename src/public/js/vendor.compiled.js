/* Ouija v0.0.1, built Mon Apr 27 2015 00:30:24 */var Sprint;!function(){"use strict";var a=function(a,b){for(var c=Sprint(b),d=Object.keys(a),e=d.length,f=0;e>f;f++)for(var g=d[f],h=a[g],i=h.length,j=0;i>j;j++)c.on(g,h[j])},b=function(){var a=["animation-iteration-count","column-count","flex-grow","flex-shrink","font-weight","line-height","opacity","order","orphans","widows","z-index"];return function(b,c){if(l(b,a))return c;var d="string"==typeof c?c:c.toString();return c&&!/\D/.test(d)&&(d+="px"),d}}(),c=function(a){var b=document.createElement("div"),c=/[\w:-]+/.exec(a)[0],d=B[c],e=a.trim();d&&(e=d.intro+e+d.outro),b.insertAdjacentHTML("afterbegin",e);var f=b.lastChild;if(d)for(var g=d.outro.match(/</g).length;g--;)f=f.lastChild;return b.textContent="",f},d={afterbegin:function(a){this.insertBefore(a,this.firstChild)},afterend:function(a){var b=this.parentElement;b&&b.insertBefore(a,this.nextSibling)},beforebegin:function(a){var b=this.parentElement;b&&b.insertBefore(a,this)},beforeend:function(a){this.appendChild(a)}},e=function(b,c){if(!(b.nodeType>1)){var d=h(b);d&&a(d,c);for(var e,f=x("*",b),g=f.length,i=0;g>i;i++){var d=h(f[i]);d&&(e||(e=x("*",c)),a(d,e[i]))}}},f=function(a,b,c,d,e){var f=[],g=this;return this.each(function(){for(var h=a?this.parentElement:this;!(!h||e&&e==h||(!d||g.is(d,h))&&(f.push(h),c)||b);)h=h.parentElement}),Sprint(p(f))},g=function(a){return y(a)[0]},h=function(a){return a.sprintEventListeners},i=function(a,b){return Object.keys(h(a)).filter(function(a){return y(b).every(function(b){return l(b,y(a))})})},j=function(a,c,d){if(null==d){var e=a.get(0);if(!e||e.nodeType>1)return;var f=c[0].toUpperCase()+c.substring(1);if(e==document){var g=s["offset"+f],h=window["inner"+f];return g>h?g:h}return e==window?window["inner"+f]:e.getBoundingClientRect()[c]}var i="function"==typeof d,j=i?"":b(c,d);return a.each(function(a){this==document||this==window||this.nodeType>1||(i&&(j=b(c,d.call(this,a,Sprint(this)[c]()))),this.style[c]=j)})},k=function(a,b){var c=b.length,f=b;if(c>1&&a.indexOf("after")>-1){f=[];for(var g=c;g--;)f.push(b[g])}for(var g=0;c>g;g++){var h=f[g];if("string"==typeof h||"number"==typeof h)this.each(function(){this.insertAdjacentHTML(a,h)});else{if("function"!=typeof h){var i=h instanceof C,j=[],l=function(){return i?h.get():Array.isArray(h)?t(h,!0,!0):h.nodeType?[h]:z(h)}(),m=l.length;if(this.each(function(b){for(var c=document.createDocumentFragment(),f=0;m>f;f++){var g,h=l[f];b?(g=h.cloneNode(!0),e(h,g)):g=h,c.appendChild(g),j.push(g)}d[a].call(this,c)}),i&&(h.dom=j,h.length=j.length),c-1>g)continue;return j}this.each(function(b){var c=h.call(this,b,this.innerHTML);k.call(Sprint(this),a,[c])})}}},l=function(a,b){for(var c=b.length;c--;)if(b[c]===a)return!0;return!1},m=function(a){return/\./.test(a)},n=function(a,b,c){if(null==b)return"add"==a?this:this.removeAttr("class");var d,e,f;return"string"==typeof b&&(d=!0,e=b.trim().split(" "),f=e.length),this.each(function(g,h){if(!(this.nodeType>1)){if(!d){var i=b.call(h,g,h.className);if(!i)return;e=i.trim().split(" "),f=e.length}for(var j=0;f>j;j++){var k=e[j];k&&(null==c?h.classList[a](k):h.classList.toggle(k,c))}}})},o=function(){for(var a=["mozMatchesSelector","webkitMatchesSelector","msMatchesSelector","matches"],b=a.length;b--;){var c=a[b];if(Element.prototype[c])return c}}(),p=function(a){for(var b=[],c=0,d=a.length,e=0;d>e;e++){for(var f=a[e],g=!1,h=0;c>h;h++)if(f===b[h]){g=!0;break}g||(b[c++]=f)}return b},q=function(){var a=function(a,b,c){var d=Object.keys(h(a)).filter(function(a){return g(b)===g(a)}).map(function(b){return h(a)[b]}).reduce(function(a,b){return a.concat(b)}).filter(function(a){return a===c});return d.length<2?!1:!0},b=function(b,c,d){return function(e){d&&d!==e||(b.removeEventListener(c,e),m(c)&&!a(b,c,e)&&b.removeEventListener(g(c),e))}},c=function(a,b){return a.filter(function(a){return b&&b!==a})};return function(a,d){return function(e){h(a)[e].forEach(b(a,e,d)),h(a)[e]=c(h(a)[e],d)}}}(),r=function(a,b){return function(c){i(a,c).forEach(q(a,b))}},s=document.documentElement,t=function(a,b,c){for(var d=a.length,e=d;e--;)if(!a[e]&&0!==a[e]||b&&a[e]instanceof C||c&&("string"==typeof a[e]||"number"==typeof a[e])){for(var f=[],g=0;d>g;g++){var h=a[g];if(h||0===h)if(b&&h instanceof C)for(var i=0;i<h.length;i++)f.push(h.get(i));else f.push(!c||"string"!=typeof h&&"number"!=typeof h?h:document.createTextNode(h))}return f}return a},u=function(){var a;return function(b,c,d){if(!a){var e=s.scrollTop;s.scrollTop=e+1;var f=s.scrollTop;s.scrollTop=e,a=f>e?s:document.body}if(null==d){var g=b.get(0);if(!g)return;return(g==window||g==document)&&(g=a),g[c]}return b.each(function(){var b=this;(b==window||b==document)&&(b=a),b[c]=d})}}(),v=function(a,b,c,d){var e=[],f=b+"ElementSibling";return a.each(function(){for(var b=this;(b=b[f])&&(!d||!a.is(d,b));)(!c||a.is(c,b))&&e.push(b)}),Sprint(p(e))},w=function(a,b,c){var d=b+"ElementSibling";return a.map(function(){var b=this[d];if(b&&(!c||a.is(c,b)))return b},!1)},x=function(a,b){if(b=b||document,/^[\#.]?[\w-]+$/.test(a)){var c=a[0];if("."==c)return z(b.getElementsByClassName(a.slice(1)));if("#"==c){var d=b.getElementById(a.slice(1));return d?[d]:[]}return"body"==a?[document.body]:z(b.getElementsByTagName(a))}return z(b.querySelectorAll(a))},y=function(a){return t(a.split("."))},z=function(a){for(var b=[],c=a.length;c--;)b[c]=a[c];return b},A=function(){var a=function(a,b){var c=Sprint(a).clone(!0).get(0),d=c;if(c&&!(this.nodeType>1)){for(;d.firstChild;)d=d.firstChild;if("inner"==b){for(;this.firstChild;)d.appendChild(this.firstChild);this.appendChild(c)}else{var e="all"==b?this.get(0):this,f=e.parentNode,g=e.nextSibling;"all"==b?this.each(function(){d.appendChild(this)}):d.appendChild(e),f.insertBefore(c,g)}}};return function(b,c){return"function"==typeof b?this.each(function(a){Sprint(this)["inner"==c?"wrapInner":"wrap"](b.call(this,a))}):"all"==c?a.call(this,b,c):this.each(function(){a.call(this,b,c)}),this}}(),B={legend:{intro:"<fieldset>",outro:"</fieldset>"},area:{intro:"<map>",outro:"</map>"},param:{intro:"<object>",outro:"</object>"},thead:{intro:"<table>",outro:"</table>"},tr:{intro:"<table><tbody>",outro:"</tbody></table>"},col:{intro:"<table><tbody></tbody><colgroup>",outro:"</colgroup></table>"},td:{intro:"<table><tbody><tr>",outro:"</tr></tbody></table>"}};["tbody","tfoot","colgroup","caption"].forEach(function(a){B[a]=B.thead}),B.th=B.td;var C=function(a,b){if("string"==typeof a)"<"==a[0]?this.dom=[c(a)]:this.dom=b&&b instanceof C?b.find(a).get():x(a,b);else if(Array.isArray(a))this.dom=t(a);else if(a instanceof NodeList||a instanceof HTMLCollection)this.dom=z(a);else{if(a instanceof C)return a;if("function"==typeof a)return this.ready(a);this.dom=a?[a]:[]}this.length=this.dom.length};C.prototype={add:function(a){for(var b=this.get(),c=Sprint(a),d=c.get(),e=0;e<c.length;e++)b.push(d[e]);return Sprint(p(b))},addClass:function(a){return n.call(this,"add",a)},after:function(){return k.call(this,"afterend",arguments),this},append:function(){return k.call(this,"beforeend",arguments),this},appendTo:function(a){return Sprint(k.call(Sprint(a),"beforeend",[this]))},attr:function(a,b){var c="function"==typeof b;if("string"==typeof b||"number"==typeof b||c)return this.each(function(d){this.nodeType>1||this.setAttribute(a,c?b.call(this,d,this.getAttribute(a)):b)});if("object"==typeof a){var d=Object.keys(a),e=d.length;return this.each(function(){if(!(this.nodeType>1))for(var b=0;e>b;b++){var c=d[b];this.setAttribute(c,a[c])}})}var f=this.get(0);if(f&&!(f.nodeType>1)){var g=f.getAttribute(a);return null==g?void 0:g?g:a}},before:function(){return k.call(this,"beforebegin",arguments),this},children:function(a){var b=[],c=this;return this.each(function(){if(!(this.nodeType>1))for(var d=this.children,e=d.length,f=0;e>f;f++){var g=d[f];(!a||c.is(a,g))&&b.push(g)}}),Sprint(b)},clone:function(a){return this.map(function(){if(this){var b=this.cloneNode(!0);return a&&e(this,b),b}},!1)},closest:function(a,b){return f.call(this,!1,!1,!0,a,b)},css:function(a,c){var d=typeof c,e="string"==d;if(e||"number"==d){var f=e&&/=/.test(c);if(f)var g=parseInt(c[0]+c.slice(2));return this.each(function(){if(!(this.nodeType>1)){if(f)var d=parseInt(getComputedStyle(this).getPropertyValue(a)),e=d+g;this.style[a]=b(a,f?e:c)}})}if("function"==d)return this.each(function(b){if(!(this.nodeType>1)){var d=getComputedStyle(this).getPropertyValue(a);this.style[a]=c.call(this,b,d)}});if("string"==typeof a){var h=this.get(0);if(!h||h.nodeType>1)return;return getComputedStyle(h).getPropertyValue(a)}if(Array.isArray(a)){var h=this.get(0);if(!h||h.nodeType>1)return;for(var i={},j=getComputedStyle(h),k=a.length,l=0;k>l;l++){var m=a[l];i[m]=j.getPropertyValue(m)}return i}var n=Object.keys(a),o=n.length;return this.each(function(){if(!(this.nodeType>1))for(var c=0;o>c;c++){var d=n[c];this.style[d]=b(d,a[d])}})},detach:function(){return this.map(function(){var a=this.parentElement;if(a)return a.removeChild(this),this},!1)},each:function(a){for(var b=this.dom,c=this.length,d=0;c>d;d++){var e=b[d];a.call(e,d,e)}return this},empty:function(){return this.each(function(){this.innerHTML=""})},eq:function(a){return Sprint(this.get(a))},filter:function(a){var b="function"==typeof a,c=this;return this.map(function(d){return this.nodeType>1||!b&&!c.is(a,this)||b&&!a.call(this,d,this)?void 0:this},!1)},find:function(a){if("string"==typeof a){var b=[];return this.each(function(){if(!(this.nodeType>1))for(var c=x(a,this),d=c.length,e=0;d>e;e++)b.push(c[e])}),Sprint(p(b))}for(var c=a.nodeType?[a]:a.get(),d=c.length,e=[],f=0,g=0;g<this.length;g++){var h=this.get(g);if(!(h.nodeType>1))for(var i=0;d>i;i++){var j=c[i];if(h.contains(j)&&(e[f++]=j,!(d>f)))return Sprint(e)}}return Sprint(e)},first:function(){return this.eq(0)},get:function(a){return null==a?this.dom:(0>a&&(a+=this.length),this.dom[a])},has:function(a){if("string"==typeof a)return this.map(function(){return this.nodeType>1||!x(a,this)[0]?void 0:this},!1);for(var b=[],c=this.length;c--;){var d=this.get(c);if(d.contains(a)){b.push(d);break}}return Sprint(b)},hasClass:function(a){for(var b=this.length;b--;){var c=this.get(b);if(c.nodeType>1)return;if(c.classList.contains(a))return!0}return!1},height:function(a){return j(this,"height",a)},html:function(a){if(null==a){var b=this.get(0);if(!b)return;return b.innerHTML}return this.each("function"==typeof a?function(b){var c=a.call(this,b,this.innerHTML);Sprint(this).html(c)}:function(){this.innerHTML=a})},index:function(a){if(this.length){var b,c;a?"string"==typeof a?(b=this.get(0),c=Sprint(a)):(b=a instanceof C?a.get(0):a,c=this):(b=this.get(0),c=this.first().parent().children());for(var d=c.get(),e=d.length;e--;)if(d[e]==b)return e;return-1}},insertAfter:function(a){return Sprint(a).after(this),this},insertBefore:function(a){return Sprint(a).before(this),this},is:function(a,b){var c=b?[b]:this.get(),d=c.length;if("string"==typeof a){for(var e=0;d>e;e++){var f=c[e];if(!(f.nodeType>1)&&f[o](a))return!0}return!1}if("object"==typeof a){var g;g=a instanceof C?a.get():a.length?a:[a];for(var h=g.length,e=0;d>e;e++)for(var i=0;h>i;i++)if(c[e]===g[i])return!0;return!1}if("function"==typeof a){for(var e=0;d>e;e++)if(a.call(this,e,this))return!0;return!1}},last:function(){return this.eq(-1)},map:function(a,b){null==b&&(b=!0);for(var c=this.get(),d=this.length,e=[],f=0;d>f;f++){var g=c[f],h=a.call(g,f,g);if(b&&Array.isArray(h))for(var i=h.length,j=0;i>j;j++)e.push(h[j]);else e.push(h)}return Sprint(e)},next:function(a){return w(this,"next",a)},nextAll:function(a){return v(this,"next",a)},nextUntil:function(a,b){return v(this,"next",b,a)},not:function(a){var b="function"==typeof a,c=this;return this.map(function(d){if(b){if(a.call(this,d,this))return}else if(c.is(a,this))return;return this},!1)},off:function(a,b){return"object"==typeof a?(Object.keys(a).forEach(function(b){this.off(b,a[b])},this),this):(a&&(a=a.trim().split(" ")),this.each(function(){return h(this)?a?void a.forEach(r(this,b)):void Object.keys(h(this)).forEach(q(this)):void 0}))},offset:function(a){if(!a){var b=this.get(0);if(!b||b.nodeType>1)return;var c=b.getBoundingClientRect();return{top:c.top,left:c.left}}return"object"==typeof a?this.each(function(){if(!(this.nodeType>1)){var b=Sprint(this);"static"==b.css("position")?b.css("position","relative"):b.css({top:0,left:0});var c=b.offset();b.css({top:a.top-c.top+"px",left:a.left-c.left+"px"})}}):"function"==typeof a?this.each(function(b){var c=Sprint(this),d=a.call(this,b,c.offset());c.offset(d)}):void 0},offsetParent:function(){var a=[];return this.each(function(){if(!(this.nodeType>1)){for(var b=this;b!=s;){b=b.parentNode;var c=getComputedStyle(b).getPropertyValue("position");if(!c)break;if("static"!=c)return void a.push(b)}a.push(s)}}),Sprint(a)},on:function(a,b){if(b){var c=a.trim().split(" ");return this.each(function(){h(this)||(this.sprintEventListeners={}),c.forEach(function(a){h(this)[a]||(h(this)[a]=[]),h(this)[a].push(b),this.addEventListener(a,b),m(a)&&this.addEventListener(g(a),b)},this)})}return Object.keys(a).forEach(function(b){this.on(b,a[b])},this),this},parent:function(a){return f.call(this,!0,!0,!1,a)},parents:function(a){return f.call(this,!0,!1,!1,a)},position:function(){var a={first:this.offset(),prt:this.parent().offset()};if(a.first)return{top:a.first.top-a.prt.top,left:a.first.left-a.prt.left}},prop:function(a,b){if("object"==typeof a){var c=Object.keys(a),d=c.length;return this.each(function(){for(var b=0;d>b;b++){var e=c[b];this[e]=a[e]}})}if(null==b){var e=this.get(0);if(!e)return;return e[a]}var f="function"==typeof b;return this.each(function(c){this[a]=f?b.call(this,c,this[a]):b})},prepend:function(){return k.call(this,"afterbegin",arguments),this},prependTo:function(a){return Sprint(k.call(Sprint(a),"afterbegin",[this]))},prev:function(a){return w(this,"previous",a)},prevAll:function(a){return v(this,"previous",a)},prevUntil:function(a,b){return v(this,"previous",b,a)},ready:function(a){return this.dom=[document],this.length=1,this.on("DOMContentLoaded",a)},remove:function(a){var b=this;return this.each(function(){var c=this.parentElement;c&&(!a||b.is(a,this))&&c.removeChild(this)})},removeAttr:function(a){if(a){var b=a.trim().split(" "),c=b.length;this.each(function(){if(!(this.nodeType>1))for(var a=0;c>a;a++)this.removeAttribute(b[a])})}return this},removeClass:function(a){return n.call(this,"remove",a)},removeProp:function(a){return this.each(function(){this[a]=void 0})},replaceAll:function(a){return Sprint(a).replaceWith(this),this},replaceWith:function(a){return"function"==typeof a?this.each(function(b){Sprint(this).replaceWith(a.call(this,b,this))}):this.before(a).remove()},scrollLeft:function(a){return u(this,"scrollLeft",a)},scrollTop:function(a){return u(this,"scrollTop",a)},siblings:function(a){var b=[],c=this;return this.each(function(d,e){Sprint(this).parent().children().each(function(){this==e||a&&!c.is(a,this)||b.push(this)})}),Sprint(b)},size:function(){return this.length},slice:function(a,b){var c=this.get(),d=[],e=a>=0?a:a+this.length,f=this.length;for(0>b?f+=b:b>=0&&(f=b>this.length?this.length:b);f>e;e++)d.push(c[e]);return Sprint(d)},text:function(a){if(null==a){var b=[];return this.each(function(){b.push(this.textContent)}),b.join("")}var c="function"==typeof a;return this.each(function(b){this.textContent=c?a.call(this,b,this.textContent):a})},toggleClass:function(a,b){return n.call(this,"toggle",a,b)},trigger:function(a){if(!window.CustomEvent||"function"!=typeof window.CustomEvent){var b=function(a,b){var c;return b=b||{bubbles:!1,cancelable:!1,detail:void 0},c=document.createEvent("CustomEvent"),c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c};b.prototype=window.Event.prototype,window.CustomEvent=b}return this.each(function(){i(this,a).forEach(function(a){this.dispatchEvent(new b(a,{bubbles:!0,cancelable:!0}))},this)})},unwrap:function(){return this.parent().each(function(){this!=document.body&&this!=s&&Sprint(this).replaceWith(this.childNodes)}),this},val:function(a){if(null==a){var b=this.get(0);if(!b)return;if(b.multiple){var c=[];return this.first().children(":checked").each(function(){c.push(this.value)}),c}return b.value}if(Array.isArray(a)){var d=this;return this.each(function(){return this.multiple?void d.children().each(function(){this.selected=l(this.value,a)}):void(this.checked=l(this.value,a))})}return this.each("function"==typeof a?function(b){Sprint(this).val(a.call(this,b,this.value))}:function(){this.value=a})},width:function(a){return j(this,"width",a)},wrap:function(a){return A.call(this,a)},wrapAll:function(a){return A.call(this,a,"all")},wrapInner:function(a){return A.call(this,a,"inner")}},Sprint=function(a,b){return new C(a,b)},null==window.$&&(window.$=Sprint)}();