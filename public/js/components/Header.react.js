var React = require('react');
var PaymentActions = require('../actions/PaymentActions');
var ComboMonth = require('./ComboMonth.react');

var ReactPropTypes = React.PropTypes;

var CURRENT_YEAR = 2015;

var Header = React.createClass({

  propTypes: {
    allPayments: ReactPropTypes.object.isRequired,
    loadComponentsForSelectedMonth: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Maid Control</h1>
        <ComboMonth
          id="month_selection"
          onSelectMonth={this._onSelectMonth} />
      </header>
    );
  },

  _onSelectMonth: function(month) {
    var structuredMonth = CURRENT_YEAR + "" + month;
    if (!this.props.allPayments[structuredMonth]){
      PaymentActions.createMonthData(month);
      this.props.loadComponentsForSelectedMonth(month);
    } else {
      this.props.loadComponentsForSelectedMonth(month);
    }
  }

});

module.exports = Header;