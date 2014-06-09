var sections = ['about', 'studies', 'projects', 'code', 'books'];

function navigateTo(sectionNumber){
  $('html,body').animate({ scrollTop: $('#' + sections[sectionNumber]).offset().top }, 'slow');
}

function goto(url){
  window.location = url;
}