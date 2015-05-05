var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var PaymentActions = {
  /**
   * @param  {string} month
   */
  createMonthData: function(month) {
    AppDispatcher.dispatch({
      actionType: Constants.PAYMENT_CREATE_MONTH,
      month: month
    });
  },

  /**
   * @param  {string} month
   * @param  {string} person
   * @param  {string} value
   */
  updatePayment: function(month, person, valueToAdd) {
    AppDispatcher.dispatch({
      actionType: Constants.PAYMENT_UPDATE,
      month: month,
      person: person,
      valueToAdd: valueToAdd
    });
  },

  /**
   * @param  {string} month
   * @param  {string} person
   * @param  {string} valueToAdd
   */
  addToTotal: function(month, person, valueToAdd) {
    AppDispatcher.dispatch({
      actionType: Constants.PAYMENT_ADD,
      month: month,
      person: person,
      valueToAdd: valueToAdd
    });
  },

  /**
   * Undo last change on payment total
   */
  undoChange: function(month, person) {
    AppDispatcher.dispatch({
      actionType: Constants.PAYMENT_UNDO,
      month: month,
      person: person
    });
  }
};

module.exports = PaymentActions;
