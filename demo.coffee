Modal = require('./');

class Boss extends Modal
  constructor: (@game, opts) ->
    # an example modal element
    @cover = document.createElement('iframe')
    @cover.style.visibility = 'hidden'
    @cover.style.position = 'absolute'
    @cover.style.top = '100px'    # give some room for user to click outside of to close
    @cover.setAttribute 'src', 'http://microsoft.com/'
    @cover.setAttribute 'width', '100%'
    @cover.setAttribute 'height', '100%'
    document.body.appendChild(@cover)

    opts.element = @cover

    super game, opts

game = require('voxel-hello-world')({mesher: require('voxel').meshers.greedy})

boss = new Boss(game, {});

window.addEventListener 'keydown', (ev) ->
  if ev.keyCode == 'B'.charCodeAt(0)    # press 'B' to open
    boss.open()
