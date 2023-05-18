$(function(){
function fadeButtons(){
    $('nav a , footer a, button').mouseover(function(){
        $(this).fadeTo(150, .3);
    }); 
    $('nav a, footer a, button').mouseout(function(){
        $(this).fadeTo(150, 1);
    });  
    $('nav a, footer a, button').click(function(){
        $(this).fadeTo(0, 1);
    });    
}
fadeButtons();
});