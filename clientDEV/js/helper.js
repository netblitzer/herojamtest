const handleError = (message) => {
  console.dir(message);
  
  Materialize.toast(message.errorFull, 3000);
};

const redirect = (response) => {
  console.dir(response);
};

const sendAjax = (type, action, data, success) => {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    success: success,
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj);
    },
  });
};

const getToken = () => {
  sendAjax('GET', 'getToken', null, (result) => {
    buildHomePage(result.csrfToken);
  });
};

const resetAllTokens = () => {
  sendAjax('GET', 'getToken', null, (result) => {
    const csrf = result.csrfToken;
    
    state.csrf = csrf;
    
    const forms = document.querySelectorAll('[name=_csrf]');
    
    forms.forEach((input) => {
      input.value = csrf;
    });
  });
};