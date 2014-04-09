/*jshint globalstrict: true*/
'use strict';

module.exports = Modal;

var ever = require('ever');

function Modal(game, opts) 
{
  this.game = game;

  opts = opts || {};
  this.element = opts.element;
  if (!this.element) throw new Error('voxel-modal requires "element" option');

  // shortcut to close:
  // ` (backquote) -- NOT escape due to pointer-lock https://github.com/deathcap/voxel-modal/issues/1
  // if you don't have "`", alternative is to click the game canvas (closes automatically on attain)
  this.escapeKeys = opts.escapeKeys || [192]; 

  this.isOpen = false;
}

Modal.prototype.open = function() {
  if (this.isOpen) return;

  var self = this;

  if (this.game.interact) {
    this.game.interact.release();

    this.game.interact.on('attain', this.onAttain = function() {
      // clicked game, beyond dialog TODO: game-shell needs this, too!
      self.close();
    });
  } else if (this.game.shell) {
    this.game.shell.pointerLock = false;
  }

  ever(document.body).on('keydown', this.onKeydown = function(ev) {
    if (self.escapeKeys.indexOf(ev.keyCode) !== -1) {
      self.close();
      ev.preventDefault();
    }
  });

  this.element.style.visibility = '';
  this.isOpen = true;
};

Modal.prototype.close = function() {
  if (!this.isOpen) return;

  ever(document.body).removeListener('keydown', this.onKeydown);

  this.element.style.visibility = 'hidden';

  // resume game interaction
  if (this.game.interact) {
    this.game.interact.removeListener('attain', this.onAttain);
    this.game.interact.request();
  } else if (this.game.shell) {
    this.game.shell.pointerLock = true;
  }

  this.isOpen = false;
};

Modal.prototype.toggle = function() {
  if (this.isOpen)
    this.close();
  else
    this.open();
};
