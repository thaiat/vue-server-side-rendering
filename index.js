'use strict';

var appFactory = require('./lib/vue-app-factory');
var renderer = require('./lib/vue-renderer');
const axios = require('axios');
axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data)
    .then(users => {
        const data = {
            message: 'Yoo!!!!',
            display: false,
            color: 'yellow',
            users: users
        };

        var app = appFactory(data, 'index.html', [
            require('./templates/components/Hello')
        ]);
        return renderer('index.template.html', 'style.css', app);
    })
    .then(res => {
        console.log(res);
    });