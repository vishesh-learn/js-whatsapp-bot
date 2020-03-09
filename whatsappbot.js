// ==UserScript==
// @name         Vatsapp Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a simple Whatsapp Bot that replies with the answer of a mathematical question asked!
// @author       Vishesh
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

var lm, message, ls;

function simulateMouseEvents(element, eventName){ console.log("simulateMouseEvents");
	var mouseEvent = document.createEvent('MouseEvents');

    mouseEvent.initEvent(eventName, true, true);

    element.dispatchEvent(mouseEvent);
}

function targetchat(){
    var target = document.querySelector('._1ZMSM').parentElement.parentElement;console.log(target);
    if(target){
        simulateMouseEvents(target, 'mousedown');
        //clearInterval(sI);
        //console.log("target: "+target);
    }else{
        //console.log(target)
    }
}

function evil(qry, prev){
	qry = qry.replace(/[a-z]/gm, "");
	var result = new Function('return ' + qry)();

	if(result && result != prev){
        console.log("qry: "+qry); console.log("reply: "+result);
		return result;
    }else{
        //console.log("no-reply");
		return false;
    }
}

function m(){//console.log("m");
    var mlist = document.querySelectorAll(".message-in span span");
    var mslist = document.querySelectorAll(".message-out span span");
    //console.log("lsent: "+mslist[mslist.length-1].innerHTML);
    lm = mlist[mlist.length-1].innerHTML;
    ls = mslist[mslist.length-1].innerHTML;


    if(typeof lm == "string" || typeof ls == "string"){
    //clearInterval(mi);
    //console.log("lm: "+lm);

    message = evil(lm, ls);
    //console.log("reply: "+message);

        if(message){
            sB();
            message = "";
        }
    }
    else{console.log("no lm or ls");}
}

function sB(){//console.log("sB");
    while(!messageBox){//console.log("no-messageBox");
    var messageBox = document.querySelector("[contenteditable='true']");
    } //console.log("messageBox");

    var event = document.createEvent("UIEvents");

    if(message){
    messageBox.innerHTML = message;
    }//else{console.log("no message");}

    event.initUIEvent("input", true, true, window, 1);

    messageBox.dispatchEvent(event);

    var sendb = document.querySelector('span[data-icon="send"]');
    //if(sendb) console.log("sendb");
    //else console.log("no-sendb");

    var eventFire = (MyElement, ElementType) => {

        var MyEvent = document.createEvent("MouseEvents");

        MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        MyElement.dispatchEvent(MyEvent);
    };

	eventFire(sendb, 'click');
}


//var sI = setInterval(start, 5000);
//function start(){

var tC = setInterval(targetchat, 1000);


var mi = setInterval(m, 1000);


//}
