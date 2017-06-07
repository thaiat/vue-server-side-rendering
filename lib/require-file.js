'use strict';
const fs = require('fs');
const path = require('path');
module.exports = function () {
    return fs.readFileSync(path.join(...arguments), 'utf-8');
};