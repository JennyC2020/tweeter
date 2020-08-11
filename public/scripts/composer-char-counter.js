$(document).ready(function() {
  //console.log("DOM is ready");
  $('textarea').keyup(function() {
    let charRemaining = 140 - $(this).val().length;
    let counter = $(this).siblings().children('.counter');
    charRemaining < 0 ? counter.css("color", "red") : counter.removeAttr("style");
    counter.html(charRemaining);
  });
});