const openSignupForm = () => {
  // check if we can switch to sign up
  if (state.page !== 'Sign Up') {
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
    }
    // change page
    state.page = 'Sign Up';
    
    // create the progress bar
    const createProgress = () => {
      ReactDOM.render(
        <ProgressForm />,
        document.querySelector('#navProgress'),
        createSignup,
      );
      document.querySelector('#navProgress .progress').classList += ' shown';
    };
    
    // create the signup form
    const createSignup = () => {
      ReactDOM.render(
        <SignupForm csrf={state.csrf} />,
        document.querySelector('#rendering'),
        slidePages,
      );
    };
    
    // start sliding out the previous page
    const slidePages = () => {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(() => {
        swapRendered();
      }, 1000);
    }
    
    // swap the new page into the rendered scene and slide it in
    const swapRendered = () => {
      const curRendered = $('#rendered');
      const curRendering = $('#rendering');
      
      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');
      
      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#signupWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');
      
      ReactDOM.render(
        <NavForm />,
        document.querySelector('#head'),
      );
    };
    
    // start the chain
    createProgress();
  }
};

const openMainForm = () => {
  // check if we can switch to sign up
  if (state.page !== 'Home') {
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
    }
    // change page
    state.page = 'Home';
    
    // create the progress bar
    const createProgress = () => {
      ReactDOM.render(
        <ProgressForm />,
        document.querySelector('#navProgress'),
        createSignup,
      );
      document.querySelector('#navProgress .progress').classList += ' shown';
    };
    
    // create the main form
    const createSignup = () => {
      ReactDOM.render(
        <MainForm csrf={state.csrf} />,
        document.querySelector('#rendering'),
        slidePages,
      );
    };
    
    // start sliding out the previous page
    const slidePages = () => {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(() => {
        swapRendered();
      }, 1000);
    }
    
    // swap the new page into the rendered scene and slide it in
    const swapRendered = () => {
      const curRendered = $('#rendered');
      const curRendering = $('#rendering');
      
      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');
      
      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#homeWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');
      
      ReactDOM.render(
        <NavForm />,
        document.querySelector('#head'),
      );
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
    
    // start the chain
    createProgress();
  }
};

const openAboutForm = () => {
  // check if we can switch to sign up
  if (state.page !== 'About') {
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
    }
    // change page
    state.page = 'About';
    
    // create the progress bar
    const createProgress = () => {
      ReactDOM.render(
        <ProgressForm />,
        document.querySelector('#navProgress'),
        createSignup,
      );
      document.querySelector('#navProgress .progress').classList += ' shown';
    };
    
    // create the about form
    const createSignup = () => {
      ReactDOM.render(
        <AboutForm csrf={state.csrf} />,
        document.querySelector('#rendering'),
        slidePages,
      );
    };
    
    // start sliding out the previous page
    const slidePages = () => {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(() => {
        swapRendered();
      }, 1000);
    }
    
    // swap the new page into the rendered scene and slide it in
    const swapRendered = () => {
      const curRendered = $('#rendered');
      const curRendering = $('#rendering');
      
      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');
      
      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#aboutWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');
      
      ReactDOM.render(
        <NavForm />,
        document.querySelector('#head'),
      );
    };
    
    // start the chain
    createProgress();
  }
};

const openDonateForm = () => {
  // check if we can switch to sign up
  if (state.page !== 'Donate') {
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
    }
    // change page
    state.page = 'Donate';
    
    // create the progress bar
    const createProgress = () => {
      ReactDOM.render(
        <ProgressForm />,
        document.querySelector('#navProgress'),
        createSignup,
      );
      document.querySelector('#navProgress .progress').classList += ' shown';
    };
    
    // create the donate form
    const createSignup = () => {
      ReactDOM.render(
        <DonateForm csrf={state.csrf} />,
        document.querySelector('#rendering'),
        slidePages,
      );
    };
    
    // start sliding out the previous page
    const slidePages = () => {
      prevPage.removeClass('page-opened').addClass('page-closed');
      setTimeout(() => {
        swapRendered();
      }, 1000);
    }
    
    // swap the new page into the rendered scene and slide it in
    const swapRendered = () => {
      const curRendered = $('#rendered');
      const curRendering = $('#rendering');
      
      // Swap the content between the two divs without rerendering it
      curRendered.addClass('hidden').attr('id', 'rendering');
      curRendering.removeClass('hidden').attr('id', 'rendered');
      
      // clear the old content
      document.querySelector('#rendering').innerHTML = '';
      $('#donateWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');
      
      ReactDOM.render(
        <NavForm />,
        document.querySelector('#head'),
      );
    };
    
    // start the chain
    createProgress();
  }
};

const toggleLoginForm = (state) => {
  $('.account-frame').toggleClass('account-opened', state);
};

const ProgressForm = (props) => {
  return (
    <div className="progress grey darken-3">
      <div className="indeterminate orange"></div>
    </div>
  );
};

const MainForm = (props) => {
  return (
    <div id="homeWrapper">
      <div className="parallax-container">
        <div className="section valign-wrapper">
          <div className="container">
            <br />
            <br />
            <h3 className="header center white-text">It doesn't take much to be a hero.</h3>
            <br />
            <div className="row center">
              <div className="col s4 m2 offset-m4 offset-s1">
                <a href="#"
                  id="largeSignUp"
                  className="btn-large waves-effect waves-light orange lighten-1"
                  onClick={openSignupForm}>Sign up</a>
              </div>
              <div className="col m2 hide-on-small-only">
                <a href="#"
                  id="largeLogIn"
                  className="btn-large waves-effect waves-light orange lighten-1"
                  onClick={() => {toggleLoginForm(true);}}>Log in</a>
              </div>
              <div className="col s4 offset-s2 hide-on-med-and-up">
                <a href="#"
                  id="largeLogIn"
                  className="btn-large waves-effect waves-light orange lighten-1"
                  onClick={() => {toggleLoginForm(true);}}>Log in</a>
              </div>
            </div>
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
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Donate</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center light">What is <a className="grey-text text-darken-3" href="#">Hero<span className="orange-text text-lighten-1">Jam</span></a>?</h5>
                <p className="light">HeroJam hosts charity game jams committed to helping kids in hospitals around the world. We support Child's Play Charity, providing kids in hospitals with toys, books, and games.</p>
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Find out More</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center light">Join now</h5>
                <p className="light"><a className="grey-text text-darken-3" href="#">Hero<span className="orange-text text-lighten-1">Jam</span></a> is open to all RIT students. Make games, help kids, and win prizes.</p>
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

// initial function to create the home page
const buildHomePage = (csrf) => {
  state.csrf = csrf;
  
  // render all the parts
  ReactDOM.render(
    <NavForm />,
    document.querySelector('#head')
  );
  ReactDOM.render(
    <MainForm csrf={csrf} />,
    document.querySelector('#rendered'),
    // callback for the main content
    () => {
     $('#homeWrapper').addClass('page-opened');
    },
  );
  ReactDOM.render(
    <LoginForm csrf={csrf} />,
    document.querySelector('#loginContainer'),
  );
  ReactDOM.render(
    <FooterForm />,
    document.querySelector('#foot'),
  );
  
  // initialize Materialize components
  $('.parallax').parallax();
  $('.carousel').carousel({
    dist: 0,
    padding: 100,
    indicators: true,
  });
};

const getToken = () => {
  sendAjax('GET', 'getToken', null, (result) => {
    buildHomePage(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();
});
