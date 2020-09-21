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
    }).done(function(data) {
        let repos = ['kpi', 'kobo-docker', 'collect', 'enketo-express'];
        repos.forEach(function(r) {
            var repoDetails = data.find(item => item.name === r);
            var lastUp = moment(repoDetails.updated_at).fromNow();
            $('#r-' + repoDetails.name).html('<span>Last updated: ' + lastUp + '</span>');

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

    // helpful funciton for scrolling to target element
    // from https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
    function scrollIt(destination, duration = 200, easing = 'linear', callback) {
        const easings = {
            linear(t) {
                return t;
            },
            easeInQuad(t) {
                return t * t;
            },
            easeOutQuad(t) {
                return t * (2 - t);
            },
            easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            },
            easeInCubic(t) {
                return t * t * t;
            },
            easeOutCubic(t) {
                return (--t) * t * t + 1;
            },
            easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            },
            easeInQuart(t) {
                return t * t * t * t;
            },
            easeOutQuart(t) {
                return 1 - (--t) * t * t * t;
            },
            easeInOutQuart(t) {
                return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            },
            easeInQuint(t) {
                return t * t * t * t * t;
            },
            easeOutQuint(t) {
                return 1 + (--t) * t * t * t * t;
            },
            easeInOutQuint(t) {
                return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
            }
        };

        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
        let destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

        // take header into account
        destinationOffsetToScroll -= 70;

        if ('requestAnimationFrame' in window === false) {
            window.scroll(0, destinationOffsetToScroll);
            if (callback) {
                callback();
            }
            return;
        }

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easings[easing](time);
            window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

            if (window.pageYOffset === destinationOffsetToScroll) {
                if (callback) {
                    callback();
                }
                return;
            }

            requestAnimationFrame(scroll);
        }

        scroll();
    }

    // covid banner
    function setupCovidBanner() {
        const firstButtonEl = document.querySelector('.js-covid-button');
        const secondButtonEl = document.querySelector('.js-covid-button-2');

        if (firstButtonEl) {
            document.querySelector('.js-covid-button').addEventListener('click', (evt) => {
                evt.preventDefault();
                scrollIt(document.querySelector('.js-covid-target'), 300);
            });
        }
        if (secondButtonEl) {
            document.querySelector('.js-covid-button-2').addEventListener('click', (evt) => {
                evt.preventDefault();
                scrollIt(document.querySelector('.js-covid-target'), 300);
            });
        }
    }
    setupCovidBanner();

    function setupRandomBg() {
        const randomBgsHome = [
            "../images/kobo-bg-hands.jpg",
            "../images/kobo-bg-home.jpg"
        ];
        const randomBgsKhc = [
            "../images/kobo-bg-khc.jpg"
        ];
        const bgEl = document.getElementById("js-bg");
        if (bgEl) {
            let randomBg = "";
            if (window.pageid && window.pageid === "home") {
                randomBg = randomBgsHome[Math.floor(Math.random() * randomBgsHome.length)];
            } else if (window.pageid && window.pageid === "khc") {
                randomBg = randomBgsKhc[Math.floor(Math.random() * randomBgsKhc.length)];
            }

            if (randomBg !== "") {
                bgEl.style.backgroundImage = `url(${randomBg})`;
            }
            bgEl.classList.add("bg--ready");
        }
    }
    setupRandomBg();
});
