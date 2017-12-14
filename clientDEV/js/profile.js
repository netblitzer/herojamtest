
const openProfileForm = () => {
  // if the user isn't logged on, go back to the main page
  if (!state.loggedIn) {
    history.replaceState({page: 'Home'}, 'Home', 'home');
    return openMainForm();
  }
  
  // * Basic Page creation functions * //
  // create the profile form
  const createProfile = (res, prevPage, skip) => {
    ReactDOM.render(
      <PublicProfileForm 
        csrf={state.csrf}
        first={res.firstName}
        last={res.lastName}
        email={res.email}
        school={res.school} />,
      document.querySelector('#rendering'),
      slidePages(prevPage, initializeProfile, '#profileWrapper', skip),
    );
  };
    
  // create the progress bar
  const createProfileProgress = (prevPage, skip) => {
    ReactDOM.render(
      <ProgressForm />,
      document.querySelector('#navProgress'),
      getUserProfile(prevPage, skip),
    );
    document.querySelector('#navProgress .progress').classList += ' shown';
  };

  const getUserProfile = (prevPage, skip) => {
    sendAjax('GET', '/profilePublic', null, (response) => {createProfile(response, prevPage, skip)});
  };

  const handleProfile = (response, prevPage, skip) => {
    createProfile(response, prevPage, skip);
  };

  // initializer callback
  const initializeProfile = () => {
    
  };
    
  // if the page is undefined, it means we're starting out on this page
  // and nothing else has been rendered yet.
  // We're going to skip all the 'loading' if this is the case
  if (state.page === undefined) {
    // change page
    state.page = 'Profile';
    
    createProfileProgress(null, true);
  } else if (state.page !== 'Profile') {
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
      case 'About':
        prevPage = $('#aboutWrapper');
        break;
    }
    // change page
    state.page = 'Profile';
    
    // start the chain
    createProfileProgress(prevPage, false);
  }
};

const switchProfileContent = (e) => {
  
  let nextContent = e.target.innerHTML;
  
  const fadeCurrent = () => {
    $('.profile-content').removeClass('opened');
    setTimeout(getUserProfile, 500);
  };
    
  const getUserProfile = () => {
    sendAjax('GET', '/profilePublic', null, handleProfile)
  };

  const handleProfile = (response) => {
    switchContent(response);
  };
  
  const switchContent = (res) => {
    document.querySelector('#profileInfoContainer').innerHTML = '';
    
    if (nextContent === 'Statistics' || nextContent === undefined) {
      ReactDOM.render(
        <StatisticsForm 
          csrf={state.csrf}
          first={res.firstName}
          last={res.lastName}
          email={res.email}
          school={res.school} />,
        document.querySelector('#profileInfoContainer'),
      );
    } else if (nextContent === 'Edit') {
      ReactDOM.render(
        <EditProfileForm 
          csrf={state.csrf}
          first={res.firstName}
          last={res.lastName}
          email={res.email}
          school={res.school} />,
        document.querySelector('#profileInfoContainer'),
      );
    }
    
    setTimeout(fadeContentIn, 10);
  };
  
  const fadeContentIn = () => {
    $('.profile-content').addClass('opened');
  };
  
  fadeCurrent();
}

const handlePasswordChange = (e) => {
  e.preventDefault();
  
  if ($('#passChangeForm #oldpass').val() === '' || $('#passChangeForm #newpass').val() === '') {
    handleError('Both fields are required to change your password.');
    return false;
  }
  
  if ($('#passChangeForm #oldpass').val() === $('#passChangeForm #newpass').val()) {
    handleError('Passwords are the same');
    return false;
  }
  
  sendAjax('POST', $('#passChangeForm').attr('action'), $('#passChangeForm').serialize(), (res) => {
    Materialize.toast(res.message, 3000);
  });
};

const PublicProfileForm = (props) => {
  
  let name;
  if (!props.first && !props.last) {
    name = (() => {
      return (<h5 className="grey-text text-darken-3"><i>No name specified</i></h5>);
    })();
  } else {
    name = (() => {
      return (<h5 className="grey-text text-darken-3">{`${props.first} ${props.last}`}</h5>);
    })();
  }
  
  let school;
  if (!props.school) {
    school = (() => {
      return (<p className="grey-text text-darken-3"><i>No school specified</i></p>);
    })();
  } else {
    school = (() => {
      return (<p className="grey-text text-darken-3">{props.school}</p>);
    })();
  }
  
  let email;
  if (!props.email) {
    email = (() => {
      return (<p className="grey-text text-darken-3"><i>No email specified</i></p>);
    })();
  } else {
    email = (() => {
      return (<p className="grey-text text-darken-3">{props.email}</p>);
    })();
  }
  
  let location;
  if (!props.location) {
    location = (() => {
      return (<p className="grey-text text-darken-3"><i>No location specified</i></p>);
    })();
  } else {
    location = (() => {
      return (<p className="grey-text text-darken-3">{props.location}</p>);
    })();
  }
  
  return (
    <div id="profileWrapper" className="pageWrapper">
      <div className="container">
        <div className="row">
          <div className="col s12 grey darken-2">
            <div className="col s9 offset-s3 no-side-padding">
              <nav className="nav-extended transparent no-shadow">
                <div className="nav-content">
                  <ul className="tabs tabs-transparent">
                    <li className="tab"><a className="active" onClick={switchProfileContent}>Statistics</a></li>
                    <li className="tab disabled"><a onClick={switchProfileContent}>Badges</a></li>
                    <li className="tab"><a onClick={switchProfileContent}>Info</a></li>
                    <li className="tab right"><a onClick={switchProfileContent}>Edit</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
          <div className="col m3 grey lighten-3">
            <div className="pushed-down-2">
              <img className="responsive-img" src="assets/media/fb.gif" alt={props.name || "Profile picture"} />
            </div>
            {name}
            {school}
            {email}
            {location}
          </div>
          <div className="col m9" id="profileInfoContainer">
            {StatisticsForm(props)}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatisticsForm = (props) => {
  
  let joinedEvents;
  if (!props.eventsJoined) {
    joinedEvents = (() => {
      return (<li><i>No events joined yet.</i></li>);
    })();
  } else {
    joinedEvents = props.eventsJoined.map((event) => {
      return (<li>event</li>);
    });
  }
  
  return (
    <div>
      <div className="section">
        <h5>Donations</h5>
        <div className="col s12">
          <div className="col s12">
            <p><span>Total Raised In Name: </span>{props.total || "$0"}</p>
            <p><span>Personally Donated: </span>{props.personalDonation || "$0"}</p>
            <p><span>Largest Donation: </span>{props.highestDonation || "$0"}</p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section">
        <h5>Events</h5>
        <div className="col s12">
          <div className="col s2">
            <p><span className="left">Events Joined: </span></p>
          </div>
          <div className="col s10">
            <ul>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditProfileForm = (props) => {
  
  return (
    <div className="profile-content">
      <div className="section">
        <h6>Change your password</h6>
        <form className="col s12"
          id="passChangeForm"
          name="passChangeForm"
          onSubmit={handlePasswordChange}
          action="/passwordChange"
          method="POST">
          <div className="row">
            <div className="input-field col s12">
              <input id="oldpass" type="password" name="oldpass" className="validate" />
              <label for="oldpass">Current password</label>
            </div>
            <div className="input-field col s12">
              <input id="newpass" type="password" name="newpass" className="validate" />
              <label for="newpass">New password</label>
            </div>
          </div>
          <input type="hidden" name="_csrf" value={props.csrf}/>
          <button className="btn white waves-effect waves-green black-text right" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
      <div className="divider"></div>
    </div>
  );
};