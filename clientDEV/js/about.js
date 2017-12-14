const openAboutForm = () => {
  
  // * Basic Page creation functions * //
  // create the about form
  const createAbout = (prevPage, skip) => {
    ReactDOM.render(
      <AboutForm csrf={state.csrf} />,
      document.querySelector('#rendering'),
      slidePages(prevPage, initializeAbout, '#aboutWrapper', skip),
    );
  };
  
  // initializer callback
  const initializeAbout = () => {
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
    let prevPage;
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
    createProgress(() => {
      createAbout(prevPage, false);
    });
  }
};
// object holding all the questions
let faq = { };

// populate the FAQ list with responses from the server
const fillQuestionList = (response) => {
  
  const sections = { };
  let uid = 0;  // UID used for opening the specified question
  const data = {};  // used to populate the autocomplete
  
  // parse the data
  response.docs.forEach((q) => {
    // sort the questions into their sections
    if (sections[q.section] === undefined) {
      sections[q.section] = [];
      uid += 100;
    }
    
    // push new question data into each section array
    sections[q.section].push({
      question: q.question,
      answer: q.answer,
      uid: `uid${uid}`,
      secid: `secid${Math.floor(uid / 100)}`,
    });
    
    faq[q.question] = {
      question: q.question,
      answer: q.answer,
      uid,
    };
    
    data[q.question] = null;
    
    uid++;
  });
  
  ReactDOM.render(
    <FAQListForm sections={sections} />,
    document.querySelector('#faqList'),
  );
          
  $('.collapsible').collapsible();
  $('#answer').trigger('autoresize');
  // set up the autocomplete
  $('input.autocomplete').autocomplete({
    data,
    limit: 5,
    onAutocomplete: (val) => {
      // find the menu the question is under
      const bodyID = Math.floor(faq[val].uid / 100);
      const headID = faq[val].uid;
      const body = $(`#secid${bodyID}`);
      const head = $(`#uid${headID}`);
      
      // open the question
      if (!body.hasClass('active'))
        body.click();
      
      if (!head.hasClass('active'))
        head.click();
    },
    minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
  });
};

// AJAX call to get questions
const getQuestions = () => {
  sendAjax('GET', '/aboutQuestions', null, fillQuestionList);
};

// Function response to creating questions
const createQuestionsResponse = (response) => {
  if (!response.success) {
    return handleError(response.errorFull);
  }
  
  Materialize.toast(response.message, 3000);
};
// Function to create a new question and send it to the server
const handleCreateQuestion = (e) => {
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
const FAQListForm = (props) => {
  
  const keys = Object.keys(props.sections);
  const secForms = [];
  
  for (let i = 0; i < keys.length; i++) {
    secForms.push((() => {
      return (
        <SectionForm section={keys[i]} responses={props.sections[keys[i]]} />
      );
    })());
  }
  
  return (
    <ul className="collapsible" data-collapsible="accordion">
      {secForms}
    </ul>
  );
};

// form for each section in the FAQ list
const SectionForm = (props) => {
  const questions = props.responses.map((res) => {
    return (
      <QuestionForm question={res.question} answer={res.answer} uid={res.uid} />
    );
  });
  
  return (
    <li>
      <div className="collapsible-header" id={props.responses[0].secid}>{props.section}</div>
      <div className="collapsible-body collapsible-thin-padding">
        <ul className="collapsible" data-collapsibile="accordion">
          {questions}
        </ul>
      </div>
    </li>
  );
};
// form for each question populating the FAQ list
const QuestionForm = (props) => {
  return (
    <li>
      <div className="collapsible-header" id={props.uid}>{props.question}</div>
      <div className="collapsible-body"><span>{props.answer}</span></div>
    </li>
  );
};

const AboutForm = (props) => {
  return (
    <div id="aboutWrapper" className="pageWrapper">
      <div className="container">
        <div className="row">
          <div className="section">
            <div className="col s12 pushed-down-2">
              <h5 className="grey-text text-darken-3">Have a question? Search to see if we have your answer.</h5>
              <div>
                <div className="search-wrapper input-field">
                  <i className="material-icons prefix">search</i>
                  <input id="search" type="text" className="autocomplete" />
                  <label for="search">Search</label>
                  <div className="search-results"></div>
                </div>
              </div>
              <h5 className="grey-text text-darken-3">Frequently asked questions.</h5>
              <div id="faqList">
              
              </div>
              
              
              <form
                id="createQuestion"
                className="hidden"
                name="createQuestionForm"
                onSubmit={handleCreateQuestion}
                action="/aboutCreate"
                method="POST">
                <div className="row">
                  <div className="input-field col s12">
                    <input id="question" type="text" name="question" />
                    <label for="question" data-error="Invalid Email">Question</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="section" type="text" name="section" />
                    <label for="section">Section</label>
                  </div>
                </div>
                <div className="row">
                  <div class="input-field col s12">
                    <textarea id="answer" name="answer" class="materialize-textarea"></textarea>
                    <label for="answer">Answer</label>
                  </div>
                </div>
                <input type="hidden" name="_csrf" value={props.csrf}/>
                <button className="btn white waves-effect waves-green black-text right" type="submit" name="action">Submit
                  <i className="material-icons right">send</i>
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};