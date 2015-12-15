describe('helpers', function() {
  beforeEach(function() {
    store = Redux.createStore(reducer);
  });

  describe('#sendTransaction', function() {
    it('emits a transaction event on the socket', function() {
      sendTransaction();

      expect(socket.emit).toHaveBeenCalled();
      expect(socket.emit.calls.first().args[0]).toBe('transaction');
    });

    it('creates a transaction in the local store', function() {
      spyOn(store, 'dispatch');
      sendTransaction();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch.calls.first().args[0].type)
        .toBe('CREATE_TRANSACTION');
    });
  });

  describe('#createTransactions', function() {
    it('adds each transaction to the list in reverse order', function() {
      createTransactions([
        {from: 'Jim', to: 'Dwight', amount: 200},
        {from: 'Michael', to: 'Toby', amount: 100},
        {from: 'Dwight', to: 'Michael', amount: 175}
      ]);

      var transactions = store.getState().transactions;

      expect(transactions.length).toBe(3);
      expect(transactions[0].from).toBe('Jim');
    });
  });
});
