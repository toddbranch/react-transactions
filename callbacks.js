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
}

function getUsers(transactions) {
  return _.chain(transactions)
    .map(function(transaction) {
      return [transaction.to, transaction.from];
    })
    .flatten()
    .uniq()
    .without('Deposit')
    .value();
}

function getBalances(transactions) {
  var balances = transactions.reduce(function(memo, transaction) {
    var amount = parseInt(transaction.amount, 10);

    if (!memo[transaction.from]) {
      memo[transaction.from] = 0;
    }

    memo[transaction.from] -= amount;

    if (!memo[transaction.to]) {
      memo[transaction.to] = 0;
    }

    memo[transaction.to] += amount;

    return memo;
  }, {});

  delete balances.Deposit;

  return balances;
}

function isSendEnabled(from, to, amount, transactions) {
  var balances = getBalances(transactions);

  return /^\d+$/.test(amount) &&
    from.length > 0 &&
    balances[from] >= parseInt(amount, 10) &&
    to.length > 0;
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
