'use strict';

var appFactory = require('./lib/vue-app-factory');
var renderer = require('./lib/vue-renderer');
const axios = require('axios');
const mail = require('./lib/mail');

const EMAIL_TO = ['thaiat@yoobic.com'];
axios.all([axios.get('https://randomuser.me/api/?page=3&results=10&seed=abc'), axios.get('https://randomapi.com/api/el3rc6as?key=2D3S-2MX2-EHXY-DDF6')])
    .then(axios.spread((users, food) => {
        console.log(food);
        return users;
    }))
    .then(() => {
        throw new Error('ee');
    })
    .then(response => response.data.results)
    .then(users => {
        console.time('generation');
        const data = {
            message: 'Yoo!!!!',
            display: false,
            color: 'yellow',
            users: users,
            card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
        };

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