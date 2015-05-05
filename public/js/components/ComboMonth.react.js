var React = require('react');
var ReactPropTypes = React.PropTypes;

var ComboMonth = React.createClass({

  propTypes: {
    id: ReactPropTypes.string,
    onSelectMonth: ReactPropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <div className="row">
          <div className="twelve columns text-center">
          <select onChange={this._onSelectMonth}>
            <option value="-1">Select month...</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
          </select> 
        </div>
      </div>
    );
  },


  _onSelectMonth: function(event) {
    this.props.onSelectMonth(event.target.value);
  }

});

module.exports = ComboMonth;