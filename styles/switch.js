$(document).ready(function() {
  var checkbox_s = $(".check_container");
  var clicked = false;
  var body = $("body");

  checkbox_s.click(function() {
    if (clicked == false) {
      body.css({
        "background-color": "#d8e4e6"
      });
      $("h2").css({ color: "#4285f4" });
      $("#urlsubmit").removeClass("btn-outline-light");
      $("#urlsubmit").addClass("btn-outline-primary");
      $("#form-lg").removeClass("text-white");
      $("#form-lg").addClass("text-primary");
      $("#form-lg").addClass("form-light-border");
      $("#hashed").removeClass("text-white");
      $("#hashed").addClass("text-primary");

      $(".ring").addClass("d-none");
      $(".cover-ring").addClass("d-none");
      $(".planet").addClass("sun");
      $(".content .planet .spots span").addClass("sun-hole");
      $(".content").addClass("bounceIn");
      setTimeout(function() {
        $(".content").removeClass("bounceIn");
      }, 500);

      $(".cercle").css({
        transform: "translateX(48px)",
        "background-color": "#fbcf07",
        "box-shadow": "0px 0px 10px 3px #ffe052"
      });
      $(".check_container").css({
        "background-color": "#54b2ff",
        border: "2px solid #54b2ff"
      });
      $(".small_cercle").css({ opacity: "0" });
      $(".moon_details").css({ opacity: "0" });
      $(".ghyama").css({ transform: "translateX(0px)" });
      clicked = true;
    } else {
      body.css({
        "background-color": "#143840"
      });
      $("h2").css({ color: "#d8e4e6" });
      $("#urlsubmit").removeClass("btn-outline-primary");
      $("#urlsubmit").addClass("btn-outline-light");
      $("#form-lg").removeClass("text-primary");
      $("#form-lg").addClass("text-white");
      $("#form-lg").removeClass("form-light-border");
      $("#hashed").removeClass("text-primary");
      $("#hashed").addClass("text-white");

      $(".ring").removeClass("d-none");
      $(".cover-ring").removeClass("d-none");
      $(".planet").removeClass("sun");
      $(".content .planet .spots span").removeClass("sun-hole");
      $(".content").addClass("bounceIn");
      setTimeout(function() {
        $(".content").removeClass("bounceIn");
      }, 500);

      $(".cercle").css({
        transform: "translateX(0px)",
        "background-color": "blanchedalmond",
        "box-shadow": "0px 0px 10px 0px #fbf5d9"
      });
      $(".check_container").css({
        "background-color": "#333333",
        border: "2px solid #333333"
      });
      $(".small_cercle").css({ opacity: "1" });
      $(".moon_details").css({ opacity: "1" });
      $(".ghyama").css({ transform: "translateX(58px)" });
      clicked = false;
    }
  });
});
