'use strict';
var componentFactory = require('../../lib/vue-component-factory');

var Hello = componentFactory('hello', {
    props: ['color', 'users', 'card_text']
});

module.exports = Hello;