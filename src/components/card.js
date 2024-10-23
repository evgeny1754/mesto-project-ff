// Функция создания карточек из шаблона
export function createCard(
  cardData,
  meID,
  openImage,
  likeCallback,
  deleteCallback,
  cardTemplate
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikesCounter = cardElement.querySelector(".card__like-counter");
  const cardId = cardData._id;

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardLikesCounter.textContent = cardData.likes.length;
  // если в ответе с сервера получились данные о моих лайках в карточке, то добавляем класс активного сердечка в карточку
  if (cardData.likes.some((item) => item._id === meID)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }
  // добавляем обработчик клика по кнопке лайка
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => {
      likeCallback(evt, cardId, cardLikesCounter);
    });
  // проверяем есть ли у карточки мой id, если нет то удаляем кнопку удаления
  if (meID !== cardData.owner._id) {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button_hidden");
  } else {
      // добавляем обработчик клика по кнопке удаления
  cardElement
  .querySelector(".card__delete-button")
  .addEventListener("click", (evt) => {
    deleteCallback(evt, cardId, cardElement);
  });
  }
  // добавляем обработчик клика по картинке
  cardImage.addEventListener("click", () => {
    openImage(cardTitle.textContent, cardImage.src);
  });
  return cardElement;
}
