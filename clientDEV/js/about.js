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
      case 'Profile':
        prevPage = $('#profileWrapper');
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
          
      $('.collapsible').collapsible();
    };
    
    // start the chain
    createProgress();
  }
};

const AboutForm = (props) => {
  return (
    <div id="aboutWrapper" className="pageWrapper">
      <div className="container">
        <div className="row">
          <div className="section">
            <div className="col s12 pushed-down-2">
              <h5 className="grey-text text-darken-3">Have a question? Search to see if we have your answer.</h5>
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
              <h5 className="grey-text text-darken-3">Frequently asked questions.</h5>
              <ul className="collapsible" data-collapsible="accordion">
                <li>
                  <div className="collapsible-header">Donations</div>
                  <div className="collapsible-body collapsible-thin-padding"><span>
                    <ul className="collapsible" data-collapsible="accordion">
                      <li>
                        <div className="collapsible-header">How can I help?</div>
                        <div className="collapsible-body"><span>
                                If you are able to donate, 100% of all donations will go to Child's Play and help kids in hospitals around the world.
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="collapsible-header">I can't afford to donate but my friends/family can.</div>
                        <div className="collapsible-body"><span>
                                If you want to be entered for prizes but can't afford to donate, as long as your friends or family donate and add your name in the comments of the donation, it will still count towards your donation total.
                          </span>
                        </div>
                      </li>
                    </ul>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};