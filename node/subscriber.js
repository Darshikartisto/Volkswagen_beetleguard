// const { createClient } = require('redis');

// // Connect to Redis
// const redisClient = createClient({
//     url: 'redis://localhost:6379'
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// // Subscribe to the Redis channel
// async function subscribe() {
//     await redisClient.connect();
//     await redisClient.subscribe('detection_channel', (message) => {
//         console.log(`Received message: ${message}`);
//     });
// }

// subscribe();
const WebSocket = require('ws');
const { createClient } = require('redis');

// Initialize Redis client
const redisClient = createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// WebSocket server setup
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket server');

    // Listen to messages from WebSocket client
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });

    // Handle WebSocket close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Connect to Redis and subscribe to the channel
async function subscribe() {
    await redisClient.connect();
    await redisClient.subscribe('detection_channel', (message) => {
        console.log(`Received Redis message: ${message}`);

        // Broadcast message to all connected WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Send the message to the WebSocket client
            }
        });
    });
}

subscribe();
