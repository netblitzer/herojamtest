'use strict';

// basic error handling
var handleError = function handleError(message) {
  console.dir(message);

  Materialize.toast(message.errorFull, 3000);
};

// basic AJAX request
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

// function to get the csrf token and pass it into the callback
var getToken = function getToken(callback) {
  sendAjax('GET', 'getToken', null, function (result) {
    callback(result.csrfToken);
  });
};

// function to get a new token and reset all forms on the page
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

// initial function to build the basic page without content
var buildBasicPage = function buildBasicPage(csrf) {
  state.csrf = csrf;

  // render all the parts
  ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'), checkIfLoggedIn);

  ReactDOM.render(React.createElement(FooterForm, null), document.querySelector('#foot'));

  buildInnerContent(csrf);
};
var buildInnerContent = function buildInnerContent(csrf) {
  switch (location.pathname) {
    case '/about':
      //history.pushState({page: 'About'}, 'About', 'about');
      openAboutForm(csrf);
      break;
    case '/signup':
      //history.pushState({page: 'Sign up'}, 'Sign up', 'signup');
      openSignupForm(csrf);
      break;
    case '/donate':
      //history.pushState({page: 'Donate'}, 'Donate', 'donate');
      openDonateForm(csrf);
      break;
    case '/profile':
      //history.pushState({page: 'Profile'}, 'Profile', 'profile');
      openProfileForm(csrf);
      break;
    case '/':
    default:
      //history.pushState({page: 'Home'}, 'Home', 'home');
      openMainForm(csrf);
      break;
  }
};

// create the progress bar
var createProgress = function createProgress(callback) {
  ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), callback);
  document.querySelector('#navProgress .progress').classList += ' shown';
};

// start sliding out the previous page
var slidePages = function slidePages(prevPage, finalCallback, newWrapper, skip) {
  if (prevPage != null) prevPage.removeClass('page-opened').addClass('page-closed');

  if (skip) {
    setTimeout(function () {
      swapRendered(finalCallback, newWrapper);
    }, 10);
  } else {
    setTimeout(function () {
      swapRendered(finalCallback, newWrapper);
    }, 1000);
  }
};

// swap the new page into the rendered scene and slide it in
var swapRendered = function swapRendered(finalCallback, newWrapper) {
  var curRendered = $('#rendered');
  var curRendering = $('#rendering');

  // Swap the content between the two divs without rerendering it
  curRendered.addClass('hidden').attr('id', 'rendering');
  curRendering.removeClass('hidden').attr('id', 'rendered');

  // clear the old content
  document.querySelector('#rendering').innerHTML = '';

  // slide the new content in
  setTimeout(function () {
    document.querySelector(newWrapper).classList = 'pageWrapper page-opened';
  }, 50);
  //newWrapper.addClass('page-opened');
  $('#navProgress .progress').removeClass('shown');

  ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));

  finalCallback();
};

$(document).ready(function () {
  getToken(buildBasicPage);
});