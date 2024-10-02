import '../pages/index.css';
import { initialCards } from './data.js'
import { createCard, deleteCard, likeCard } from './card.js'
import { openPopup, closePopup } from './modal.js'


// DOM узлы
const placesList = document.querySelector('.places__list');

// Элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Элементы попапа изменения профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// Элементы попапа создания карточки
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardFormElement = newCardPopup.querySelector('.popup__form');
const placeInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const imageInput = newCardFormElement.querySelector('.popup__input_type_url');

// Элементы попапа с увеличенной фотографией места
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


// Вывод карточек на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, likeCard, zoomInImage);
  placesList.append(cardElement);
})

// Открытие формы изменения профиля
function openEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profilePopup);
}

// Обработка изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Открытие формы создания новой карточки
function openNewCardPopup() {
  openPopup(newCardPopup);
}

// Обработка создания новой карточки через форму
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  const newPlace = {
    name: placeInput.value,
    link: imageInput.value
  };
  const newCardElement = createCard(newPlace, deleteCard, likeCard, zoomInImage);
  placesList.prepend(newCardElement);
  newCardFormElement.reset();
  closePopup(newCardPopup);
}

// Увеличение фотографии при клике
function zoomInImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  }
}

// Обработчики событий
profileEditButton.addEventListener('click', openEditProfilePopup);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
newCardButton.addEventListener('click', openNewCardPopup);
newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

// Добавление плавности появления попапов
document.querySelectorAll('.popup').forEach((elem) => {
  elem.classList.add('popup_is-animated');
});
