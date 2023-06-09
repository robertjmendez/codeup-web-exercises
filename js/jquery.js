"use strict";
$(document).ready(function() {
    // First part of the exercise

    // $('.codeup').css('border', '1px solid red')
    //
    // $('li').css('font-size', '20px');
    //
    // $('h1, p, li').css('background-color', 'yellow');
    //
    // let elements = $('h1');
    // let text = '';
    //
    // for (let i = 0; i < elements.length; i++) {
    //     text += $(elements[i]).text() + ' ';
    // }
    // alert(text);

        // Second part of the exercise

        // Change the background color of an h1 element when clicked
        $('h1').click(function() {
            $(this).css('background-color', 'lightblue');
        });

        // Make all paragraphs have a font size of 18px when they are double clicked
        $('p').dblclick(function() {
            $(this).css('font-size', '18px');
        });

        // Set all li text color to red when the mouse is hovering; reset to black when it is not.
        $('li').hover(
            function() {
                $(this).css('color', 'red');
            }, function() {
                $(this).css('color', 'black');
            }
        );
    });

