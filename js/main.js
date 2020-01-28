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

var userGenerator = function (name, message, description) {
  var users = [];

  for (var i = 0; i < 25; i++) {
    var url = 'photos/{{i}}.jpg';
    var avatar = 'img/avatar-{{}}.svg';
    users[i] = {
      url: url.replace('{{i}}', i + 1),
      description: description[Math.floor(Math.random() * description.length)],
      likes: Math.floor(Math.random() * (200 - 15) + 15),
      comments: {
        avatar: avatar.replace('{{}}', Math.floor(Math.random() * (6 - 1) + 1)),
        message: message[Math.floor(Math.random() * message.length)],
        name: name[Math.floor(Math.random() * name.length)]
      }
    };
  }

  return users;
};

console.log(userGenerator(names, messages, descriptions));
