// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


/**
 * jGestures: a jQuery plugin for gesture events
 * Copyright 2010-2011 Neue Digitale / Razorfish GmbH
 * Copyright 2011-2012, Razorfish GmbH
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @copyright Razorfish GmbH
 * @author martin.krause@razorfish.de
 * @version 0.90-shake
 * @requires jQuery JavaScript Library v1.4.2 - http://jquery.com/- Copyright 2010, John Resig- Dual licensed under the MIT or GPL Version 2 licenses. http://jquery.org/license
 */
(function(c){c.jGestures={};c.jGestures.defaults={};c.jGestures.defaults.thresholdShake={requiredShakes:10,freezeShakes:100,frontback:{sensitivity:10},leftright:{sensitivity:10},updown:{sensitivity:10}};c.jGestures.defaults.thresholdPinchopen=0.05;c.jGestures.defaults.thresholdPinchmove=0.05;c.jGestures.defaults.thresholdPinch=0.05;c.jGestures.defaults.thresholdPinchclose=0.05;c.jGestures.defaults.thresholdRotatecw=5;c.jGestures.defaults.thresholdRotateccw=5;c.jGestures.defaults.thresholdMove=20;c.jGestures.defaults.thresholdSwipe=100;c.jGestures.data={};c.jGestures.data.capableDevicesInUserAgentString=["iPad","iPhone","iPod","Mobile Safari"];c.jGestures.data.hasGestures=(function(){var k;for(k=0;k<c.jGestures.data.capableDevicesInUserAgentString.length;k++){if(navigator.userAgent.indexOf(c.jGestures.data.capableDevicesInUserAgentString[k])!==-1){return true}}return false})();c.hasGestures=c.jGestures.data.hasGestures;c.jGestures.events={touchstart:"jGestures.touchstart",touchendStart:"jGestures.touchend;start",touchendProcessed:"jGestures.touchend;processed",gesturestart:"jGestures.gesturestart",gestureendStart:"jGestures.gestureend;start",gestureendProcessed:"jGestures.gestureend;processed"};jQuery.each({orientationchange_orientationchange01:"orientationchange",gestureend_pinchopen01:"pinchopen",gestureend_pinchclose01:"pinchclose",gestureend_rotatecw01:"rotatecw",gestureend_rotateccw01:"rotateccw",gesturechange_pinch01:"pinch",gesturechange_rotate01:"rotate",touchstart_swipe13:"swipemove",touchstart_swipe01:"swipeone",touchstart_swipe02:"swipetwo",touchstart_swipe03:"swipethree",touchstart_swipe04:"swipefour",touchstart_swipe05:"swipeup",touchstart_swipe06:"swiperightup",touchstart_swipe07:"swiperight",touchstart_swipe08:"swiperightdown",touchstart_swipe09:"swipedown",touchstart_swipe10:"swipeleftdown",touchstart_swipe11:"swipeleft",touchstart_swipe12:"swipeleftup",touchstart_tap01:"tapone",touchstart_tap02:"taptwo",touchstart_tap03:"tapthree",touchstart_tap04:"tapfour",devicemotion_shake01:"shake",devicemotion_shake02:"shakefrontback",devicemotion_shake03:"shakeleftright",devicemotion_shake04:"shakeupdown"},function(l,k){jQuery.event.special[k]={setup:function(){var r=l.split("_");var o=r[0];var m=r[1].slice(0,r[1].length-2);var p=jQuery(this);var q;var n;if(!p.data("ojQueryGestures")||!p.data("ojQueryGestures")[o]){q=p.data("ojQueryGestures")||{};n={};n[o]=true;c.extend(true,q,n);p.data("ojQueryGestures",q);if(c.hasGestures){switch(m){case"orientationchange":p.get(0).addEventListener("orientationchange",a,false);break;case"shake":case"shakefrontback":case"shakeleftright":case"shakeupdown":case"tilt":p.get(0).addEventListener("devicemotion",b,false);break;case"tap":case"swipe":case"swipeup":case"swiperightup":case"swiperight":case"swiperightdown":case"swipedown":case"swipeleftdown":case"swipeleft":p.get(0).addEventListener("touchstart",h,false);break;case"pinchopen":case"pinchclose":case"rotatecw":case"rotateccw":p.get(0).addEventListener("gesturestart",e,false);p.get(0).addEventListener("gestureend",i,false);break;case"pinch":case"rotate":p.get(0).addEventListener("gesturestart",e,false);p.get(0).addEventListener("gesturechange",f,false);break}}else{switch(m){case"tap":case"swipe":p.bind("mousedown",h);break;case"orientationchange":case"pinchopen":case"pinchclose":case"rotatecw":case"rotateccw":case"pinch":case"rotate":case"shake":case"tilt":break}}}return false},add:function(n){var m=jQuery(this);var o=m.data("ojQueryGestures");o[n.type]={originalType:n.type};return false},remove:function(n){var m=jQuery(this);var o=m.data("ojQueryGestures");o[n.type]=false;m.data("ojQueryGestures",o);return false},teardown:function(){var r=l.split("_");var o=r[0];var m=r[1].slice(0,r[1].length-2);var p=jQuery(this);var q;var n;if(!p.data("ojQueryGestures")||!p.data("ojQueryGestures")[o]){q=p.data("ojQueryGestures")||{};n={};n[o]=false;c.extend(true,q,n);p.data("ojQueryGestures",q);if(c.hasGestures){switch(m){case"orientationchange":p.get(0).removeEventListener("orientationchange",a,false);break;case"shake":case"shakefrontback":case"shakeleftright":case"shakeupdown":case"tilt":p.get(0).removeEventListener("devicemotion",b,false);break;case"tap":case"swipe":case"swipeup":case"swiperightup":case"swiperight":case"swiperightdown":case"swipedown":case"swipeleftdown":case"swipeleft":case"swipeleftup":p.get(0).removeEventListener("touchstart",h,false);p.get(0).removeEventListener("touchmove",g,false);p.get(0).removeEventListener("touchend",j,false);break;case"pinchopen":case"pinchclose":case"rotatecw":case"rotateccw":p.get(0).removeEventListener("gesturestart",e,false);p.get(0).removeEventListener("gestureend",i,false);break;case"pinch":case"rotate":p.get(0).removeEventListener("gesturestart",e,false);p.get(0).removeEventListener("gesturechange",f,false);break}}else{switch(m){case"tap":case"swipe":p.unbind("mousedown",h);p.unbind("mousemove",g);p.unbind("mouseup",j);break;case"orientationchange":case"pinchopen":case"pinchclose":case"rotatecw":case"rotateccw":case"pinch":case"rotate":case"shake":case"tilt":break}}}return false}}});function d(k){k.startMove=(k.startMove)?k.startMove:{startX:null,startY:null,timestamp:null};var l=new Date().getTime();var m;var n;if(k.touches){n=[{lastX:k.deltaX,lastY:k.deltaY,moved:null,startX:k.screenX-k.startMove.screenX,startY:k.screenY-k.startMove.screenY}];m={vector:k.vector||null,orientation:window.orientation||null,lastX:((n[0].lastX>0)?+1:((n[0].lastX<0)?-1:0)),lastY:((n[0].lastY>0)?+1:((n[0].lastY<0)?-1:0)),startX:((n[0].startX>0)?+1:((n[0].startX<0)?-1:0)),startY:((n[0].startY>0)?+1:((n[0].startY<0)?-1:0))};n[0].moved=Math.sqrt(Math.pow(Math.abs(n[0].startX),2)+Math.pow(Math.abs(n[0].startY),2))}return{type:k.type||null,originalEvent:k.event||null,delta:n||null,direction:m||{orientation:window.orientation||null,vector:k.vector||null},duration:(k.duration)?k.duration:(k.startMove.timestamp)?l-k.timestamp:null,rotation:k.rotation||null,scale:k.scale||null,description:k.description||[k.type,":",k.touches,":",((n[0].lastX!=0)?((n[0].lastX>0)?"right":"left"):"steady"),":",((n[0].lastY!=0)?((n[0].lastY>0)?"down":"up"):"steady")].join("")}}function a(l){var k=["landscape:clockwise:","portrait:default:","landscape:counterclockwise:","portrait:upsidedown:"];c(window).triggerHandler("orientationchange",{direction:{orientation:window.orientation},description:["orientationchange:",k[((window.orientation/90)+1)],window.orientation].join("")})}function b(r){var k;var t=jQuery(window);var o=t.data("ojQueryGestures");var m=c.jGestures.defaults.thresholdShake;var n=o.oDeviceMotionLastDevicePosition||{accelerationIncludingGravity:{x:0,y:0,z:0},shake:{eventCount:0,intervalsPassed:0,intervalsFreeze:0},shakeleftright:{eventCount:0,intervalsPassed:0,intervalsFreeze:0},shakefrontback:{eventCount:0,intervalsPassed:0,intervalsFreeze:0},shakeupdown:{eventCount:0,intervalsPassed:0,intervalsFreeze:0}};var q={accelerationIncludingGravity:{x:r.accelerationIncludingGravity.x,y:r.accelerationIncludingGravity.y,z:r.accelerationIncludingGravity.z},shake:{eventCount:n.shake.eventCount,intervalsPassed:n.shake.intervalsPassed,intervalsFreeze:n.shake.intervalsFreeze},shakeleftright:{eventCount:n.shakeleftright.eventCount,intervalsPassed:n.shakeleftright.intervalsPassed,intervalsFreeze:n.shakeleftright.intervalsFreeze},shakefrontback:{eventCount:n.shakefrontback.eventCount,intervalsPassed:n.shakefrontback.intervalsPassed,intervalsFreeze:n.shakefrontback.intervalsFreeze},shakeupdown:{eventCount:n.shakeupdown.eventCount,intervalsPassed:n.shakeupdown.intervalsPassed,intervalsFreeze:n.shakeupdown.intervalsFreeze}};var p;var s;var l;for(k in o){switch(k){case"shake":case"shakeleftright":case"shakefrontback":case"shakeupdown":p=[];s=[];p.push(k);if(++q[k].intervalsFreeze>m.freezeShakes&&q[k].intervalsFreeze<(2*m.freezeShakes)){break}q[k].intervalsFreeze=0;q[k].intervalsPassed++;if((k==="shake"||k==="shakeleftright")&&(q.accelerationIncludingGravity.x>m.leftright.sensitivity||q.accelerationIncludingGravity.x<(-1*m.leftright.sensitivity))){p.push("leftright");p.push("x-axis")}if((k==="shake"||k==="shakefrontback")&&(q.accelerationIncludingGravity.y>m.frontback.sensitivity||q.accelerationIncludingGravity.y<(-1*m.frontback.sensitivity))){p.push("frontback");p.push("y-axis")}if((k==="shake"||k==="shakeupdown")&&(q.accelerationIncludingGravity.z+9.81>m.updown.sensitivity||q.accelerationIncludingGravity.z+9.81<(-1*m.updown.sensitivity))){p.push("updown");p.push("z-axis")}if(p.length>1){if(++q[k].eventCount==m.requiredShakes&&(q[k].intervalsPassed)<m.freezeShakes){t.triggerHandler(k,d({type:k,description:p.join(":"),event:r,duration:q[k].intervalsPassed*5}));q[k].eventCount=0;q[k].intervalsPassed=0;q[k].intervalsFreeze=m.freezeShakes+1}else{if(q[k].eventCount==m.requiredShakes&&(q[k].intervalsPassed)>m.freezeShakes){q[k].eventCount=0;q[k].intervalsPassed=0}}}break}l={};l.oDeviceMotionLastDevicePosition=q;t.data("ojQueryGestures",c.extend(true,o,l))}}function h(l){var k=jQuery(l.currentTarget);k.triggerHandler(c.jGestures.events.touchstart,l);if(c.hasGestures){l.currentTarget.addEventListener("touchmove",g,false);l.currentTarget.addEventListener("touchend",j,false)}else{k.bind("mousemove",g);k.bind("mouseup",j)}var n=k.data("ojQueryGestures");var m=(l.touches)?l.touches[0]:l;var o={};o.oLastSwipemove={screenX:m.screenX,screenY:m.screenY,timestamp:new Date().getTime()};o.oStartTouch={screenX:m.screenX,screenY:m.screenY,timestamp:new Date().getTime()};k.data("ojQueryGestures",c.extend(true,n,o))}function g(t){var v=jQuery(t.currentTarget);var s=v.data("ojQueryGestures");var q=!!t.touches;var l=(q)?t.changedTouches[0].screenX:t.screenX;var k=(q)?t.changedTouches[0].screenY:t.screenY;var r=s.oLastSwipemove;var o=l-r.screenX;var n=k-r.screenY;var u;if(!!s.oLastSwipemove){u=d({type:"swipemove",touches:(q)?t.touches.length:"1",screenY:k,screenX:l,deltaY:n,deltaX:o,startMove:r,event:t,timestamp:r.timestamp});v.triggerHandler(u.type,u)}var m={};var p=(t.touches)?t.touches[0]:t;m.oLastSwipemove={screenX:p.screenX,screenY:p.screenY,timestamp:new Date().getTime()};v.data("ojQueryGestures",c.extend(true,s,m))}function j(r){var v=jQuery(r.currentTarget);var x=!!r.changedTouches;var u=(x)?r.changedTouches.length:"1";var p=(x)?r.changedTouches[0].screenX:r.screenX;var o=(x)?r.changedTouches[0].screenY:r.screenY;v.triggerHandler(c.jGestures.events.touchendStart,r);if(c.hasGestures){r.currentTarget.removeEventListener("touchmove",g,false);r.currentTarget.removeEventListener("touchend",j,false)}else{v.unbind("mousemove",g);v.unbind("mouseup",j)}var m=v.data("ojQueryGestures");var y=(Math.abs(m.oStartTouch.screenX-p)>c.jGestures.defaults.thresholdMove||Math.abs(m.oStartTouch.screenY-o)>c.jGestures.defaults.thresholdMove)?true:false;var B=(Math.abs(m.oStartTouch.screenX-p)>c.jGestures.defaults.thresholdSwipe||Math.abs(m.oStartTouch.screenY-o)>c.jGestures.defaults.thresholdSwipe)?true:false;var A;var t;var n;var l;var k;var q;var w=["zero","one","two","three","four"];var s;for(A in m){t=m.oStartTouch;n={};p=(x)?r.changedTouches[0].screenX:r.screenX;o=(x)?r.changedTouches[0].screenY:r.screenY;l=p-t.screenX;k=o-t.screenY;q=d({type:"swipe",touches:u,screenY:o,screenX:p,deltaY:k,deltaX:l,startMove:t,event:r,timestamp:t.timestamp});s=false;switch(A){case"swipeone":if(x===false&&u==1&&y===false){break}if(x===false||(u==1&&y===true&&B===true)){s=true;q.type=["swipe",w[u]].join("");v.triggerHandler(q.type,q)}break;case"swipetwo":if((x&&u==2&&y===true&&B===true)){s=true;q.type=["swipe",w[u]].join("");v.triggerHandler(q.type,q)}break;case"swipethree":if((x&&u==3&&y===true&&B===true)){s=true;q.type=["swipe",w[u]].join("");v.triggerHandler(q.type,q)}break;case"swipefour":if((x&&u==4&&y===true&&B===true)){s=true;q.type=["swipe",w[u]].join("");v.triggerHandler(q.type,q)}break;case"swipeup":case"swiperightup":case"swiperight":case"swiperightdown":case"swipedown":case"swipeleftdown":case"swipeleft":case"swipeleftup":if(x&&y===true&&B===true){s=true;q.type=["swipe",((q.delta[0].lastX!=0)?((q.delta[0].lastX>0)?"right":"left"):""),((q.delta[0].lastY!=0)?((q.delta[0].lastY>0)?"down":"up"):"")].join("");v.triggerHandler(q.type,q)}break;case"tapone":case"taptwo":case"tapthree":case"tapfour":if((y!==true&&s!==true)&&(w[u]==A.slice(3))){q.description=["tap",w[u]].join("");q.type=["tap",w[u]].join("");v.triggerHandler(q.type,q)}break}var z={};v.data("ojQueryGestures",c.extend(true,m,z));v.data("ojQueryGestures",c.extend(true,m,z))}v.triggerHandler(c.jGestures.events.touchendProcessed,r)}function e(l){var k=jQuery(l.currentTarget);k.triggerHandler(c.jGestures.events.gesturestart,l);var m=k.data("ojQueryGestures");var n={};n.oStartTouch={timestamp:new Date().getTime()};k.data("ojQueryGestures",c.extend(true,m,n))}function f(l){var k=jQuery(l.currentTarget);var p,m,r,o;var q=k.data("ojQueryGestures");var n;for(n in q){switch(n){case"pinch":p=l.scale;if(((p<1)&&(p%1)<(1-c.jGestures.defaults.thresholdPinchclose))||((p>1)&&(p%1)>(c.jGestures.defaults.thresholdPinchopen))){m=(p<1)?-1:+1;o=d({type:"pinch",scale:p,touches:null,startMove:q.oStartTouch,event:l,timestamp:q.oStartTouch.timestamp,vector:m,description:["pinch:",m,":",((p<1)?"close":"open")].join("")});k.triggerHandler(o.type,o)}break;case"rotate":p=l.rotation;if(((p<1)&&(-1*(p)>c.jGestures.defaults.thresholdRotateccw))||((p>1)&&(p>c.jGestures.defaults.thresholdRotatecw))){m=(p<1)?-1:+1;o=d({type:"rotate",rotation:p,touches:null,startMove:q.oStartTouch,event:l,timestamp:q.oStartTouch.timestamp,vector:m,description:["rotate:",m,":",((p<1)?"counterclockwise":"clockwise")].join("")});k.triggerHandler(o.type,o)}break}}}function i(l){var k=jQuery(l.currentTarget);k.triggerHandler(c.jGestures.events.gestureendStart,l);var n;var o=k.data("ojQueryGestures");var m;for(m in o){switch(m){case"pinchclose":n=l.scale;if((n<1)&&(n%1)<(1-c.jGestures.defaults.thresholdPinchclose)){k.triggerHandler("pinchclose",d({type:"pinchclose",scale:n,vector:-1,touches:null,startMove:o.oStartTouch,event:l,timestamp:o.oStartTouch.timestamp,description:"pinch:-1:close"}))}break;case"pinchopen":n=l.scale;if((n>1)&&(n%1)>(c.jGestures.defaults.thresholdPinchopen)){k.triggerHandler("pinchopen",d({type:"pinchopen",scale:n,vector:+1,touches:null,startMove:o.oStartTouch,event:l,timestamp:o.oStartTouch.timestamp,description:"pinch:+1:open"}))}break;case"rotatecw":n=l.rotation;if((n>1)&&(n>c.jGestures.defaults.thresholdRotatecw)){k.triggerHandler("rotatecw",d({type:"rotatecw",rotation:n,vector:+1,touches:null,startMove:o.oStartTouch,event:l,timestamp:o.oStartTouch.timestamp,description:"rotate:+1:clockwise"}))}break;case"rotateccw":n=l.rotation;if((n<1)&&(-1*(n)>c.jGestures.defaults.thresholdRotateccw)){k.triggerHandler("rotateccw",d({type:"rotateccw",rotation:n,vector:-1,touches:null,startMove:o.oStartTouch,event:l,timestamp:o.oStartTouch.timestamp,description:"rotate:-1:counterclockwise"}))}break}}k.triggerHandler(c.jGestures.events.gestureendProcessed,l)}})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2001 Robert Penner
 * All rights reserved.
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Ã‚Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});



/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 4/09/2012
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.3.1
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};
	
	$scrollTo._the_scrollable_element = false;

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );
		
		$scrollTo._the_scrollable_element = this._scrollable();

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.stop(true, false).animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );