/*! videojs-timer - v0.0.0 - 2015-5-3
 * Copyright (c) 2015 burakbostancioglu
 * Licensed under the Apache-2.0 license. */
(function(window, videojs, qunit)  {
  'use strict';

  var realIsHtmlSupported,
      player, clock, callback,

      // local QUnit aliases
      // http://api.qunitjs.com/

      // module(name, {[setup][ ,teardown]})
      module = qunit.module,
      // test(name, callback)
      test = qunit.test,
      // ok(value, [message])
      ok = qunit.ok,
      // equal(actual, expected, [message])
      equal = qunit.equal,
      // strictEqual(actual, expected, [message])
      strictEqual = qunit.strictEqual,
      // deepEqual(actual, expected, [message])
      deepEqual = qunit.deepEqual,
      // notEqual(actual, expected, [message])
      notEqual = qunit.notEqual,
      // throws(block, [expected], [message])
      throws = qunit.throws;

  module('videojs-timer', {
    setup: function() {
      // force HTML support so the tests run in a reasonable
      // environment under phantomjs
      realIsHtmlSupported = videojs.Html5.isSupported;
      videojs.Html5.isSupported = function() {
        return true;
      };

      // create a video element
      var video = document.createElement('video');
      document.querySelector('#qunit-fixture').appendChild(video);
      // create a video.js player
      player = videojs(video);
      player.duration = function (){return 46.6};
      // initialize the plugin with the default options
      player.timer({"interval":15,"event_name":"test"});
    },
    teardown: function() {
      videojs.Html5.isSupported = realIsHtmlSupported;
      document.removeEventListener("test", callback);
    }
  });

  test('registers itself', function() {
    ok(player.timer, 'registered the plugin');
  });

  test('check_event_first_block', function(){
      player.currentTime = function (){return 3};
      player.trigger("play");
      callback = function(e){
        equal(15,e.detail.position);  
      }
      document.addEventListener("test", callback);
      player.trigger("timeupdate");
  });

  test('check_event_last_block', function(){
      player.currentTime = function (){return 44};
      player.trigger("play");
      callback = function(e){
        equal(45,e.detail.position);  
      }
      document.addEventListener("test", callback);
      player.trigger("timeupdate");
  });

  test('check_event_on_end', function(){
      player.currentTime = function (){return 46.6};
      player.trigger("play");
      callback = function(e){
        equal(46.6, e.detail.position);  
      }
      document.addEventListener("test", callback);
      player.trigger("ended");
  });

  test('check_event_only_once_per_position', function(){
      qunit.expect(0);
      player.trigger("play");
      player.currentTime = function (){return 14};
      player.trigger("timeupdate");
      callback = function(e){
          ok(false, 'Should not get here');
      }
      document.addEventListener("test", callback);
      player.currentTime = function (){return 15};
      player.trigger("timeupdate");
  });

  test('check_no_event_for_negative', function(){
      qunit.expect(0);
      player.trigger("play");
      player.currentTime = function (){return -14};
      callback = function(e){
          ok(false, 'Should not get here');
      }
      document.addEventListener("test", callback);
      player.trigger("timeupdate");
  });

})(window, window.videojs, window.QUnit);
