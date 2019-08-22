'user strict';
const fs = require('fs');
const net = require('net');
const fileName = process.argv[2];

if (!fileName) {
    throw Error('Error: No fileName specified.');
}

const server = net.createServer(connection => {
    // Reporting
    console.log('Subscriber connected.');
    connection.write(JSON.stringify({ type: 'watching', file: fileName }) + '\n');

    // Watcher setup
    const watcher = fs.watch(fileName, () => connection.write(JSON.stringify({ type: 'changed', timestamp: Date.now() }) + '\n'));

    // Cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });
});

server.listen(60300, () => console.log('Listening for subscribers...'));