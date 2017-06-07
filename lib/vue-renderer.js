'use strict';
const requireFile = require('./require-file');
const path = require('path');
const juice = require('juice');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function (templateFile, styleFile, app) {
    // this goes into the main html template
    const context = {
        title: 'Yoobic',
        meta: `
       `,
        style: styleFile ? requireFile(templateFolder, styleFile) : ''
    };

    const renderer = require('vue-server-renderer').createRenderer({
        template: requireFile(templateFolder, templateFile)
    });

    // Render the Vue instance to HTML
    return new Promise((resolve, reject) => {
        renderer.renderToString(app, context, (err, html) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(juice(html));
        });
    });
};