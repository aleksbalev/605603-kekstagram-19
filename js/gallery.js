'use strict';

(function () {
  /* Функция которая вставляет информацию из массива объектов 'users' */
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var users = window.data.users;

  var renderUser = function (user) {
    var userElement = pictureTemplate.cloneNode(true);

    userElement.querySelector('.picture__img').src = user.url;
    userElement.querySelector('.picture__likes').textContent = user.likes;
    userElement.querySelector('.picture__comments').textContent = user.comments.length;

    return userElement;
  };

  /* Переменная и цикл отвечающие за отрисовку сгенерированного DOM-элемента в блок .pictures */
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < users.length; i++) {
    fragment.appendChild(renderUser(users[i]));
  }
  /* Переменная и цикл отвечающие за отрисовку сгенерированного DOM-элемента в блок .pictures */

  document.querySelector('.pictures').appendChild(fragment);
})();
