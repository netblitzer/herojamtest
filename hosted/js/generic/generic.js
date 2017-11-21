"use strict";

var NavForm = function NavForm(props) {
  return React.createElement(
    "nav",
    { className: "white" },
    React.createElement(
      "div",
      { className: "nav-wrapper container" },
      React.createElement(
        "a",
        { href: "#", className: "brand-logo grey-text text-darken-4" },
        "Hero",
        React.createElement(
          "span",
          { className: "orange-text text-lighten-1" },
          "Jam"
        )
      ),
      React.createElement(
        "ul",
        { id: "nav-mobile", className: "right hide-on-med-and-down" },
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "grey-text text-darken-2", href: "#" },
            "Home"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "grey-text text-darken-2", href: "#" },
            "About"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "grey-text text-darken-2", href: "#" },
            "Sign Up"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "grey-text text-darken-2", href: "#" },
            "Log In"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { className: "orange-text text-lighten-1", href: "#" },
            "Donate"
          )
        )
      )
    )
  );
};

var MainForm = function MainForm(props) {
  return React.createElement(
    "div",
    { id: "siteWrapper" },
    React.createElement(
      "div",
      { className: "parallax-container" },
      React.createElement(
        "div",
        { className: "section valign-wrapper" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("br", null),
          React.createElement("br", null),
          React.createElement(
            "h3",
            { className: "header center white-text" },
            "It doesn't take much to be a hero."
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "row center" },
            React.createElement(
              "div",
              { className: "col s2 offset-s4" },
              React.createElement(
                "a",
                { href: "#", id: "largeSignUp", className: "btn-large waves-effect waves-light orange light-1" },
                "Sign up"
              )
            ),
            React.createElement(
              "div",
              { className: "col s2" },
              React.createElement(
                "a",
                { href: "#", id: "largeLogIn", className: "btn-large waves-effect waves-light orange light-1" },
                "Log in"
              )
            )
          ),
          React.createElement("br", null),
          React.createElement("br", null)
        )
      ),
      React.createElement(
        "div",
        { className: "parallax black" },
        React.createElement("img", { className: "parallaxImage", src: "assets/media/header_image_1280.png", alt: "Header Image" })
      )
    ),
    React.createElement(
      "div",
      { id: "infoContainer", className: "container" },
      React.createElement(
        "div",
        { className: "section" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h5",
                { className: "center" },
                "We need your help"
              ),
              React.createElement(
                "p",
                { className: "light" },
                "Your donations give kids things to enjoy during their stay at the hospital."
              ),
              React.createElement(
                "a",
                { href: "#", className: "waves-effect waves-light btn-flat centered-button orange-text text-lighten-1" },
                "Donate"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h5",
                { className: "center" },
                "What is ",
                React.createElement(
                  "a",
                  { className: "grey-text text-darken-3", href: "#" },
                  "Hero",
                  React.createElement(
                    "span",
                    { className: "orange-text text-lighten-1" },
                    "Jam"
                  )
                ),
                "?"
              ),
              React.createElement(
                "p",
                { className: "light" },
                "HeroJam hosts charity game jams committed to helping kids in hospitals around the world. We support Child's Play Charity, providing kids in hospitals with toys, books, and games."
              ),
              React.createElement(
                "a",
                { href: "#", className: "waves-effect waves-light btn-flat centered-button orange-text text-lighten-1" },
                "Find out More"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h5",
                { className: "center" },
                "Join now"
              ),
              React.createElement(
                "p",
                { className: "light" },
                React.createElement(
                  "a",
                  { className: "grey-text text-darken-3", href: "#" },
                  "Hero",
                  React.createElement(
                    "span",
                    { className: "orange-text text-lighten-1" },
                    "Jam"
                  )
                ),
                " is open to all RIT students. Make games, help kids, and win prizes."
              ),
              React.createElement(
                "a",
                { href: "#", className: "waves-effect waves-light btn-flat centered-button orange-text text-lighten-1" },
                "Join Now"
              )
            )
          )
        )
      )
    ),
    React.createElement("div", { className: "space-gap grey darken-3" }),
    React.createElement(
      "div",
      { id: "statsContainer", className: "container" },
      React.createElement(
        "div",
        { className: "section" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h2",
                { className: "center black-text" },
                React.createElement(
                  "i",
                  { className: "material-icons xlarge" },
                  "group"
                )
              ),
              React.createElement(
                "h5",
                { className: "center" },
                "Players"
              ),
              React.createElement(
                "h5",
                { className: "center orange-text text-lighten-1" },
                "109"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h2",
                { className: "center black-text" },
                React.createElement(
                  "i",
                  { className: "material-icons xlarge" },
                  "attach_money"
                )
              ),
              React.createElement(
                "h5",
                { className: "center" },
                "Raised"
              ),
              React.createElement(
                "h5",
                { className: "center orange-text text-lighten-1" },
                "$4028"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col s12 m4" },
            React.createElement(
              "div",
              { className: "icon-block" },
              React.createElement(
                "h2",
                { className: "center black-text" },
                React.createElement(
                  "i",
                  { className: "material-icons xlarge" },
                  "videogame_asset"
                )
              ),
              React.createElement(
                "h5",
                { className: "center" },
                "Games"
              ),
              React.createElement(
                "h5",
                { className: "center orange-text text-lighten-1" },
                "29 Made"
              )
            )
          )
        )
      )
    ),
    React.createElement("div", { className: "space-gap grey darken-3" }),
    React.createElement(
      "div",
      { id: "sponsorsContainer", className: "container" },
      React.createElement(
        "div",
        { className: "section" },
        React.createElement(
          "div",
          { className: "carousel" },
          React.createElement(
            "a",
            { "class": "carousel-item", href: "#bungie" },
            React.createElement("img", { src: "assets/media/bungie.png", alt: "Bungie" })
          ),
          React.createElement(
            "a",
            { "class": "carousel-item", href: "#microsoft" },
            React.createElement("img", { src: "assets/media/microsoft.png", alt: "Bungie" })
          ),
          React.createElement(
            "a",
            { "class": "carousel-item", href: "#magic" },
            React.createElement("img", { src: "assets/media/magic.png", alt: "Bungie" })
          )
        )
      )
    )
  );
};

var FooterForm = function FooterForm(props) {};

var buildPage = function buildPage(csrf) {
  ReactDOM.render(React.createElement(NavForm, null), document.querySelector('#head'));
  ReactDOM.render(React.createElement(MainForm, null), document.querySelector('#main'));
  //ReactDOM.render(
  //  <FooterForm />,
  //  document.querySelector('#foot')
  //);

  $('.parallax').parallax();
  $('.carousel').carousel();
};

var getToken = function getToken() {
  sendAjax('GET', 'getToken', null, function (result) {
    buildPage(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});