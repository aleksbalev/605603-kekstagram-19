'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var usersCount = 25;

  var editor = document.querySelector('.img-upload__overlay');

  var hashtagsInput = editor.querySelector('.text__hashtags');
  var commentTextarea = editor.querySelector('.text__description');

  /* Генератор случайных чисел От - До */
  var generateNumberFromTo = function (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  /* Функция выбора случайного элемента из массива */
  var generateNumberArray = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    editor: editor,
    hashtagsInput: hashtagsInput,
    commentTextarea: commentTextarea,
    generateNumberFromTo: generateNumberFromTo,
    generateNumberArray: generateNumberArray,
    usersCount: usersCount,
  };
})();
