const amqp = require('amqplib');

async function publish(queue, message) {
  try {
    // Conecta ao RabbitMQ usando o nome do serviço no Docker Compose
    const conn = await amqp.connect('amqp://rabbitmq:5672');
    const channel = await conn.createChannel();

    // Garante que a fila seja declarada com durable: true (igual ao Spring Boot)
    await channel.assertQueue(queue, { durable: true });

    // Envia a mensagem para a fila
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`[x] Mensagem enviada para ${queue}:`, message);

    // Fecha a conexão após um pequeno delay
    setTimeout(() => {
      conn.close();
    }, 500);
  } catch (error) {
    console.error('Erro ao conectar ao RabbitMQ:', error.message);
  }
}

module.exports = { publish };