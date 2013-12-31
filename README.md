# voxel-modal

Add elements to block game interaction when open (for voxel.js). 

Useful for modal dialogs or other UI widgets. Used by [voxel-modal-dialog](https://github.com/deathcap/voxel-modal-dialog).

## Usage

Inherit from the `Modal` class (e.g. using the [inherits](https://npmjs.org/package/inherits) NPM module, or CoffeeScript `extends`).
Pass to the constructor (game, opts), where `game` is the voxel-engine instance, and `opts` is an object of options. Supported options:

elements: your DOM element to hide/show content, should start hidden (required)

escapeKeys: array of key codes to close dialog, default \[27\] (Esc key)

Call the `open()` method to open, `close()` to close. When "opened", the element is shown,
game interaction is released; when closed, the element is hidden, and game interaction is
resumed. Clicking outside of the element or pressing an escape key will call `close()`.

## License

MIT

