var React = require('react');
var ReactPropTypes = React.PropTypes;

var $ = require('jquery');

var PaymentActions = require('../actions/PaymentActions');

function progress(value, $element, maxForMonth) {
  var progressBarWidth = value * $element.width() / maxForMonth-1;
  var $progressDiv = $element.find('div');
  if(value < 30){
    $progressDiv.animate({ width: progressBarWidth }, 1000).attr("title", "R$ " + value);
    $progressDiv.html("");
  } else {
    $progressDiv.animate({ width: progressBarWidth }, 1000).html("R$ " + value + "&nbsp;");
  }
}

var PersonItem = React.createClass({

  propTypes: {
   id: ReactPropTypes.string.isRequired,
   data: ReactPropTypes.object.isRequired,
   month: ReactPropTypes.string.isRequired
  },

  componentDidMount: function() {
    progress(this.props.data.totalPaid, $('#' + this.props.id + '_progress'), 174);
  },

  componentDidUpdate: function(){
    progress(this.props.data.totalPaid, $('#' + this.props.id + '_progress'), 174);
  },

  /**
   * @return {object}
   */
  render: function() {
    var id = this.props.id;
    var paymentData = this.props.data;

    var personProgressId = this.props.id + '_progress';

    return (
      <div className="row person-item">
        <div className="twelve columns text-center">
          <div className="icon">
            {this.props.data.initial}
          </div>
          <div id={personProgressId} className="progressBar">
            <div></div>
          </div>
          <button onClick={this._onValueChange} className="add_button">Add R$</button>
          <input ref="add_input" className="add_input"></input>
        </div>
      </div>
    );
  },

  _onValueChange: function() {
    var value = React.findDOMNode(this.refs.add_input).value.trim();
    PaymentActions.addToTotal(this.props.month, this.props.id, value);
  },

  _onUndoChange: function(){
    PaymentActions.undoChange(this.props.month, this.props.id);
  }

});

module.exports = PersonItem;