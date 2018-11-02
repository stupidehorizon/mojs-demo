/**
 * this file is taken from mojs demo
 */

'use strict';

import mojs from 'mo-js';

function isIOSSafari() {
  var userAgent;
  userAgent = window.navigator.userAgent;
  return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
};


function isTouch() {
  var isIETouch;
  isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
};


var isIOS = isIOSSafari(),
  clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function Animocon(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);

  this.checked = false;

  this.timeline = new mojs.Timeline();

  for (var i = 0, len = this.options.tweens.length; i < len; ++i) {
    this.timeline.add(this.options.tweens[i]);
  }

  var self = this;
  this.el.addEventListener(clickHandler, function () {
    if (self.checked) {
      self.options.onUnCheck();
    }
    else {
      self.options.onCheck();
      self.timeline.replay();
    }
    self.checked = !self.checked;
  });
}

Animocon.prototype.options = {
  tweens: [
    new mojs.Burst({})
  ],
  onCheck: function () { return false; },
  onUnCheck: function () { return false; }
};

export default Animocon;