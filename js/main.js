'use strict';

var usersCount = 25;

var names = ['Вася', 'Галя', 'Толя', 'Варфаламей', 'Никита', 'Саня'];
var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descriptions = ['Ставьте лайк', 'Подписывайтесь', 'Хорошего всем дня!', 'Меня трудной найти, еще труднее удержать и легко потерять'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/* Генератор случайных чисел От - До */
var generateNumberFromTo = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

/* Функция выбора случайного элемента из массива */
var generateNumberArray = function (array) {
  return Math.floor(Math.random() * array.length);
};

/* Функция создания массива комментария + Переменная --- НАЧАЛО */
var generateComments = function (name, message, count) {
  var localComments = [];

  for (var i = 0; i < count; i++) {
    localComments.push({
      avatar: 'img/avatar-' + generateNumberFromTo(7, 1) + '.svg',
      message: message[generateNumberArray(message)],
      name: name[generateNumberArray(name)]
    });
  }

  return localComments;
};

var comments = generateComments(names, messages, usersCount);
/* Функция создания массива комментария --- КОНЕЦ */

/* Функция создания массива пользователей + Переменная --- НАЧАЛО */
var generateUser = function (description, comment, count) {
  var localUser = [];

  for (var i = 1; i <= count; i++) {
    localUser.push({
      url: 'photos/' + i + '.jpg',
      description: description[generateNumberArray(description)],
      likes: generateNumberFromTo(200, 15),
      comments: [comment[generateNumberArray(comment)], comment[generateNumberArray(comment)]]
    });
  }

  return localUser;
};

var users = generateUser(descriptions, comments, usersCount);
/* Функция создания массива пользователей + Переменная --- КОНЕЦ */


/* Функция которая вставляет информацию из массива объектов 'users' */
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

console.log(fragment);
