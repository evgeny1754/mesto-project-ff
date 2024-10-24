import "../pages/index.css";
import { createCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  infoForMe,
  getInitialCards,
  editAvatar,
  editProfile,
  postNewCard,
  deleteCardServer,
  putLikeServer,
  deleteLikeServer,
} from "./api.js";
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
//переменные профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
// const popupButton = document.querySelector(".popup__button");
//переменные для редактирования аватара
const formAvatar = document.forms.newAvatar;
const formEditLink = document.forms.newAvatar.elements.link;
const popupAvatar = document.querySelector(".popup_type_new-avatar");
//переменные для редактирования профиля
const formEdit = document.forms.edit;
const formEditName = document.forms.edit.elements.name;
const formEditDescription = document.forms.edit.elements.description;
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditOpen = document.querySelector(".profile__edit-button");
// переменные для добавления карт
const formAddCard = document.forms.newCard;
const cardName = document.querySelector(".popup__input_type_card-name");
const cardLink = document.querySelector(".popup__input_type_url");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupNewCardOpen = document.querySelector(".profile__add-button");
//переменные для открытия попапа картинки
const popupImage = document.querySelector(".popup_type_image");
const popupImagePicture = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

let meID;

function renderProfileInfo({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.src = avatar;
}

function renderCards(cards, userId) {
  cards.forEach((cardData) => {
    placesList.append(
      createCard(
        cardData,
        userId,
        openImage,
        likeCallback,
        deleteCallback,
        cardTemplate
      )
    );
  });
}

Promise.all([infoForMe(), getInitialCards()])
  .then(([meInfo, newCards]) => {
    meID = meInfo._id;
    renderProfileInfo(meInfo); // Отображаем данные профиля
    renderCards(newCards, meID); // Отображаем карточки
  })
  .catch((err) => console.log(err));

// функция отображения информации профиля  в попапе при клике на кнопку редактирования
function editInfoProfile() {
  formEditName.value = profileTitle.textContent;
  formEditDescription.value = profileDescription.textContent;
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// открытие попапа аватара
profileAvatar.addEventListener("click", () => {
  openPopup(popupAvatar);
  clearValidation(formAvatar, validationConfig);
});
// открытие попапа редактирования
popupEditOpen.addEventListener("click", () => {
  openPopup(popupEdit);
  editInfoProfile();
  clearValidation(formEdit, validationConfig);
});
// открытие попапа создания карточки
popupNewCardOpen.addEventListener("click", () => {
  openPopup(popupNewCard);
  clearValidation(formAddCard, validationConfig);
});

//функция записи ссылки на новый аватар после редактирования
function recordNewAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, formAvatar);
  // отправка  отредактированной информации профиля на сервер
  editAvatar(formEditLink.value)
    .then((res) => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, formAvatar);
    });
  closePopup(popupAvatar);
  formAvatar.reset();
}
//функция записи информации профиля после редактирования
function recordNewInfoProfile(evt) {
  evt.preventDefault();
  const name = formEditName.value;
  const description = formEditDescription.value;
  renderLoading(true, formEdit);
  // отправка  отредактированной информации профиля на сервер
  editProfile(name, description)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, formEdit);
    });
  closePopup(popupEdit);
}
// функция создания карточки
function handleCreateCard(evt) {
  const item = { name: "", link: "" };
  evt.preventDefault();
  renderLoading(true, formAddCard);
  item.name = cardName.value;
  item.link = cardLink.value;
  postNewCard(item)
    .then((res) => {
      placesList.prepend(
        createCard(
          res,
          meID,
          openImage,
          likeCallback,
          deleteCallback,
          cardTemplate
        )
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(false, formAddCard);
    });
  closePopup(popupNewCard);
  formAddCard.reset();
}

//функция передачи параметров при открытия картинки
function openImage(name, link) {
  popupImagePicture.src = link;
  popupImagePicture.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

//сохраняем изменения аватара при нажатии кнопки сохранения
formAvatar.addEventListener("submit", recordNewAvatar);
//сохраняем изменения профиля при нажатии кнопки сохранения
formEdit.addEventListener("submit", recordNewInfoProfile);
//добавляем карточку при нажатии кнопки сохранения
formAddCard.addEventListener("submit", handleCreateCard);

enableValidation(validationConfig);

// отрисовка загрузки при отправке запроса на сохранение
const renderLoading = (isLoading, element) => {
  if (isLoading) {
    element.querySelector(".popup__button").textContent = "Сохранение...";
  } else {
    element.querySelector(".popup__button").textContent = "Сохранить";
  }
};

// колбек для лайков (нажатие на лайк ставит или убирает лайк,
// функция отправляет запрос на постановку лайка и на удаление лайка
// в зависимости от того, поставлен ли уже лайк. А потом обновляет количество лайков
const likeCallback = (evt, cardId, cardLikesCounter) => {
  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLikeServer
    : putLikeServer;

  likeMethod(cardId)
    .then((res) => {
      cardLikesCounter.textContent = res.likes.length;
      evt.target.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

// колбек для удаление карточки
const deleteCallback = (evt, cardId, card) => {
  const deleteMethod = () => {
    // если событие произошло на контейнере с классом кнопки удаления, то отправляем  запрос на удаление карточки на сервер и потом удаляем карточку
    if (evt.target.classList.contains("card__delete-button")) {
      deleteCardServer(cardId)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  deleteMethod();
};
