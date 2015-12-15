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

  describe('state#sendEnabled', function() {
    it('is enabled if to, from, and amount have good values', function() {
      this.store.dispatch({
        type: 'UPDATE_AMOUNT',
        text: '200'
      });

      this.store.dispatch({
        type: 'UPDATE_FROM',
        text: 'Kelly'
      });

      this.store.dispatch({
        type: 'UPDATE_TO',
        text: 'Ryan'
      });

      expect(this.store.getState().sendEnabled).toBe(true);

    });

    it('is not enabled if to is empty', function() {
      this.store.dispatch({
        type: 'UPDATE_AMOUNT',
        text: '200'
      });

      this.store.dispatch({
        type: 'UPDATE_FROM',
        text: 'Kelly'
      });

      expect(this.store.getState().sendEnabled).toBe(false);
    });

    it('is not enabled if from is empty', function() {
      this.store.dispatch({
        type: 'UPDATE_AMOUNT',
        text: '200'
      });

      this.store.dispatch({
        type: 'UPDATE_TO',
        text: 'RYAN'
      });

      expect(this.store.getState().sendEnabled).toBe(false);
    });

    it('is not enabled if amount is non-numeric', function() {
      this.store.dispatch({
        type: 'UPDATE_AMOUNT',
        text: '200a'
      });

      this.store.dispatch({
        type: 'UPDATE_FROM',
        text: 'Kelly'
      });

      this.store.dispatch({
        type: 'UPDATE_TO',
        text: 'RYAN'
      });

      expect(this.store.getState().sendEnabled).toBe(false);
    });
  });
});
