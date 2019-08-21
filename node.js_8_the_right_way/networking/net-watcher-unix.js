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
    connection.write(`Now watching "${fileName}" for change...\n`);

    // Watcher setup
    const watcher = fs.watch(fileName, () => connection.write(`File changed: ${new Date()}\n`));

    // Cleanup
    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });
});

server.listen('/tmp/watcher.sock', () => console.log('Listening for subscribers...'));