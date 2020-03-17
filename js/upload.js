'use strict';

(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var URL = 'https://js.dump.academy/kekstagram';

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeSuccessNotification();
      closeErrorNotification();
    }
  };

  var showNotification = function (notificationType) {
    var clonTemplate = notificationType.cloneNode(true);
    main.appendChild(clonTemplate);
  };

  var closeSuccessNotification = function () {
    var successSection = document.querySelector('.success');
    main.removeChild(successSection);
    document.removeEventListener('keydown', onEscPress);
  };

  var closeErrorNotification = function () {
    var errorSection = document.querySelector('.error');
    main.removeChild(errorSection);
    document.removeEventListener('keydown', onEscPress);
  };

  var uploadForm = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        showNotification(successTemplate);
        var successButton = document.querySelector('.success__button');
        document.addEventListener('keydown', onEscPress);
        successButton.addEventListener('click', function () {
          closeSuccessNotification();
        });
      } else {
        onError(xhr.response);
        showNotification(errorTemplate);
        var errorButton = document.querySelector('.error__button');
        document.addEventListener('keydown', onEscPress);
        errorButton.addEventListener('click', function () {
          closeErrorNotification();
        });
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.upload = {
    uploadForm: uploadForm,
    main: main
  };
})();
