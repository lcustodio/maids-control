var React = require('react');
var InstructionActions = require('../actions/InstructionActions');
var InstructionStore = require('../stores/InstructionStore');

var InstructionSection = React.createClass({
    render: function() {
        return (
            <div className="instructions_components">
                <h5>Instructions:</h5>
                <textarea type="text" ref="instructions" onChange={this._handleChange} value={this.state.instructions} />
                <button onClick={this._onSaveInstructions}>Save</button>
            </div>
        );
    },
    componentDidMount: function () {
        InstructionStore.loadInstructions();
        InstructionStore.addChangeListener(this._onChange);
    },
    getInitialState: function () {
        return { instructions : InstructionStore.getInstructions() };
    },
    _onSaveInstructions: function() {
        InstructionActions.saveInstructions(this.refs.instructions.getDOMNode().value);
    },
    _onChange: function() {
        this.setState({ instructions : InstructionStore.getInstructions() });
    },
    _handleChange: function() {
        this.setState({ instructions : this.refs.instructions.getDOMNode().value });
    }
});

module.exports = InstructionSection;