var sfx = sfx || {};

/* Intro */
sfx.intro = {};
sfx.intro.load = _.once(function() {
    _.extend(sfx.intro, {

        music: new Howl({
            urls: [''],
            loop: false
        })
    });

    if (!isMobile.any) {

        _.extend(sfx.intro, {
            news1: new Howl({
                urls: ['']
            }),

            news2: new Howl({
                urls: ['']
            })
        });
    };
});

/* Notebooks */
sfx.notebooks = {};
sfx.notebooks.load = _.once(function() {
    _.extend(sfx.notebooks, {
        quote: new Howl({
            urls: ['']
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.notebooks, {
            flip: new Howl({
                urls: ['']
            }),

            tape: new Howl({
                urls: ['']
            }),

            stairs: new Howl({
                urls: ['']
            }),

            piano: new Howl({
                urls: ['']
            })
        });
    };
});

/* Brandywiine */
sfx.brandywine = {};
sfx.brandywine.load = _.once(function() {
    _.extend(sfx.brandywine, {
        quote: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.brandywine, {
            flash: new Howl({
                urls: ['']
            }),

            outdoors: new Howl({
                urls: ['']
            })
        });
    };
});

/* Tape */
sfx.tapes = {};
sfx.tapes.load = _.once(function() {
    _.extend(sfx.tapes, {
        quote: new Howl({
            urls: ['']
        }),

        empty: new Howl({
            urls: ['']
        })

    });

    if (!isMobile.any) {
        _.extend(sfx.tapes, {
            insideChatter: new Howl({
                urls: ['']
            }),

            outdoors: new Howl({
                urls: ['']
            })
        });
    };
});

/* Post It */
sfx.postit = sfx['post-it'] = {};
sfx.postit.load = _.once(function() {
    _.extend(sfx.postit, {
        quote: new Howl({
            urls: [''],
            onend: function() {
                sfx.postit.music.play().fade(0, 1, 500);
            }
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.postit, {
            letterSlide: new Howl({
                urls: ['']
            }),

            notebookOpen: new Howl({
                urls: ['']
            })
        });
    };
});

/* Box of Effects */
sfx.effects = {};
sfx.effects.load = _.once(function() {
    _.extend(sfx.effects, {
        quote: new Howl({
            urls: [''],
            onend: function() {
                sfx.effects.music.play().fade(0, 1, 500);
            }
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.effects, {
            drone: new Howl({
                urls: ['']
            }),

            openBox: new Howl({
                urls: ['']
            }),

            removeItems: new Howl({
                urls: ['']
            }),

            putAway: new Howl({
                urls: ['']
            })
        });
    };
});

/* Lockerbie Collection */
sfx.lockerbie = {};
sfx.lockerbie.load = _.once(function() {
    _.extend(sfx.lockerbie, {
        quote: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.lockerbie, {
            rain: new Howl({
                urls: ['']
            }),

            ambientCity: new Howl({
                urls: ['']
            }),

            ambientCity2: new Howl({
                urls: ['']
            }),

            pageTurn: new Howl({
                urls: ['']
            })
        });
    };
});

/* Map */
sfx.map = {};
sfx.map.load = _.once(function() {
    _.extend(sfx.map, {
        quote: new Howl({
            urls: ['']
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.map, {
            writing: new Howl({
                urls: ['']
            }),

            makingmap: new Howl({
                urls: ['']
            }),

            erase: new Howl({
                urls: ['']
            }),

            greenfield: new Howl({
                urls: ['']
            }),

            stats: new Howl({
                urls: ['']
            }),

            town: new Howl({
                urls: ['']
            })
        });
    };

});


/* Fuselage */
sfx.fuselage = {};
sfx.fuselage.load = _.once(function() {
    _.extend(sfx.fuselage, {
        quote: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.fuselage, {
            hangerOutside: new Howl({
                urls: ['']
            }),

            hangerInside: new Howl({
                urls: ['']
            }),

            footsteps: new Howl({
                urls: ['']
            })
        });
    };
});

/* Libya ID */
sfx.libya = {};
sfx.libya.load = _.once(function() {
    _.extend(sfx.libya, {
        quote: new Howl({
            urls: ['']
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.libya, {
            sea: new Howl({
                urls: ['']
            }),

            light: new Howl({
                urls: ['']
            })
        });
    };
});

/* Letter */
sfx.letter = {};
sfx.letter.load = _.once(function() {
    _.extend(sfx.letter, {
        quote: new Howl({
            urls: [''],
            onend: function() {
                sfx.letter.music.play().fade(0, .3, 1000);
            }
        }),

        music: new Howl({
            urls: ['']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.letter, {

            open: new Howl({
                urls: ['']
            }),

            park: new Howl({
                urls: ['']
            })
        });
    };
});

/*
A little audio player interface
*/
function Player(selector) {
    _.bindAll(this, 'play', 'pause', 'rewind', 'timeupdate');

    this.$el = $(selector);
    this.audio = this.$el.find('audio')[0];

    // controls
    this.$play = this.$el.find('.play');
    this.$pause = this.$el.find('.pause');

    // ui
    this.$playhead = this.$el.find('.playhead');
    this.$progress = $('<div/>').addClass('progress').appendTo(this.$playhead);

    // click events
    this.$el.on('click', '.play', this.play);
    this.$el.on('click', '.pause', this.pause);
    this.$el.on('click', '.rewind', this.rewind);

    $(this.audio).on('timeupdate', this.timeupdate);

}

Player.prototype.play = function() {
    this.$play.hide();
    this.$pause.show();
    this.audio.play();
};

Player.prototype.pause = function() {
    this.$pause.hide();
    this.$play.show();
    this.audio.pause();

    sfx.tapes.empty.play();
};

Player.prototype.rewind = function() {
    this.audio.currentTime = 0;
    this.pause();
};

Player.prototype.timeupdate = function(e) {
    var current = e.target.currentTime;
    var duration = e.target.duration;

    // bail if NaN
    if (_.isNaN(current) || _.isNaN(duration)) {
        console.error('No current or duration available');
        return;
    };

    var pct = current / duration * 100;

    this.$progress.css('width', pct + '%');
};
