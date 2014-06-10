var sections = ['about', 'studies', 'projects', 'code', 'books'];

function navigateTo(sectionNumber){
  $('html,body').animate({ scrollTop: $('#' + sections[sectionNumber]).offset().top }, 'slow');
}

function goto(url){
  window.location = url;
}

$(document).ready(function(){
    if($(window).width() >= 1020){
        $.stellar({
          horizontalScrolling: false
        });
        $('.navigation-panel').addClass('animated');
        $('.navigation-panel').addClass('bounceInRight');
    }else{
        $('.navigation-panel').addClass('animated');
        $('.navigation-panel').addClass('fadeInDown');
    }
});



