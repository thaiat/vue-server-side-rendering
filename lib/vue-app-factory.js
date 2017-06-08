'use strict';
const Vue = require('vue');
const Vuetify = require('vuetify').default;
const VueI18n = require('vue-i18n');
const path = require('path');
const requireFile = require('./require-file');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function createApp(data, templateFile, components = []) {
    Vue.use(Vuetify);
    Vue.use(VueI18n);

    const messages = {
        en: {
            message: {
                hello: 'hello world {name}'
            }
        },
        ja: {
            message: {
                hello: 'こんにちは、世界 {name}'
            }
        }
    };
    const i18n = new VueI18n({
        locale: 'ja', // set locale
        messages // set locale messages
    });

    return new Vue({
        i18n,
        data() {
            return data;
        },
        components: components,
        template: requireFile(templateFolder, templateFile)
    });
};