'use strict';
const netClient = require("net").connect({ port: 60300 });
const ldjClient = require("./lib/ldj-client.js").connect(netClient);

ldjClient.on("message", message => {
    switch (message.type) {
        case "watching":
            console.log(`Now watching: ${message.file}`);
            break;
        case "changed":
            console.log(`File changed: ${new Date(message.timestamp)}`);
            break;
        default:
            throw Error(`Unrecognized message type: ${message.type}`);
    }
});
