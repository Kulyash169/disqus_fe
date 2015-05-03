(function() {
  'use strict';
  var $this, module;

  chrome.browserAction.setBadgeText({
    text: "" + m
  });

  module = typeof exports !== "undefined" && exports !== null ? exports : this;

  $this = {
    getComments: function(url, callback, errback) {},
    getCount: function(url, callback, errback) {},
    newComment: function(url, title, email, comment, callback, errback) {}
  };

  module.Backend = $this;

}).call(this);
