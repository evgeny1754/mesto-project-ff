// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, zoomInImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const placeLikeElement = cardElement.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  placeLikeElement.addEventListener('click', likeCard);
  cardImage.addEventListener('click', zoomInImage);

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt) {
  const eventTarget = evt.target;
  const cardElement = eventTarget.closest('.card');
  cardElement.remove();
}

// Добавление/ удаление лайков
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
