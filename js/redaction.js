'use strict';

(function () {
  /* Блок кода отвечающий за переключение эффектов картинки */
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectTriggers = document.querySelectorAll('[name=\'effect\']');
  var currentEffect = 'none';
  var effectLevel = document.querySelector('.effect-level');

  imgPreview.classList.add('effects__preview--none');

  for (var y = 0; y < effectTriggers.length; y++) {
    effectLevel.style.display = 'none';
    effectTriggers[y].addEventListener('change', function (evt) {
      var classPrefix = 'effects__preview--';
      var newClass = classPrefix + evt.target.value;

      if (imgPreview.classList.length) {
        imgPreview.classList.remove(classPrefix + currentEffect);
      }
      currentEffect = evt.target.value;
      imgPreview.classList.add(newClass);

      if (currentEffect !== 'none') {
        effectLevel.style.display = '';
      } else {
        effectLevel.style.display = 'none';
      }
    });
  }
  /* Блок кода отвечающий за переключение эффектов картинки */

  var range = document.querySelector('.effect-level__line');
  var onPin = range.querySelector('.effect-level__pin');

  onPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
    };

    // var dragged = false;

    var onMouseMove = function (moveEvt) {
      // dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newLeft = onPin.offsetLeft - shift.x;
      // var foo = newLeft / 453 * 100;
      // imgPreview.style.filter = 'blur(' + foo + 'px )';

      if (newLeft > 0 && newLeft <= 453) {
        onPin.style.left = onPin.offsetLeft - shift.x + 'px';
      }
    };

    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
