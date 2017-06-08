   'use strict';

   const base64image = require('base64-img');
   module.exports = function(Vue) {
       Vue.filter('base64', function(value) {
           return base64image.base64Sync(value);
       });
   };