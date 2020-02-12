'use strict';

/* Блок кода отвечающий за открытие и закрытие редактора фотографии */
(function () {
  var ESC_KEY = window.utils.ESC_KEY;

  var editor = window.utils.editor;
  var editorOpen = document.querySelector('#upload-file');
  var editorClose = editor.querySelector('#upload-cancel');

  var hashtagsInput = window.utils.hashtagsInput;

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
})();
/* Блок кода отвечающий за открытие и закрытие редактора фотографии */
