'use strict';

(function () {
  var usersCount = window.utils.usersCount;

  /* Переменная и цикл отвечающие за отрисовку сгенерированного DOM-элемента в блок .pictures */
  var onLoad = function (users) {
    for (var i = 0; i < usersCount; i++) {
      window.data.pictures.push(users[i]);
    }

    renderUsers(users, usersCount);

    window.bigPicture.setEventOnPictures();

    document.dispatchEvent(new Event('galleryRendered'));
  };

  window.loadGallery.load(onLoad);
  /* Переменная и цикл отвечающие за отрисовку сгенерированного DOM-элемента в блок .pictures */

  /* Функция которая вставляет информацию из массива объектов 'users' */
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderUser = function (user) {
    var userElement = pictureTemplate.cloneNode(true);

    userElement.querySelector('.picture__img').src = user.url;
    userElement.querySelector('.picture__likes').textContent = user.likes;
    userElement.querySelector('.picture__comments').textContent = user.comments.length;
    userElement.setAttribute('data-index', (user.url.match(/\d+/)[0]) - 1);

    return userElement;
  };

  var renderUsers = function (users, count) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderUser(users[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  };

  window.gallery = {
    renderUsers: renderUsers
  };
})();
