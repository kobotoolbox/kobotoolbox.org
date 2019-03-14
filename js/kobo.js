$(function() {
    $('.js-one-page-nav').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5
    });

    $.ajax({
      url: "https://api.github.com/orgs/kobotoolbox/repos?type=public",
      cache: false,
      crossDomain: true
    }).done(function( data ) {
    let repos = ['kpi', 'kobo-docker', 'collect', 'enketo-express'];
    repos.forEach(function(r) {
      var repoDetails = data.find(item => item.name === r);
      var lastUp = moment(repoDetails.updated_at).fromNow();
      $('#r-'+repoDetails.name).html('<span>Last updated: ' + lastUp + '</span>');

    })
  });

  $(".rslides").responsiveSlides();

  function setHeight() {
    windowHeight = $(window).innerHeight();
    headerHeight = $('header').height() - 10;
    $('#home').css('height', windowHeight - headerHeight);
    $('.bg').css('height', windowHeight);
  };
  setHeight();

  $(window).resize(function() {
    setHeight();
  });

});
