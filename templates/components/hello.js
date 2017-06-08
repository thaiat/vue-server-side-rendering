'use strict';
var componentFactory = require('../../lib/vue-component-factory');
var _ = require('lodash');
var Hello = componentFactory('hello', {
    props: ['color', 'users', 'card_text'],
    computed: {
        fullNames() {
            return this.users.map(user => {
                return _.capitalize(user.name.title) + ' ' + _.capitalize(user.name.first) + ' ' + _.capitalize(user.name.last);
            });
        }
    }
});

module.exports = Hello;