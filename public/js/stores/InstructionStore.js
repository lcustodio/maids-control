var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PaymentConstants = require('../constants/PaymentConstants');
var assign = require('object-assign');

var CURRENT_YEAR = 2015;

var CHANGE_EVENT = 'change';


function saveInstructions(){
  
}

var InstructionStore = assign({}, EventEmitter.prototype, {

  /**
   * Get all the payment data
   * @return {object}
   */
  getInstructions: function() {
    $.ajax({
        url: 'instructions',
        contentType: 'text/plain',
        dataType: 'text',
        success: function(data) {
            _instructions = data;
            emit(CHANGE_EVENT);
        }.bind(this),
        error: function(xhr, status, err) {
            console.error('instructions', status, err.toString());
        }.bind(this)
    });
    return _payments;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var month;
  var person;
  var value;

  switch(action.actionType) {
    case Constants.PAYMENT_CREATE_MONTH:
      month = action.month.trim();
      if (month !== '') {
        saveInstructions(month);
        PaymentStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = PaymentStore;
