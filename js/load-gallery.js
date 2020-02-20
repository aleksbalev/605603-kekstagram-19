'use strict';

(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var load = function (onLoad) {
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
  };

  xhr.open('GET', URL);
  xhr.send();

  window.loadGallery = {
    load: load
  };
})();
