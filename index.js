'use strict';

var appFactory = require('./lib/vue-app-factory');
var renderer = require('./lib/vue-renderer');
const axios = require('axios');
const mail = require('./lib/mail');

const EMAIL_TO = ['thaiat@yoobic.com'];
axios.all([
        axios.get('https://randomuser.me/api/?page=3&results=10&seed=abc'),
        axios.get('https://randomapi.com/api/el3rc6as?key=2D3S-2MX2-EHXY-DDF6'),
        axios.get('http://hipsterjesus.com/api/?html=true')
    ])
    .then(axios.spread((userResponse, foodResponse, loremResponse) => {
        const data = {
            message: 'Yoo!!!!',
            display: false,
            color: 'yellow',
            users: userResponse.data.results,
            food: foodResponse.data.results[0].food,
            card_text: loremResponse.data.text
        };
        return data;
    }))
    .then(data => {
        console.time('generation');

        var app = appFactory(data, 'index.html', [
            require('./templates/components/Hello')
        ]);
        return renderer('index.template.html', ['../node_modules/vuetify/dist/vuetify.min.css', 'style.css'], app, true);
    })
    .then(html => {
        console.timeEnd('generation');
        return mail.send({
            email: {
                to: EMAIL_TO,
                html: html,
                subject: 'Vuejs template'
            }
        });
    })
    .then(res => {
        console.log('Email was sent to ', EMAIL_TO);
    });