$(function () {
  // Initial set up //
  $('[data-toggle="popover"]').popover()
  setProjectsBoxStyle();

  // Register listeners //
  var $window = $(window);
  $window.resize(function() {
    setProjectsBoxStyle();
  });

  var originalCircleColor = $('.projects-box .circle').css('background-color');
  var circleAnimationTime = 240;
  $('.projects-box .circle').hover(function() {
    $(this).animate({
        'background-color': 'rgba(0, 0, 0, 0)',
        'color': originalCircleColor,
        'border-color': originalCircleColor
    }, circleAnimationTime);
  }, function() {
    $(this).animate({
        'background-color': originalCircleColor,
        'color': 'black',
        'border-color': 'rgba(0, 0, 0, 0)'
    }, circleAnimationTime);
  });

  // Helper functions //
  var projectsVideoHWRatio = 0.562;
  function setProjectsBoxStyle() {
    // Dimensions of the projects box
    var width = $(window).width();
    var height = width * 0.562;

    // The styled minimum width of the video is 400px,
    // but for some reason it mins-out at 480px
    // height = Math.max(height, 480);

    // Set some style variables
    $('.projects-box').css('top', '-' + height + 'px');
  }
});
