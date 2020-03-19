'use strict';

(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var URL = 'https://js.dump.academy/kekstagram';

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      var successSection = document.querySelector('.success');
      var errorSection = document.querySelector('.error');

      if (successSection) {
        closeNotification(successSection, 'success');
      } else if (errorSection) {
        closeNotification(errorSection, 'error');
      }
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var showNotification = function (notificationType) {
    var clonTemplate = notificationType.cloneNode(true);
    main.appendChild(clonTemplate);
  };

  var closeNotification = function (elemSection, elem) {
    elemSection = document.querySelector('.' + elem);
    main.removeChild(elemSection);
  };

  var uploadForm = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        showNotification(successTemplate);
        var successButton = document.querySelector('.success__button');
        var successSection = document.querySelector('.success');
        document.addEventListener('keydown', onEscPress);
        successButton.addEventListener('click', function () {
          closeNotification(successSection, 'success');
        });
      } else {
        onError(xhr.response);
        showNotification(errorTemplate);
        var errorButton = document.querySelector('.error__button');
        var errorSection = document.querySelector('.error');
        document.addEventListener('keydown', onEscPress);
        errorButton.addEventListener('click', function () {
          closeNotification(errorSection, 'error');
        });
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    uploadForm: uploadForm,
  };
})();
