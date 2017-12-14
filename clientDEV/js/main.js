const openSignupForm = () => {
  // if the user is logged on, go back to the main page
  // can't create a new account if you're already logged in
  if (state.loggedIn) {
    history.replaceState({page: 'Home'}, 'Home', 'home');
    return openMainForm();
  }
  
  // create the signup form
  const createSignup = (prevPage, skip) => {
    ReactDOM.render(
      <SignupForm csrf={state.csrf} />,
      document.querySelector('#rendering'),
      slidePages(prevPage, initializeSignup, '#signupWrapper', skip),
    );
  };
  
  // initializer callback
  const initializeSignup = () => {
    ReactDOM.render(
      <LoginForm csrf={state.csrf} />,
      document.querySelector('#loginContainer'),
    );
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
    let prevPage;
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
    createProgress(() => {
      createSignup(prevPage, false);
    });
  }
};

const openMainForm = () => {
    
  // create the main form
  const createMain = (prevPage, skip) => {
    ReactDOM.render(
      <MainForm csrf={state.csrf} />,
      document.querySelector('#rendering'),
      slidePages(prevPage, initializeMain, '#homeWrapper', skip),
    );
  };
  
  // initializer callback
  const initializeMain = () => {
    ReactDOM.render(
      <LoginForm csrf={state.csrf} />,
      document.querySelector('#loginContainer'),
    );

    // initialize Materialize components
    $('.parallax').parallax();
    $('.carousel').carousel({
      dist: 0,
      padding: 100,
      indicators: true,
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
    let prevPage;
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
    createProgress(() => {
      createMain(prevPage, false);
    });
  }
};

const openDonateForm = () => {
  // create the donate form
  const createDonate = (prevPage, skip) => {
    ReactDOM.render(
      <DonateForm csrf={state.csrf} />,
      document.querySelector('#rendering'),
      slidePages(prevPage, initializeDonate, '#donateWrapper', skip),
    );
  };
  
  // intializer callback
  const initializeDonate = () => {
    
  };
    
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
    let prevPage;
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
    createProgress(() => {
      createDonate(prevPage, false);
    });
  }
};

const toggleLoginForm = (state) => {
  $('.account-frame').toggleClass('account-opened', state);
};

// loading bar at the top of the screen
const ProgressForm = (props) => {
  return (
    <div className="progress grey darken-3">
      <div className="indeterminate orange"></div>
    </div>
  );
};

const MainForm = (props) => {
  
  let centerRow;
  if (state.loggedIn) {
    centerRow = (() => {
      return (
        <div className="row center">
          <div className="col s4 m2 offset-s4 offset-m5">
            <a className="btn-large waves-effect waves-light orange lighten-1"
               onClick={() => {changePage('Donate')}}>Donate</a>
          </div>
        </div>
      );
    })();
  } else {
    centerRow = (() => {
      return (
        <div className="row center">
          <div className="col s4 m2 offset-m4 offset-s1">
            <a id="largeSignUp"
               className="btn-large waves-effect waves-light orange lighten-1"
               onClick={() => {changePage('Sign Up')}}>Sign up</a>
          </div>
          <div className="col m2 hide-on-small-only">
            <a id="largeLogIn"
               className="btn-large waves-effect waves-light orange lighten-1"
               onClick={() => {toggleLoginForm(true);}}>Log in</a>
          </div>
          <div className="col s4 offset-s2 hide-on-med-and-up">
            <a id="largeLogIn"
               className="btn-large waves-effect waves-light orange lighten-1"
               onClick={() => {toggleLoginForm(true);}}>Log in</a>
          </div>
        </div>
      );
    })();
  }
  
  return (
    <div id="homeWrapper" className="pageWrapper">
      <div className="parallax-container">
        <div className="section valign-wrapper">
          <div className="container">
            <br />
            <br />
            <h3 className="header center white-text">It doesn't take much to be a hero.</h3>
            <br />
            {centerRow}
            <br />
            <br />
          </div>
        </div>
        <div className="parallax black">
          <img className="parallaxImage" src="assets/media/header_image_1280.png" alt="Header Image" />
        </div>
      </div>

      <div id="infoContainer" className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center light">We need your help</h5>
                <p className="light">Your donations give kids things to enjoy during their stay at the hospital.</p>
                <a onClick={() => {changePage('Donate')}} className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Donate</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center light">What is <a className="grey-text text-darken-3" onClick={() => {changePage('Home')}}>Hero<span className="orange-text text-lighten-1">Jam</span></a>?</h5>
                <p className="light">HeroJam hosts charity game jams committed to helping kids in hospitals around the world. We support Child's Play Charity, providing kids in hospitals with toys, books, and games.</p>
                <a onClick={() => {changePage('About')}} className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Find Out More</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center light">Join now</h5>
                <p className="light"><a className="grey-text text-darken-3" onClick={() => {changePage('Home')}}>Hero<span className="orange-text text-lighten-1">Jam</span></a> is open to all RIT students. Make games, help kids, and win prizes.</p>
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Join Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-gap grey darken-4"></div>

      <div id="statsContainer" className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">group</i></h2>
                <h5 className="center light">Players</h5>
                <h5 className="center orange-text text-lighten-1 light">109</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">attach_money</i></h2>
                <h5 className="center light">Raised</h5>
                <h5 className="center orange-text text-lighten-1 light">$4028</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">videogame_asset</i></h2>
                <h5 className="center light">Games</h5>
                <h5 className="center orange-text text-lighten-1 light">29 Made</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-gap grey darken-4"></div>

      <div id="sponsorContainer" className="grey darken-3">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col s12">
                <h5 className="center grey-text text-lighten-4">Want to sponsor? <a className="orange-text text-lighten-1" href="#">Find out how.</a></h5>
                <div className="carousel">
                  <a className="carousel-item" href="#bungie"><img src="assets/media/bungie.png" alt="Bungie" /></a>
                  <a className="carousel-item" href="#microsoft"><img src="assets/media/microsoft.png" alt="Microsoft" /></a>
                  <a className="carousel-item" href="#igm"><img src="assets/media/igm.png" alt="IGM" /></a>
                  <a className="carousel-item" href="#magic"><img src="assets/media/magic.png" alt="MAGIC Center" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="loginContainer">
        
      </div>
    </div>
  );
};

const FooterForm = (props) => {
  return (
    <div id="footerContainer" className="orange lighten-1">
      <div className="container">
        <div className="row valign-wrapper hide-on-small-only">
          <div className="col l6">
            <h5 className="light black-text">Have any questions?</h5>
            <p className="light grey-text text-darken-3">Let us know at <a className="black-text" href="emailto:contact@herojam.io">contact@herojam.io</a> or any of our social media links.</p>
          </div>
          
          <div className="col l4 offset-l2 valign-wrapper">
            <div className="row">
              <div className="col s2 offset-s6">
                <a href="#facebook"><img className="responsive-img" src="assets/media/fb.gif" alt="Facebook"/></a>
              </div>
              <div className="col s2">
                <a href="#twitter"><img className="responsive-img" src="assets/media/twitter.gif" alt="Twitter" /></a>
              </div>
              <div className="col s2">
                <a href="#twitch"><img className="responsive-img" src="assets/media/twitch.gif" alt="Twitch" /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row valign-wrapper show-on-small hide-on-med-and-up">
          <div className="col s10 offset-s1">
            <h5 className="light black-text">Have any questions?</h5>
            <p className="light grey-text text-darken-3">Let us know at <a className="black-text" href="emailto:contact@herojam.io">contact@herojam.io</a> or any of our social media links.</p>
          </div>
          
          <div className="col s10 valign-wrapper row">
            <div className="col s2 offset-s3">
              <a href="#facebook"><img className="responsive-img" src="assets/media/fb.gif" alt="Facebook"/></a>
            </div>
            <div className="col s2">
              <a href="#twitter"><img className="responsive-img" src="assets/media/twitter.gif" alt="Twitter" /></a>
            </div>
            <div className="col s2">
              <a href="#twitch"><img className="responsive-img" src="assets/media/twitch.gif" alt="Twitch" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="col s12">
                <p className="left grey-text text-darken-3">&copy; 2017 HeroJam</p>
                <p className="right grey-text text-darken-3">Created by <a className="black-text" href="https://www.lukemillergames.com">Luke Miller</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
