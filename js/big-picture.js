'use strict';

(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var usersCount = window.utils.usersCount;
  var ENTER_KEY = 'Enter';

  var bigPicture = document.querySelector('.big-picture');
  var closePictureButton = bigPicture.querySelector('#picture-cancel');

  var pictureInput = bigPicture.querySelector('.social__footer-text');

  var bigImage = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var description = bigPicture.querySelector('.social__caption');
  var socailComments = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePicture();
    }
  };

  var setEventOnPictures = function () {
    var pictures = document.querySelectorAll('.picture');
    var maxBaseComments = 5;

    for (var i = 0; i < usersCount; i++) {
      pictures[i].addEventListener('click', function (evt) {
        document.querySelector('.big-picture').classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onPopupEscPress);

        var index = evt.target.parentElement.getAttribute('data-index');
        var picturesIndex = window.data.pictures[index];

        if (picturesIndex.comments.length <= maxBaseComments) {
          commentsLoader.style.display = 'none';
        }

        commentsCount.textContent = picturesIndex.comments.length;
        bigImage.src = picturesIndex.url;
        likes.textContent = picturesIndex.likes;
        description.textContent = picturesIndex.description;
        socailComments.innerHTML = '';
        for (var y = 0; y < maxBaseComments; y++) {
          socailComments.appendChild(renderComment(picturesIndex.comments[y]));
        }
      });

      pictures[i].addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          document.querySelector('.big-picture').classList.remove('hidden');
          document.body.classList.add('modal-open');
          document.addEventListener('keydown', onPopupEscPress);
        }
      });
    }
  };

  var renderComment = function (commentData) {
    var commentElement = socialComment.cloneNode(true);

    commentElement.querySelector('.social__picture').src = commentData.avatar;
    commentElement.querySelector('.social__picture').alt = commentData.name;
    commentElement.querySelector('.social__text').textContent = commentData.message;

    return commentElement;
  };

  var closePicture = function () {
    if (pictureInput !== document.activeElement) {
      bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.body.classList.remove('modal-open');
      commentsLoader.style.display = '';
    }
  };

  closePictureButton.addEventListener('click', function () {
    closePicture();
  });

  window.bigPicture = {
    setEventOnPictures: setEventOnPictures
  };
})();
