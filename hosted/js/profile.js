'use strict';

var openProfileForm = function openProfileForm() {
  // if the user isn't logged on, go back to the main page
  if (!state.loggedIn) {
    history.replaceState({ page: 'Home' }, 'Home', 'home');
    return openMainForm();
  }

  // * Basic Page creation functions * //
  // create the profile form
  var createProfile = function createProfile(res, prevPage, skip) {
    ReactDOM.render(React.createElement(PublicProfileForm, {
      csrf: state.csrf,
      first: res.firstName,
      last: res.lastName,
      email: res.email,
      school: res.school }), document.querySelector('#rendering'), slidePages(prevPage, initializeProfile, '#profileWrapper', skip));
  };

  // create the progress bar
  var createProfileProgress = function createProfileProgress(prevPage, skip) {
    ReactDOM.render(React.createElement(ProgressForm, null), document.querySelector('#navProgress'), getUserProfile(prevPage, skip));
    document.querySelector('#navProgress .progress').classList += ' shown';
  };

  var getUserProfile = function getUserProfile(prevPage, skip) {
    sendAjax('GET', '/profilePublic', null, function (response) {
      createProfile(response, prevPage, skip);
    });
  };

  var handleProfile = function handleProfile(response, prevPage, skip) {
    createProfile(response, prevPage, skip);
  };

  // initializer callback
  var initializeProfile = function initializeProfile() {};

  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'Profile';

    createProfileProgress(null, true);
  } else if (state.page !== 'Profile') {
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
      case 'About':
        prevPage = $('#aboutWrapper');
        break;
    }
    // change page
    state.page = 'Profile';

    // start the chain
    createProfileProgress(prevPage, false);
  }
};

var switchProfileContent = function switchProfileContent(e) {

  var nextContent = e.target.innerHTML;

  var fadeCurrent = function fadeCurrent() {
    $('.profile-content').removeClass('opened');
    setTimeout(getUserProfile, 500);
  };

  var getUserProfile = function getUserProfile() {
    sendAjax('GET', '/profilePublic', null, handleProfile);
  };

  var handleProfile = function handleProfile(response) {
    switchContent(response);
  };

  var switchContent = function switchContent(res) {
    document.querySelector('#profileInfoContainer').innerHTML = '';

    if (nextContent === 'Statistics' || nextContent === undefined) {
      ReactDOM.render(React.createElement(StatisticsForm, {
        csrf: state.csrf,
        first: res.firstName,
        last: res.lastName,
        email: res.email,
        school: res.school }), document.querySelector('#profileInfoContainer'));
    } else if (nextContent === 'Edit') {
      ReactDOM.render(React.createElement(EditProfileForm, {
        csrf: state.csrf,
        first: res.firstName,
        last: res.lastName,
        email: res.email,
        school: res.school }), document.querySelector('#profileInfoContainer'));
    }

    setTimeout(fadeContentIn, 10);
  };

  var fadeContentIn = function fadeContentIn() {
    $('.profile-content').addClass('opened');
  };

  fadeCurrent();
};

var handlePasswordChange = function handlePasswordChange(e) {
  e.preventDefault();

  if ($('#passChangeForm #oldpass').val() === '' || $('#passChangeForm #newpass').val() === '') {
    handleError('Both fields are required to change your password.');
    return false;
  }

  if ($('#passChangeForm #oldpass').val() === $('#passChangeForm #newpass').val()) {
    handleError('Passwords are the same');
    return false;
  }

  sendAjax('POST', $('#passChangeForm').attr('action'), $('#passChangeForm').serialize(), function (res) {
    Materialize.toast(res.message, 3000);
  });
};

var PublicProfileForm = function PublicProfileForm(props) {

  var name = void 0;
  if (!props.first && !props.last) {
    name = function () {
      return React.createElement(
        'h5',
        { className: 'grey-text text-darken-3' },
        React.createElement(
          'i',
          null,
          'No name specified'
        )
      );
    }();
  } else {
    name = function () {
      return React.createElement(
        'h5',
        { className: 'grey-text text-darken-3' },
        props.first + ' ' + props.last
      );
    }();
  }

  var school = void 0;
  if (!props.school) {
    school = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        React.createElement(
          'i',
          null,
          'No school specified'
        )
      );
    }();
  } else {
    school = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        props.school
      );
    }();
  }

  var email = void 0;
  if (!props.email) {
    email = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        React.createElement(
          'i',
          null,
          'No email specified'
        )
      );
    }();
  } else {
    email = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        props.email
      );
    }();
  }

  var location = void 0;
  if (!props.location) {
    location = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        React.createElement(
          'i',
          null,
          'No location specified'
        )
      );
    }();
  } else {
    location = function () {
      return React.createElement(
        'p',
        { className: 'grey-text text-darken-3' },
        props.location
      );
    }();
  }

  return React.createElement(
    'div',
    { id: 'profileWrapper', className: 'pageWrapper' },
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12 grey darken-2' },
          React.createElement(
            'div',
            { className: 'col s9 offset-s3 no-side-padding' },
            React.createElement(
              'nav',
              { className: 'nav-extended transparent no-shadow' },
              React.createElement(
                'div',
                { className: 'nav-content' },
                React.createElement(
                  'ul',
                  { className: 'tabs tabs-transparent' },
                  React.createElement(
                    'li',
                    { className: 'tab' },
                    React.createElement(
                      'a',
                      { className: 'active', onClick: switchProfileContent },
                      'Statistics'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'tab disabled' },
                    React.createElement(
                      'a',
                      { onClick: switchProfileContent },
                      'Badges'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'tab' },
                    React.createElement(
                      'a',
                      { onClick: switchProfileContent },
                      'Info'
                    )
                  ),
                  React.createElement(
                    'li',
                    { className: 'tab right' },
                    React.createElement(
                      'a',
                      { onClick: switchProfileContent },
                      'Edit'
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col m3 grey lighten-3' },
          React.createElement(
            'div',
            { className: 'pushed-down-2' },
            React.createElement('img', { className: 'responsive-img', src: 'assets/media/fb.gif', alt: props.name || "Profile picture" })
          ),
          name,
          school,
          email,
          location
        ),
        React.createElement(
          'div',
          { className: 'col m9', id: 'profileInfoContainer' },
          StatisticsForm(props)
        )
      )
    )
  );
};

var StatisticsForm = function StatisticsForm(props) {

  var joinedEvents = void 0;
  if (!props.eventsJoined) {
    joinedEvents = function () {
      return React.createElement(
        'li',
        null,
        React.createElement(
          'i',
          null,
          'No events joined yet.'
        )
      );
    }();
  } else {
    joinedEvents = props.eventsJoined.map(function (event) {
      return React.createElement(
        'li',
        null,
        'event'
      );
    });
  }

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'section' },
      React.createElement(
        'h5',
        null,
        'Donations'
      ),
      React.createElement(
        'div',
        { className: 'col s12' },
        React.createElement(
          'div',
          { className: 'col s12' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              'Total Raised In Name: '
            ),
            props.total || "$0"
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              'Personally Donated: '
            ),
            props.personalDonation || "$0"
          ),
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              null,
              'Largest Donation: '
            ),
            props.highestDonation || "$0"
          )
        )
      )
    ),
    React.createElement('div', { className: 'divider' }),
    React.createElement(
      'div',
      { className: 'section' },
      React.createElement(
        'h5',
        null,
        'Events'
      ),
      React.createElement(
        'div',
        { className: 'col s12' },
        React.createElement(
          'div',
          { className: 'col s2' },
          React.createElement(
            'p',
            null,
            React.createElement(
              'span',
              { className: 'left' },
              'Events Joined: '
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col s10' },
          React.createElement('ul', null)
        )
      )
    )
  );
};

var EditProfileForm = function EditProfileForm(props) {

  return React.createElement(
    'div',
    { className: 'profile-content' },
    React.createElement(
      'div',
      { className: 'section' },
      React.createElement(
        'h6',
        null,
        'Change your password'
      ),
      React.createElement(
        'form',
        { className: 'col s12',
          id: 'passChangeForm',
          name: 'passChangeForm',
          onSubmit: handlePasswordChange,
          action: '/passwordChange',
          method: 'POST' },
        React.createElement(
          'div',
          { className: 'row' },
          React.createElement(
            'div',
            { className: 'input-field col s12' },
            React.createElement('input', { id: 'oldpass', type: 'password', name: 'oldpass', className: 'validate' }),
            React.createElement(
              'label',
              { 'for': 'oldpass' },
              'Current password'
            )
          ),
          React.createElement(
            'div',
            { className: 'input-field col s12' },
            React.createElement('input', { id: 'newpass', type: 'password', name: 'newpass', className: 'validate' }),
            React.createElement(
              'label',
              { 'for': 'newpass' },
              'New password'
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
      )
    ),
    React.createElement('div', { className: 'divider' })
  );
};