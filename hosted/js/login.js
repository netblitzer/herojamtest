'use strict';

var handleLogin = function handleLogin(e) {
  e.preventDefault();
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();
};

var clearLoginForm = function clearLoginForm(e) {
  $('#loginForm #user').val('');
  $('#loginForm #pass').val('');
  $('#loginForm #pass2').val('');
};

var clearSignupForm = function clearSignupForm(e) {
  $('#signupForm #user').val('');
  $('#signupForm #pass').val('');
  $('#signupForm #pass2').val('');
};

var SignupForm = function SignupForm(props) {
  return React.createElement(
    'div',
    { id: 'signupWrapper' },
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
                onSubmit: handleSignup },
              React.createElement(
                'h5',
                { className: 'grey-text text-darken-2 pushed-down-3' },
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
                  React.createElement('input', { placeholder: '', id: 'user', type: 'text', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'user' },
                    'Username'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'pass', type: 'password', className: 'validate' }),
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
                  React.createElement('input', { id: 'pass2', type: 'password', className: 'validate' }),
                  React.createElement(
                    'label',
                    { 'for': 'pass2' },
                    'Repeat Password'
                  )
                )
              ),
              React.createElement('input', { type: 'hidden', id: '_csrf', value: props.csrf }),
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
    )
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
                    onSubmit: handleLogin },
                  React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                      'div',
                      { className: 'input-field col s12' },
                      React.createElement('input', { placeholder: '', id: 'user', type: 'text', className: 'validate' }),
                      React.createElement(
                        'label',
                        { 'for': 'user' },
                        'Username'
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                      'div',
                      { className: 'input-field col s12' },
                      React.createElement('input', { id: 'pass', type: 'password', className: 'validate' }),
                      React.createElement(
                        'label',
                        { 'for': 'pass' },
                        'Password'
                      )
                    )
                  ),
                  React.createElement('input', { type: 'hidden', id: '_csrf', value: props.csrf }),
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