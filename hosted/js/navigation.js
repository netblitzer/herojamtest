'use strict';

// Object for storing the navigation state
var state = {
  page: undefined,
  crumb: [],
  loggedIn: false,
  csrf: undefined
};

// navigation state changes
var changePage = function changePage(e) {
  // figure out what the future page is
  var title = void 0;
  if (e.target) {
    title = e.target.textContent;
  } else {
    title = e;
  }

  // see which page we're moving to
  switch (title) {
    default:
    case 'Home':
      history.pushState({ page: title }, title, 'home');
      openMainForm();
      break;
    case 'About':
      history.pushState({ page: title }, title, 'about');
      openAboutForm();
      break;
    case 'Sign Up':
      history.pushState({ page: title }, title, 'signup');
      openSignupForm();
      break;
    case 'Donate':
      history.pushState({ page: title }, title, 'donate');
      openDonateForm();
      break;
    case 'Profile':
      history.pushState({ page: title }, title, 'profile');
      openProfileForm();
      break;
  }
};

// backwards and forwards for state changes in the browser
window.onpopstate = function (e) {
  // check if we're on the first page we entered through
  if (e.state) {
    switch (e.state.page) {
      default:
      case 'Home':
        openMainForm();
        break;
      case 'About':
        openAboutForm();
        break;
      case 'Sign Up':
        openSignupForm();
        break;
      case 'Donate':
        openDonateForm();
        break;
      case 'Profile':
        openProfileForm();
        break;
    }
  } else {
    // if we're on the first page loaded, just build the basic inner content again
    buildInnerContent();
  }
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
          { className: state.page === 'Profile' ? "black-text heavy" : "grey-text text-darken-2", onClick: changePage },
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
          { className: state.page === 'Sign Up' ? "black-text heavy" : "grey-text text-darken-2", onClick: changePage },
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
        { className: 'brand-logo grey-text text-darken-4', onClick: function onClick() {
            changePage('Home');
          } },
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
            { className: state.page === 'Home' ? "black-text heavy" : "grey-text text-darken-2", onClick: changePage },
            'Home'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { className: state.page === 'About' ? "black-text heavy" : "grey-text text-darken-2", onClick: changePage },
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
            { className: state.page === 'Donate' ? "orange-text text-lighten-1 heavy" : "orange-text text-lighten-1", onClick: changePage },
            'Donate'
          )
        )
      )
    ),
    React.createElement('div', { id: 'navProgress' })
  );
};