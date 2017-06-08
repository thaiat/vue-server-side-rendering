'use strict';
const requireFile = require('./require-file');
const path = require('path');
const _ = require('lodash');
const juice = require('juice');
const templateFolder = path.join(__dirname, '..', 'templates');
module.exports = function(templateFile, styleFiles, app, resolveStyles = false) {
    let style = '';
    if (styleFiles) {
        // make sure we always get an array
        styleFiles = [].concat(styleFiles);
        style = _.map(styleFiles, (styleFile) => {
            return requireFile(templateFolder, styleFile);
        }).join('\n');
    }
    // this goes into the main html template
    const context = {
        title: 'Yoobic',
        meta: `
       `,
        style: style
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
            if (resolveStyles) {
                console.log('resolving style with juice');
                resolve(juice(html));
            } else {
                console.log('not resolving style with juice');
                resolve(html);
            }
        });
    });
};