$(document).ready(function () {


    // Toggles dropdown menus, closes when you click outside.
    $('html').click(function () {
        $('.c-dropdown').removeClass("c-dropdown--active");
    });

    $(".c-dropdown__button").click(function (e) {
        var menu = $(this).children(".c-dropdown");
        $(".c-dropdown").not(menu).removeClass("c-dropdown--active");
        e.stopPropagation();
        menu.toggleClass("c-dropdown--active");
    });

    $('.c-dropdown > .o-list-menu__item').click(function (e) {
        e.stopPropagation();
        $(this).toggleClass("o-list-menu__item--selected")

    });

    // Toggles nav menu
    $('.c-nav__icon').click(function () {
        if ($('.o-content__inner').hasClass('is-open')) {
            $('.c-nav__icon').removeClass('is-active');
            $('.o-content__inner').removeClass('is-open');
        } else {
            $('.c-nav__icon').addClass('is-active');
            $('.o-content__inner').addClass('is-open');
        }
    });

    // toggles a class on current modal as well as body
    $('.o-modal__toggle').click(function () {
        labelID = $(this).attr('for');
        $('#' + labelID).toggleClass('active');
        $('body, html').toggleClass('modal-open');
    });

    // closes all modals when user hits esc key
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $('body').removeClass('modal-open');
            $('.o-modal--input.active').removeClass('active')
        }
    });

    // Very inefficient way of showing subnavs, let a better man write this code
    // I think this is fine, tbh
    $('.c-nav__menu-item--styleguide, .c-nav__submenu-item--styleguide').hover(function () {
        $('.c-nav__submenu-item--styleguide').toggleClass('is-active');
    });

    $('.c-nav__menu-item--components, .c-nav__submenu-item--components').hover(function () {
        $('.c-nav__submenu-item--components').toggleClass('is-active');
    });

    $('.c-nav__menu-item--samples, .c-nav__submenu-item--samples').hover(function () {
        $('.c-nav__submenu-item--samples').toggleClass('is-active');
    });

    var tabItem = $(".c-tab__item");
    // adjusts font size of c-tabs based on character c-background__light-gray
    tabItem.each(function (index) {

        var textLength = $(this).html().length;
        var text       = $(this).html();
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

    // switch context between tabs on click
    tabItem.click(function (e) {

        var tab = $(this);
        e.stopPropagation();
        $(".c-tab__item").not(this).removeClass("c-tab__item--active");
        tab.toggleClass("c-tab__item--active");

        // hide old content and show new content
        $(".c-tab__content--active").removeClass("c-tab__content--active");
        $("#" + tab.attr('data-id')).addClass("c-tab__content--active");
    });

    // checks to see if c-tabs has overflow, shows arrows until mobile
    $(window).on("resize", function () {
        var tabContainer = $('.c-tab');

        $.fn.HasScrollBar = function () {
            //note: clientHeight= height of holder
            //scrollHeight= we have content till this height
            var _elm          = $(this)[0];
            var _hasScrollBar = false;
            if ((_elm.clientHeight < _elm.scrollHeight) || (_elm.clientWidth < _elm.scrollWidth)) {
                _hasScrollBar = true;
            }
            return _hasScrollBar;
        }

    }).resize();


    // only populate buying/viewing options that exist
    var watchOptions = [
        {
            key          : 'netflix',
            link         : 'https://netflix.com/whatever',
            title        : 'Netflix',
            secondaryText: 'Add to Queue'
        },
        {
            key          : 'hulu',
            link         : 'https://hulu.com/whatever',
            title        : 'Hulu',
            secondaryText: 'Stream Now'
        },
        {
            key          : 'vudu',
            link         : 'https://vudu.com/whatever',
            title        : 'VUDU',
            secondaryText: 'Rent or Buy'
        },
        {
            key          : 'amazon',
            link         : 'https://amazon.com/whatever',
            title        : 'Amazon',
            secondaryText: 'Rent or Buy'
        },
        {
            key          : 'hbo',
            link         : 'https://hbo.com/whatever',
            title        : 'HBO',
            secondaryText: 'Stream Now'
        },

        {
            key          : 'fandangoNow',
            link         : 'https://fandangonow.com/whatever',
            title        : 'FandangoNow',
            secondaryText: 'Stream Now'
        },

        {
            key          : 'itunes',
            link         : 'https://itunes.com/whatever',
            title        : 'iTunes',
            secondaryText: 'Rent or Buy'
        }
    ]

    var watch = $('.c-watch');
    if (watch) {
        for (let i = 0; i < 5 && i < watchOptions.length; i++) {
            console.log(i)
            var item = watchOptions[i];
            var html =
                    `<div class="c-watch__item o-layout__item u-1/6@desktop u-1/3@tablet u-1/2">
                    <a href="${item.link}">
                        <div class="c-btn c-btn--icon-only c-watch__item-icon--${item.key} c-watch__item-icon" href="#"></div>
                        <div class="c-watch__item-text">
                        <span class="c-watch__item-title o-color--secondary">${item.title}</span><span
                            class="c-watch__item-desc o-text--smalltext o-color--text-primary">${item.secondaryText}</span>
                        </div>
                    </a>
                </div>`;
            watch.append(html)
        }

        if (watchOptions.length > 5) {
            console.log('hi')
            var html =
                    `<div class="c-watch__item o-layout__item u-1/6@desktop u-1/3@tablet u-1/2">
                    <ul class="o-list-menu">
                        <li class="o-list-menu__item c-dropdown__button"><a>More Options</a>
                            <ul class="o-list-menu c-dropdown">`;
            for (let i = 5; i < watchOptions.length; i++) {
                console.log(i)
                var item = watchOptions[i];
                html += `<li class="o-list-menu__item"><a href='${item.link}'>${item.title}</a></li>`
            }

            html += `</ul></li></ul></div>`;
            watch.append(html)
            $(".c-dropdown__button").click(function (e) {
                var menu = $(this).children(".c-dropdown");
                $(".c-dropdown").not(menu).removeClass("c-dropdown--active");
                e.stopPropagation();
                menu.toggleClass("c-dropdown--active");
            });
        }
        watch.append(`<div class="c-watch__button-container o-layout__item u-1/1">
                <a class="c-btn c-btn--icon c-btn--small c-btn--secondary mdi-eye" href="#">Find More Films</a>
                <a class="c-btn c-btn--icon c-btn--small c-btn--secondary mdi-plus" href="#">Add to Favorites</a>
            </div>`)
    }
});
