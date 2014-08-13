(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
  });

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action'),
        $r;
    //$('input, textarea').val('');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      // console.log('html', html);
      $r = $(html);
      $r.css('display', 'none');
      $('#recipes').prepend($r);
      $r.fadeIn(500);
    }});
    e.preventDefault();
  }

  function hide(){
    $('form').fadeOut(500);
  }

  function show(){
    $('form').fadeIn(500);
  }

})();

