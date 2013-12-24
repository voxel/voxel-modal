// # vim: set shiftwidth=2 tabstop=2 softtabstop=2 expandtab:

module.exports = function(game, opts) {
  return new Dialog(game, opts);
};

function Dialog(game, opts) 
{
  opts = opts || {};
  this.div = opts.div || (function(){ throw "voxel-dialog requires 'div' option" })();
  this.game = game;
}

Dialog.prototype.open = function() {
  this.game.interact.release();

  var self = this;
  this.game.interact.on('attain', function() {
    // clicked game, beyond dialog
    this.close();
  });

  this.div.style.visibility = '';
};

Dialog.prototype.close = function() {
  this.div.style.visibility = 'hidden';

  //this.game.interact.request(); // TODO: only request if don't have, or catch error?
};
