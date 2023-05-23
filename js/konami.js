"use strict";

let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
let userEntry = [];

$(document).on("keyup", function(event){
    userEntry.push(event.key);

    if (userEntry.length > konamiCode.length) {
        userEntry.shift()
    }

    $("#keycode").html(userEntry.join(', '));

    if (userEntry.join() === konamiCode.join()) {
        alert("You have added 30 lives!");
    }
});



