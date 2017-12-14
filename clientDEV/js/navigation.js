// Object for storing the navigation state
const state = {
  page: undefined,
  crumb: [ ],
  loggedIn: false,
  csrf: undefined,
};

// navigation state changes
const changePage = (e) => {
  // figure out what the future page is
  let title;
  if (e.target) {
    title = e.target.textContent;
  } else {
    title = e;
  }
  
  // see which page we're moving to
  switch (title) {
    default:
    case 'Home':
      history.pushState({page: title}, title, 'home');
      openMainForm();
      break;
    case 'About':
      history.pushState({page: title}, title, 'about');
      openAboutForm();
      break;
    case 'Sign Up':
      history.pushState({page: title}, title, 'signup');
      openSignupForm();
      break;
    case 'Donate':
      history.pushState({page: title}, title, 'donate');
      openDonateForm();
      break;
    case 'Profile':
      history.pushState({page: title}, title, 'profile');
      openProfileForm();
      break;
  }
};

// backwards and forwards for state changes in the browser
window.onpopstate = (e) => {
  // check if we're on the first page we entered through
  if (e.state) {
    switch (e.state.page) {
      default:
      case 'Home':
        openMainForm();
        break;
      case 'About':
        openAboutForm();
        break;
      case 'Sign Up':
        openSignupForm();
        break;
      case 'Donate':
        openDonateForm();
        break;
      case 'Profile':
        openProfileForm();
        break;
    }
  } else {
    // if we're on the first page loaded, just build the basic inner content again
    buildInnerContent();
  }
};

const NavForm = (props) => {
  
  // Navigation option 3 and 4
  let B3;
  let B4;
  
  // Change navigation options based on whether we're logged in or not
  if (state.loggedIn) {
    B3 = (() => {
      return (
        <li><a className={state.page==='Profile' ? "black-text heavy" : "grey-text text-darken-2" } onClick={changePage}>Profile</a></li>
      );
    })();
    B4 = (() => {
      return (
        <li><a className="grey-text text-darken-2" href="#" onClick={handleLogout}>Log Out</a></li>
      );
    })();
  } else {
    B3 = (() => {
      return (
        <li><a className={state.page==='Sign Up' ? "black-text heavy" : "grey-text text-darken-2" } onClick={changePage}>Sign Up</a></li>
      );
    })();
    B4 = (() => {
      return (
        <li><a className="grey-text text-darken-2" href="#" onClick={() => {toggleLoginForm(true)}}>Log In</a></li>
      );
    })();
  }
  
  // Create the navigation form
  return (
    <nav className="white">
      <div className="nav-wrapper container">
        <a className="brand-logo grey-text text-darken-4" onClick={() => {changePage('Home')}}>Hero<span className="orange-text text-lighten-1">Jam</span></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a className={state.page==='Home' ? "black-text heavy" : "grey-text text-darken-2" } onClick={changePage}>Home</a></li>
          <li><a className={state.page==='About' ? "black-text heavy" : "grey-text text-darken-2" } onClick={changePage}>About</a></li>
          {B3}
          {B4}
          <li><a className={state.page==='Donate' ? "orange-text text-lighten-1 heavy" : "orange-text text-lighten-1" } onClick={changePage}>Donate</a></li>
        </ul>
      </div>
      <div id="navProgress">
      
      </div>
    </nav>
  );
};