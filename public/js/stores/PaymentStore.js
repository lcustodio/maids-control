var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CURRENT_YEAR = 2015;
var CHANGE_EVENT = 'change';

var $ = require('jquery');

var _payments = {};
var _monthsmax = {};

/** 
 * Loading monthsmax right on the Store creation 
 */
$.ajax({
    url: 'monthsmax',
    dataType: 'json',
    success: function(data) {
      _monthsmax = data[0];
    }.bind(this),
    error: function(xhr, status, err) {
      console.error('monthsmax', status, err.toString());
    }.bind(this)
});

/**
 * Create a new month in data structure
 * @param {string} month - two digits month coming from combobox
 */
function createMonthData(month) {
  var structuredMonth = CURRENT_YEAR + "" + month;
  var defaultObject = {joao: {initial: 'J', totalPaid : 0, lastTotal : 0}, mari: {initial: 'M', totalPaid : 0, lastTotal : 0}, deh: {initial: 'D', totalPaid : 0, lastTotal : 0}};
  _payments[structuredMonth] = defaultObject;
  savePayments();
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
  _payments[structuredMonth][person].lastTotal = _payments[structuredMonth][person].totalPaid;
  _payments[structuredMonth][person].totalPaid = value;
  savePayments();
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
  console.log(_monthsmax[structuredMonth]);
  var addition = parseInt(_payments[structuredMonth][person].totalPaid) + parseInt(valueToAdd);
  if(_monthsmax[structuredMonth].maxPayment >= addition) {
    _payments[structuredMonth][person].lastTotal = _payments[structuredMonth][person].totalPaid;
    _payments[structuredMonth][person].totalPaid = addition;
    savePayments();
  } else {
    var valueToAddNextMonth = addition - _monthsmax[structuredMonth].maxPayment;
    _payments[structuredMonth][person].lastTotal = _payments[structuredMonth][person].totalPaid;
    _payments[structuredMonth][person].totalPaid = _monthsmax[structuredMonth].maxPayment;
    savePayments();
    var nextMonth = parseInt(month) + 1;
    addToTotal("0" + nextMonth, person, valueToAddNextMonth);
  }
}

/**
 * Undo recent change in value
 * @param {string} month digits month coming from combobox
 * @param {string} person person's id that will have value returned to lastTotal
 */
function undoChange(month, person) {
  var structuredMonth = CURRENT_YEAR + "" + month;
  var totalPaid = _payments[structuredMonth][person].totalPaid
  _payments[structuredMonth][person].totalPaid = _payments[structuredMonth][person].lastTotal;
  _payments[structuredMonth][person].lastTotal = totalPaid;
  savePayments();
}

function savePayments() {
  $.ajax({
      url: 'payments',
      dataType: 'json',
      type: 'POST',
      data: _payments,
      success: function(data) {
        PaymentStore.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('payments', status, err.toString());
      }.bind(this)
  });
}

var PaymentStore = assign({}, EventEmitter.prototype, {
  
  /**
   * Get all the payment data
   * @return {object}
   */
  loadPayments: function() {
    $.ajax({
      url: 'payments',
      dataType: 'json',
      success: function(data) {
        _payments = data[0];
        this.emitChange();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('payments', status, err.toString());
      }.bind(this)
    });
  },

  getAll: function() {
    if(!_payments || $.isEmptyObject(_payments)) {
      console.log("Payments not loaded yet. Loading payments...");
      this.loadPayments();
    }
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
    case Constants.PAYMENT_CREATE_MONTH:
      month = action.month.trim();
      if (month !== '') {
        createMonthData(month);
      }
      break;

    case Constants.PAYMENT_UPDATE:
      month = action.month.trim();
      person = action.person.trim();
      value = action.value.trim();
      if (month !== '') {
	    	updatePayment(month, person, value);
  	  }
      break;

    case Constants.PAYMENT_ADD:
      month = action.month.trim();
      person = action.person.trim();
      value = action.valueToAdd;
      if (month !== '') {
	    	addToTotal(month, person, value);
  	  }
      break;

    case Constants.PAYMENT_UNDO:
      month = action.month.trim();
      if (month !== '') {
        undoChange(month);
      }
      break;

    default:
      // no op
  }
});

module.exports = PaymentStore;
