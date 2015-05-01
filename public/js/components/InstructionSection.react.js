var React = require('react');
var $ = require('jquery');

var InstructionSection = React.createClass({
    render: function() {
        return (
            <div className="instructions_components">
                <h5>Instructions:</h5>
                <textarea type="text" ref="instructions" onChange={this.handleChange} value={this.state.instructions} />
                <button onClick={this._onSaveInstructions}>Save</button>
            </div>
        );
    },
    getInitialState: function (){
        $.ajax({
            url: 'instructions',
            contentType: 'text/plain',
            dataType: 'text',
            success: function(data) {
                this.setState({instructions: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('instructions', status, err.toString());
            }.bind(this)
        });
        return { instructions : "" };
    },
    _onSaveInstructions: function() {
        $.ajax({
            url: 'instructions',
            contentType: 'text/plain',
            dataType: 'text',
            type: 'POST',
            data: this.refs.instructions.getDOMNode().value,
            success: function(data) {
                console.log(data)
                this.setState({instructions: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('instructions', status, err.toString());
            }.bind(this)
        });
    },
    handleChange: function() {
        this.setState({instructions: this.refs.instructions.getDOMNode().value});
    }
});

module.exports = InstructionSection;