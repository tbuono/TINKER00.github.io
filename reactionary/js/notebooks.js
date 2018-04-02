(function() {

var notebooks = stories['notebooks'];
var $background = notebooks.$('.background');
var $pair = notebooks.$('.pair');
var $controls = notebooks.$('.notebook-controls');
var $headings = notebooks.$('.headings');
var $sections = notebooks.$('section');
var $pile = $('#notebook-pile');
var $carousel = $('#notebook-carousel');

notebooks.on('show', function() {
    sfx.notebooks.quote.play().fade(0, 1, 500);
    sfx.notebooks.music.play().fade(0, .3, 2000);
});

notebooks.on('hide', function() {
    sfx.notebooks.quote.stop();
    sfx.notebooks.music.fade(.3, 0, 1000, function() {
        sfx.notebooks.music.stop();
    });
});

$controls.on ('click', function() {
    if (sfx.notebooks.flip) {
        sfx.notebooks.flip.play();
    };
});

notebooks.on('chapterend', function(direction) {
    if (direction == 'down') {
        $carousel.removeClass('fade-in').addClass('fade-out')
        $pile.removeClass('fade-out').addClass('fade-in');
    } else {
        $pile.removeClass('fade-in').addClass('fade-out');
    }
});

notebooks.setupWaypoints = _.debounce(function() {

   notebooks.$('.grew-up').waypoint({
        context: notebooks.el,
        offset: '70%',
        handler: function(direction) {
            if (direction == 'down') {
                $headings.removeClass('fade-in').addClass('fade-out');
                $background.removeClass('fade-out').addClass('fade-in');
            } else {
                $headings.removeClass('fade-out').addClass('fade-in');
                $background.removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    $pair.waypoint({
        context: notebooks.el,
        offset: 'bottom-in-view',
        handler: function(direction) {
            if (direction == 'down') {

                $pile.removeClass('fade-in')
                    .addClass('fade-out');

                $carousel.removeClass('fade-out');
                $carousel.css("display", "none");

                $carousel
                    .fadeIn(1000)
                    .carousel({
                        interval: false,
                        keyboard: true
                    });

                if (sfx.notebooks.piano) {
                    sfx.notebooks.piano.play();
                };

            } else {
                $carousel.removeClass('fade-in').addClass('fade-out');
                $pile.removeClass('fade-out').addClass('fade-in');
            }
        }
    });

    notebooks.$('.notebook-space').waypoint({
        context: notebooks.el,
        offset: '25%',
        handler: function(direction) {

            if (direction == 'down') {
                $controls.fadeIn(500);
            } else {
                $controls.fadeOut(500);
            }
        }
    });

    notebooks.$('.notebook-space-end').waypoint({
        context: notebooks.el,
        offset: '25%',
        handler: function(direction) {

            if (direction === 'down') {
                $controls.fadeOut(500);
                $carousel.removeClass('fade-in').addClass('fade-out')
            } else {
                $controls.fadeIn(500);
                $carousel.removeClass('fade-out').addClass('fade-in')
            }
        }
    });

    notebooks.$('.all-stuff').waypoint({
        context: notebooks.el,
        offset: '75%',
        handler: function(direction) {
            if (direction == 'down' && sfx.notebooks.tape) {
                sfx.notebooks.tape.play();
            }
        }
    });

}, 750);

})();