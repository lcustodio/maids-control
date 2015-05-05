var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var $ = require('jquery');

var CHANGE_EVENT = 'change';

var _instructions;

function saveInstructions (text) {
  $.ajax({
      url: 'instructions',
      contentType: 'text/plain',
      dataType: 'text',
      type: 'POST',
      data: text,
      success: function(data) {
          _instructions = data;
          InstructionStore.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
          console.error('Error saving instructions', status, err.toString());
      }.bind(this)
  });
}

var InstructionStore = assign({}, EventEmitter.prototype, {


  getInstructions: function() {
    return _instructions;
  },

  loadInstructions: function() {
    $.ajax({
        url: 'instructions',
        contentType: 'text/plain',
        dataType: 'text',
        success: function(data) {
          _instructions = data;
          this.emitChange();
        }.bind(this),
        error: function(xhr, status, err) {
            console.error('instructions', status, err.toString());
        }.bind(this)
    });
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
  var text;

  switch(action.actionType) {
    case Constants.INSTRUCTIONS_SAVE:
      text = action.text;
      if (text) {
        saveInstructions(text);
      }
      break;

    default:
  }
});

module.exports = InstructionStore;
