$(document).ready(function() {
  $('textarea').keyup(function() {
    let charRemaining = 140 - $(this).val().length;
    let counter = $(this).siblings().children('.counter');
    if (charRemaining < 0) {
      counter.css("color", "red");
    } else {
      counter.removeAttr("style");
    }
    counter.html(charRemaining);
  });
});