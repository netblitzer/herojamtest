'use strict';

var openSignupForm = function openSignupForm() {
  // if the user is logged on, go back to the main page
  // can't create a new account if you're already logged in
  if (state.loggedIn) {
    history.replaceState({ page: 'Home' }, 'Home', 'home');
    return openMainForm();
  }

  // create the signup form
  var createSignup = function createSignup(prevPage, skip) {
    ReactDOM.render(React.createElement(SignupForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages(prevPage, initializeSignup, '#signupWrapper', skip));
  };

  // initializer callback
  var initializeSignup = function initializeSignup() {
    ReactDOM.render(React.createElement(LoginForm, { csrf: state.csrf }), document.querySelector('#loginContainer'));
  };

  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'Sign up';

    createSignup(null, true);
  } else if (state.page !== 'Sign Up') {
    // push crumb
    state.crumb.push(state.page);

    // figure out which page we came from so we can slide it out
    var prevPage = void 0;
    switch (state.page) {
      case 'Home':
        prevPage = $('#homeWrapper');
        break;
      case 'About':
        prevPage = $('#aboutWrapper');
        break;
      case 'Donate':
        prevPage = $('#donateWrapper');
        break;
      case 'Profile':
        prevPage = $('#profileWrapper');
        break;
    }
    // change page
    state.page = 'Sign Up';

    // start the chain
    createProgress(function () {
      createSignup(prevPage, false);
    });
  }
};

var openMainForm = function openMainForm() {

  // create the main form
  var createMain = function createMain(prevPage, skip) {
    ReactDOM.render(React.createElement(MainForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages(prevPage, initializeMain, '#homeWrapper', skip));
  };

  // initializer callback
  var initializeMain = function initializeMain() {
    ReactDOM.render(React.createElement(LoginForm, { csrf: state.csrf }), document.querySelector('#loginContainer'));

    // initialize Materialize components
    $('.parallax').parallax();
    $('.carousel').carousel({
      dist: 0,
      padding: 100,
      indicators: true
    });
  };

  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'Home';

    createMain(null, true);
  } else if (state.page !== 'Home') {
    // push crumb
    state.crumb.push(state.page);

    // figure out which page we came from so we can slide it out
    var prevPage = void 0;
    switch (state.page) {
      case 'Sign Up':
        prevPage = $('#signupWrapper');
        break;
      case 'About':
        prevPage = $('#aboutWrapper');
        break;
      case 'Donate':
        prevPage = $('#donateWrapper');
        break;
      case 'Profile':
        prevPage = $('#profileWrapper');
        break;
    }
    // change page
    state.page = 'Home';

    // start the chain
    createProgress(function () {
      createMain(prevPage, false);
    });
  }
};

var openDonateForm = function openDonateForm() {
  // create the donate form
  var createDonate = function createDonate(prevPage, skip) {
    ReactDOM.render(React.createElement(DonateForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages(prevPage, initializeDonate, '#donateWrapper', skip));
  };

  // intializer callback
  var initializeDonate = function initializeDonate() {};

  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'Donate';

    createDonate(null, true);
  } else if (state.page !== 'Donate') {
    // push crumb
    state.crumb.push(state.page);

    // figure out which page we came from so we can slide it out
    var prevPage = void 0;
    switch (state.page) {
      case 'Sign Up':
        prevPage = $('#signupWrapper');
        break;
      case 'About':
        prevPage = $('#aboutWrapper');
        break;
      case 'Home':
        prevPage = $('#homeWrapper');
        break;
      case 'Profile':
        prevPage = $('#profileWrapper');
        break;
    }
    // change page
    state.page = 'Donate';

    // start the chain
    createProgress(function () {
      createDonate(prevPage, false);
    });
  }
};

var toggleLoginForm = function toggleLoginForm(state) {
  $('.account-frame').toggleClass('account-opened', state);
};

// loading bar at the top of the screen
var ProgressForm = function ProgressForm(props) {
  return React.createElement(
    'div',
    { className: 'progress grey darken-3' },
    React.createElement('div', { className: 'indeterminate orange' })
  );
};

var MainForm = function MainForm(props) {

  var centerRow = void 0;
  if (state.loggedIn) {
    centerRow = function () {
      return React.createElement(
        'div',
        { className: 'row center' },
        React.createElement(
          'div',
          { className: 'col s4 m2 offset-s4 offset-m5' },
          React.createElement(
            'a',
            { className: 'btn-large waves-effect waves-light orange lighten-1',
              onClick: function onClick() {
                changePage('Donate');
              } },
            'Donate'
          )
        )
      );
    }();
  } else {
    centerRow = function () {
      return React.createElement(
        'div',
        { className: 'row center' },
        React.createElement(
          'div',
          { className: 'col s4 m2 offset-m4 offset-s1' },
          React.createElement(
            'a',
            { id: 'largeSignUp',
              className: 'btn-large waves-effect waves-light orange lighten-1',
              onClick: function onClick() {
                changePage('Sign Up');
              } },
            'Sign up'
          )
        ),
        React.createElement(
          'div',
          { className: 'col m2 hide-on-small-only' },
          React.createElement(
            'a',
            { id: 'largeLogIn',
              className: 'btn-large waves-effect waves-light orange lighten-1',
              onClick: function onClick() {
                toggleLoginForm(true);
              } },
            'Log in'
          )
        ),
        React.createElement(
          'div',
          { className: 'col s4 offset-s2 hide-on-med-and-up' },
          React.createElement(
            'a',
            { id: 'largeLogIn',
              className: 'btn-large waves-effect waves-light orange lighten-1',
              onClick: function onClick() {
                toggleLoginForm(true);
              } },
            'Log in'
          )
        )
      );
    }();
  }

  return React.createElement(
    'div',
    { id: 'homeWrapper', className: 'pageWrapper' },
    React.createElement(
      'div',
      { className: 'parallax-container' },
      React.createElement(
        'div',
        { className: 'section valign-wrapper' },
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'h3',
            { className: 'header center white-text' },
            'It doesn\'t take much to be a hero.'
          ),
          React.createElement('br', null),
          centerRow,
          React.createElement('br', null),
          React.createElement('br', null)
        )
      ),
      React.createElement(
        'div',
        { className: 'parallax black' },
        React.createElement('img', { className: 'parallaxImage', src: 'assets/media/header_image_1280.png', alt: 'Header Image' })
      )
    ),
    React.createElement(
      'div',
      { id: 'infoContainer', className: 'container' },
      React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h5',
                { className: 'center light' },
                'We need your help'
              ),
              React.createElement(
                'p',
                { className: 'light' },
                'Your donations give kids things to enjoy during their stay at the hospital.'
              ),
              React.createElement(
                'a',
                { onClick: function onClick() {
                    changePage('Donate');
                  }, className: 'waves-effect waves-light btn-flat centered-button orange-text text-lighten-1' },
                'Donate'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h5',
                { className: 'center light' },
                'What is ',
                React.createElement(
                  'a',
                  { className: 'grey-text text-darken-3', onClick: function onClick() {
                      changePage('Home');
                    } },
                  'Hero',
                  React.createElement(
                    'span',
                    { className: 'orange-text text-lighten-1' },
                    'Jam'
                  )
                ),
                '?'
              ),
              React.createElement(
                'p',
                { className: 'light' },
                'HeroJam hosts charity game jams committed to helping kids in hospitals around the world. We support Child\'s Play Charity, providing kids in hospitals with toys, books, and games.'
              ),
              React.createElement(
                'a',
                { onClick: function onClick() {
                    changePage('About');
                  }, className: 'waves-effect waves-light btn-flat centered-button orange-text text-lighten-1' },
                'Find Out More'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h5',
                { className: 'center light' },
                'Join now'
              ),
              React.createElement(
                'p',
                { className: 'light' },
                React.createElement(
                  'a',
                  { className: 'grey-text text-darken-3', onClick: function onClick() {
                      changePage('Home');
                    } },
                  'Hero',
                  React.createElement(
                    'span',
                    { className: 'orange-text text-lighten-1' },
                    'Jam'
                  )
                ),
                ' is open to all RIT students. Make games, help kids, and win prizes.'
              ),
              React.createElement(
                'a',
                { href: '#', className: 'waves-effect waves-light btn-flat centered-button orange-text text-lighten-1' },
                'Join Now'
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'space-gap grey darken-4' }),
    React.createElement(
      'div',
      { id: 'statsContainer', className: 'container' },
      React.createElement(
        'div',
        { className: 'section' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h2',
                { className: 'center black-text' },
                React.createElement(
                  'i',
                  { className: 'material-icons xlarge' },
                  'group'
                )
              ),
              React.createElement(
                'h5',
                { className: 'center light' },
                'Players'
              ),
              React.createElement(
                'h5',
                { className: 'center orange-text text-lighten-1 light' },
                '109'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h2',
                { className: 'center black-text' },
                React.createElement(
                  'i',
                  { className: 'material-icons xlarge' },
                  'attach_money'
                )
              ),
              React.createElement(
                'h5',
                { className: 'center light' },
                'Raised'
              ),
              React.createElement(
                'h5',
                { className: 'center orange-text text-lighten-1 light' },
                '$4028'
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'col s12 m4' },
            React.createElement(
              'div',
              { className: 'icon-block' },
              React.createElement(
                'h2',
                { className: 'center black-text' },
                React.createElement(
                  'i',
                  { className: 'material-icons xlarge' },
                  'videogame_asset'
                )
              ),
              React.createElement(
                'h5',
                { className: 'center light' },
                'Games'
              ),
              React.createElement(
                'h5',
                { className: 'center orange-text text-lighten-1 light' },
                '29 Made'
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'space-gap grey darken-4' }),
    React.createElement(
      'div',
      { id: 'sponsorContainer', className: 'grey darken-3' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'section' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s12' },
              React.createElement(
                'h5',
                { className: 'center grey-text text-lighten-4' },
                'Want to sponsor? ',
                React.createElement(
                  'a',
                  { className: 'orange-text text-lighten-1', href: '#' },
                  'Find out how.'
                )
              ),
              React.createElement(
                'div',
                { className: 'carousel' },
                React.createElement(
                  'a',
                  { className: 'carousel-item', href: '#bungie' },
                  React.createElement('img', { src: 'assets/media/bungie.png', alt: 'Bungie' })
                ),
                React.createElement(
                  'a',
                  { className: 'carousel-item', href: '#microsoft' },
                  React.createElement('img', { src: 'assets/media/microsoft.png', alt: 'Microsoft' })
                ),
                React.createElement(
                  'a',
                  { className: 'carousel-item', href: '#igm' },
                  React.createElement('img', { src: 'assets/media/igm.png', alt: 'IGM' })
                ),
                React.createElement(
                  'a',
                  { className: 'carousel-item', href: '#magic' },
                  React.createElement('img', { src: 'assets/media/magic.png', alt: 'MAGIC Center' })
                )
              )
            )
          )
        )
      )
    ),
    React.createElement('div', { id: 'loginContainer' })
  );
};

var FooterForm = function FooterForm(props) {
  return React.createElement(
    'div',
    { id: 'footerContainer', className: 'orange lighten-1' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'row valign-wrapper hide-on-small-only' },
        React.createElement(
          'div',
          { className: 'col l6' },
          React.createElement(
            'h5',
            { className: 'light black-text' },
            'Have any questions?'
          ),
          React.createElement(
            'p',
            { className: 'light grey-text text-darken-3' },
            'Let us know at ',
            React.createElement(
              'a',
              { className: 'black-text', href: 'emailto:contact@herojam.io' },
              'contact@herojam.io'
            ),
            ' or any of our social media links.'
          )
        ),
        React.createElement(
          'div',
          { className: 'col l4 offset-l2 valign-wrapper' },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col s2 offset-s6' },
              React.createElement(
                'a',
                { href: '#facebook' },
                React.createElement('img', { className: 'responsive-img', src: 'assets/media/fb.gif', alt: 'Facebook' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s2' },
              React.createElement(
                'a',
                { href: '#twitter' },
                React.createElement('img', { className: 'responsive-img', src: 'assets/media/twitter.gif', alt: 'Twitter' })
              )
            ),
            React.createElement(
              'div',
              { className: 'col s2' },
              React.createElement(
                'a',
                { href: '#twitch' },
                React.createElement('img', { className: 'responsive-img', src: 'assets/media/twitch.gif', alt: 'Twitch' })
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'row valign-wrapper show-on-small hide-on-med-and-up' },
        React.createElement(
          'div',
          { className: 'col s10 offset-s1' },
          React.createElement(
            'h5',
            { className: 'light black-text' },
            'Have any questions?'
          ),
          React.createElement(
            'p',
            { className: 'light grey-text text-darken-3' },
            'Let us know at ',
            React.createElement(
              'a',
              { className: 'black-text', href: 'emailto:contact@herojam.io' },
              'contact@herojam.io'
            ),
            ' or any of our social media links.'
          )
        ),
        React.createElement(
          'div',
          { className: 'col s10 valign-wrapper row' },
          React.createElement(
            'div',
            { className: 'col s2 offset-s3' },
            React.createElement(
              'a',
              { href: '#facebook' },
              React.createElement('img', { className: 'responsive-img', src: 'assets/media/fb.gif', alt: 'Facebook' })
            )
          ),
          React.createElement(
            'div',
            { className: 'col s2' },
            React.createElement(
              'a',
              { href: '#twitter' },
              React.createElement('img', { className: 'responsive-img', src: 'assets/media/twitter.gif', alt: 'Twitter' })
            )
          ),
          React.createElement(
            'div',
            { className: 'col s2' },
            React.createElement(
              'a',
              { href: '#twitch' },
              React.createElement('img', { className: 'responsive-img', src: 'assets/media/twitch.gif', alt: 'Twitch' })
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'footer-copyright' },
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'col s12' },
            React.createElement(
              'div',
              { className: 'col s12' },
              React.createElement(
                'p',
                { className: 'left grey-text text-darken-3' },
                '\xA9 2017 HeroJam'
              ),
              React.createElement(
                'p',
                { className: 'right grey-text text-darken-3' },
                'Created by ',
                React.createElement(
                  'a',
                  { className: 'black-text', href: 'https://www.lukemillergames.com' },
                  'Luke Miller'
                ),
                '.'
              )
            )
          )
        )
      )
    )
  );
};