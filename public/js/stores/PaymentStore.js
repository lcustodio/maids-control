var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PaymentConstants = require('../constants/PaymentConstants');
var assign = require('object-assign');

var CURRENT_YEAR = 2015;

var CHANGE_EVENT = 'change';

var _payments = {
    201504: {
          joao: {
              initial: 'J',
              totalPaid : 40,
              lastTotal : 0
          },
          mari: {
              initial: 'M',
              totalPaid : 45,
              lastTotal : 0
          },
          deh: {
              initial: 'D',
              totalPaid : 45,
              lastTotal : 0
          }
     }
};

/**
 * Create a new month in data structure
 * @param {string} month - two digits month coming from combobox
 */
function createMonthData(month) {
  var structuredMonth = CURRENT_YEAR + "" + month;
  var defaultObject = {joao: {initial: 'J', totalPaid : 0, lastTotal : 0}, mari: {initial: 'M', totalPaid : 0, lastTotal : 0}, deh: {initial: 'D', totalPaid : 0, lastTotal : 0}};
  _payments[structuredMonth] = defaultObject;
}

/**
 * Update total paid
 * @param {string} month digits month coming from combobox
 * @param {string} person person's id that will have value updated
 * @param {string} value to update
 */
function updatePayment(month, person, value) {
  if(value < 0){
    return;
  }
  var structuredMonth = CURRENT_YEAR + "" + month;
  _payments.structuredMonth.person.lastTotal = _payments.structuredMonth.person.totalPaid;
  _payments.structuredMonth.person.totalPaid = value;
}

/**
 * Add value to total paid
 * @param {string} month digits month coming from combobox
 * @param {string} person person's id that will have value updated
 * @param {string} valueToAdd - value to be added
 */
function addToTotal(month, person, valueToAdd) {
  if(valueToAdd <= 0){
    return;
  }
  console.log(valueToAdd);
  var structuredMonth = CURRENT_YEAR + "" + month;
  _payments[structuredMonth][person].lastTotal = _payments[structuredMonth][person].totalPaid;
  _payments[structuredMonth][person].totalPaid = parseInt(_payments[structuredMonth][person].totalPaid) + parseInt(valueToAdd);
}

/**
 * Undo recent change in value
 * @param {string} month digits month coming from combobox
 * @param {string} person person's id that will have value returned to lastTotal
 */
function undoChange(month, person) {
  var structuredMonth = CURRENT_YEAR + "" + month;
  var totalPaid = _payments.structuredMonth.person.totalPaid
  _payments.structuredMonth.person.totalPaid = _payments.structuredMonth.person.lastTotal;  
  _payments.structuredMonth.person.lastTotal = totalPaid;
}


var PaymentStore = assign({}, EventEmitter.prototype, {

  /**
   * Get all the payment data
   * @return {object}
   */
  getAll: function() {
    return _payments;
  },

  getPaymentForMonth: function(month){
    var structuredMonth = CURRENT_YEAR + "" + month;
    if(_payments[structuredMonth]){
      return _payments[structuredMonth];
    } else {
      return {};
    }
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
    case PaymentConstants.PAYMENT_CREATE_MONTH:
      month = action.month.trim();
      if (month !== '') {
        createMonthData(month);
        PaymentStore.emitChange();
      }
      break;

    case PaymentConstants.PAYMENT_UPDATE:
      month = action.month.trim();
      person = action.person.trim();
      value = action.value.trim();
      if (month !== '') {
	    	updatePayment(month, person, value);
	    	PaymentStore.emitChange();
  	  }
      break;

    case PaymentConstants.PAYMENT_ADD:
      month = action.month.trim();
      person = action.person.trim();
      value = action.valueToAdd;
      if (month !== '') {
	    	addToTotal(month, person, value);
	    	PaymentStore.emitChange();
  	  }
      break;

    case PaymentConstants.PAYMENT_UNDO:
      month = action.month.trim();
      if (month !== '') {
        undoChange(month);
        PaymentStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

module.exports = PaymentStore;
