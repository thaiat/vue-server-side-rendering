'use strict';
const Vue = require('vue');
const Vuetify = require('vuetify').default;
const path = require('path');
const requireFile = require('./require-file');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function createApp(data, templateFile, components = []) {
    Vue.use(Vuetify);
    return new Vue({
        data() {
            return data;
        },
        components: components,
        template: requireFile(templateFolder, templateFile)
    });
};