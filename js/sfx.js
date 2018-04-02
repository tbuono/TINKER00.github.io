var sfx = sfx || {};

/* Intro */
sfx.intro = {};
sfx.intro.load = _.once(function() {
    _.extend(sfx.intro, {

        music: new Howl({
            urls: ['assets/audio/01-Intro/Intro-Music-Ether.mp3'],
            loop: false
        })
    });

    if (!isMobile.any) {

        _.extend(sfx.intro, {
            news1: new Howl({
                urls: ['assets/audio/01-Intro/SFX-intro-news-1.m4a']
            }),

            news2: new Howl({
                urls: ['assets/audio/01-Intro/SFX-intro-news-2.m4a']
            })
        });
    };
});

/* Notebooks */
sfx.notebooks = {};
sfx.notebooks.load = _.once(function() {
    _.extend(sfx.notebooks, {
        quote: new Howl({
            urls: ['assets/audio/02-Notebooks/ken-dornstein-notebook-bite-2.mp3']
        }),

        music: new Howl({
            urls: ['assets/audio/02-Notebooks/Music-Notebooks-Track1-full.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.notebooks, {
            flip: new Howl({
                urls: ['assets/audio/02-Notebooks/SFX-Notebook-Flip.mp3']
            }),

            tape: new Howl({
                urls: ['assets/audio/02-Notebooks/sfx_dave_archive_write.mp3']
            }),

            stairs: new Howl({
                urls: ['assets/audio/02-Notebooks/sfx_notebook_stairs.mp3']
            }),

            piano: new Howl({
                urls: ['assets/audio/02-Notebooks/SFX-Notebook-piano-writing-sfx.mp3']
            })
        });
    };
});

/* Brandywiine */
sfx.brandywine = {};
sfx.brandywine.load = _.once(function() {
    _.extend(sfx.brandywine, {
        quote: new Howl({
            urls: ['assets/audio/03-MuseumPhotos/ken-dornstein-MUSEUM-PHOTOS-bite-1.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.brandywine, {
            flash: new Howl({
                urls: ['assets/audio/03-MuseumPhotos/sfx-Museum-camera-flash.mp3']
            }),

            outdoors: new Howl({
                urls: ['assets/audio/03-MuseumPhotos/SFX-MUSEUM-PHOTOS-AMB-OUTDOORS.mp3']
            })
        });
    };
});

/* Tape */
sfx.tapes = {};
sfx.tapes.load = _.once(function() {
    _.extend(sfx.tapes, {
        quote: new Howl({
            urls: ['assets/audio/04-Tape/ken-dornstein-TAPE-bite-2.mp3']
        }),

        empty: new Howl({
            urls: ['assets/audio/04-Tape/empty_sfx.mp3']
        })

    });

    if (!isMobile.any) {
        _.extend(sfx.tapes, {
            insideChatter: new Howl({
                urls: ['assets/audio/04-Tape/SFX-TAPES-INSIDE-CHATTER.mp3']
            }),

            outdoors: new Howl({
                urls: ['assets/audio/04-Tape/SFX-TAPES-OUTDOORS-NIGHT.mp3']
            })
        });
    };
});

/* Post It */
sfx.postit = sfx['post-it'] = {};
sfx.postit.load = _.once(function() {
    _.extend(sfx.postit, {
        quote: new Howl({
            urls: ['assets/audio/05-BearFacts-Post-it/Ken-quote-Bear-post-it.mp3'],
            onend: function() {
                sfx.postit.music.play().fade(0, 1, 500);
            }
        }),

        music: new Howl({
            urls: ['assets/audio/05-BearFacts-Post-it/MUSIC-BearFacts-TRACK6.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.postit, {
            letterSlide: new Howl({
                urls: ['assets/audio/05-BearFacts-Post-it/SFX-Postit-Letter-slide.mp3']
            }),

            notebookOpen: new Howl({
                urls: ['assets/audio/05-BearFacts-Post-it/SFX-Postit-spiralnotebook-open.mp3']
            })
        });
    };
});

/* Box of Effects */
sfx.effects = {};
sfx.effects.load = _.once(function() {
    _.extend(sfx.effects, {
        quote: new Howl({
            urls: ['assets/audio/06-ReturnedEffects/ken-dornstein-Box-bite.mp3'],
            onend: function() {
                sfx.effects.music.play().fade(0, 1, 500);
            }
        }),

        music: new Howl({
            urls: ['assets/audio/06-ReturnedEffects/MUSIC-BOX-TRACK4.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.effects, {
            drone: new Howl({
                urls: ['assets/audio/05-BearFacts-Post-it/SFX-BEARFACTS-HEAVYDRONE.mp3']
            }),

            openBox: new Howl({
                urls: ['assets/audio/06-ReturnedEffects/SFX-open-box.mp3']
            }),

            removeItems: new Howl({
                urls: ['assets/audio/06-ReturnedEffects/SFX-remove-items.m4a']
            }),

            putAway: new Howl({
                urls: ['assets/audio/06-ReturnedEffects/SFX-put-away-items.m4a']
            })
        });
    };
});

/* Lockerbie Collection */
sfx.lockerbie = {};
sfx.lockerbie.load = _.once(function() {
    _.extend(sfx.lockerbie, {
        quote: new Howl({
            urls: ['assets/audio/07-LockerbieCollection/ken-dornstein-LOCKERBIE-bite-1.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.lockerbie, {
            rain: new Howl({
                urls: ['assets/audio/07-LockerbieCollection/SFX-Lockerbie-raindrops.mp3']
            }),

            ambientCity: new Howl({
                urls: ['assets/audio/07-LockerbieCollection/SFX-Lockerbie-town-amb.mp3']
            }),

            ambientCity2: new Howl({
                urls: ['assets/audio/07-LockerbieCollection/SFX-Lockerbie-Town-amb2.mp3']
            }),

            pageTurn: new Howl({
                urls: ['assets/audio/07-LockerbieCollection/SFX-Lockerbie-picture-turn.mp3']
            })
        });
    };
});

/* Map */
sfx.map = {};
sfx.map.load = _.once(function() {
    _.extend(sfx.map, {
        quote: new Howl({
            urls: ['assets/audio/08-Map/ken-dornstein-MAP-bite.mp3']
        }),

        music: new Howl({
            urls: ['assets/audio/08-Map/Map-Music-Limits.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.map, {
            writing: new Howl({
                urls: ['assets/audio/08-Map/SFX-writing-map.mp3']
            }),

            makingmap: new Howl({
                urls: ['assets/audio/08-Map/sfx_map_making_map.mp3']
            }),

            erase: new Howl({
                urls: ['assets/audio/08-Map/SFX-erase-map.mp3']
            }),

            greenfield: new Howl({
                urls: ['assets/audio/08-Map/SFX-MAP-GREEN-FIELDS.mp3']
            }),

            stats: new Howl({
                urls: ['assets/audio/08-Map/sfx_map_stats_index_2.mp3']
            }),

            town: new Howl({
                urls: ['assets/audio/08-Map/SFX-Map-town-Amb.mp3']
            })
        });
    };

});


/* Fuselage */
sfx.fuselage = {};
sfx.fuselage.load = _.once(function() {
    _.extend(sfx.fuselage, {
        quote: new Howl({
            urls: ['assets/audio/09-FuselageTape/kendornsteinFUSELAGEbite_1.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.fuselage, {
            hangerOutside: new Howl({
                urls: ['assets/audio/09-FuselageTape/SFX-outside-hanger.mp3']
            }),

            hangerInside: new Howl({
                urls: ['assets/audio/09-FuselageTape/SFX-inside-hanger.m4a']
            }),

            footsteps: new Howl({
                urls: ['assets/audio/09-FuselageTape/SFX-fuselage-footsteps-new.mp3']
            })
        });
    };
});

/* Libya ID */
sfx.libya = {};
sfx.libya.load = _.once(function() {
    _.extend(sfx.libya, {
        quote: new Howl({
            urls: ['assets/audio/10-LibyanID/ken-dornstein-ID-bite.mp3']
        }),

        music: new Howl({
            urls: ['assets/audio/10-LibyanID/LibyaID-Music-Contemplation.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.libya, {
            sea: new Howl({
                urls: ['assets/audio/10-LibyanID/SFX-ID-OCEANWAVE.mp3']
            }),

            light: new Howl({
                urls: ['assets/audio/10-LibyanID/SFX-ID-Florescent-long.mp3']
            })
        });
    };
});

/* Letter */
sfx.letter = {};
sfx.letter.load = _.once(function() {
    _.extend(sfx.letter, {
        quote: new Howl({
            urls: ['assets/audio/11-Letter/ken-dornstein-LETTER-bite.mp3'],
            onend: function() {
                sfx.letter.music.play().fade(0, .3, 1000);
            }
        }),

        music: new Howl({
            urls: ['assets/audio/11-Letter/Letter-Music-Believe.mp3']
        })
    });

    if (!isMobile.any) {
        _.extend(sfx.letter, {

            open: new Howl({
                urls: ['assets/audio/11-Letter/SFX-Letters-open.mp3']
            }),

            park: new Howl({
                urls: ['assets/audio/11-Letter/SFX-LETTER-PARKAMB.mp3']
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