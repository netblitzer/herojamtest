'use strict';

var openSignupForm = function openSignupForm() {
  // check if we can switch to sign up
  if (state.page !== 'Sign Up') {
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
    }
    // change page
    state.page = 'Sign Up';

    // create the progress bar
    var createProgress = function createProgress() {
      ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), createSignup);
      document.querySelector('#navProgress .progress').classList += ' shown';
    };

    // create the signup form
    var createSignup = function createSignup() {
      ReactDOM.render(React.createElement(SignupForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages);
    };

    // start sliding out the previous page
    var slidePages = function slidePages() {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(function () {
        swapRendered();
      }, 1000);
    };

    // swap the new page into the rendered scene and slide it in
    var swapRendered = function swapRendered() {
      var curRendered = $('#rendered');
      var curRendering = $('#rendering');

      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');

      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#signupWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');

      ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
    };

    // start the chain
    createProgress();
  }
};

var openMainForm = function openMainForm() {
  // check if we can switch to sign up
  if (state.page !== 'Home') {
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
    }
    // change page
    state.page = 'Home';

    // create the progress bar
    var createProgress = function createProgress() {
      ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), createSignup);
      document.querySelector('#navProgress .progress').classList += ' shown';
    };

    // create the main form
    var createSignup = function createSignup() {
      ReactDOM.render(React.createElement(MainForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages);
    };

    // start sliding out the previous page
    var slidePages = function slidePages() {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(function () {
        swapRendered();
      }, 1000);
    };

    // swap the new page into the rendered scene and slide it in
    var swapRendered = function swapRendered() {
      var curRendered = $('#rendered');
      var curRendering = $('#rendering');

      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');

      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#homeWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');

      ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
      ReactDOM.render(React.createElement(LoginForm, { csrf: state.csrf }), document.querySelector('#loginContainer'));

      // initialize Materialize components
      $('.parallax').parallax();
      $('.carousel').carousel({
        dist: 0,
        padding: 100,
        indicators: true
      });
    };

    // start the chain
    createProgress();
  }
};

var openAboutForm = function openAboutForm() {
  // check if we can switch to sign up
  if (state.page !== 'About') {
    // push crumb
    state.crumb.push(state.page);

    // figure out which page we came from so we can slide it out
    var prevPage = void 0;
    switch (state.page) {
      case 'Sign Up':
        prevPage = $('#signupWrapper');
        break;
      case 'Home':
        prevPage = $('#homeWrapper');
        break;
      case 'Donate':
        prevPage = $('#donateWrapper');
        break;
    }
    // change page
    state.page = 'About';

    // create the progress bar
    var createProgress = function createProgress() {
      ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), createSignup);
      document.querySelector('#navProgress .progress').classList += ' shown';
    };

    // create the about form
    var createSignup = function createSignup() {
      ReactDOM.render(React.createElement(AboutForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages);
    };

    // start sliding out the previous page
    var slidePages = function slidePages() {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(function () {
        swapRendered();
      }, 1000);
    };

    // swap the new page into the rendered scene and slide it in
    var swapRendered = function swapRendered() {
      var curRendered = $('#rendered');
      var curRendering = $('#rendering');

      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');

      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#aboutWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');

      ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
    };

    // start the chain
    createProgress();
  }
};

var openDonateForm = function openDonateForm() {
  // check if we can switch to sign up
  if (state.page !== 'Donate') {
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
    }
    // change page
    state.page = 'Donate';

    // create the progress bar
    var createProgress = function createProgress() {
      ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), createSignup);
      document.querySelector('#navProgress .progress').classList += ' shown';
    };

    // create the donate form
    var createSignup = function createSignup() {
      ReactDOM.render(React.createElement(DonateForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages);
    };

    // start sliding out the previous page
    var slidePages = function slidePages() {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(function () {
        swapRendered();
      }, 1000);
    };

    // swap the new page into the rendered scene and slide it in
    var swapRendered = function swapRendered() {
      var curRendered = $('#rendered');
      var curRendering = $('#rendering');

      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');

      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#donateWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');

      ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
    };

    // start the chain
    createProgress();
  }
};

var toggleLoginForm = function toggleLoginForm(state) {
  $('.account-frame').toggleClass('account-opened', state);
};

var ProgressForm = function ProgressForm(props) {
  return React.createElement(
    'div',
    { className: 'progress grey darken-3' },
    React.createElement('div', { className: 'indeterminate orange' })
  );
};

var MainForm = function MainForm(props) {
  return React.createElement(
    'div',
    { id: 'homeWrapper' },
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
          React.createElement(
            'div',
            { className: 'row center' },
            React.createElement(
              'div',
              { className: 'col s4 m2 offset-m4 offset-s1' },
              React.createElement(
                'a',
                { href: '#',
                  id: 'largeSignUp',
                  className: 'btn-large waves-effect waves-light orange lighten-1',
                  onClick: openSignupForm },
                'Sign up'
              )
            ),
            React.createElement(
              'div',
              { className: 'col m2 hide-on-small-only' },
              React.createElement(
                'a',
                { href: '#',
                  id: 'largeLogIn',
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
                { href: '#',
                  id: 'largeLogIn',
                  className: 'btn-large waves-effect waves-light orange lighten-1',
                  onClick: function onClick() {
                    toggleLoginForm(true);
                  } },
                'Log in'
              )
            )
          ),
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
                { href: '#', className: 'waves-effect waves-light btn-flat centered-button orange-text text-lighten-1' },
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
                  { className: 'grey-text text-darken-3', href: '#' },
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
                { href: '#', className: 'waves-effect waves-light btn-flat centered-button orange-text text-lighten-1' },
                'Find out More'
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
                  { className: 'grey-text text-darken-3', href: '#' },
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

// initial function to create the home page
var buildHomePage = function buildHomePage(csrf) {
  state.csrf = csrf;

  // render all the parts
  ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
  ReactDOM.render(React.createElement(MainForm, { csrf: csrf }), document.querySelector('#rendered'),
  // callback for the main content
  function () {
    $('#homeWrapper').addClass('page-opened');
  });
  ReactDOM.render(React.createElement(LoginForm, { csrf: csrf }), document.querySelector('#loginContainer'));
  ReactDOM.render(React.createElement(FooterForm, null), document.querySelector('#foot'));

  // initialize Materialize components
  $('.parallax').parallax();
  $('.carousel').carousel({
    dist: 0,
    padding: 100,
    indicators: true
  });
};

var getToken = function getToken() {
  sendAjax('GET', 'getToken', null, function (result) {
    buildHomePage(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});