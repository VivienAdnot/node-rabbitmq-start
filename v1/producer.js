var Channel = require('./channel');

var queueId = 'queue';

Channel(queueId, function(err, channel, conn) {

    if (err) {

        console.error(err.stack);

    }
    else {

        console.log('channel and queue created');
        var work = 'make me a sandwich';

        // rabbitMQ will persist message into persistent storage
        // allowing it to survive crashes or server restarts
        channel.sendToQueue(queueId, Buffer.from(work));

        // let the channel a chance to send the message before closing the queue
        setTimeout(function() {

            channel.close();
            conn.close();

        }, 500);

    }

});