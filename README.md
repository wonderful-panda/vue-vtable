[![Build Status](https://travis-ci.org/wonderful-panda/vue-vtable.svg?branch=master)](https://travis-ci.org/wonderful-panda/vue-vtable)

# vue-vtable

Table (grid view) component for Vue

*   resizable columns
*   light weight (render visible rows only)

[DEMO](http://wonderful-panda.github.io/vue-vtable/example)

## Requirement

Vue >= 2.5.13

## Breaking changes

### 0.14.0

*   only support Vue >= 2.5.13
*   only support TypeScript >= 2.8

### 0.11.0

#### vlist

*   remove prop `items`, add `itemCount` and `sliceItems` instead.

#### vtable

*   remove prop `initialWidths`, add `widths` instead.
    When specifying `widths`, must be `v-bind:widths.sync`.
*   remove `columnresize` event. use `widths` instead to watch column resizing.

## Usage

Not documented yet.
See [example](/.storybook/stories)

## License

MIT
