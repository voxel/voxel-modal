'use strict';

const Modal = require('../');

class Boss extends Modal {
  constructor(game, opts) {
    super(game, Object.assign(opts, { element: getCover() }));

    function getCover() {
      // an example modal element
      const cover = document.createElement('iframe');
      cover.style.visibility = 'hidden';
      cover.style.position = 'absolute';
      cover.style.top = '100px';    // give some room for user to click outside of to close
      cover.setAttribute('src', 'http://browserify.org/');
      cover.setAttribute('width', '100%');
      cover.setAttribute('height', '100%');
      document.body.appendChild(cover);

      return cover;
    }
  }
}

const game = require('voxel-hello-world')({mesher: require('voxel').meshers.greedy});

const boss = new Boss(game, {});

window.addEventListener('keydown', (ev) => {
  if (ev.keyCode === 'B'.charCodeAt(0)) {    // press 'B' to open
    boss.open();
  }
});
