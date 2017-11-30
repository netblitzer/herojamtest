const handleLogin = (e) => {
  e.preventDefault();
  
  
};

const handleSignup = (e) => {
  e.preventDefault();
  
  
};

const clearLoginForm = (e) => {
  $('#loginForm #user').val('');
  $('#loginForm #pass').val('');
  $('#loginForm #pass2').val('');
};

const clearSignupForm =(e) => {
  $('#signupForm #user').val('');
  $('#signupForm #pass').val('');
  $('#signupForm #pass2').val('');
};

const SignupForm = (props) => {
  return (
    <div id="signupWrapper">
      <div className="container hide-on-small-only">
        <div className="row">
          <div className="col m6 offset-m3">
            <div className="col s12">
              <form
                id="signupForm"
                onSubmit={handleSignup}>
                <h5 className="grey-text text-darken-2 pushed-down-3">Join Hero<span className="orange-text text-lighten-1">Jam</span> and become a hero.</h5>
                <div className="row">
                  <div className="input-field col s12">
                    <input placeholder="" id="user" type="text" className="validate" />
                    <label for="user">Username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="pass" type="password" className="validate" />
                    <label for="pass">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="pass2" type="password" className="validate" />
                    <label for="pass2">Repeat Password</label>
                  </div>
                </div>
                <input type="hidden" id="_csrf" value={props.csrf}/>
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
                    onSubmit={handleLogin}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input placeholder="" id="user" type="text" className="validate" />
                        <label for="user">Username</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input id="pass" type="password" className="validate" />
                        <label for="pass">Password</label>
                      </div>
                    </div>
                    <input type="hidden" id="_csrf" value={props.csrf}/>
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