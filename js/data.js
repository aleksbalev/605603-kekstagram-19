'use strict';

(function () {
  var generateNumberArray = window.utils.generateNumberArray;
  var generateNumberFromTo = window.utils.generateNumberFromTo;

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

  /* Функция создания массива комментария --- НАЧАЛО */
  var generateComments = function (count) {
    var localComments = [];

    var generateMessage = function (messageCounter) {
      var sentences = [];

      for (var y = 0; y < messageCounter; y++) {
        sentences.push(generateNumberArray(messages));
      }

      return sentences.join(' ');
    };

    for (var i = 0; i < count; i++) {
      localComments.push({
        avatar: 'img/avatar-' + generateNumberFromTo(7, 1) + '.svg',
        message: generateMessage(generateNumberFromTo(3, 1)),
        name: generateNumberArray(names)
      });
    }

    return localComments;
  };
  /* Функция создания массива комментария --- КОНЕЦ */

  /* Функция создания массива пользователей + Переменная --- НАЧАЛО */
  var generateUser = function (description, count) {
    var localUser = [];

    for (var i = 1; i <= count; i++) {
      localUser.push({
        url: 'photos/' + i + '.jpg',
        description: generateNumberArray(description),
        likes: generateNumberFromTo(200, 15),
        comments: generateComments(generateNumberFromTo(6, 1))
      });
    }

    return localUser;
  };

  var users = generateUser(descriptions, usersCount);

  /* Функция создания массива пользователей + Переменная --- КОНЕЦ */

  window.data = {
    users: users
  };
})();
