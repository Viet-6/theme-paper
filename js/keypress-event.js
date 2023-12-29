var twice_16 = 0;

$(document).on('keyup', function( e ){
    
  if(e.which===16){         // shift   

    if(twice_16===1){       // (remember that twice_16 is 0 initially)
      $('#search_form').removeAttr('close', '');
      $('#search_form').attr('open', '');
      $('#search_form').one('animationend', function () {
        $('#search_form').addClass('hovered');
        $('#search_keyword').focus();
      });
    }
      
    twice_16 = 1;          // Set to 1 and...
    setTimeout(function(){ // ...reset to 0 after 1s
      twice_16 = 0; 
    }, 1000);
      
  }

  if (e.which === 27) // Esc
  {
    closeSearch();
  }
    
});

$('#canvas_banner').on('click', function () {
    closeSearch();
});


function closeSearch() {
    $('#search_form').removeClass('hovered');
    $('#search_form').one('transitionend', function () {
        $('#search_form').removeAttr('open', '');
        $('#search_form').attr('close', '');
    });
    $('#search_form').one('animationend', function () {
        $('#search_form').removeAttr('close', '');
        $('#search_keyword').val('');
    });
}