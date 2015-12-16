var Balance = React.createClass({
  render: function() {
    return (
      <li className="list-group-item balance">
        <div>
          {this.props.name}
        </div>
        <span className="badge">
          {this.props.balance}
        </span>
      </li>
    );
  }
});

var BalanceList = React.createClass({
  render: function() {
    return (
      <div className="balances">
        <div>
          Balances
        </div>
        <ul className="list-group">
          {_.map(this.props.balances, function(balance, name) {
            return (
              <Balance
                key={name}
                name={name}
                balance={balance}
              />
            );
          })}
        </ul>
      </div>
    );
  }
});

var Transaction = React.createClass({
  render: function() {
    var transaction = this.props.transaction;

    return (
      <li className="list-group-item transaction">
        <div>
          {transaction.from} ----> {transaction.to}
        </div>
        <span className="badge">
          {transaction.amount}
        </span>
      </li>
    );
  }
});

var TransactionList = React.createClass({
  render: function() {
    return (
      <div className="transactions">
        <div>
          Transactions
        </div>
        <ul className="list-group transactions">
          {this.props.transactions.map(function(transaction) {
            return (
              <Transaction
                key={transaction.id}
                transaction={transaction}
              />
            );
          })}
        </ul>
      </div>
    );
  }
});

var TransactionForm = React.createClass({
  render: function() {
    return (
      <div className="transaction-form">
        <div className="form-group">
          <label>From</label>
          <select
            className="form-control"
            onChange={this.props.updateFrom}
            value={this.props.from}
          >
            <option value=''></option>
            {this.props.users.map(function(user) {
              return (
                <option value={user} key={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>To</label>
          <select
            className="form-control"
            onChange={this.props.updateTo}
            value={this.props.to}
          >
            <option value=''></option>
            {this.props.users.map(function(user) {
              return (
                <option value={user} key={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label className="sr-only">Amount (in dollars)</label>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input
              className="form-control"
              value={this.props.amount}
              onChange={this.props.updateAmount}
            />
            <div className="input-group-addon">.00</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={this.props.sendTransaction} disabled={!this.props.sendEnabled}>
          Transfer cash
        </button>
      </div>
    );
  }
});

var Application = React.createClass({
  render: function() {
    return (
      <div className="application">
        <TransactionForm
          from={this.props.from}
          updateFrom={this.props.updateFrom}
          to={this.props.to}
          updateTo={this.props.updateTo}
          amount={this.props.amount}
          updateAmount={this.props.updateAmount}
          sendTransaction={this.props.sendTransaction}
          sendEnabled={this.props.sendEnabled}
          users={this.props.users}
        />
        <TransactionList
          transactions={this.props.transactions}
        />
        <BalanceList
          balances={this.props.balances}
        />
      </div>
    );
  }
});

function render() {
  var state = store.getState();

  ReactDOM.render(
    <Application
      transactions={state.transactions}
      from={state.from}
      updateFrom={updateFrom}
      to={state.to}
      updateTo={updateTo}
      amount={state.amount}
      updateAmount={updateAmount}
      sendTransaction={sendTransaction}
      sendEnabled={isSendEnabled(state.from, state.to, state.amount, state.transactions)}
      balances={getBalances(state.transactions)}
      users={getUsers(state.transactions)}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
