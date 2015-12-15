var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var transactions = [
  {from: 'Jim', to: 'Dwight', amount: 200},
  {from: 'Michael', to: 'Toby', amount: 100},
  {from: 'Dwight', to: 'Michael', amount: 175},
  {from: 'Creed', to: 'Jim', amount: 50}
];

app.use(express.static('.'));

io.on('connection', function(socket) {
  socket.emit('transactions', transactions);
  socket.on('transaction', function(transaction) {
    transactions.unshift(transaction);
    socket.broadcast.emit('transactions', [transaction]);
  });
});

http.listen(3000, function() {
  console.log('listening on 3000');
});
