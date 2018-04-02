(function() {

var intro = stories['intro'];
var $background = intro.$('.background'); // list of background divs
var $backgroundOverlay = intro.$('.background-overlay');
var $h2 = intro.$('h2');
var $sections = intro.$('section');
var $beginButton = intro.$('.begin');
var $headings = intro.$('.headings');
var $scrollIndicator = intro.$('.scroll-indicator');
var $title = intro.$('.title-card');
var $question = intro.$('.question span');


function setBackground(i, fade) {
    if (fade) {
        $background.eq(fade)
            .removeClass('fade-in')
            .addClass('fade-out');
    };

    $background.eq(i)
        .removeClass('fade-out')
        .addClass('fade-in');
}

intro.on('hide', function() {
    sfx.intro.music.fade(sfx.intro.music.volume(), 0, 2000, function() {
        sfx.intro.music.stop();
    });
});

intro.reset = function() {
    if (intro.started) {
        $background.removeClass('fade-in').addClass('fade-out');
        $question.parent().removeClass('fade-out').addClass('fade-in');
        $question.remove('fade-out').addClass('fade-in');
        setBackground(0);
    };
}

var begin = _.once(function() {
    intro.started = true;
    $headings.removeClass('fade-in').addClass('fade-out');
    $beginButton.removeClass('fade-in').addClass('fade-out');
    $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
    
    setTimeout(function() {
        setBackground(0);
    }, 500);

    setTimeout(function() {
        $beginButton.remove();
        $question.eq(0).removeClass('fade-out').addClass('fade-in');
    }, 2000);
    setTimeout(function() {
        $question.eq(1).removeClass('fade-out').addClass('fade-in');
    }, 3500);

    setTimeout(function() {
        $scrollIndicator.removeClass('fade-out').addClass('fade-in');
    }, 5000);

    sfx.intro.music.play().fade(0, .3, 1000);
});

// override this waypoint
intro.preload = function() {};
intro.headerWaypoint = function() {};
intro.footerWaypoint = function() {};

intro.on('show', function() {
    $beginButton.on('click', begin);
    intro.$el.on('scroll', begin);
});

intro.setupWaypoints = _.debounce(function() {

    $scrollIndicator.waypoint({
        context: intro.el,
        offset: '10%',
        handler: function(direction) {
            if (direction == 'down') {
                /*setBackground(1);*/

                intro.$('.headings').removeClass('fade-in').addClass('fade-out');

                $question.parent().removeClass('fade-in').addClass('fade-out');
                $scrollIndicator.removeClass('fade-in').addClass('fade-out');
            } else {
                setBackground(0, 1);
                $question.parent().removeClass('fade-out').addClass('fade-in');
                //$backgroundOverlay.removeClass('fade-out').addClass('fade-in');
                $scrollIndicator.removeClass('fade-out').addClass('fade-in');
            }
        }
    });

/*
    $sections.eq(0).waypoint({
        context: intro.el,
        offset: 'bottom-in-view',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(2);
            } else {
                setBackground(1, 2);
            }
        }
    });
*/

    $sections.eq(0).waypoint({
        context: intro.el,
        offset: '95%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(1);
            } else {
                setBackground(0, 1);
            }
        }
    });


    $sections.eq(0).waypoint({
        context: intro.el,
        offset: '0%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(2);
            } else {
                setBackground(1, 2);
            }
        }
    });

     $sections.eq(0).waypoint({
        context: intro.el,
        offset: '-15%',
        handler: function(direction) {
            if (direction == 'down' && sfx.intro.news1) {
                sfx.intro.news1.play();
            }
        }
    });

    $sections.eq(0).waypoint({
        context: intro.el,
        offset: '-30%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(3);
            } else {
                setBackground(2, 3);
            }
        }
    });

    $sections.eq(1).waypoint({
        context: intro.el,
        offset: '10%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(4);
            } else {
                setBackground(3, 4);

            }
        }
    });

    $sections.eq(1).waypoint({
        context: intro.el,
        handler: function(direction) {
            if (direction == 'down') {
                /*setBackground(7);*/

                if (sfx.intro.news2) {
                    sfx.intro.news2.play();
                };

            } else {
                /*setBackground(6, 7);*/
            }
        }
    });

    $sections.eq(2).waypoint({
        context: intro.el,
        offset: '100%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(5);
            } else {
                setBackground(4, 5);
            }
        }
    });

    $sections.eq(2).waypoint({
        context: intro.el,
        offset: '20%',
        handler: function(direction) {
            if (direction == 'down') {
                setBackground(6);
            } else {
                setBackground(5, 6);
            }
        }
    });

    $sections.eq(2).waypoint({
        context: intro.el,
        offset: function() {
            return -$(this.element).height() / 2;
        },

        handler: function(direction) {
            if (direction == 'down') {
                /*setBackground(10);*/

                intro.$('#intro section:last-child').css('pointer-events', 'none');
                $title.removeClass('fade-out').addClass('fade-in');
                $backgroundOverlay.removeClass('fade-out').addClass('fade-in');

            } else {
                /*setBackground(9, 10);*/

                $title.removeClass('fade-in').addClass('fade-out');
                $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
            }
        }
    });


}, 500);

})();