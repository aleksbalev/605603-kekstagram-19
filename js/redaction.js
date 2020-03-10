'use strict';

(function () {
  var LINE_LENGTH = 453;

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
      onPin.style.left = 100 + '%';

      if (imgPreview.classList.length) {
        imgPreview.classList.remove(classPrefix + currentEffect);
      }
      currentEffect = evt.target.value;
      imgPreview.classList.add(newClass);
      setFilterChange(100);

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

  var checkFilter = function (filter) {
    return imgPreview.classList.contains(filter);
  };

  var setFilterStyle = function (filterStyle) {
    imgPreview.style.filter = filterStyle;
  };

  var setFilterChange = function (proportion) {
    switch (true) {
      case checkFilter('effects__preview--chrome'):
        setFilterStyle('grayscale(' + proportion / 100 + ')');
        break;

      case checkFilter('effects__preview--sepia'):
        setFilterStyle('sepia(' + proportion / 100 + ')');
        break;

      case checkFilter('effects__preview--marvin'):
        setFilterStyle('invert(' + proportion + '%)');
        break;

      case checkFilter('effects__preview--phobos'):
        setFilterStyle('blur(' + proportion / 100 * 3 + 'px)');
        break;

      case checkFilter('effects__preview--heat'):
        setFilterStyle('brightness(' + proportion / 100 * 3 + ')');
        break;

      default:
        setFilterStyle(null);
        break;
    }
  };

  onPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var newLeft = onPin.offsetLeft - shift.x;
      var proportion = newLeft / 453 * 100;

      if (newLeft > 0 && newLeft <= LINE_LENGTH) {
        onPin.style.left = onPin.offsetLeft - shift.x + 'px';
      }

      setFilterChange(proportion);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.redaction = {
    setFilterStyle: setFilterStyle
  };
})();
