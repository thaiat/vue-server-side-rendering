'use strict';
const Vue = require('vue');
const requireFile = require('./require-file');
const path = require('path');
const _ = require('lodash');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function (name, component) {
    return Vue.component(name, _.assign({
        template: requireFile(templateFolder, 'components', name + '.html')
    }, component));
};