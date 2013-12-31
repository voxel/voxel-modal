var Modal = require('./');
var inherits = require('inherits');

function Boss(game, opts)
{
  this.game = game;

  var element = document.createElement('iframe');
  element.style.visibility = 'hidden';
  element.setAttribute('src', 'http://www.stackoverflow.com/');

  this.element = opts.element = element;
  Modal.constructor.call(this)(game, opts);
}
inherits(Boss, Modal);

var game = require('voxel-hello-world')({mesher: require('voxel').meshers.greedy});


var boss = new Boss(game, {});

window.addEventListener('keydown', function(ev) {
  if (ev.keyCode === 'B'.charCodeAt(0)) {
    boss.open();
  }
  });
