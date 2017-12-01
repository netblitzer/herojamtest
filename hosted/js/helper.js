'use strict';

var handleError = function handleError(message) {
  console.dir(message);

  Materialize.toast(message.errorFull, 3000);
};

var redirect = function redirect(response) {
  console.dir(response);
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj);
    }
  });
};

var getToken = function getToken() {
  sendAjax('GET', 'getToken', null, function (result) {
    buildHomePage(result.csrfToken);
  });
};

var resetAllTokens = function resetAllTokens() {
  sendAjax('GET', 'getToken', null, function (result) {
    var csrf = result.csrfToken;

    state.csrf = csrf;

    var forms = document.querySelectorAll('[name=_csrf]');

    forms.forEach(function (input) {
      input.value = csrf;
    });
  });
};