'use strict';

var appFactory = require('./lib/vue-app-factory');
var renderer = require('./lib/vue-renderer');
const axios = require('axios');
const mail = require('./lib/mail');
axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data)
    .then(users => {
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
        return renderer('index.template.html', ['../node_modules/vuetify/dist/vuetify.min.css', 'style.css'], app);
    })
    .then(html => {
        mail.send({
            email: {
                to: ['thaiat@yoobic.com'],
                html: html,
                subject: 'Vuejs template'
            }
        });
    });