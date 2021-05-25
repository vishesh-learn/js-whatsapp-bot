// ==UserScript==
// @name         Vatsapp Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a simple Whatsapp Bot that replies with the answer of a mathematical question asked!
// @author       Vishesh
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

var lastMessageIn, message, lastMessageOut;
const targetClass = '.VOr2j',
messageInSelector = ".message-in span span",
messageOutSelector = ".message-out span span";

function targetchat(){
    var target = document.querySelector(targetClass).parentElement.parentElement;
    if(target){
        simulateMouseEvents(target, 'mousedown');
    } else {
        console.log("no target")
    }
}

function getMessage(){
    var messageInSpanList = document.querySelectorAll(messageInSelector);
    var messageOutSpanList = document.querySelectorAll(messageOutSelector);

    lastMessageIn = messageInSpanList[messageInSpanList.length-1].innerText; //getting last received message
    lastMessageOut = messageOutSpanList[messageOutSpanList.length-1].innerText; //getting last sent message

    if(typeof lastMessageIn == "string" || typeof lastMessageOut == "string"){ //confirm if the message is a string
        if(message = evil(lastMessageIn, lastMessageOut)){
            sendMessage();
        }
    } else {
		console.log("lastMessageIn and lastMessageOut are not string");
	}
}

function sendMessage(){
    while(!messageBox){
    	const messageBox = document.querySelectorAll("[contenteditable='true']")[1];
    }

    messageBox.innerHTML = message;

	simulateUIEvents(messageBox, "input");

    var sendb = document.querySelector('span[data-icon="send"]');

	simulateMouseEvents2(sendb, "click");
	//simulateMouseEvents(sendb, "click");

	message = "";
}

function simulateMouseEvents2(element, eventName){
	var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent(eventName, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(mouseEvent);
}

function simulateMouseEvents(element, eventName){
	var mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initEvent(eventName, true, true);
    element.dispatchEvent(mouseEvent);
}

function evil(lastMessageIn, lastMessageOut){
	lastMessageIn = lastMessageIn.replace(/[a-z]/gm, "");
	var result = new Function('return ' + lastMessageIn)();

	if(result && result != lastMessageOut){
		return result;
    }else{
		return false;
    }
}

function simulateUIEvents(element, eventName){
	var UIEvent = document.createEvent("UIEvents");
    UIEvent.initUIEvent("input", true, true, window, 1);
    element.dispatchEvent(UIEvent);
}

setInterval(targetchat, 1000);
setInterval(getMessage, 1000);
