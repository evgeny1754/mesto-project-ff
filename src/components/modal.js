//функция открытия попап
function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeEsc);
}
//функция закрытия попап
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeEsc);
  }
//функция закрытия попап по клику на крестик и в свободную область
function closeModal(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}
//функция закрытия попап по нажатию Esc
function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

export { openPopup, closePopup };
