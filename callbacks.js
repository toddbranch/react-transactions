var store = Redux.createStore(reducer);
var socket = io();

function updateFrom(e) {
  store.dispatch({
    type: 'UPDATE_FROM',
    text: e.target.value
  });
}

function updateTo(e) {
  store.dispatch({
    type: 'UPDATE_TO',
    text: e.target.value
  });
}

function updateAmount(e) {
  store.dispatch({
    type: 'UPDATE_AMOUNT',
    text: e.target.value
  });
}

function sendTransaction() {
  var state = store.getState();

  socket.emit('transaction', {
    from: state.from,
    to: state.to,
    amount: state.amount
  });

  store.dispatch({
    type: 'CREATE_TRANSACTION',
    from: state.from,
    to: state.to,
    amount: state.amount
  });
}

function createTransactions(transactions) {
  transactions.reverse().forEach(function(transaction) {
    store.dispatch({
      type: 'CREATE_TRANSACTION',
      from: transaction.from,
      to: transaction.to,
      amount: transaction.amount
    });
  });
}

socket.on('transactions', createTransactions);
