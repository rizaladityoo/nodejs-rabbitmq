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
        let message = "This is message"
        channel.assertQueue(queueName,{
            durable: false
        })
        channel.sendToQueue(queueName, Buffer.from(message))
        console.log({message});
        setTimeout(() => {
            connection.close()
        }, 1000)
    })
})