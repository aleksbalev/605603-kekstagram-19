'use strict';

(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var usersCount = window.utils.usersCount;

  var bigPicture = document.querySelector('.big-picture');
  var closePictureButton = bigPicture.querySelector('#picture-cancel');

  var pictureInput = bigPicture.querySelector('.social__footer-text');

  var bigImage = bigPicture.querySelector('.big-picture__img img');

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePicture();
    }
  };

  var setEventOnPictures = function () {
    var pictures = document.querySelectorAll('.picture');

    for (var i = 0; i < usersCount; i++) {
      pictures[i].addEventListener('click', function (evt) {
        document.querySelector('.big-picture').classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onPopupEscPress);

        var index = evt.target.parentElement.getAttribute('data-index');

        bigImage.src = window.data.pictures[index].url;
      });
    }
  };

  var closePicture = function () {
    if (pictureInput !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.body.classList.remove('modal-open');
    }
  };

  closePictureButton.addEventListener('click', function () {
    closePicture();
  });

  window.bigPicture = {
    setEventOnPictures: setEventOnPictures
  };
})();
