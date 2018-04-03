(function() {

var brandywine = stories['brandywine'];
var $flash = brandywine.$('.flash');
var $camera = brandywine.$('.camera');
var $viewfinder = brandywine.$('.viewfinder');
var $photos = brandywine.$('.photo');
var $sections = brandywine.$('section');
var $photoStack = brandywine.$('.photo-stack');
var $zoom = brandywine.$('.zoomIn');

$camera.hide();

brandywine.on('show', function() {
    sfx.brandywine.quote.play().fade(0, 1, 500);
});

brandywine.on('hide', function() {
    sfx.brandywine.quote.stop();
    if (sfx.brandywine.outdoors) {
        sfx.brandywine.outdoors.stop();
    };
});

brandywine.on('chapterend', function(direction) {
    if (direction == 'down') {
        $camera.removeClass('fade-in').addClass('fade-out');
    } else {
        $camera.removeClass('fade-out').addClass('fade-in');
    }
});

brandywine.on('reset', function() {
    $camera.removeClass('fade-in').addClass('fade-out');
    $zoom.removeClass('fade-in').addClass('fade-out');
});

function flash(message) {
    if (sfx.brandywine.flash) {
        sfx.brandywine.flash.play();
    };

    $flash.removeClass('fade-out').css("opacity", "1");
    setTimeout(function() {
        $flash.addClass('fade-out');
    }, 100);

    if (message) {
        console.log(message);
    };
}

brandywine.flash = flash;

brandywine.setupWaypoints = _.debounce(function() {

    $sections.filter('.would-be-writer').waypoint({
        context: brandywine.el,
        continuous: false,
        offset: '90%',
        handler: function(direction) {
            $camera.show()
                .removeClass('fade-out')
                .css('opacity', 1);

            /*hide mushrooms camera*/
            brandywine.$('div.cameraView.mushrooms').hide();
            /*hide enactor camera*/
            brandywine.$('div.cameraView.enactor').hide();
            /*hide statue camera*/
            brandywine.$('div.cameraView.statue').hide();
            
            flash('would-be-writer');

            brandywine.$('#foregroundImagemuseum').css("right", "1.5%");
            brandywine.$('#backgroundImagemuseum').css("left", "-5.5%");

            setTimeout(function() {
                /*move foreground*/
                brandywine.$('#foregroundImagemuseum')
                    .css("-webkit-transition", "right 2s");

                brandywine.$('#foregroundImagemuseum')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImagemuseum')
                    .css("transition", "right 2s");

                brandywine.$('#foregroundImagemuseum')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImagemuseum').css("right", "3.5%");
                
                /*move background*/
                brandywine.$('#backgroundImagemuseum')
                    .css("-webkit-transition", "left 2s");
                
                brandywine.$('#backgroundImagemuseum')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImagemuseum')
                    .css("transition", "left 2s");
                
                brandywine.$('#backgroundImagemuseum')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImagemuseum').css("left", "-3.5%");

            }, 100);

            if (direction == 'down') {
                $photoStack.removeClass('fade-in').addClass('fade-out');
                brandywine.$('div.cameraView.museum').show();

                if (sfx.brandywine.outdoors) {
                    sfx.brandywine.outdoors.play().fade(0, 1, 500);
                };
            } else {
                $photoStack.removeClass('fade-out').addClass('fade-in');
                /*hide museum camera*/
                brandywine.$('div.cameraView.museum').hide();
                brandywine.$('.camera').removeClass('fade-in').addClass('fade-out');
            }
        }
    });

    $sections.filter('.mushroom-museum').waypoint({
        context: brandywine.el,
        offset: '90%',
        handler: function(direction) {
            /*camera flash*/
            flash('mushroom-museum');
            
            /*show mushrooms camera*/
            brandywine.$('div.cameraView.mushrooms').show();
            /*hide museum camera*/
            brandywine.$('div.cameraView.museum').hide();
            /*hide enactor camera*/
            brandywine.$('div.cameraView.enactor').hide();
            /*hide statue camera*/
            brandywine.$('div.cameraView.statue').hide();
            
            /*move foreground*/
            brandywine.$('#foregroundImagemushrooms').css("right", "14.5%");
            brandywine.$('#backgroundImagemushrooms').css("right", "-15%");
            
            setTimeout(function() {
                brandywine.$('#foregroundImagemushrooms')
                    .css("-webkit-transition", "right 2s");

                brandywine.$('#foregroundImagemushrooms')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImagemushrooms')
                    .css("transition", "right 2s");
                
                brandywine.$('#foregroundImagemushrooms')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImagemushrooms').css("right", "12.5%");
                
                /*move background*/
                brandywine.$('#backgroundImagemushrooms')
                    .css("-webkit-transition", "right 2s");
                
                brandywine.$('#backgroundImagemushrooms')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImagemushrooms')
                    .css("transition", "right 2s");
                
                brandywine.$('#backgroundImagemushrooms')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImagemushrooms').css("right", "-13%");
            }, 100);
        }
    });

    $sections.filter('.enactor').waypoint({
        context: brandywine.el,
        offset: '90%',
        handler: function(direction) {
            /*camera flash*/
            flash('enactor');
            
            /*hide mushrooms camera*/
            brandywine.$('div.cameraView.mushrooms').hide();
            /*hide museum camera*/
            brandywine.$('div.cameraView.museum').hide();
            /*show enactor camera*/
            brandywine.$('div.cameraView.enactor').show();
            /*hide statue camera*/
            brandywine.$('div.cameraView.statue').hide();

            brandywine.$('#foregroundImageenactor').css("right", "-2%");
            brandywine.$('#backgroundImageenactor').css("left", "-12%");
            setTimeout(function() {
                
                /*move foreground*/
                brandywine.$('#foregroundImageenactor')
                    .css("-webkit-transition", "right 2s");
                
                brandywine.$('#foregroundImageenactor')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImageenactor')
                    .css("transition", "right 2s");
                
                brandywine.$('#foregroundImageenactor')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#foregroundImageenactor').css("right", "0%");
                
                /*move background*/
                brandywine.$('#backgroundImageenactor')
                    .css("-webkit-transition", "left 2s");
                
                brandywine.$('#backgroundImageenactor')
                    .css("-webkit-transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImageenactor').css("transition", "left 2s");
                
                brandywine.$('#backgroundImageenactor')
                    .css("transition-timing-function", "cubic-bezier(0.640, 0.095, 0.875, 0.450);");
                
                brandywine.$('#backgroundImageenactor').css("left", "-10%");
             }, 100);
        }
    });

    $sections.filter('.cajoled').waypoint({
        context: brandywine.el,
        offset: '90%',
        handler: function(direction) {
            /*camera flash*/
            flash('cajoled');
            
            /*hide mushrooms camera*/
            brandywine.$('div.cameraView.mushrooms').hide();
            /*hide museum camera*/
            brandywine.$('div.cameraView.museum').hide();
            /*hide enactor camera*/
            brandywine.$('div.cameraView.enactor').hide();
            /*show statue camera*/
            brandywine.$('div.cameraView.statue').show();

            brandywine.$('.zoomIn').removeClass('fade-in');
            brandywine.$('.zoomIn').addClass('fade-out');

        }
    });


    $sections.filter('.cajoled').waypoint({
        context: brandywine.el,
        offset: '0%',
        handler: function(direction) {
             /*show zoom button*/
            /*brandywine.$('.zoomIn').show();*/
            $zoom.removeClass('fade-out').addClass('fade-in');
            $zoom.parent().removeClass('fade-out').addClass('fade-in');

            $zoom.on('mouseenter', function() {
                $zoom.css('background-position', '-75px 0px');
                brandywine.$('#foregroundImagestatue').addClass('fade-out');
                brandywine.$('#foregroundImagestatue').removeClass('fade-in');
            });

            $zoom.on('mouseleave', function(){
                brandywine.$('.zoomIn').css('background-position', '0px 0px');
                brandywine.$('#foregroundImagestatue').addClass('fade-in');
                brandywine.$('#foregroundImagestatue').removeClass('fade-out');
            });
        }
    });

    $sections.filter('.wanted-something').waypoint({
        context: brandywine.el,
        offset: '50%',
        handler: function(direction) {
            $zoom.removeClass('fade-in').addClass('fade-out');
        }
    });

    $sections.last().waypoint({
        context: brandywine.el,
        offset: function() {
            return -$(this.element).height() / 2;
        },

        handler: function(direction) {
            if (direction == 'down' && sfx.brandywine.outdoors) {
                sfx.brandywine.outdoors.fade(1, 0, 2000);
            }
        }
    });

}, 1000);

})();



