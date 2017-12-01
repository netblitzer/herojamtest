'use strict';

// Object for storing the navigation state
var state = {
  page: 'Home',
  crumb: [],
  loggedIn: false,
  csrf: undefined
};

var NavForm = function NavForm(props) {

  // Navigation option 3 and 4
  var B3 = void 0;
  var B4 = void 0;

  // Change navigation options based on whether we're logged in or not
  if (state.loggedIn) {
    B3 = function () {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { className: state.page === 'Profile' ? "black-text heavy" : "grey-text text-darken-2", href: '#', onClick: openProfileForm },
          'Profile'
        )
      );
    }();
    B4 = function () {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { className: 'grey-text text-darken-2', href: '#', onClick: handleLogout },
          'Log Out'
        )
      );
    }();
  } else {
    B3 = function () {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { className: state.page === 'Sign Up' ? "black-text heavy" : "grey-text text-darken-2", href: '#', onClick: openSignupForm },
          'Sign Up'
        )
      );
    }();
    B4 = function () {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { className: 'grey-text text-darken-2', href: '#', onClick: function onClick() {
              toggleLoginForm(true);
            } },
          'Log In'
        )
      );
    }();
  }

  // Create the navigation form
  return React.createElement(
    'nav',
    { className: 'white' },
    React.createElement(
      'div',
      { className: 'nav-wrapper container' },
      React.createElement(
        'a',
        { href: '#', className: 'brand-logo grey-text text-darken-4' },
        'Hero',
        React.createElement(
          'span',
          { className: 'orange-text text-lighten-1' },
          'Jam'
        )
      ),
      React.createElement(
        'ul',
        { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { className: state.page === 'Home' ? "black-text heavy" : "grey-text text-darken-2", href: '#', onClick: openMainForm },
            'Home'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { className: state.page === 'About' ? "black-text heavy" : "grey-text text-darken-2", href: '#', onClick: openAboutForm },
            'About'
          )
        ),
        B3,
        B4,
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { className: state.page === 'Donate' ? "orange-text text-lighten-1 heavy" : "orange-text text-lighten-1", href: '#', onClick: openDonateForm },
            'Donate'
          )
        )
      )
    ),
    React.createElement('div', { id: 'navProgress' })
  );
};