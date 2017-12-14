'use strict';

var openAboutForm = function openAboutForm() {

  // * Basic Page creation functions * //
  // create the about form
  var createAbout = function createAbout(prevPage, skip) {
    ReactDOM.render(React.createElement(AboutForm, { csrf: state.csrf }), document.querySelector('#rendering'), slidePages(prevPage, initializeAbout, '#aboutWrapper', skip));
  };

  // initializer callback
  var initializeAbout = function initializeAbout() {
    getQuestions();
  };

  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'About';

    createAbout(null, true);
  } else if (state.page !== 'About') {
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

    // start the chain
    createProgress(function () {
      createAbout(prevPage, false);
    });
  }
};
// object holding all the questions
var faq = {};

// populate the FAQ list with responses from the server
var fillQuestionList = function fillQuestionList(response) {

  var sections = {};
  var uid = 0; // UID used for opening the specified question
  var data = {}; // used to populate the autocomplete

  // parse the data
  response.docs.forEach(function (q) {
    // sort the questions into their sections
    if (sections[q.section] === undefined) {
      sections[q.section] = [];
      uid += 100;
    }

    // push new question data into each section array
    sections[q.section].push({
      question: q.question,
      answer: q.answer,
      uid: 'uid' + uid,
      secid: 'secid' + Math.floor(uid / 100)
    });

    faq[q.question] = {
      question: q.question,
      answer: q.answer,
      uid: uid
    };

    data[q.question] = null;

    uid++;
  });

  ReactDOM.render(React.createElement(FAQListForm, { sections: sections }), document.querySelector('#faqList'));

  $('.collapsible').collapsible();
  $('#answer').trigger('autoresize');
  // set up the autocomplete
  $('input.autocomplete').autocomplete({
    data: data,
    limit: 5,
    onAutocomplete: function onAutocomplete(val) {
      // find the menu the question is under
      var bodyID = Math.floor(faq[val].uid / 100);
      var headID = faq[val].uid;
      var body = $('#secid' + bodyID);
      var head = $('#uid' + headID);

      // open the question
      if (!body.hasClass('active')) body.click();

      if (!head.hasClass('active')) head.click();
    },
    minLength: 2 // The minimum length of the input for the autocomplete to start. Default: 1.
  });
};

// AJAX call to get questions
var getQuestions = function getQuestions() {
  sendAjax('GET', '/aboutQuestions', null, fillQuestionList);
};

// Function response to creating questions
var createQuestionsResponse = function createQuestionsResponse(response) {
  if (!response.success) {
    return handleError(response.errorFull);
  }

  Materialize.toast(response.message, 3000);
};
// Function to create a new question and send it to the server
var handleCreateQuestion = function handleCreateQuestion(e) {
  e.preventDefault();

  if ($('#createQuestion #question').val() === '' || $('#createQuestion #section').val() === '' || $('#createQuestion #answer').val() === '') {
    handleError('Required parameters are missing.');
    return false;
  }

  sendAjax('POST', $('#createQuestion').attr('action'), $('#createQuestion').serialize(), createQuestionsResponse);

  return false;
};

// Function to create the FAQ form on the page and populate it
// also handles the autocomplete section
var FAQListForm = function FAQListForm(props) {

  var keys = Object.keys(props.sections);
  var secForms = [];

  var _loop = function _loop(i) {
    secForms.push(function () {
      return React.createElement(SectionForm, { section: keys[i], responses: props.sections[keys[i]] });
    }());
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }

  return React.createElement(
    'ul',
    { className: 'collapsible', 'data-collapsible': 'accordion' },
    secForms
  );
};

// form for each section in the FAQ list
var SectionForm = function SectionForm(props) {
  var questions = props.responses.map(function (res) {
    return React.createElement(QuestionForm, { question: res.question, answer: res.answer, uid: res.uid });
  });

  return React.createElement(
    'li',
    null,
    React.createElement(
      'div',
      { className: 'collapsible-header', id: props.responses[0].secid },
      props.section
    ),
    React.createElement(
      'div',
      { className: 'collapsible-body collapsible-thin-padding' },
      React.createElement(
        'ul',
        { className: 'collapsible', 'data-collapsibile': 'accordion' },
        questions
      )
    )
  );
};
// form for each question populating the FAQ list
var QuestionForm = function QuestionForm(props) {
  return React.createElement(
    'li',
    null,
    React.createElement(
      'div',
      { className: 'collapsible-header', id: props.uid },
      props.question
    ),
    React.createElement(
      'div',
      { className: 'collapsible-body' },
      React.createElement(
        'span',
        null,
        props.answer
      )
    )
  );
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
              'div',
              null,
              React.createElement(
                'div',
                { className: 'search-wrapper input-field' },
                React.createElement(
                  'i',
                  { className: 'material-icons prefix' },
                  'search'
                ),
                React.createElement('input', { id: 'search', type: 'text', className: 'autocomplete' }),
                React.createElement(
                  'label',
                  { 'for': 'search' },
                  'Search'
                ),
                React.createElement('div', { className: 'search-results' })
              )
            ),
            React.createElement(
              'h5',
              { className: 'grey-text text-darken-3' },
              'Frequently asked questions.'
            ),
            React.createElement('div', { id: 'faqList' }),
            React.createElement(
              'form',
              {
                id: 'createQuestion',
                name: 'createQuestionForm',
                onSubmit: handleCreateQuestion,
                action: '/aboutCreate',
                method: 'POST' },
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'question', type: 'text', name: 'question' }),
                  React.createElement(
                    'label',
                    { 'for': 'question', 'data-error': 'Invalid Email' },
                    'Question'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  React.createElement('input', { id: 'section', type: 'text', name: 'section' }),
                  React.createElement(
                    'label',
                    { 'for': 'section' },
                    'Section'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                  'div',
                  { 'class': 'input-field col s12' },
                  React.createElement('textarea', { id: 'answer', name: 'answer', 'class': 'materialize-textarea' }),
                  React.createElement(
                    'label',
                    { 'for': 'answer' },
                    'Answer'
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
          )
        )
      )
    )
  );
};