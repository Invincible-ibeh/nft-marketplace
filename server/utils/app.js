
const cluster = require('express-cluster');
const express = require('express');
const app = express();
const port = 3000;

// Add your middleware and routes here

cluster(function(worker) {
  app.listen(port, () => {
    console.log(`Worker ${worker.id} listening on port ${port}`);
  });
}, { count: 4 }); // Number of worker processes

cluster.run();