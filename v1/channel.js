var amqp = require('amqplib/callback_api');

var url = 'amqp://guest:guest@localhost:5672';

module.exports = createQueueChannel;

function createQueueChannel(queue, cb) {

    amqp.connect(url, onceConnected);

    function onceConnected(err, conn) {

        if (err) {

            console.error('error connecting', err.stack);
        
        }
        else {

            console.log('connected');
            conn.createChannel(onceChannelCreated);

        }

        function onceChannelCreated(err, channel) {
    
            if (err) {
    
                cb(err);
    
            }
            else {
    
                console.log('channel created');
                channel.assertQueue(queue, { durable: true }, onceQueueCreated);
    
            }
    
            function onceQueueCreated(err) {
        
                if (err) {
        
                    cb(err);
        
                }
                else {
        
                    console.log('queue created');
                    cb(null, channel, conn);
        
                }
        
            }
    
        }

    }

}