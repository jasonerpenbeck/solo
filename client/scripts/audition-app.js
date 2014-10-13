$(document).ready(function() {

  $('button.button-submit').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var selectorValue = $('input.form-entry-selector').val();
    var verbValue = $('input.form-entry-verb').val();
    console.log(selectorValue,'.',verbValue);


    $('.display-selector').text(selectorValue);
    $('.display-verb').text(verbValue);

  })

});