'use strict';

(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var MAX_BASE_COMMENTS = 5;

  var usersCount = window.utils.usersCount;

  var bigPicture = document.querySelector('.big-picture');
  var closePictureButton = bigPicture.querySelector('#picture-cancel');

  var pictureInput = bigPicture.querySelector('.social__footer-text');

  var bigImage = bigPicture.querySelector('.big-picture__img img');
  var likes = bigPicture.querySelector('.likes-count');
  var description = bigPicture.querySelector('.social__caption');
  var socailComments = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentsShown = MAX_BASE_COMMENTS;

  var comments = [];

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePicture();
    }
  };

  var onCommentsLoaderClick = function () {
    renderComments(comments.slice(commentsShown, commentsShown + MAX_BASE_COMMENTS));
    commentsShown += MAX_BASE_COMMENTS;

    if (commentsShown >= comments.length) {
      commentsShown -= commentsShown % comments.length;
      commentsLoader.classList.add('hidden');
    }

    socialCommentsCount.textContent = commentsShown + ' из ' + comments.length + ' комментариев';
  };


  var setEventOnPictures = function () {
    var pictures = document.querySelectorAll('.picture');

    for (var i = 0; i < usersCount; i++) {
      pictures[i].addEventListener('click', function (evt) {
        commentsLoader.addEventListener('click', onCommentsLoaderClick);

        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onPopupEscPress);

        var index = evt.target.parentElement.getAttribute('data-index');
        var picturesIndex = window.data.pictures[index];
        comments = picturesIndex.comments;

        if (comments.length <= MAX_BASE_COMMENTS) {
          commentsLoader.classList.add('hidden');
        }

        socialCommentsCount.textContent = MAX_BASE_COMMENTS + ' из ' + comments.length + ' комментариев';
        bigImage.src = picturesIndex.url;
        likes.textContent = picturesIndex.likes;
        description.textContent = picturesIndex.description;
        socailComments.innerHTML = '';
        renderComments(comments.slice(0, MAX_BASE_COMMENTS));

        if (comments.length <= MAX_BASE_COMMENTS) {
          socialCommentsCount.textContent = comments.length + ' из ' + comments.length + ' комментариев';
        }
      });
    }
  };

  var renderComments = function (commentsData) {
    commentsData.forEach(function (value) {
      socailComments.appendChild(renderComment(value));
    });
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
      commentsCount.textContent = comments.length;
      bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.body.classList.remove('modal-open');
      commentsLoader.classList.remove('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
      commentsShown = MAX_BASE_COMMENTS;
    }
  };

  closePictureButton.addEventListener('click', function () {
    closePicture();
  });

  window.bigPicture = {
    setEventOnPictures: setEventOnPictures,
    closePicture: closePicture
  };
})();
