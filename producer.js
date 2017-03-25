
"use strict";
var amqp            =   require('amqplib/callback_api');

var rabbitmq_conn   =   "amqp://localhost:15672";
var config          =   require("./config");
    var queueName       =   config.queueName; 

var message         =   "Hello World";
let i = 1;

amqp.connect(function(err, conn) {
    conn.createChannel(function(err, ch){
        ch.assertQueue(queueName, {durable : false});

        setInterval(function() {
            console.log("Message pushed");
            ch.sendToQueue(queueName, new Buffer(message + " " + i++));
        }, 2000);
    });
});
