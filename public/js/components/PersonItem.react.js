var React = require('react');
var ReactPropTypes = React.PropTypes;

var $ = require('jquery');

var PaymentActions = require('../actions/PaymentActions');

function progress(value, $element) {
  var progressBarWidth = value * $element.width() / 173.333;
  console.log(progressBarWidth);
  $element.find('div').animate({ width: progressBarWidth }, 1000).html("R$ " + value + "&nbsp;");
}

var PersonItem = React.createClass({

  propTypes: {
   id: ReactPropTypes.string.isRequired,
   data: ReactPropTypes.object.isRequired,
   month: ReactPropTypes.string.isRequired
  },

  componentDidMount: function() {
    progress(this.props.data.totalPaid, $('#' + this.props.id + '_progress'));
  },

  componentDidUpdate: function(){
    progress(this.props.data.totalPaid, $('#' + this.props.id + '_progress'));
  },

  /**
   * @return {object}
   */
  render: function() {
    var id = this.props.id;
    var paymentData = this.props.data;

    var personProgressId = this.props.id + '_progress';

    return (
      <div className="row">
        <div className="two columns">
          <div className="icon">
            {this.props.data.initial}
          </div>
        </div>
        <div className="five columns">
          <div id={personProgressId} className="progressBar">
            <div></div>
          </div>
        </div>
        <div className="five columns">
          <button onClick={this._onValueChange} className="add_button">+</button>
          <input ref="add_input" className="add_input" placeholder="R$"></input>
          <button onClick={this._onUndoChange} className="undo_button">U</button>
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