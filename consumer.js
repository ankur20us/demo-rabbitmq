var amqp            =   require('amqplib/callback_api');
var rabbitmq_conn   =   "amqp://localhost:15672";
//Taking the queueName name from the config
var config          =   require("./config");
    var queueName       =   config.queueName; 

amqp.connect(function(err, conn) {
    conn.createChannel(function(err, ch){
        ch.assertQueue(queueName, {durable : false});

        setInterval(function() {
            //Consuming the queueName and getting the message when available.
            ch.consume(queueName, function(message){
                console.log(message.content.toString());
            });
        }, 2000)
    });
});