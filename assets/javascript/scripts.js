$( document ).ready(function() {


  // Toggles dropdown menus, closes when you click outside.
  $('html').click(function() {
    $('.c-dropdown').removeClass("c-dropdown--active");
  });

  $(".o-list-menu__item").click (function(e){
    // remove the dropdown class to prevent it from getting activated in multiple places
    $('.c-dropdown').removeClass("c-dropdown--active");
    e.stopPropagation();
    $(this).children('.c-dropdown').toggleClass("c-dropdown--active");
  });

   $('.c-dropdown').click (function(e){
    e.stopPropagation();
  });

  // Toggles nav menu
  $('.c-nav__icon').on('click', function(){
    if ($('.o-content__inner').hasClass('is-open')) {
      $('.c-nav__icon').removeClass('is-active');
      $('.o-content__inner').removeClass('is-open');
    } else {
      $('.c-nav__icon').addClass('is-active');
      $('.o-content__inner').addClass('is-open');
    }
  });

  // toggles a class on current modal as well as body
  $('.o-modal__toggle').click(function() {
    labelID = $(this).attr('for');
    $('#' + labelID).toggleClass('active');
    $('body, html').toggleClass('modal-open');
  });

  // closes all modals when user hits esc key
  $(document).keydown(function(e){
    if(e.keyCode == 27) {
      $('body').removeClass('modal-open');
      $('.o-modal--input.active').removeClass('active')
    }
  });

  // Very inefficient way of showing subnavs, let a better man write this code
  $('.c-nav__menu-item--styleguide, .c-nav__submenu-item--styleguide').hover(function() {
    $('.c-nav__submenu-item--styleguide').toggleClass('is-active');
  });

  $('.c-nav__menu-item--components, .c-nav__submenu-item--components').hover(function() {
    $('.c-nav__submenu-item--components').toggleClass('is-active');
  });

  $('.c-nav__menu-item--samples, .c-nav__submenu-item--samples').hover(function() {
    $('.c-nav__submenu-item--samples').toggleClass('is-active');
  });


  // adjusts font size of c-tabs based on character c-background__light-gray
  $( ".c-tab__item" ).each(function( index ) {

    var textLength = $(this).html().length;
    var text =$(this).html();
        if (textLength < 18) {
            $(this).addClass("c-tab__item--short");
        } else if ((textLength >= 18) && (textLength < 24)) {
            $(this).addClass("c-tab__item--long");
        } else if (textLength >= 24) {
            $(this).addClass("c-tab__item--long");
            if (!$(this).hasClass("c-tab__item--active")) {
              var shortText = jQuery.trim(text).substring(0, 26)
                            .trim(this) + "...";
              $(this).text(shortText);
            }
        }
  });

  // checks to see if c-tabs has overflow, shows arrows until mobile
  $(window).on("resize", function () {
    var tabContainer = $('.c-tab');

    $.fn.HasScrollBar = function() {
        //note: clientHeight= height of holder
        //scrollHeight= we have content till this height
        var _elm = $(this)[0];
        var _hasScrollBar = false;
        if ((_elm.clientHeight < _elm.scrollHeight) || (_elm.clientWidth < _elm.scrollWidth)) {
            _hasScrollBar = true;
        }
        return _hasScrollBar;
        console.log('_hasScrollBar');
    }

  }).resize();
});
