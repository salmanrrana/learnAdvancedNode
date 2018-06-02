// This is using webworkers ******
// I am a child. Im going to act like a server and do nothing else
const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function(message) {
    console.log('message is: ', message.data);
    console.log(message);
    res.send('' + message.data);
  };

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast');
});

app.listen(3000);

//*****an overview if how it would be with clustering and us having to code it out
// process.env.UV_THREADPOOL_SIZE = 1;
// const cluster = require('cluster');
//
// // Is the file being executed in master mode?
// if (cluster.isMaster) {
//   // Cause index.js to be executed *again* but in child mode
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
// } else {
//   // I am a child. Im going to act like a server and do nothing else
//   const express = require('express');
//   const crypto = require('crypto');
//   const app = express();
//
//   app.get('/', (req, res) => {
//     crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
//       res.send('Hi there!');
//     });
//   });
//
//   app.get('/fast', (req, res) => {
//     res.send('This was fast');
//   });
//
//   app.listen(3000);
// }

// ****EXPRESS APP BEFORE USING CLUSTERING***
// const express = require('express');
// const app = express();
//
// function doWork(duration) {
//   const start = Date.now();
//   while (Date.now() - start < duration) {}
// }
//
// app.get('/', (req, res) => {
//   doWork(5000);
//   res.send('Hi there!');
// });
//
// app.listen(3000);
