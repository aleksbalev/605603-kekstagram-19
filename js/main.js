'use strict';
// Функция генерации случайных данных.
// Фукция создания DOM-элемента на основе JS-объекта.
// Функция заполнения блока DOM-элементами на основе массива JS-объектов.

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

var generateNumberFromTo = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateNumberArray = function (array) {
  return Math.floor(Math.random() * array.length);
};

var userGenerator = function (name, message, description) {
  var users = [];

  for (var i = 1; i <= 25; i++) {
    users[i] = {
      url: 'photos/' + i + '.jpg',
      description: description[generateNumberArray(description)],
      likes: generateNumberFromTo(200, 15),
      comments: {
        avatar: 'img/avatar-' + generateNumberFromTo(6, 1) + '.svg',
        message: message[generateNumberArray(message)],
        name: name[generateNumberArray(name)]
      }
    };
  }

  return users;
};

console.log(userGenerator(names, messages, descriptions));
