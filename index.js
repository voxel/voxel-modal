// # vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab:

module.exports = function(game, opts) {
  return new Modal(game, opts);
};

function Modal(game, opts) 
{
  opts = opts || {};
  this.element = opts.element || (function(){ throw "voxel-modal requires 'element' option" })();
  this.game = game;
}

Modal.prototype.open = function() {
  this.game.interact.release();

  var self = this;
  this.game.interact.on('attain', function() {
    // clicked game, beyond dialog
    this.close();
  });

  this.element.style.visibility = '';
};

Modal.prototype.close = function() {
  this.element.style.visibility = 'hidden';

  //this.game.interact.request(); // TODO: only request if don't have, or catch error?
};
