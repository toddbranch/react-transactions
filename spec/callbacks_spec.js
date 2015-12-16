describe('callbacks', function() {
  beforeEach(function() {
    store = Redux.createStore(reducer);
  });

  describe('#sendTransaction', function() {
    it('emits a transaction event on the socket', function() {
      sendTransaction();

      expect(socket.emit).toHaveBeenCalled();
      expect(socket.emit.calls.first().args[0]).toBe('transaction');
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

  describe('#getBalances', function() {
    it('computes balances from a list of transactions', function() {
      var transactions = [
        {from: 'Jim', to: 'Dwight', amount: 200},
        {from: 'Michael', to: 'Toby', amount: 100},
        {from: 'Dwight', to: 'Michael', amount: 175}
      ];

      var balances = getBalances(transactions);

      expect(balances).toEqual({
        Jim: -200,
        Dwight: 25,
        Michael: 75,
        Toby: 100
      });
    });

    it('does not show deposits', function() {
      var transactions = [
        {from: 'Dwight', to: 'Michael', amount: 175},
        {from: 'Deposit', to: 'Dwight', amount: 200}
      ];

      var balances = getBalances(transactions);

      expect(balances).toEqual({
        Dwight: 25,
        Michael: 175,
      });

    });
  });

  describe('#getUsers', function() {
    it('computes a list of users from a list of transactions', function() {
      var transactions = [
        {from: 'Jim', to: 'Dwight', amount: 200},
        {from: 'Michael', to: 'Toby', amount: 100},
        {from: 'Dwight', to: 'Michael', amount: 175}
      ];

      var users = getUsers(transactions);

      expect(users).toEqual(['Dwight', 'Jim', 'Toby', 'Michael']);
    });

    it('excludes deposits', function() {
      var transactions = [
        {from: 'Dwight', to: 'Michael', amount: 175},
        {from: 'Deposit', to: 'Dwight', amount: 200}
      ];

      var users = getUsers(transactions);

      expect(users).toEqual(['Michael', 'Dwight']);
    });
  });

  describe('#isSendEnabled', function() {
    it('is enabled with proper values and sufficient funds', function() {
      var transactions = [
        {from: 'Jim', to: 'Kelly', amount: 200}
      ];
      var enabled = isSendEnabled('Kelly', 'Ryan', '200', transactions);

      expect(enabled).toBe(true);
    });

    it('is not enabled with insufficient funds', function() {
      var transactions = [
        {from: 'Jim', to: 'Kelly', amount: 150}
      ];
      var enabled = isSendEnabled('Kelly', 'Ryan', '200', transactions);

      expect(enabled).toBe(false);
    });

    it('is not enabled if from is empty', function() {
      var transactions = [
        {from: 'Jim', to: 'Kelly', amount: 200}
      ];
      var enabled = isSendEnabled('', 'Ryan', '200', transactions);

      expect(enabled).toBe(false);
    });

    it('is not enabled if to is empty', function() {
      var transactions = [
        {from: 'Jim', to: 'Kelly', amount: 200}
      ];
      var enabled = isSendEnabled('Kelly', '', '200', transactions);

      expect(enabled).toBe(false);
    });

    it('is not enabled if amount is non-numeric', function() {
      var transactions = [
        {from: 'Jim', to: 'Kelly', amount: 200}
      ];
      var enabled = isSendEnabled('Kelly', 'Ryan', 'non-numeric', transactions);

      expect(enabled).toBe(false);
    });
  });

});
