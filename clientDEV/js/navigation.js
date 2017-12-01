// Object for storing the navigation state
const state = {
  page: 'Home',
  crumb: [ ],
  loggedIn: false,
  csrf: undefined,
};

const NavForm = (props) => {
  
  // Navigation option 3 and 4
  let B3;
  let B4;
  
  // Change navigation options based on whether we're logged in or not
  if (state.loggedIn) {
    B3 = (() => {
      return (
        <li><a className={state.page==='Profile' ? "black-text heavy" : "grey-text text-darken-2" } href="#" onClick={openProfileForm}>Profile</a></li>
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
        <li><a className={state.page==='Sign Up' ? "black-text heavy" : "grey-text text-darken-2" } href="#" onClick={openSignupForm}>Sign Up</a></li>
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
        <a href="#" className="brand-logo grey-text text-darken-4">Hero<span className="orange-text text-lighten-1">Jam</span></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a className={state.page==='Home' ? "black-text heavy" : "grey-text text-darken-2" } href="#" onClick={openMainForm}>Home</a></li>
          <li><a className={state.page==='About' ? "black-text heavy" : "grey-text text-darken-2" } href="#" onClick={openAboutForm}>About</a></li>
          {B3}
          {B4}
          <li><a className={state.page==='Donate' ? "orange-text text-lighten-1 heavy" : "orange-text text-lighten-1" } href="#" onClick={openDonateForm}>Donate</a></li>
        </ul>
      </div>
      <div id="navProgress">
      
      </div>
    </nav>
  );
};