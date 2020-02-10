'use strict';

var ESC_KEY = 'Escape';

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
  return array[Math.floor(Math.random() * array.length)];
};

/* Функция создания массива комментария + Переменная --- НАЧАЛО */
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

document.querySelector('.pictures').appendChild(fragment);

/* Блок кода отвечающий за открытие и закрытие редактора фотографии */
var editor = document.querySelector('.img-upload__overlay');
var editorOpen = document.querySelector('#upload-file');
var editorClose = editor.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

editorOpen.addEventListener('change', function () {
  openPopup();
  document.body.classList.add('modal-open');
});

var openPopup = function () {
  editor.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  if (hashtagsInput !== document.activeElement) {
    editor.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.body.classList.remove('modal-open');
    editorOpen.value = null;
  }
};

editorClose.addEventListener('click', function () {
  closePopup();
});
/* Блок кода отвечающий за открытие и закрытие редактора фотографии */

/* Блок кода отвечающий за переключение эффектов картинки */
var imgPreview = document.querySelector('.img-upload__preview');
var effectTriggers = editor.querySelectorAll('[name=\'effect\']');
var currentEffect = 'none';

imgPreview.classList.add('effects__preview--none');

for (var y = 0; y < effectTriggers.length; y++) {
  effectTriggers[y].addEventListener('change', function (evt) {
    var classPrefix = 'effects__preview--';
    var newClass = classPrefix + evt.target.value;

    if (imgPreview.classList.length) {
      imgPreview.classList.remove(classPrefix + currentEffect);
    }
    currentEffect = evt.target.value;
    imgPreview.classList.add(newClass);
  });
}
/* Блок кода отвечающий за переключение эффектов картинки */

var effectLevelPin = editor.querySelector('.effect-level__pin');

effectLevelPin.addEventListener('mouseup', function () {});

var hashtagsInput = editor.querySelector('.text__hashtags');

var validateHashtags = function (value) {
  var splitHashtags = value.split(' ');
  var isValid = true;
  var duplicate = false;

  for (var x = 0; x < splitHashtags.length; x++) {
    if (!/(^|\s)(#[а-яa-z\d]+)/gi.test(splitHashtags[x])) {
      isValid = false;
    } else if (splitHashtags[x].length < 2 || splitHashtags[x].length > 20) {
      isValid = false;
    } else if (
      splitHashtags[x] === splitHashtags[x - 1] ||
      splitHashtags[x] === splitHashtags[x - 2] ||
      splitHashtags[x] === splitHashtags[x - 3] ||
      splitHashtags[x] === splitHashtags[x - 4]
    ) {
      duplicate = true;
      if (duplicate === true) {
        isValid = false;
      }
    } else if (splitHashtags.length > 5) {
      isValid = false;
    }
  }

  return isValid;
};

hashtagsInput.addEventListener('input', function () {
  if (hashtagsInput.value !== '') {
    if (validateHashtags(hashtagsInput.value) === false) {
      hashtagsInput.setCustomValidity(
          '1. Хэш-тег должен начинаться со знака "#" 2. Хэш-тег должен содержать буквы только латиского и русского алфавитов 3. Хэш-тег не может состоять только из одной решётки 4. Хэш-теги разделяются пробелами 5. Нельзя указать больше пяти хэш-тегов 6. Максимальная длина одного хэш-тега 20 символов, включая решётку'
      );
    } else {
      hashtagsInput.setCustomValidity('');
    }
  }
});
