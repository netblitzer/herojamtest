
const openProfileForm = () => {
  // check if we can switch to sign up
  if (state.page !== 'Profile') {
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
    
    // create the progress bar
    const createProgress = () => {
      ReactDOM.render(
        <ProgressForm />,
        document.querySelector('#navProgress'),
        getUserProfile,
      );
      document.querySelector('#navProgress .progress').classList += ' shown';
    };
    
    const getUserProfile = () => {
      sendAjax('GET', '/profilePublic', null, handleProfile)
    }
    
    const handleProfile = (response) => {
      createPage(response);
    }
    
    // create the about form
    const createPage = (res) => {
      ReactDOM.render(
        <PublicProfileForm 
          csrf={state.csrf}
          first={res.firstName}
          last={res.lastName}
          email={res.email}
          school={res.school} />,
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
      $('#profileWrapper').addClass('page-opened');
      $('#navProgress .progress').removeClass('shown');
      $('.profile-content').addClass('opened');
      
      ReactDOM.render(
        <NavForm />,
        document.querySelector('#head'),
      );
    };
    
    // start the chain
    createProgress();
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