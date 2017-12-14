// basic error handling
const handleError = (message) => {
  console.dir(message);
  
  Materialize.toast(message.errorFull, 3000);
};

// basic AJAX request
const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    success: success,
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj);
    },
  });
};

// function to get the csrf token and pass it into the callback
const getToken = (callback) => {
  sendAjax('GET', 'getToken', null, (result) => {
    callback(result.csrfToken);
  });
};

// function to get a new token and reset all forms on the page
const resetAllTokens = () => {
  sendAjax('GET', 'getToken', null, (result) => {
    const csrf = result.csrfToken;
    
    state.csrf = csrf;
    
    const forms = document.querySelectorAll('[name=_csrf]');
    
    forms.forEach((input) => {
      input.value = csrf;
    });
  });
};

// initial function to build the basic page without content
const buildBasicPage = (csrf) => {
  state.csrf = csrf;
  
  // render all the parts
  ReactDOM.render(
    <NavForm />,
    document.querySelector('#head'),
    checkIfLoggedIn,
  );
  
  ReactDOM.render(
    <FooterForm />,
    document.querySelector('#foot'),
  );
  
  buildInnerContent(csrf);
};
const buildInnerContent = (csrf) => {
  switch (location.pathname) {
    case '/about':
      //history.pushState({page: 'About'}, 'About', 'about');
      openAboutForm(csrf);
      break;
    case '/signup':
      //history.pushState({page: 'Sign up'}, 'Sign up', 'signup');
      openSignupForm(csrf);
      break;
    case '/donate':
      //history.pushState({page: 'Donate'}, 'Donate', 'donate');
      openDonateForm(csrf);
      break;
    case '/profile':
      //history.pushState({page: 'Profile'}, 'Profile', 'profile');
      openProfileForm(csrf);
      break;
    case '/':
    default:
      //history.pushState({page: 'Home'}, 'Home', 'home');
      openMainForm(csrf);
      break;
  }
}

// create the progress bar
const createProgress = (callback) => {
  ReactDOM.render(
    <ProgressForm />,
    document.querySelector('#navProgress'),
    callback,
  );
  document.querySelector('#navProgress .progress').classList += ' shown';
};

// start sliding out the previous page
const slidePages = (prevPage, finalCallback, newWrapper, skip) => {
  if (prevPage != null)
    prevPage.removeClass('page-opened').addClass('page-closed');
  
  if (skip) {
    setTimeout(() => {
      swapRendered(finalCallback, newWrapper);
    }, 10);
  } else {
    setTimeout(() => {
      swapRendered(finalCallback, newWrapper);
    }, 1000);
  }
};

// swap the new page into the rendered scene and slide it in
const swapRendered = (finalCallback, newWrapper) => {
  const curRendered = $('#rendered');
  const curRendering = $('#rendering');

  // Swap the content between the two divs without rerendering it
  curRendered.addClass('hidden').attr('id', 'rendering');
  curRendering.removeClass('hidden').attr('id', 'rendered');

  // clear the old content
  document.querySelector('#rendering').innerHTML = '';
  
  // slide the new content in
  setTimeout(() => {
    document.querySelector(newWrapper).classList = 'pageWrapper page-opened';
  }, 50);
  //newWrapper.addClass('page-opened');
  $('#navProgress .progress').removeClass('shown');

  ReactDOM.render(
    <NavForm />,
    document.querySelector('#head'),
  );

  finalCallback();
};

$(document).ready(() => {
  getToken(buildBasicPage);
});