'use strict';

(function () {
  var RANDOM_PICTURES_COUNT = 10;

  var USERS_COUNT = window.utils.USERS_COUNT;

  var imageFilters = document.querySelector('.img-filters');

  var filterRandom = imageFilters.querySelector('#filter-random');
  var filterDiscussed = imageFilters.querySelector('#filter-discussed');
  var filterDefault = imageFilters.querySelector('#filter-default');

  var pictures = document.querySelector('.pictures');

  var activeButton = 'img-filters__button--active';

  document.addEventListener('galleryRendered', function () {
    imageFilters.classList.remove('img-filters--inactive');
    imageFilters.classList.add('img-filters--active');

    filterRandom.addEventListener('click', onFilterRandomClick);
    filterDefault.addEventListener('click', onFilterDefaultClick);
    filterDiscussed.addEventListener('click', onFilterDiscussedClick);
  });

  var removePictures = function () {
    pictures.querySelectorAll('.picture').forEach(function (picture) {
      pictures.removeChild(picture);
    });
  };

  var onFilterRandomClick = function () {
    filterDiscussed.classList.remove(activeButton);
    filterDefault.classList.remove(activeButton);

    filterRandom.classList.add(activeButton);

    setTimeout(function () {
      removePictures();
      var picturesArrCopy = window.utils.pictures.slice();
      var randomPictures = [];

      for (var i = 0; i < RANDOM_PICTURES_COUNT; i++) {
        var removedElements = picturesArrCopy.splice(Math.random() * (USERS_COUNT - i), 1);
        randomPictures.splice(0, 0, removedElements);
        var mergedArrPictures = [].concat.apply([], randomPictures);
      }

      window.gallery.renderUsers(mergedArrPictures, RANDOM_PICTURES_COUNT);

      window.bigPicture.setEventOnPictures();
    }, 500);
  };

  var onFilterDefaultClick = function () {
    filterDiscussed.classList.remove(activeButton);
    filterRandom.classList.remove(activeButton);

    filterDefault.classList.add(activeButton);

    setTimeout(function () {
      removePictures();
      var picturesArrCopy = window.utils.pictures.slice();

      window.gallery.renderUsers(picturesArrCopy, USERS_COUNT);

      window.bigPicture.setEventOnPictures();
    }, 500);
  };

  var onFilterDiscussedClick = function () {
    filterDefault.classList.remove(activeButton);
    filterRandom.classList.remove(activeButton);

    filterDiscussed.classList.add(activeButton);

    setTimeout(function () {
      removePictures();
      var picturesArrCopy = window.utils.pictures.slice();

      picturesArrCopy.sort(function (a, b) {
        var commentsA = a.comments.length;
        var commentsB = b.comments.length;

        return commentsB - commentsA;
      });

      window.gallery.renderUsers(picturesArrCopy, USERS_COUNT);

      window.bigPicture.setEventOnPictures();
    }, 500);
  };
})();
