# voxel-modal

Add elements to block game interaction when open (for voxel.js). 

Useful for modal dialogs or other UI widgets. Used by [voxel-modal-dialog](https://github.com/voxel/voxel-modal-dialog).

## Usage

Inherit from the `Modal` class (e.g. using the [inherits](https://npmjs.org/package/inherits) NPM module, or CoffeeScript `extends`).
Pass to the constructor (game, opts), where `game` is the voxel-engine instance, and `opts` is an object of options. Supported options:

* `elements`: your DOM element to hide/show content, should start hidden (required)

* `escapeKeys`: array of key codes to close dialog, default \[192\] (Backquote key) --
note this NOT by default the Escape key, due to undesirable interaction with the Pointer Lock API ([details](https://github.com/voxel/voxel-modal/issues/1))

Call the `open()` method to open, `close()` to close. When "opened", the element is shown,
game interaction is released; when closed, the element is hidden, and game interaction is
resumed. Clicking outside of the element or pressing an escape key will call `close()`.

## Example

Run `npm start` or try the [live demo](http://voxel.github.io/voxel-modal).
In this demo, try moving around in the game, then hit "B" (boss key) to open the modal element, then Escape
or click outside to close it; notice how interaction (pointer lock, FPS keybindings) is released/attained
appropriately.

## License

MIT

