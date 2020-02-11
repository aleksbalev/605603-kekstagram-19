'use strict';

(function () {
  var editor = window.utils.editor;
  var effectLevelPin = editor.querySelector('.effect-level__pin');

  effectLevelPin.addEventListener('mouseup', function () {});

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
})();
