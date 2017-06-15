/**
 * pulltorefresh-h5-iscroll - 一款基于IScroll5的H5下拉刷新实现，包括多种皮肤的实现
 * @version v3.0.0
 * @author 
 */
!function(t){!function(){t.uuid=function(t,o){var n,i="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),e=[];if(o=o||i.length,t)for(n=0;n<t;n++)e[n]=i[0|Math.random()*o];else{var s;for(e[8]=e[13]=e[18]=e[23]="-",e[14]="4",n=0;n<36;n++)e[n]||(s=0|16*Math.random(),e[n]=i[19==n?3&s|8:s])}return e.join("")},t.noop=function(){},t.extend=function(){var o,n,i,e,s,l,r=arguments[0]||{},a=1,c=arguments.length,h=!1;for("boolean"==typeof r&&(h=r,r=arguments[a]||{},a++),"object"==typeof r||t.isFunction(r)||(r={}),a===c&&(r=this,a--);a<c;a++)if(null!=(o=arguments[a]))for(n in o)i=r[n],e=o[n],r!==e&&(h&&e&&(t.isPlainObject(e)||(s=t.isArray(e)))?(s?(s=!1,l=i&&t.isArray(i)?i:[]):l=i&&t.isPlainObject(i)?i:{},r[n]=t.extend(h,l,e)):void 0!==e&&(r[n]=e));return r},t.isFunction=function(o){return"function"===t.type(o)},t.isPlainObject=function(o){return t.isObject(o)&&!t.isWindow(o)&&Object.getPrototypeOf(o)===Object.prototype},t.isArray=Array.isArray||function(t){return t instanceof Array},t.isWindow=function(t){return null!=t&&t===t.window},t.isObject=function(o){return"object"===t.type(o)},t.type=function(t){return null==t?String(t):o[{}.toString.call(t)]||"object"},t.each=function(t,o,n){if(!t)return this;if("number"==typeof t.length)[].every.call(t,function(t,n){return o.call(t,n,t)!==!1});else for(var i in t)if(n){if(t.hasOwnProperty(i)&&o.call(t[i],i,t[i])===!1)return t}else if(o.call(t[i],i,t[i])===!1)return t;return this};var o={};t.each(["Boolean","Number","String","Function","Array","Date","RegExp","Object","Error"],function(t,n){o["[object "+n+"]"]=n.toLowerCase()}),function(){function o(o){this.os={},this.os.name="browser";var n=[function(){var t=o.match(/(Android);?[\s\/]+([\d.]+)?/);return t&&(this.os.android=!0,this.os.version=t[2],this.os.isBadAndroid=!/Chrome\/\d/.test(window.navigator.appVersion),this.os.name+="_Android",this.os.name+="_mobile"),this.os.android===!0},function(){var t=o.match(/(iPhone\sOS)\s([\d_]+)/);if(t)this.os.ios=this.os.iphone=!0,this.os.version=t[2].replace(/_/g,"."),this.os.name+="_iphone",this.os.name+="_mobile";else{var n=o.match(/(iPad).*OS\s([\d_]+)/);n&&(this.os.ios=this.os.ipad=!0,this.os.version=n[2].replace(/_/g,"."),this.os.name+="_iOS",this.os.name+="_mobile")}return this.os.ios===!0}];[].every.call(n,function(o){return!o.call(t)})}o.call(t,navigator.userAgent)}(),function(){function o(t){this.os=this.os||{};var o=t.match(/EpointEJS/i);o&&(this.os.ejs=!0,this.os.name+="_ejs");var n=t.match(/DingTalk/i);n&&(this.os.dd=!0,this.os.name+="_dd")}o.call(t,navigator.userAgent)}()}(),function(){var o=!1,n=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/,i=function(){};i.extend=function(t){function i(){!o&&this.init&&this.init.apply(this,arguments)}var e=this.prototype;o=!0;var s=new this;o=!1;for(var l in t)s[l]="function"==typeof t[l]&&"function"==typeof e[l]&&n.test(t[l])?function(t,o){return function(){var n=this._super;this._super=e[t];var i=o.apply(this,arguments);return this._super=n,i}}(l,t[l]):t[l];return i.prototype=s,i.prototype.constructor=i,i.extend=this.extend,i},t.Clazz=i}(),function(){var o={generateGlobalObj:function(t,n,i){var e=[].slice.call(arguments);if("string"==typeof e[0]&&(n=e[0],t=window.PullToRefreshTools,i=e[1]),n){var s=n.split("."),l=s.length,t=o.getNameSpaceObj(t,s,l-1);t[s[l-1]]=i}},getNameSpaceObj:function(t,o,n){for(var i=t,e=0;e<n;e++){var s=o[e];i[s]=i[s]||{},i=i[s]}return i}};t.namespace=o.generateGlobalObj}(),"undefined"!=typeof module&&module.exports?module.exports=t:"function"==typeof define&&(define.amd||define.cmd)&&define(function(){return t}),window.PullToRefreshTools=t}({}),function(t,o){var n={down:{height:75,callback:o.noop},up:{offset:100,isFastLoading:!1,callback:o.noop},scroll:{bounceTime:500,successAnimationTime:500,eventPassthrough:!1},element:"#pullrefresh"},i=o.Clazz.extend({init:function(t,i){"object"!=typeof t||t instanceof HTMLElement?this.element=t:(i=t,this.element=i.element),this.element=this.element||n.element,"string"==typeof this.element&&(this.element=document.querySelector(this.element)),this.options=o.extend(!0,{},n,i),this.wrapper=this.element,this.scrollWrap=this.element.children[0],this.scroller=new IScroll(this.element,{probeType:2,tap:!1,mouseWheel:!0,eventPassthrough:this.options.scroll.eventPassthrough}),this._initParams(),this._initPullToRefreshTipsHook&&this._initPullToRefreshTipsHook(this.enablePullDown,this.enablePullUp),this._initEvent(),i.down&&i.down.auto?this.pulldownLoading():i.up&&i.up.auto&&this.pullupLoading()},_initParams:function(){this.enablePullDown=!!this.options.down,this.enablePullUp=!!this.options.up,this.finished=!1,this.offsetY=this.offsetY||0,this.topHeiht=this.options.down&&this.options.down.height?this.options.down.height:0},_initEvent:function(){var t=this;this.scroller.on("scrollStart",function(){t._handleScrollStart(this)}),this.scroller.on("scroll",function(){t._handleScroll(this)}),this.scroller.on("touchEnd",function(){t._handleTouchEnd(this)});var t=this;this.scroller.on("scrollEnd",function(){t._handleScrollEnd(this)}),this.scroller.on("refresh",function(){t.scroller.hasVerticalScroll=!0,0==t.scroller.maxScrollY&&(t.scroller.maxScrollY=-t.offsetY)}),this.refresh()},_handleScrollStart:function(t){this.allowPullDownLoading=!1,this.startY=t.y,this.startX=t.x,this.lastY=t.y;var o=(new Date).getTime();this.startTime=o,this.pulldown=!1},_handleScroll:function(t){if(!this._isFastScroll()){var o=Math.abs(t.x-this.startX),n=Math.abs(t.y-this.startY),i=t.y+this.offsetY;if(this.lastY=t.y,!(Math.abs(t.distX)>Math.abs(t.distY))&&n>5&&n>o&&!this.loading&&!this.allowPullDownSuccessLoading){var e=this.options.down&&this.options.down.height?this.options.down.height:0;this.enablePullDown&&(!this.pulldown&&!this.loading&&t.directionY==-1&&t.y+this.offsetY>=0&&(this.pulldown=!0),t.y+this.offsetY>=e&&t.directionY==-1?this.loading||(this.allowPullDownLoading=!0):t.y+this.offsetY<e&&t.y+this.offsetY>=0&&1===t.directionY&&(this.allowPullDownLoading=!1),this.pulldown&&this._pullingHook&&this._pullingHook(i,e)),this.enablePullUp&&this.options.up&&t.y-this.offsetY-this.options.up.offset<=this.scroller.maxScrollY-e&&1==t.directionY&&this._scrollbottom()}}},_setOffsetY:function(t,o){var n=this;n.offsetY=t||0,n.scroller.minScrollY=-t,n.scroller.scrollTo(0,-n.offsetY),o&&o()},_handleTouchEnd:function(t){var o=this;o.allowPullDownLoading?o.pulldownLoading(void 0,o.options.scroll.bounceTime):o.enablePullDown&&o._pulldownLoaingAnimationEndHook&&o._pulldownLoaingAnimationEndHook()},_handleScrollEnd:function(t){var o=this,n=o.options.down&&o.options.down.height?o.options.down.height:0;o._scrollEndHook&&o._scrollEndHook(),o.enablePullUp&&o.options.up&&!o.loading&&o.options.up.isFastLoading&&t.y-o.offsetY-o.options.up.offset<=o.scroller.maxScrollY-n&&o._scrollbottom()},_isFastScroll:function(){var t=!1,o=(new Date).getTime(),n=o-this.startTime;return t=!(n>100)},_scrollbottom:function(){this.enablePullUp&&!this.finished&&(this.loading||(this.pulldown=!1,this.pullupLoading()))},_endPulldownToRefresh:function(t){var o=this;if(this.options.down&&o.loading){o.allowPullDownLoading=!1,o.loading=!1,o.allowPullDownSuccessLoading=!0;var n;o._pulldownLoaingAnimationSuccessHook&&o._pulldownLoaingAnimationSuccessHook(function(){n&&clearTimeout(n),o.allowPullDownSuccessLoading=!1,o._checkPullDownLoadingEnd()},t),n=setTimeout(function(){n&&clearTimeout(n),o.allowPullDownSuccessLoading=!1,o._checkPullDownLoadingEnd()},o.options.scroll.successAnimationTime)}},_checkPullDownLoadingEnd:function(){var t=this;t.allowPullDownSuccessLoading||(t._pulldownLoaingAnimationEndHook&&t._pulldownLoaingAnimationEndHook(),t.scroller.scrollTo(0,-t.offsetY,t.options.scroll.bounceTime),setTimeout(function(){t.scroller.minScrollY=-t.offsetY,t.scroller.refresh()},t.options.scroll.bounceTime))},_endPullupToRefresh:function(t){var o=this;o.pulldown||(o.loading=!1,o.scroller.refresh(),t&&(o.finished=!0),o._pullupLoaingAnimationSuccessHook&&o._pullupLoaingAnimationSuccessHook(t))},pulldownLoading:function(t,o){var n=this;this.options.down&&(n.loading||("undefined"==typeof t&&(t=this.options.down.height-this.offsetY),n.scroller.minScrollY=n.topHeiht-n.offsetY,setTimeout(function(){n.scroller.scrollTo(0,t,o||0),n._pulldownLoaingAnimationHook&&n._pulldownLoaingAnimationHook(),n.loading=!0;var i=n.options.down.callback;i&&i.call(n)},0)))},pullupLoading:function(t,o,n){if(this.enablePullUp&&this.options.up){if(this.finished&&this.refresh(!0),o=o||0,this.loading)return;this.scroller.scrollTo(o,this.scroller.maxScrollY,n),this.pulldown=!1,this._pullupLoaingAnimationHook&&this._pullupLoaingAnimationHook(!1),this.loading=!0,t=t||this.options.up.callback,t&&t.call(this)}},disablePullupToRefresh:function(){this.enablePullUp=!1,this._disablePullUpHook&&this._disablePullUpHook()},enablePullupToRefresh:function(){this.enablePullUp=!0,this._enablePullUpHook&&this._enablePullUpHook()},refresh:function(t){t&&this.finished&&(this.enablePullupToRefresh(),this.finished=!1),this.scroller.refresh()},resetLoadingState:function(t,o,n){t&&this._endPulldownToRefresh(n),o?this._endPullupToRefresh(!0):this._endPullupToRefresh(!1)},endPullDownToRefresh:function(t){null==t&&(t=!0),this.resetLoadingState(!0,!1,t)},endPullUpToRefresh:function(t,o){null==o&&(o=!0),this.resetLoadingState(!1,t,o)},setSuccessTips:function(t){this.successTips=t}});t.PullToRefresh=i,o.namespace("core",t.PullToRefresh)}({},PullToRefreshTools),function(t,o){var n="mui-",i=n+"pull-top-pocket",e=n+"pull-bottom-pocket",s=n+"pull",l=n+"pull-loading",r=n+"pull-caption",a=n+"pull-caption-down",c=n+"pull-caption-refresh",h=n+"pull-caption-nomore",u=n+"icon",p=n+"spinner",d=n+"icon-pulldown",f=n+"icon-checkmarkempty",m=n+"icon-info",w=n+"block",b=n+"hidden",g=n+"visibility",k=l+" "+u+" "+d,P=l+" "+u+" "+d,_=l+" "+u+" "+p,T=l+" "+u+" "+f,y=l+" "+u+" "+m,v=['<div class="'+s+'">','<div class="{icon}"></div>','<div class="'+r+'">{contentrefresh}</div>',"</div>"].join(""),L={down:{height:75,contentdown:"下拉可以刷新",contentover:"释放立即刷新",contentrefresh:"正在刷新",contentrefreshsuccess:"刷新成功",contentrefresherror:"刷新失败",isSuccessTips:!0,callback:o.noop},up:{auto:!1,offset:100,contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了",callback:o.noop},scroll:{bounceTime:500,successAnimationTime:500},element:"#pullrefresh"},S=o.core.extend({_initPullToRefreshTipsHook:function(t,o){this._initPocket(),o||this.bottomPocket&&this.bottomPocket.classList.add(b),t||this.topPocket&&this.topPocket.classList.add(b)},_initPulldownRefreshState:function(){this.pullPocket=this.topPocket,this.pullPocket.classList.add(w),this.pullPocket.classList.add(g),this.pullCaption=this.topCaption,this.pullLoading=this.topLoading},_initPullupRefreshState:function(){this.pullPocket=this.bottomPocket,this.pullPocket.classList.add(w),this.pullPocket.classList.add(g),this.pullCaption=this.bottomCaption,this.pullLoading=this.bottomLoading},_pullingHook:function(t,o){t>=o?this._setCaption(!0,this.options.down.contentover):t<o&&this._setCaption(!0,this.options.down.contentdown)},_pulldownLoaingAnimationHook:function(){this._setCaption(!0,this.options.down.contentrefresh)},_pulldownLoaingAnimationSuccessHook:function(t,o){this.options.down.isSuccessTips?this._setCaption(!0,o?this.options.down.contentrefreshsuccess:this.options.down.contentrefresherror):t()},_pulldownLoaingAnimationEndHook:function(){this._setCaption(!0,this.options.down.contentdown,!0),this.topPocket.classList.remove(g)},_pullupLoaingAnimationHook:function(t){this.options.up&&this._setCaption(!1,this.options.up.contentrefresh)},_pullupLoaingAnimationSuccessHook:function(t){this.options.up&&(t?this._setCaption(!1,this.options.up.contentnomore):this._setCaption(!1,this.options.up.contentdown))},_disablePullUpHook:function(){this.bottomPocket.className="mui-pull-bottom-pocket "+b},_enablePullUpHook:function(){this.options.up&&(this.bottomPocket.classList.remove(b),this._setCaption(!1,this.options.up.contentdown))},_createPocket:function(t,o,n){var i=document.createElement("div");return i.className=t,i.innerHTML=v.replace("{contentrefresh}",o.contentinit).replace("{icon}",n),i},_initPocket:function(){var t=this.options;t.down&&t.down.hasOwnProperty("callback")&&(this.topPocket=this.wrapper.querySelector("."+i),this.topPocket||(this.topPocket=this._createPocket(i,t.down,P),this.wrapper.insertBefore(this.topPocket,this.wrapper.firstChild)),this.topLoading=this.topPocket.querySelector("."+l),this.topCaption=this.topPocket.querySelector("."+r)),t.up&&t.up.hasOwnProperty("callback")&&(this.bottomPocket=this.scrollWrap.querySelector("."+e),this.bottomPocket||(this.bottomPocket=this._createPocket(e,t.up,_),this.scrollWrap.appendChild(this.bottomPocket)),this.bottomLoading=this.bottomPocket.querySelector("."+l),this.bottomCaption=this.bottomPocket.querySelector("."+r))},_setCaptionClass:function(t,o,n){if(this.options.up&&!t)switch(n){case this.options.up.contentdown:o.className=r+" "+a;break;case this.options.up.contentrefresh:o.className=r+" "+c;break;case this.options.up.contentnomore:o.className=r+" "+h}},_setCaption:function(t,o,n){if(!this.loading){t?this._initPulldownRefreshState():this._initPullupRefreshState();var i=this.options,e=this.pullPocket,s=this.pullCaption,l=this.pullLoading,t=this.pulldown,r=this;e&&(n?setTimeout(function(){s.innerHTML=r.lastTitle=o,t?l.className=P:(r._setCaptionClass(!1,s,o),l.className=_),l.style.webkitAnimation="",l.style.webkitTransition="",l.style.webkitTransform=""},100):o!==this.lastTitle&&(s.innerHTML=o,t?o===i.down.contentrefresh?(l.className=_,l.style.webkitAnimation="spinner-spin 1s step-end infinite"):o===i.down.contentover?(l.className=k,l.style.webkitTransition="-webkit-transform 0.3s ease-in",l.style.webkitTransform="rotate(180deg)"):o===i.down.contentdown?(l.className=P,l.style.webkitTransition="-webkit-transform 0.3s ease-in",l.style.webkitTransform="rotate(0deg)"):o===i.down.contentrefreshsuccess?(l.className=T,l.style.webkitTransition="-webkit-transform 0.3s ease-in",l.style.webkitTransform="scale(1.2,1.2)",l.style.webkitAnimation="none",s.innerHTML=r.successTips||o):o===i.down.contentrefresherror&&(l.className=y,l.style.webkitTransition="-webkit-transform 0.3s ease-in",l.style.webkitTransform="scale(1.2,1.2)",l.style.webkitAnimation="none"):i.up&&(o===i.up.contentrefresh?l.className=_+" "+g:l.className=_+" "+b,r._setCaptionClass(!1,s,o)),this.lastTitle=o))}}});t.initPullToRefresh=function(t,n){return"string"==typeof t||t instanceof HTMLElement||(n=t,t=n.element),n=o.extend(!0,{},L,n),new S(t,n)},t.init=t.initPullToRefresh,o.namespace("skin.defaults",t)}({},PullToRefreshTools);