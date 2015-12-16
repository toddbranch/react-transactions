describe('store', function() {
  beforeEach(function() {
    this.store = Redux.createStore(reducer);
  });

  describe('CREATE_TRANSACTION', function() {
    it('adds a new transaction to the list', function() {
      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        from: 'Jim',
        to: 'Dwight',
        amount: 200
      });

      var transaction = this.store.getState().transactions[0];

      expect(transaction.from).toBe('Jim');
      expect(transaction.to).toMatch('Dwight');
      expect(transaction.amount).toBe(200);
    });

    it('adds new transactions to the front of the list', function() {
      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        from: 'Jim',
        to: 'Dwight',
        amount: 200
      });

      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        from: 'Andy',
        to: 'Stanley',
        amount: 200
      });

      var transaction = this.store.getState().transactions[0];

      expect(transaction.from).toBe('Andy');
    });

    it('does not add a transaction without from', function() {
      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        to: 'Dwight',
        amount: 200
      });

      var transactions = this.store.getState().transactions;
      expect(transactions.length).toBe(0);
    });

    it('does not add a transaction without to', function() {
      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        from: 'Jim',
        amount: 200
      });

      var transactions = this.store.getState().transactions;
      expect(transactions.length).toBe(0);
    });

    it('does not add a transaction without amount', function() {
      this.store.dispatch({
        type: 'CREATE_TRANSACTION',
        from: 'Jim',
        to: 'Dwight',
      });

      var transactions = this.store.getState().transactions;
      expect(transactions.length).toBe(0);
    });
  });
});
