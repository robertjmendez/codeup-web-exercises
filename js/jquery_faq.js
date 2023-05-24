$(function (){
    $('#toggle-link').click(function (event) {
        event.preventDefault();
        $('dd').toggleClass('invisible');
    });

    $('dt').click(function() {
        $(this).toggleClass('highlighted');
    });
});
