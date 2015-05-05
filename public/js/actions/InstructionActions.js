var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var InstructionActions = {
  /**
   * @param  {string} text
   */
  saveInstructions: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.INSTRUCTIONS_SAVE,
      text: text
    });
  }
};

module.exports = InstructionActions;
