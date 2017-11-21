const NavForm = (props) => {
  return (
    <nav className="white">
      <div className="nav-wrapper container">
        <a href="#" className="brand-logo grey-text text-darken-4">Hero<span className="orange-text text-lighten-1">Jam</span></a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a className="grey-text text-darken-2" href="#">Home</a></li>
          <li><a className="grey-text text-darken-2" href="#">About</a></li>
          <li><a className="grey-text text-darken-2" href="#">Sign Up</a></li>
          <li><a className="grey-text text-darken-2" href="#">Log In</a></li>
          <li><a className="orange-text text-lighten-1" href="#">Donate</a></li>
        </ul>
      </div>
    </nav>
  );
};

const MainForm = (props) => {  
  return (
    <div id="siteWrapper">
      <div className="parallax-container">
        <div className="section valign-wrapper">
          <div className="container">
            <br />
            <br />
            <h3 className="header center white-text">It doesn't take much to be a hero.</h3>
            <br />
            <div className="row center">
              <div className="col s2 offset-s4">
                <a href="#" id="largeSignUp" className="btn-large waves-effect waves-light orange light-1">Sign up</a>
              </div>
              <div className="col s2">
                <a href="#" id="largeLogIn" className="btn-large waves-effect waves-light orange light-1">Log in</a>
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
                <h5 className="center">We need your help</h5>
                <p className="light">Your donations give kids things to enjoy during their stay at the hospital.</p>
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Donate</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center">What is <a className="grey-text text-darken-3" href="#">Hero<span className="orange-text text-lighten-1">Jam</span></a>?</h5>
                <p className="light">HeroJam hosts charity game jams committed to helping kids in hospitals around the world. We support Child's Play Charity, providing kids in hospitals with toys, books, and games.</p>
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Find out More</a>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h5 className="center">Join now</h5>
                <p className="light"><a className="grey-text text-darken-3" href="#">Hero<span className="orange-text text-lighten-1">Jam</span></a> is open to all RIT students. Make games, help kids, and win prizes.</p>
                <a href="#" className="waves-effect waves-light btn-flat centered-button orange-text text-lighten-1">Join Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-gap grey darken-3"></div>
      
      <div id="statsContainer" className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">group</i></h2>
                <h5 className="center">Players</h5>
                <h5 className="center orange-text text-lighten-1">109</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">attach_money</i></h2>
                <h5 className="center">Raised</h5>
                <h5 className="center orange-text text-lighten-1">$4028</h5>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center black-text"><i className="material-icons xlarge">videogame_asset</i></h2>
                <h5 className="center">Games</h5>
                <h5 className="center orange-text text-lighten-1">29 Made</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-gap grey darken-3"></div>
      
      <div id="sponsorsContainer" className="container">
        <div className="section">
          <div className="carousel">
            <a class="carousel-item" href="#bungie"><img src="assets/media/bungie.png" alt="Bungie" /></a>
            <a class="carousel-item" href="#microsoft"><img src="assets/media/microsoft.png" alt="Bungie" /></a>
            <a class="carousel-item" href="#magic"><img src="assets/media/magic.png" alt="Bungie" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FooterForm = (props) => {
  
  
  
};

const buildPage = (csrf) => {
  ReactDOM.render(
    <NavForm />,
    document.querySelector('#head')
  );
  ReactDOM.render(
    <MainForm />,
    document.querySelector('#main')
  );
  //ReactDOM.render(
  //  <FooterForm />,
  //  document.querySelector('#foot')
  //);
  
  $('.parallax').parallax();
  $('.carousel').carousel();
};

const getToken = () => {
  sendAjax('GET', 'getToken', null, (result) => {
    buildPage(result.csrfToken);
  });
};

$(document).ready(() => {
  getToken();
});
