# vue-json-editor-block-view

Json editor(block view) for Vue

## Requirements

* Vue >= 2.2.1

## Installation

```bash
npm i vue-json-editor-block-view -S
```

## Usage

You should always call the `Vue.use()` global method:

```js
import Vue from 'vue';
import JsonEditor from 'vue-json-editor-block-view'

Vue.use(JsonEditor);
```

Then you can use the components in your template.

```html
<v-json-editor
    :data="myData"
    :editable="editable"
    @change="$forceUpdate()"
></v-json-editor>
```
`data`: json formatted data.
`editable`: set true to turn on edit mode
`@change`: whenever data change, this event will be trigger.

## Demo

* [Normal usage with edit mode](https://jsfiddle.net/013mnez9/3/)

##Source code

* [vue-json-editor](https://github.com/LeoZlZhang/vue-json-editor.git)

