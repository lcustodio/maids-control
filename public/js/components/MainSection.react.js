var React = require('react');
var ReactPropTypes = React.PropTypes;
var PaymentActions = require('../actions/PaymentActions');
var PersonItem = require('./PersonItem.react');

var MainSection = React.createClass({

  propTypes: {
    payments: ReactPropTypes.object.isRequired,
    selectedMonth: ReactPropTypes.string.isRequired
  },

  render: function() {

    if (Object.keys(this.props.payments).length < 1) {
      return null;
    }

    var personPayments = []; 
    
    for (var key in this.props.payments) {
      personPayments.push( <PersonItem id={key} data={this.props.payments[key]} month={this.props.selectedMonth}/>);
    }

    return (
      <div className='personPayments'>
        {personPayments}
      </div>
    );
  }

});

module.exports = MainSection;