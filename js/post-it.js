(function() {

var story = stories['post-it'];
var $sections = story.$('section');
var $bearfacts = story.$('.bearfacts');
var $background = story.$('.background');
var $backgroundOverlay = story.$('.background-overlay');
var $book = $('#bearfacts');
var $letters = story.$('.letters img');
var $photos = story.$('.photos');
var $controls = story.$('.controls a');
var $postit = story.$('.post-it');

/*$backgroundOverlay.removeClass('fade-in').addClass('fade-out');*/

function showLetters() {
    $letters.eq(1).removeClass('fade-out').addClass('fade-in');

    if (sfx.postit.letterSlide) {
        sfx.postit.letterSlide.play();
    };

    setTimeout(function() {
        $letters.eq(0).removeClass('fade-out').addClass('fade-in');

        if (sfx.postit.letterSlide) {
            sfx.postit.letterSlide.play();
        };

    }, 1000);
}

function hideLetters() {
    $letters.eq(1).removeClass('fade-in').addClass('fade-out');
    setTimeout(function() {
        $letters.eq(0).removeClass('fade-in').addClass('fade-out');
    }, 1000);
}

story.on('show', function() {
    sfx.postit.quote.play().fade(0, 1, 500);
    
    $book.carousel({ interval: false });
});

story.on('hide', function() {
    sfx.postit.quote.stop();
    sfx.postit.music.fade(.5, 0, 1000, function() {
        sfx.postit.music.stop();
    });
});

$controls.on('click', function() {
    if (sfx.postit.notebookOpen) {
        sfx.postit.notebookOpen.play();
    };
});

story.setupWaypoints = _.debounce(function() {

    $sections.eq(0).waypoint({
        context: story.el,
        offset: 'bottom-in-view',
        handler: function(direction) {
            if (direction == 'down') {
                $bearfacts.removeClass('fade-in').addClass('fade-out');
                $background.removeClass('fade-out').addClass('fade-in');
            } else {
                $bearfacts.removeClass('fade-out').addClass('fade-in');
                $background.removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    $sections.eq(0).waypoint({
        context: story.el,
        handler: function(direction) {
            if (direction == 'down') {
                showLetters();
            } else {
                hideLetters();
            }
        }
    });

    $sections.filter('.written-as-often').waypoint({
        context: story.el,
        offset: '0%',
        handler: function(direction) {
            if (direction == 'down') {
                $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
            } else {
                $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    $sections.eq(2).waypoint({
        context: story.el,
        offset: 'bottom-in-view',
        handler: function(direction) {
            if (direction == 'down') {
                hideLetters();
                $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
            } else {
                showLetters();
                $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
            }
        }
    });

    story.$('.before-note').waypoint({
        context: story.el,
        offset: '0%',
        handler: function(direction) {
            if (direction == 'down') {
                $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
            } else {
                $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    story.$('.after-note').waypoint({
        context: story.el,
        offset: 'bottom-in-view',
        handler: function(direction) {
            if (direction == 'down') {
                $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
            } else {
                $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
            }
        }
    });

}, 500);

})();