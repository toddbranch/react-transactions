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
    );
  }
});

var TransactionForm = React.createClass({
  render: function() {
    return (
      <div className="transaction-form">
        <div className="form-group">
          <label>From</label>
          <input
            className="form-control"
            value={this.props.from}
            onChange={this.props.updateFrom}
          />
        </div>
        <div className="form-group">
          <label>To</label>
          <input
            className="form-control"
            value={this.props.to}
            onChange={this.props.updateTo}
          />
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
        />
        <TransactionList
          transactions={this.props.transactions}
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
      sendEnabled={state.sendEnabled}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
