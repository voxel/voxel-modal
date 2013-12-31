module.exports = Modal;

var ever = require('ever');

function Modal(game, opts) 
{
  this.game = game;

  opts = opts || {};
  this.element = opts.element || (function(){ throw "voxel-modal requires 'element' option" })();
  this.escapeKeys = opts.escapeKeys || [27];

  this.isOpen = false;
}

Modal.prototype.open = function() {
  if (this.isOpen) return;

  this.game.interact.release();

  var self = this;
  this.game.interact.on('attain', this.onAttain = function() {
    // clicked game, beyond dialog
    self.close();
  });

  ever(document.body).on('keydown', this.onKeydown = function(ev) {
    if (self.escapeKeys.indexOf(ev.keyCode) !== -1) {
      self.close();
    }
  });

  this.element.style.visibility = '';
  this.isOpen = true;
};

Modal.prototype.close = function() {
  if (!this.isOpen) return;

  this.game.interact.removeListener('attain', this.onAttain);
  ever(document.body).removeListener('keydown', this.onKeydown);

  this.element.style.visibility = 'hidden';

  // resume game interaction
  this.game.interact.request();

  this.isOpen = false;
};

Modal.prototype.toggle = function() {
  if (this.isOpen)
    this.close();
  else
    this.open();
};
