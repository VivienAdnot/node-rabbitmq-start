// the worker consumes the messages

var Channel = require('./channel');

var queueId = 'queue';

Channel(queueId, function(err, channel, conn) {

    if (err) {

        console.error(err.stack);
    
    }
    else {

        console.log('channel and queue created');
        consume();

    }

    function consume() {

        var options = {};
        channel.get(queueId, options, onConsume);

        function onConsume(err, msg) {

            if (err) {

                console.warn(err.message);

            }
            else if(msg) {

                console.log('consuming %j', msg.content.toString());

                setTimeout(function() {

                    channel.ack(msg);
                    consume();

                }, 1000);

            }
            else {

                console.log('no message, waiting...');
                setTimeout(consume, 1000);

            }

        }

    }

});