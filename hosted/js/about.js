'use strict';

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
      case 'Profile':
        prevPage = $('#profileWrapper');
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

      $('.collapsible').collapsible();
    };

    // start the chain
    createProgress();
  }
};

var AboutForm = function AboutForm(props) {
  return React.createElement(
    'div',
    { id: 'aboutWrapper', className: 'pageWrapper' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'section' },
          React.createElement(
            'div',
            { className: 'col s12 pushed-down-2' },
            React.createElement(
              'h5',
              { className: 'grey-text text-darken-3' },
              'Have a question? Search to see if we have your answer.'
            ),
            React.createElement(
              'form',
              null,
              React.createElement(
                'div',
                { className: 'input-field' },
                React.createElement('input', { id: 'search', type: 'search', required: true }),
                React.createElement(
                  'label',
                  { className: 'label-icon', 'for': 'search' },
                  React.createElement(
                    'i',
                    { className: 'material-icons' },
                    'search'
                  )
                ),
                React.createElement(
                  'i',
                  { className: 'material-icons' },
                  'close'
                )
              )
            ),
            React.createElement(
              'h5',
              { className: 'grey-text text-darken-3' },
              'Frequently asked questions.'
            ),
            React.createElement(
              'ul',
              { className: 'collapsible', 'data-collapsible': 'accordion' },
              React.createElement(
                'li',
                null,
                React.createElement(
                  'div',
                  { className: 'collapsible-header' },
                  'Donations'
                ),
                React.createElement(
                  'div',
                  { className: 'collapsible-body collapsible-thin-padding' },
                  React.createElement(
                    'span',
                    null,
                    React.createElement(
                      'ul',
                      { className: 'collapsible', 'data-collapsible': 'accordion' },
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'collapsible-header' },
                          'How can I help?'
                        ),
                        React.createElement(
                          'div',
                          { className: 'collapsible-body' },
                          React.createElement(
                            'span',
                            null,
                            'If you are able to donate, 100% of all donations will go to Child\'s Play and help kids in hospitals around the world.'
                          )
                        )
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'collapsible-header' },
                          'I can\'t afford to donate but my friends/family can.'
                        ),
                        React.createElement(
                          'div',
                          { className: 'collapsible-body' },
                          React.createElement(
                            'span',
                            null,
                            'If you want to be entered for prizes but can\'t afford to donate, as long as your friends or family donate and add your name in the comments of the donation, it will still count towards your donation total.'
                          )
                        )
                      )
                    )
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