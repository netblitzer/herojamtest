'use strict';

// function to react with the login/logout system
var loginResponse = function loginResponse(response) {
  if (response.loggedin) {
    state.loggedIn = true;

    toggleLoginForm(false);

    Materialize.toast(response.message, 3000);
  } else {
    state.loggedIn = false;

    resetAllTokens();
  }
  ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
};

// function to react with the login/logout system
var signupResponse = function signupResponse(response) {
  if (response.loggedin) {
    state.loggedIn = true;

    openMainForm();

    Materialize.toast(response.message, 3000);
  } else {
    state.loggedIn = false;

    resetAllTokens();
  }
};

// function to call during the start of the page to see if teh client is already logged in
var checkIfLoggedIn = function checkIfLoggedIn() {
  sendAjax('GET', '/isLoggedIn', null, function (response) {
    loginResponse(response);

    ReactDOM.render(React.createElement(MainForm, { csrf: state.csrf }), document.querySelector('#rendered'),
    // callback for the main content
    function () {
      $('#homeWrapper').addClass('page-opened');
    });
  });
};

// Handlers for post and get requests with logins
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($('#loginForm #email').val() === '' || $('#loginForm #pass').val() === '') {
    handleError('Email or password is missing.');
    return false;
  }

  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), loginResponse);

  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($('#signupForm #email').val() === '' || $('#signupForm #first').val() === '' || $('#signupForm #last').val() === '' || $('#signupForm #pass').val() === '' || $('#signupForm #pass2').val() === '') {
    handleError('Required parameters are missing.');
    return false;
  }

  if ($('#signupForm #pass').val() !== $('#signupForm #pass2').val()) {
    handleError('Passwords do not match.');
    return false;
  }

  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), signupResponse);

  return false;
};

var handleLogout = function handleLogout() {
  if (state.loggedIn) {
    sendAjax('GET', '/logout', null, loginResponse);
  }
};

// Form clearing functions
var clearLoginForm = function clearLoginForm(e) {
  $('#loginForm #email').val('');
  $('#loginForm #pass').val('');
};

var clearSignupForm = function clearSignupForm(e) {
  $('#signupForm #email').val('');
  $('#signupForm #first').val('');
  $('#signupForm #last').val('');
  $('#signupForm #pass').val('');
  $('#signupForm #pass2').val('');
};

var SignupForm = function SignupForm(props) {
  return React.createElement(
    'div',
    { id: 'signupWrapper', className: 'pageWrapper' },
    React.createElement(
      'div',
      { className: 'container hide-on-small-only' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col m6 offset-m3' },
          React.createElement(
            'div',
            { className: 'col s12' },
            React.createElement(
              'form',
              {
                id: 'signupForm',
                name: 'signupForm',
                onSubmit: handleSignup,
                action: '/signup',
                method: 'POST' },
              React.createElement(
                'h5',
                { className: 'grey-text text-darken-2 pushed-down-2' },
                'Join Hero',
                React.createElement(
                  'span',
                  { className: 'orange-text text-lighten-1' },
                  'Jam'
                ),
                ' and become a hero.'
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'email', type: 'email', name: 'email', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'email', 'data-error': 'Invalid Email' },
                    'Email'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s6' },
                  React.createElement('input', { id: 'first', type: 'text', name: 'first', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'first' },
                    'First Name'
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'input-field col s6' },
                  React.createElement('input', { id: 'last', type: 'text', name: 'last', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'last' },
                    'Last Name'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'pass', type: 'password', name: 'pass', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'pass' },
                    'Password'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'pass2', type: 'password', name: 'pass2', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'pass2' },
                    'Repeat Password'
                  )
                )
              ),
              React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
              React.createElement(
                'button',
                { className: 'btn white waves-effect waves-green black-text right', type: 'submit', name: 'action' },
                'Submit',
                React.createElement(
                  'i',
                  { className: 'material-icons right' },
                  'send'
                )
              )
            ),
            React.createElement(
              'button',
              { className: 'btn white waves-effect waves-red black-text',
                id: 'clear-signup-form',
                onClick: clearSignupForm },
              'Clear',
              React.createElement(
                'i',
                { className: 'material-icons right' },
                'clear'
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { id: 'loginContainer' })
  );
};

var LoginForm = function LoginForm(props) {
  return React.createElement(
    'div',
    { className: 'account-frame' },
    React.createElement(
      'div',
      { className: 'account-holder',
        onClick: function onClick(e) {
          if (e.target === document.querySelector('.account-holder')) toggleLoginForm(false);
        } },
      React.createElement(
        'div',
        { className: 'account-main-frame' },
        React.createElement(
          'div',
          { className: 'account-wrapper' },
          React.createElement(
            'div',
            { className: 'account-box white' },
            React.createElement(
              'div',
              { className: 'account-top-bar orange lighten-1' },
              React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                  'div',
                  { className: 'col s11' },
                  React.createElement(
                    'h5',
                    { className: 'white-text left' },
                    'Log in'
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'col s1' },
                  React.createElement(
                    'a',
                    { className: 'btn-flat waves-effect waves-red right',
                      onClick: function onClick() {
                        toggleLoginForm(false);
                      } },
                    React.createElement(
                      'i',
                      { className: 'material-icons white-text' },
                      'close'
                    )
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'account-form-div' },
              React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                  'form',
                  { className: 'col s12',
                    id: 'loginForm',
                    name: 'loginForm',
                    onSubmit: handleLogin,
                    action: '/login',
                    method: 'POST' },
                  React.createElement(
                    'div',
                    { className: 'row pushed-down-2' },
                    React.createElement(
                      'div',
                      { className: 'input-field col s12' },
                      React.createElement('input', { id: 'email', type: 'email', name: 'email', className: 'validate' }),
                      React.createElement(
                        'label',
                        { 'for': 'email', 'data-error': 'Invalid Email' },
                        'Email'
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                      'div',
                      { className: 'input-field col s12' },
                      React.createElement('input', { id: 'pass', type: 'password', name: 'pass', className: 'validate' }),
                      React.createElement(
                        'label',
                        { 'for': 'pass' },
                        'Password'
                      )
                    )
                  ),
                  React.createElement('input', { type: 'hidden', name: '_csrf', value: props.csrf }),
                  React.createElement(
                    'button',
                    { className: 'btn white waves-effect waves-green black-text right', type: 'submit', name: 'action' },
                    'Submit',
                    React.createElement(
                      'i',
                      { className: 'material-icons right' },
                      'send'
                    )
                  )
                ),
                React.createElement(
                  'button',
                  { className: 'btn white waves-effect waves-red black-text',
                    id: 'clear-login-form',
                    onClick: clearLoginForm },
                  'Clear',
                  React.createElement(
                    'i',
                    { className: 'material-icons right' },
                    'clear'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};