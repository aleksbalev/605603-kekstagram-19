'use strict';

/* Блок кода отвечающий за открытие и закрытие редактора фотографии */
(function () {
  var ESC_KEY = window.utils.ESC_KEY;
  var editor = window.utils.editor;

  var imgPreview = document.querySelector('.img-upload__preview');
  var editorOpen = document.querySelector('#upload-file');
  var editorClose = editor.querySelector('#upload-cancel');
  var scaleControllValue = editor.querySelector('.scale__control--value');

  var hashtagsInput = window.utils.hashtagsInput;
  var commentTextarea = window.utils.commentTextarea;

  /* Блок кода отвечающий за показ ошибки или подтверждения отправки формы */
  var form = document.querySelector('#upload-select-image');
  form.addEventListener('submit', function (evt) {
    window.upload.uploadForm(new FormData(form), function () {
      closePopup();
    }, function () {
      closePopup();
    });
    evt.preventDefault();
  });
  /* Блок кода отвечающий за показ ошибки или подтверждения отправки формы */

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
    scaleControllValue.value = '100%';
  };

  var closePopup = function () {
    if (hashtagsInput !== document.activeElement && commentTextarea !== document.activeElement) {
      editor.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      document.body.classList.remove('modal-open');
      editorOpen.value = null;
      window.redaction.setFilterStyle(null);
      imgPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
      imgPreview.style.transform = 'scale(' + 1 + ')';
      hashtagsInput.value = '';
      commentTextarea.value = '';
    }
  };

  editorClose.addEventListener('click', function () {
    closePopup();
  });

  // var closeNotification = function (notificationType) {
  //   notificationType.addEventListener('click', function () {
  //     main.removeChild('');
  //   });
  // };
})();
/* Блок кода отвечающий за открытие и закрытие редактора фотографии */
