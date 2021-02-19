const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost',(err, connection) => {
    if(err){
        console.log(err,"err");
        throw err;
    }
    connection.createChannel((err,channel)=>{
        if(err){
            console.log(err,"err");
            throw err;
        }
        let queueName = "technical"
        channel.assertQueue(queueName,{
            durable: false
        })
        channel.consume(queueName,(msg)=>{
            console.log(msg.content.toString());
            channel.ack(msg) //udah consume langsung apus
        },
        // {
        //     noAck: true //kalau ngga ada channel auto dihapus
        // }
        )
    })
})