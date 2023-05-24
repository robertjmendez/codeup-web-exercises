"use strict";

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
let userEntry = [];
let codeEntered = false;

$(document).on("keyup", function(event){
    if (codeEntered) {
        return;
    }
    userEntry.push(event.key);

    if (userEntry.length > konamiCode.length) {
        userEntry.shift()
    }

    if (userEntry.join() === konamiCode.join()) {
        codeEntered = true;
        $('h1').text('Immortality Unlocked!');
        let newParagraph = $("<p>You have added 30 lives!</p>");
        newParagraph.addClass("lives-added");
        $('.screen').append(newParagraph);
        $('body').addClass('gradient-animate');
    }
});

$(document).keydown(function(event) {
    switch(event.key) {
        case 'ArrowUp':
            // light up the Up button
            $('#up-button').addClass('lit');
            break;
        case 'ArrowDown':
            // light up the Down button
            $('#down-button').addClass('lit');
            break;
        case 'ArrowLeft':
            // light up the Left button
            $('#left-button').addClass('lit');
            break;
        case 'ArrowRight':
            // light up the Right button
            $('#right-button').addClass('lit');
            break;
        case 'b':
            // light up the B button
            $('#b-button').addClass('lit');
            break;
        case 'a':
            // light up the A button
            $('#a-button').addClass('lit');
            break;
        case 'Enter':
            // light up the A button
            $('#enter-button').addClass('lit');
            break;
    }
});

$(document).keyup(function(event) {
    switch(event.key) {
        case 'ArrowUp':
            // turn off the Up button
            $('#up-button').removeClass('lit');
            break;
        case 'ArrowDown':
            // turn off the Down button
            $('#down-button').removeClass('lit');
            break;
        case 'ArrowLeft':
            // turn off the Left button
            $('#left-button').removeClass('lit');
            break;
        case 'ArrowRight':
            // turn off the Right button
            $('#right-button').removeClass('lit');
            break;
        case 'b':
            // turn off the B button
            $('#b-button').removeClass('lit');
            break;
        case 'a':
            // turn off the A button
            $('#a-button').removeClass('lit');
            break;
        case 'Enter':
            // light up the Enter button
            $('#enter-button').removeClass('lit');
            break;
    }
});




