"use strict";
$(function() {
    $('.codeup').css('border', '1px solid red')

    $('li').css('font-size', '20px');

    $('h1, p, li').css('background-color', 'yellow');

    let elements = $('h1');
    let text = '';

    for (let i = 0; i < elements.length; i++) {
        text += $(elements[i]).text() + ' ';
    }
    alert(text);


});
