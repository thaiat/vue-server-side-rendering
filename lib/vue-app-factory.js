'use strict';
const Vue = require('vue');
const path = require('path');
const requireFile = require('./require-file');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function createApp(data, templateFile, components = []) {
    return new Vue({
        data() {
            return data;
        },
        components: components,
        template: requireFile(templateFolder, templateFile)
    });
};