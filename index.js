// # vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab:

module.exports = Modal;

function Modal(game, opts) 
{
  this.game = game;

  opts = opts || {};
  this.element = opts.element || (function(){ throw "voxel-modal requires 'element' option" })();

  this.isOpen = false;
}

Modal.prototype.open = function() {
  this.game.interact.release();

  var self = this;
  this.game.interact.on('attain', function() {
    // clicked game, beyond dialog
    self.close();
  });

  this.element.style.visibility = '';
  this.isOpen = true;
};

Modal.prototype.close = function() {
  this.element.style.visibility = 'hidden';

  //this.game.interact.request(); // TODO: only request if don't have, or catch error?

  this.isOpen = false;
};

Modal.prototype.toggle = function() {
  if (this.isOpen)
    this.close();
  else
    this.open();
};
