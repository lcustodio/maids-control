var React = require('react');

var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var InstructionSection = require('./InstructionSection.react');
var PaymentStore = require('../stores/PaymentStore');

var CURRENT_YEAR = 2015;

var MaidControlApp = React.createClass({

  getInitialState: function() {
    return { 
      allPayments: PaymentStore.getAll(),
      selectedMonthPayments: {},
      month: ""
    }
  },

  componentDidMount: function() {
    PaymentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PaymentStore.removeChangeListener(this._onChange);
  },

  loadForSelectedMonth: function(month) {
    var structuredMonth = CURRENT_YEAR + "" + month;
    var newState = {
        allPayments: this.state.allPayments,
        selectedMonthPayments: this.state.allPayments[structuredMonth],
        month: month
    };
    this.setState(newState);
  },

  render: function() {
    return (
      <div>
        <Header 
          allPayments={this.state.allPayments} 
          loadComponentsForSelectedMonth={this.loadForSelectedMonth} />
        <MainSection
          payments={this.state.selectedMonthPayments}
          selectedMonth={this.state.month} />
      </div>
    );
  },

  updateState: function() {
    return {
      allPayments: PaymentStore.getAll(),
      selectedMonthPayments: this.state.selectedMonthPayments,
      month: this.state.month
    };
  },

  _onChange: function() {
    this.setState(this.updateState());
  }

});

module.exports = MaidControlApp;