(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    //$('.delete').click(delRecipe);
    // event delegation, look it up!!!
    $('#recipes').on('click', '.delete', delRecipe);
    $('#filters a').click(filterCategory);
    $('#recipes').on('click', '.ingredient', filterIngredient);
  });

  function filterIngredient(e){
    //debugger;
    console.log('click');
    var ingredient = $(this).text();
    $('.recipe .ingredient:not(:contains(' + ingredient + '))').closest('.recipe').fadeOut();
    $('.recipe .ingredient:contains(' + ingredient + ')').closest('.recipe').fadeIn();
    e.preventDefault();
  }

  function filterCategory(e){
    //debugger;
    console.log('click');
    var category = $(this).text();
    $('.recipe .category:not(:contains(' + category + '))').closest('.recipe').fadeOut();
    $('.recipe .category:contains(' + category + ')').closest('.recipe').fadeIn();
    e.preventDefault();
  }

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
  function delRecipe(){
    // debugger;
    var id   = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url  = '/recipes/' + id;
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $r = $('.recipe[data-recipe-id=' + data.id +']');
      $r.fadeOut(500);
      setTimeout(function(){$r.remove();}, 2000);
    }});
  }
})();

