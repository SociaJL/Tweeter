$(document).ready(function () {
  $("#text-box").on("keyup", function () {
    let count = 140 - $(this).val().length
    $(".counter").html(count)
    if (count < 0) {
      $(".counter").addClass("red-counter")
    } else if (count > 0) {
      $(".counter").removeClass("red-counter")
    }
  })  
});

// https://developer.mozilla.org/en-US/docs/Web/CSS/counters

