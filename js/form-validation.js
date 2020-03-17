'use strict';

(function () {
  var hashtagsInput = window.utils.hashtagsInput;
  var commentTextarea = window.utils.commentTextarea;

  commentTextarea.setAttribute('maxlength', '140');

  var validateHashtags = function (value) {
    value = value.replace(/\s\s+/g, ' ').toLowerCase();
    var splitHashtags = value.split(' ');
    var isValid = true;

    splitHashtags.forEach(function (hashtag, x) {
      if (!(/(^|\s)(#[а-яa-z\d]+)($|\s)/ig).test(hashtag)) {
        isValid = false;
      } else if (hashtag.length < 2 || hashtag.length > 20) {
        isValid = false;
      } else if (
        hashtag === splitHashtags[x - 1] ||
        hashtag === splitHashtags[x - 2] ||
        hashtag === splitHashtags[x - 3] ||
        hashtag === splitHashtags[x - 4]
      ) {
        isValid = false;
      } else if (splitHashtags.length > 5) {
        isValid = false;
      }
    });

    return isValid;
  };

  hashtagsInput.addEventListener('input', function () {
    hashtagsInput.setCustomValidity('');
    hashtagsInput.style.border = '';
    if (hashtagsInput.value !== '' && validateHashtags(hashtagsInput.value) === false) {
      hashtagsInput.style.border = '2px solid red';
      hashtagsInput.setCustomValidity(
          '1. Хэш-тег должен начинаться со знака "#" 2. Хэш-тег должен содержать буквы только латиского и русского алфавитов 3. Хэш-тег не может состоять только из одной решётки 4. Хэш-теги разделяются пробелами 5. Нельзя указать больше пяти хэш-тегов 6. Максимальная длина одного хэш-тега 20 символов, включая решётку'
      );
    }
  });
})();
