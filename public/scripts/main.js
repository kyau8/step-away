"use strict";

/* Credits to https://codepen.io/jackarmley/pen/WvGJPB for the text typing js */

var words = ["Maybe it's time to step away.", "It's ok to turn your screen off.", 'Take a breather.', 'Click the button below to check out all the other activities waiting for you.'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 5,
    speed = 100;

var wordflick = function wordflick() {
    setInterval(function () {
        if (forwards) {
            if (offset >= words[i].length) {
                ++skip_count;
                if (skip_count == skip_delay) {
                    forwards = false;
                    skip_count = 0;
                }
            }
        } else {
            if (offset == 0) {
                forwards = true;
                i++;
                offset = 0;
                if (i >= len) {
                    i = 0;
                }
            }
        }
        part = words[i].substr(0, offset);
        if (skip_count == 0) {
            if (forwards) {
                offset++;
            } else {
                offset--;
            }
        }
        $('.word').text(part);
    }, speed);
};

$(document).ready(function () {
    wordflick();
});

// An object that stores the functionality of the app
var suggestions = {};

// An array to store all the data options
suggestions.dataArray = ['Re-read a favourite book', 'Take a cat nap', 'Cook something new', 'Bake a pie', 'Clean your desk', 'Clean out your closet', 'Take a walk', 'Plant some flowers', 'Play in the snow', 'Go skating', 'Ride your bike', 'Visit the library', 'Make your bed', 'Write', 'Sketch', 'Read some poetry', 'Learn to knit', 'Visit a local bookstore', 'Organize your shoe closet', 'Visit a new restaurant', 'Stand up and stretch', 'Play a musical instrument', 'Clean out your fridge', 'Go swimming', 'Take a bubble bath', 'Throw some pottery', 'Sew a loose button', 'Try a new sport', 'Go to the gym', 'Go rock climbing', 'Go for a hike', 'Reorganize your bookshelf', 'Touch your toes (or try!)', 'Write a letter', 'Call an old friend', 'Read a new book', 'Grab some friends and play a board game', 'Build a pillow fort', 'Decorate cupcakes'];

// A function that generates a random whole number
suggestions.random = function () {
    var ranNum = Math.floor(Math.random() * 39);
    return ranNum;
};

suggestions.firstNum = function () {
    suggestions.oneNum = suggestions.random();
    return suggestions.oneNum;
};

suggestions.secondNum = function () {
    suggestions.twoNum = suggestions.random();
    return suggestions.twoNum;
};

// A function that continues to randomize the number until the two are different 
suggestions.checkNum = function () {
    var numOne = suggestions.firstNum();
    var numTwo = suggestions.secondNum();
    while (numOne === numTwo) {
        suggestions.firstNum();
    }
    return suggestions.firstNum();
};

suggestions.options = function () {
    var firstSug = suggestions.dataArray[suggestions.checkNum()];
    var secondSug = suggestions.dataArray[suggestions.secondNum()];
    document.getElementById('one').innerHTML = "<h3>" + firstSug + "</h3>";
    document.getElementById('two').innerHTML = "<h3>" + secondSug + "</h3>";
};

suggestions.runFunctions = function (e) {
    suggestions.checkNum();
    suggestions.options();
    $(".suggestionBox").css("visibility", "visible");
};

// A function to return the two options on submit of the button 
suggestions.submit = function () {
    var button = document.getElementById('submit');
    button.onclick = suggestions.runFunctions;
};

suggestions.init = function () {
    suggestions.submit();
};

$(function () {
    suggestions.init();
});