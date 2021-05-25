// ==UserScript==
// @name         Vatsapp Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a simple Whatsapp Bot that replies with the answer of a mathematical question asked!
// @author       Vishesh
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

var lastMessageIn, message, lastMessageOut, targetClass = '.VOr2j', messageInSelector = ".message-in span span", messageOutSelector = ".message-out span span";

function simulateMouseEvents(element, eventName){ console.log("13: simulateMouseEvents");
	var mouseEvent = document.createEvent('MouseEvents');

    mouseEvent.initEvent(eventName, true, true);

    element.dispatchEvent(mouseEvent);
}

function targetchat(){
    var target = document.querySelector(targetClass).parentElement.parentElement;
    if(target){
        simulateMouseEvents(target, 'mousedown');
        //clearInterval(sI);
    }else{
        console.log("no target")
    }
}

function evil(qry, prev){
	qry = qry.replace(/[a-z]/gm, "");
	var result = new Function('return ' + qry)();

	if(result && result != prev){
		return result;
    }else{
		return false;
    }
}

function getMessage(){
    var messageInSpanList = document.querySelectorAll(messageInSelector);
    var messageOutSpanList = document.querySelectorAll(messageOutSelector);

    lastMessageIn = messageInSpanList[messageInSpanList.length-1].innerText;
    lastMessageOut = messageOutSpanList[messageOutSpanList.length-1].innerText;


    if(typeof lastMessageIn == "string" || typeof lastMessageOut == "string"){
        if(message = evil(lastMessageIn, lastMessageOut)){
            sendMessage();
            message = "";
        }
    }
    else{console.log("no lastMessageIn or lastMessageOut");}
}

function sendMessage(){
    while(!messageBox){
    	const messageBox = document.querySelectorAll("[contenteditable='true']")[1];
    }

    var event = document.createEvent("UIEvents");

    if(message){
    	messageBox.innerHTML = message;
    } else {
		console.log("no message");
	}

    event.initUIEvent("input", true, true, window, 1);
    messageBox.dispatchEvent(event);

    var sendb = document.querySelector('span[data-icon="send"]');

    const eventFire = (MyElement, ElementType) => {
        const MyEvent = document.createEvent("MouseEvents");
        MyEvent.initMouseEvent(ElementType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        MyElement.dispatchEvent(MyEvent);
    };

	eventFire(sendb, 'click');
}

setInterval(targetchat, 1000);
setInterval(getMessage, 1000);
