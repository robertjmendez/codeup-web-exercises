$(function (){
    // Exercise 1
    $('#toggle-link').click(function (event) {
        event.preventDefault();
        $('dd').toggleClass('invisible');
    });

    $('dt').click(function() {
        $(this).toggleClass('highlighted');
    });

    // Exercise 2
    $('#button').click(function() {
        $('ul').each(function() {
            $(this).find('li').last().css('background-color', '#FF0');
        });
    });

    $('h3').click(function (){
        $(this).nextUntil('h3').css('font-weight', 'bold');
    });

    $('li').click(function() {
        $(this).parent().find('li:first').css('color', 'blue');
    });
});
