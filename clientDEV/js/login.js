// response to login
const loginResponse = (response) => {
  if (response.success) {
    state.loggedIn = true;
    
    toggleLoginForm(false);
    clearLoginForm();
    
    Materialize.toast(response.message, 3000);
    
    if (state.page === 'Home') {
      ReactDOM.render(
        <MainForm csrf={state.csrf} />,
        document.querySelector('#rendered'),
        // callback for the main content
        () => {
         $('#homeWrapper').addClass('page-opened');
        },
      );
    }
  } else {
    state.loggedIn = false;
    
    resetAllTokens();
    Materialize.toast(response.message, 3000);
  }
  ReactDOM.render(
    <NavForm />,
    document.querySelector('#head'),
  );
};

// response to signup
const signupResponse = (response) => {
  if (response.success) {
    state.loggedIn = true;
    clearSignupForm();
    
    openMainForm();
    
    Materialize.toast(response.message, 3000);
  } else {
    state.loggedIn = false;
    
    resetAllTokens();
    Materialize.toast(response.errorFull, 3000);
  }
};

// function to call during the start of the page to see if the client is already logged in
const checkIfLoggedIn = () => {
  sendAjax('GET', '/isLoggedIn', null, (response) => {
    loginResponse(response);
    
    if (state.page === 'Home') {
      ReactDOM.render(
        <MainForm csrf={state.csrf} />,
        document.querySelector('#rendered'),
        // callback for the main content
        () => {
         $('#homeWrapper').addClass('page-opened');
        },
      );
    }
  });
};

// Handlers for post requests for login and signup
const handleLogin = (e) => {
  e.preventDefault();
  
  if ($('#loginForm #email').val() === '' || $('#loginForm #pass').val() === '') {
    handleError('Email or password is missing.');
    return false;
  }
  
  sendAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), loginResponse);
  
  return false;
};
const handleSignup = (e) => {
  e.preventDefault();
  
  if ($('#signupForm #email').val() === '' || $('#signupForm #first').val() === '' || $('#signupForm #last').val() === '' || $('#signupForm #pass').val() === '' || $('#signupForm #pass2').val() === '') {
    handleError('Required parameters are missing.');
    return false;
  }
  
  if ($('#signupForm #pass').val() !== $('#signupForm #pass2').val()) {
    handleError('Passwords do not match.');
    return false;
  }
  
  sendAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), signupResponse);
  
  return false;
};

// logout functions
const handleLogout = () => {
  if (state.loggedIn) {
    sendAjax('GET', '/logout', null, logoutResponse);
  }
  
  clearLoginForm();
  clearSignupForm();
};
const logoutResponse = (response) => {
  if (response.success) {
    state.loggedIn = false;
    
    console.dir(state);
    
    resetAllTokens();
    Materialize.toast(response.message, 3000);
    
    ReactDOM.render(
      <NavForm />,
      document.querySelector('#head'),
    );
    
    if (state.page === 'Home') {
      ReactDOM.render(
        <MainForm csrf={state.csrf} />,
        document.querySelector('#rendered'),
        // callback for the main content
        () => {
         $('#homeWrapper').addClass('page-opened');
        },
      );
    } else if (state.page === 'Profile') {
      changePage('Home');
    }
  } 
};

// Form clearing functions
const clearLoginForm = (e) => {
  $('#loginForm #email').val('');
  $('#loginForm #pass').val('');
};

const clearSignupForm =(e) => {
  $('#signupForm #email').val('');
  $('#signupForm #first').val('');
  $('#signupForm #last').val('');
  $('#signupForm #pass').val('');
  $('#signupForm #pass2').val('');
};

const SignupForm = (props) => {
  return (
    <div id="signupWrapper" className="pageWrapper">
      <div className="container hide-on-small-only">
        <div className="row">
          <div className="col m6 offset-m3">
            <div className="col s12">
              <form
                id="signupForm"
                name="signupForm"
                onSubmit={handleSignup}
                action="/signupSend"
                method="POST">
                <h5 className="grey-text text-darken-2 pushed-down-2">Join Hero<span className="orange-text text-lighten-1">Jam</span> and become a hero.</h5>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="email" type="email" name="email" className="validate" />
                    <label for="email" data-error="Invalid Email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input id="first" type="text" name="first" className="validate" />
                    <label for="first">First Name</label>
                  </div>
                  <div className="input-field col s6">
                    <input id="last" type="text" name="last" className="validate" />
                    <label for="last">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="pass" type="password" name="pass" className="validate" />
                    <label for="pass">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="pass2" type="password" name="pass2" className="validate" />
                    <label for="pass2">Repeat Password</label>
                  </div>
                </div>
                <input type="hidden" name="_csrf" value={props.csrf}/>
                <button className="btn white waves-effect waves-green black-text right" type="submit" name="action">Submit
                  <i className="material-icons right">send</i>
                </button>
              </form>
              <button className="btn white waves-effect waves-red black-text"
                id="clear-signup-form"
                onClick={clearSignupForm}>Clear
                <i className="material-icons right">clear</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div id="loginContainer">
        
      </div>
    </div>
  );
};

const LoginForm = (props) => {
  return (
    <div className="account-frame">
      <div className="account-holder" 
        onClick={
          (e) => {
            if (e.target === document.querySelector('.account-holder'))
              toggleLoginForm(false);
        }}>
        <div className="account-main-frame">
          <div className="account-wrapper">
            <div className="account-box white">
              <div className="account-top-bar orange lighten-1">
                <div className="container">
                  <div className="col s11">
                    <h5 className="white-text left">Log in</h5>
                  </div>
                  <div className="col s1">
                    <a className="btn-flat waves-effect waves-red right"
                        onClick={() => {toggleLoginForm(false);}}>
                      <i className="material-icons white-text">close</i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="account-form-div">
                <div className="container">
                  <form className="col s12"
                    id="loginForm"
                    name="loginForm"
                    onSubmit={handleLogin}
                    action="/loginSend"
                    method="POST">
                    <div className="row pushed-down-2">
                      <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate" />
                        <label for="email" data-error="Invalid Email">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input id="pass" type="password" name="pass" className="validate" />
                        <label for="pass">Password</label>
                      </div>
                    </div>
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <button className="btn white waves-effect waves-green black-text right" type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </form>
                  <button className="btn white waves-effect waves-red black-text" 
                    id="clear-login-form"
                    onClick={clearLoginForm}>Clear
                    <i className="material-icons right">clear</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};