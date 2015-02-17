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

  if (this.game.shell) {
    // exit pointer lock so user can interact with the modal element
    this.game.shell.pointerLock = false;

    // but re-"want" it so clicking the canvas (outside the modal) will
    // activate pointer lock (misleading assignment; requires user interaction)
    this.game.shell.pointerLock = true;

    // when user successfully acquires pointer lock by clicking the game-shell
    // canvas, get out of the way
    // TODO: ask game-shell to emit an event for us
    var self = this;
    ever(document).on('pointerlockchange', self.onPointerLockChange = function() {
      if (document.pointerLockElement) {
        // pointer lock was acquired - close ourselves, resume gameplay
        self.close();
        ever(document).removeListener('pointerlockchange', self.onPointerLockChange); // can't seem to use .once with ever (TypeError document removeListener)
      }
    });
    // webkit prefix for older browsers (< Chrome 40)
    ever(document).on('webkitpointerlockchange', self.onWKPointerLockChange = function() {
      if (document.webkitPointerLockElement) {
        self.close();
        ever(document).removeListener('webkitpointerlockchange', self.onWKPointerLockChange);
      }
    });
    // moz prefix for Firefox
    ever(document).on('mozpointerlockchange', self.onMPointerLockChange = function() {
      if (document.mozPointerLockElement) {
        self.close();
        ever(document).removeListener('mozpointerlockchange', self.onMPointerLockChange);
      }
    });
  } else if (this.game.interact) {
    this.game.interact.release();

    this.game.interact.on('attain', this.onAttain = function() {
      // clicked game, beyond dialog TODO: game-shell needs this, too!
      self.close();
    });
  } else {
    throw new Error('voxel-modal requires game-shell or interact');
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
  if (this.game.shell) {
    this.game.shell.pointerLock = true;
  } else if (this.game.interact) {
    this.game.interact.removeListener('attain', this.onAttain);
    this.game.interact.request();
  }

  this.isOpen = false;
};

Modal.prototype.toggle = function() {
  if (this.isOpen)
    this.close();
  else
    this.open();
};
