'use strict';
const _ = require('lodash');
const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_API);// || '7058657b2fd59ca53ecc3b57037b88fbf135e283');

var DEFAULT_FROM = require('./mail-config').DEFAULT_FROM;

var mailObjectToString = function(mail) {
    return mail.name ? `"${mail.name}" <${mail.email}>` : mail.email;
};

var send = function(options) {
    let from = options.email.from;
    let to = options.email.to;
    let subject = options.email.subject;
    let html = options.email.html;
    let text = options.email.text;
    let reply_to = from || DEFAULT_FROM; // use reply_to with from as we cannot send mail in behalf of users outside the yoobic domain
    let inline_images = options.email.inline_images;
    let attachments = options.email.attachments;
    let sparkpostOptions = {
        content: {
            from: DEFAULT_FROM,
            subject: subject,
            html: html,
            text: text,
            reply_to: mailObjectToString(reply_to)
        },
        recipients: _.map(to, mail => {
            return {
                address: mail
            };
        })
    };
    if (inline_images) {
        sparkpostOptions.content.inline_images = inline_images;
    }
    if (attachments) {
        sparkpostOptions.content.attachments = attachments;
    }

    return client.transmissions
        .send(sparkpostOptions)
        .then(response => {
            return response;
        });
};

module.exports = {
    send
};