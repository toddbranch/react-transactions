var transactionId = 0;

function createTransaction(from, to, amount) {
  transactionId += 1;

  return {
    id: transactionId,
    from: from,
    to: to,
    amount: amount
  };
}

var reducer = function(state, action) {
  var defaultState = {
    transactions: [],
    from: '',
    to: '',
    amount: '',
    sendEnabled: false
  };

  state = state || defaultState;

  switch (action.type) {
    case 'CREATE_TRANSACTION':
      if (action.from && action.to && action.amount) {
        var transaction = createTransaction(
          action.from,
          action.to,
          action.amount
        );
        state.transactions.unshift(transaction);
      }
      break;
    case 'UPDATE_FROM':
      state.from = action.text;
      break;
    case 'UPDATE_TO':
      state.to = action.text;
      break;
    case 'UPDATE_AMOUNT':
      state.amount = action.text;
      break;
  }

  state.sendEnabled = /^\d+$/.test(state.amount) &&
    state.from.length > 0 &&
    state.to.length > 0;

  return state;
};
