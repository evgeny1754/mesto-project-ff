// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(card, deleteCard){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  return cardElement;
}

// Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardElement = eventTarget.closest('.card');
  cardElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
})