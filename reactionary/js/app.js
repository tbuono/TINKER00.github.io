/***
StoryRouter controls which article is in view, or the object array
***/

if (_.contains([1, 2], window.devicePixelRatio)) {
    window.PIXEL_RATIO = '@' + window.devicePixelRatio + 'x';
} else {
    window.PIXEL_RATIO = '@1x';
}

if (isMobile.any) {
    window.PIXEL_RATIO = '@1x';
};

$(window).on('resize', detectOrientation);
$(window).on('load', detectOrientation);

function detectOrientation() {
    var $forceLandscape = $('#forceLandscape');
    var $img = $forceLandscape.find('img');

    // we don't like portrait on mobile
    /*if (window.innerHeight > window.innerWidth && window.innerWidth < 480) {*/
    if (window.innerHeight > window.innerWidth) {
        if (!$img.attr('src')) {
            $img.attr('src', function() {
                return this.dataset.src;
            });
        };
        $forceLandscape.show();

    } else {
        $forceLandscape.hide();
    }
}

// consolidate this into a little plugin instead of rewriting
jQuery.fn.loadImages = function() {
    $(this).attr('src', function() {
        return this.dataset['src'].replace('@2x', window.PIXEL_RATIO);
    })
    .attr('srcset', function() {
        if (this.dataset.srcset) {
            return this.dataset.srcset
        };
    }).on('load', function() {
        $(this).addClass('loaded');
    });

    return this;
}

jQuery.fn.loadBackgrounds = function() {
    $(this).css('background-image', function() {
        var background = this.dataset['background'].replace('@2x', window.PIXEL_RATIO);
        return 'url(' + background + ')';
    }).addClass('loaded');

    return this;
}


// set checking properties to just this
$.waitForImages.hasImgProperties = ['backgroundImage'];

$('.modal').on('touchstart', $.noop);

var StoryRouter = Backbone.Router.extend({

    routes: {
        ''        : 'intro',

        'objects' : 'objects',

        'credits' : 'credits',

        ':slug'   : 'story'
    },

    keyEvents: {
        27: 'hideAll' // escape
        //37: 'previous', // left arrow
        //39: 'next' // right arrow
    },

    initialize: function(options) {
        _.bindAll(this, 'toggleMute');
        
        var view = this;
        $(window).on('keydown', function(e) {
            var key = view.keyEvents[e.keyCode]
              , callback = view[key];

            if (_.isFunction(callback)) {
                callback.call(view, e);
            };
        });

        this.$mute = $('#mute').on('click', this.toggleMute);
    },

    intro: function() {
        this.current = stories.intro.show();
    },

    hideAll: function(e) {
        this.navigate('objects', {trigger: true});
    },

    loadObjects: function() {
        $('#objects').find('[data-background]:not(.loaded)').loadBackgrounds();
        $('article .surface-object:not(.loaded)').loadImages();
    },

    waitForObjects: _.once(function() {
        $('#objects').find('.array').waitForImages(true).done(function() {
            $('#objects .array').removeClass('fade-out').addClass('fade-in');
        });
    }),

    objects: function() {
        _.defer(this.waitForObjects);
        this.loadObjects();
        this.current = null;
        StoryView.hideAll();
        //setTimeout(this.stopAll, 3000);
    },

    story: function(slug) {
        if (slug in stories) {
            this.current = stories[slug].show();
        };
    },

    credits: function() {
        this.current = stories.credits.show();
    },

    stopAll: function() {
        Howler._howls.forEach(function(h) {
            h.stop();
        });
    },

    toggleMute: function(e) {
        if (Howler._muted) {
            this.unmute();
        } else {
            this.mute();
        }
    },

    mute: function() {
        Howler.mute();
        this.$mute.removeClass('glyphicon-volume-up')
            .addClass('glyphicon-volume-off');
    },

    unmute: function() {
        Howler.unmute();
        this.$mute.removeClass('glyphicon-volume-off')
            .addClass('glyphicon-volume-up');
    }

});

/***
StoryView controls story display, showing and hiding as needed.
Each story is pre-rendered but hidden, so we only need to handle visibility here.
***/
var StoryView = Backbone.View.extend({

    initialize: function(options) {

        var view = this;

        this.preload = _.once(this.preload);

        this.$el.on('show.bs.modal', function(e) {
            // sounds first
            if (sfx[view.el.id]) {
                sfx[view.el.id].load();
            };
            
            // then images
            view.loadBackgrounds();
            view.loadImages();

            // now set reset state
            view.reset();

        });

        this.$el.on('shown.bs.modal', function(e) {
            view.preload();
            view.headerWaypoint();
            view.setupWaypoints();
            view.footerWaypoint();
            view.trigger('show');
        });

        this.$el.on('hidden.bs.modal', function(e) {
            view.clearWaypoints();
            view.trigger('hide');
        });

        // bind here, because everything else happens in events
        _.bindAll(this, 'show', 'hide', 'loadBackgrounds', 'preload', 'reset',
            'setupWaypoints', 'headerWaypoint', 'footerWaypoint');

    },

    getNext: function() {
        if (this.el.dataset.next) {
            return stories[this.el.dataset.next];
        };
    },

    getPrevious: function() {
        if (this.el.dataset.previous) {
            return stories[this.el.dataset.previous];
        };
    },

    clearWaypoints: function() {
        var context = this.getContext();
        if (context) { context.destroy() };
        return this;
    },

    getContext: function() {
        return Waypoint.Context.findByElement(this.el);
    },

    preload: function() {
        var view = this;
        var $scroll = this.$('.scroll-indicator');
        this.$el.waitForImages(true).done(function() {
            $scroll.removeClass('fade-out').addClass('fade-in');
            view.trigger('preload');
        });
    },

    loadBackgrounds: function() {
        if (!this.$el.hasClass('loaded')) {
            this.$el.loadBackgrounds();
        };
        
        this.$el.find('[data-background]:not(.loaded)').loadBackgrounds();
    },

    loadImages: function() {
        /*
        this.$el.find('img[data-src]:not(.loaded)').attr('src', function() {
            return this.dataset['src'].replace('@2x', window.PIXEL_RATIO);
        }).addClass('loaded');
        */
        return this.$el.find('img[data-src]:not(.loaded)').loadImages();
    },

    reset: function() {
        var $background = this.$('.background');
        var $backgroundOverlay = this.$('.background-overlay');
        var $headings = this.$('.headings');
        var $object = this.$('.surface-object');
        var $scroll = this.$('.scroll-indicator');

        this.el.scrollTop = 0;

        $background.removeClass('fade-in').addClass('fade-out');
        $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
        $headings.removeClass('fade-out').addClass('fade-in');
        $object.removeClass('fade-out').addClass('fade-in');
        $scroll.removeClass('fade-in').addClass('fade-out');

        this.trigger('reset');
    },

    show: function() {
        var view = this;
        this.hideOthers();
        this.$el.modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });

        return this;
    },

    hide: function() {
        this.$el.modal('hide');
        router.navigate('objects');
        return this;
    },

    hideOthers: function() {
        $('.modal.in:not(#' + this.el.id + ')').modal('hide');
        return this;
    },

    headerWaypoint: function() {
        var view = this;
        var $headings = this.$('.headings');
        var $backgroundOverlay = this.$('.background-overlay');
        var $scroll = this.$('.scroll-indicator');
        var $object = this.$('.surface-object');

        $scroll.waypoint({
            context: this.el,
            offset: '60%',
            handler: function(direction) {
                if (direction == 'down') {
                    $backgroundOverlay.removeClass('fade-in').addClass('fade-out');
                    $headings.removeClass('fade-in').addClass('fade-out');

                    view.trigger('chapterscroll');
                } else {
                    $backgroundOverlay.removeClass('fade-out').addClass('fade-in');
                    $headings.removeClass('fade-out').addClass('fade-in');

                }
            }
        });
    },

    footerWaypoint: function() {
        var view = this;
        var $background = this.$('.background');
        var $object = this.$('.surface-object');
        var footerOffset = this.footerOffset || function() { return -$(this.element).height() / 2; };

        this.$('section').last().waypoint({
            context: this.el,
            offset: footerOffset,
            handler: function(direction) {
                if (direction == 'down') {
                    $background.removeClass('fade-in').addClass('fade-out');
                    $object.removeClass('fade-out').addClass('fade-in');

                } else {
                    $background.last().removeClass('fade-out').addClass('fade-in');
                    $object.removeClass('fade-in').addClass('fade-out');
                }
                // hook for adding extra behavior here
                view.trigger('chapterend', direction);
            }
        });
    },

    setupWaypoints: function() {}
});

StoryView.hideAll = function() {
    $('.modal.fade.in').modal('hide');
}

/***
stories is a hash of slug: view for simple lookups
***/
var stories = {};

$('article.story').each(function(i, el) {
    stories[el.getAttribute('id')] = new StoryView({ el: el });
});

var router = new StoryRouter();