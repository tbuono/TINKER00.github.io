(function() {

var effects = stories['effects'];
var $background = effects.$('.background');
var $sections = effects.$('section');
var $box = effects.$('.box-opening');
var $boxEmpty = effects.$('.box-empty');
var $showButton = effects.$('.show-objects');
var $itemsExpanded = effects.$('.items-expanded');

effects.on('show', function() {
    sfx.effects.quote.play().fade(0, 1, 500);

    if (sfx.effects.drone) {
        sfx.effects.drone.play().fade(0, .75, 1000);
    };

    /* slight delay, in case preload has already fired */
    setTimeout(function() {
        $box.removeClass('fade-out').addClass('fade-in');
    }, 500);
});

effects.on('hide', function() {
    sfx.effects.quote.stop();
    sfx.effects.music.fade(.75, 0, 1000, function() {
        sfx.effects.music.stop();
    });
});

effects.on('reset', function() {
    $box.removeClass('open').show();
    $boxEmpty.hide();
    $itemsExpanded.removeClass('fade-in').addClass('fade-out');
});

$showButton.on('click', function(e) {
    if (sfx.effects.removeItems) {
        sfx.effects.removeItems.play();
    };
    
    $showButton.removeClass('fade-in').addClass('fade-out');
    $itemsExpanded.removeClass('fade-out').addClass('fade-in');
    $box.hide();
    $boxEmpty.show();
});

effects.preload = _.once(function() {
    var view = this;
    var $scroll = this.$('.scroll-indicator');
    this.$el.waitForImages(true).done(function() {
        $scroll.removeClass('fade-out').addClass('fade-in');
        $box.removeClass('fade-out').addClass('fade-in');
    });
});


effects.setupWaypoints = _.debounce(function() {
    // switch the background
    $sections.eq(0).waypoint({
        context: effects.el,
        offset: '90%',
        enabled: true,
        handler: function(direction) {
            if (direction == 'down') {
                $background.removeClass('fade-out').addClass('fade-in');
            } else {
                $background.removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    // open the box
    $sections.eq(0).waypoint({
        context: effects.el,
        handler: function(direction) {
            if (direction == 'down') {
                $box.addClass('open');

                if (sfx.effects.openBox) {
                    sfx.effects.openBox.play();
                };
            };
        }
    });

    $sections.eq(2).waypoint({
        context: effects.el,
        enabled: false,
        handler: function(direction) {
            if (direction == 'down') {
                $showButton.fadeIn(100);
            } else {
                $showButton.fadeOut(100);
            }
        }
    });

    $sections.last().waypoint({
        context: effects.el,
        handler: function(direction) {
            if (direction == 'down') {
                $itemsExpanded.removeClass('fade-in').addClass('fade-out');
                $box.removeClass('open').show();
                $boxEmpty.hide();
                $showButton.removeClass('fade-out').addClass('fade-in');
                $box.removeClass('open');

                if (sfx.effects.putAway) {
                    sfx.effects.putAway.play();
                };
            }
        }
    });

}, 500);

})();