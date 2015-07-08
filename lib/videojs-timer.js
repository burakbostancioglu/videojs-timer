/*! videojs-timer - v0.0.0 - 2015-5-3
 * Copyright (c) 2015 burakbostancioglu,rustylarner
 * Licensed under the Apache-2.0 license. */
(function(window, videojs) {
    'use strict';

    var defaults = {
        option: true
    },
        timer;

    /**
     * Initialize the plugin.
     * @param options (optional) {object} configuration for the plugin
     */
    timer = function(options) {
        var settings = videojs.util.mergeOptions(defaults, options),
            player = this;
        this.on('timeupdate', time_updated);
        this.on('ended', time_updated);
        var last_time = 0;
        var count = 1;
        var position = -1;
        var last_position = -1;
        var duration = this.duration();
        function time_updated(time_update_event){
            var current_time = this.currentTime();
            var duration = this.duration();
            position = Math.floor(current_time / options.interval);
            var mod = Math.floor(current_time) % options.interval;
            if(mod) {
                position += 1;
            }
            if((last_position == position) || (position <= 0)) {
                return;
            }
            last_position = position;
            var time = position * options.interval;
            if(time > duration) {
                time = duration;
            }
            if(time_update_event.type === "ended") {
                time = duration;
            }

            $.event.trigger(options.event_name, {'total': Math.floor(duration), 'position': time});
        }
    };

    // register the plugin
    videojs.plugin('timer', timer);
})(window, window.videojs);
