'use strict';

(function () {
  var hashtagsInput = window.utils.hashtagsInput;
  var commentTextarea = window.utils.commentTextarea;

  commentTextarea.setAttribute('maxlength', '140');

  var validateHashtags = function (value) {
    value = value.replace(/\s\s+/g, ' ').toLowerCase();
    var splitHashtags = value.split(' ');
    var isValid = true;

    for (var x = 0; x < splitHashtags.length; x++) {
      if (!(/(^|\s)(#[а-яa-z\d]+)($|\s)/ig).test(splitHashtags[x])) {
        isValid = false;
      } else if (splitHashtags[x].length < 2 || splitHashtags[x].length > 20) {
        isValid = false;
      } else if (
        splitHashtags[x] === splitHashtags[x - 1] ||
        splitHashtags[x] === splitHashtags[x - 2] ||
        splitHashtags[x] === splitHashtags[x - 3] ||
        splitHashtags[x] === splitHashtags[x - 4]
      ) {
        isValid = false;
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
    } else {
      hashtagsInput.setCustomValidity('');
    }
  });
})();
