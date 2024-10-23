const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "72f4c6d0-d452-4438-a39d-75a286d238cb",
    "Content-Type": "application/json",
  },
};
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
// вызов с сервера информации о пользователе
export const infoForMe = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};
// вызов с сервера карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка информации о новой аватарке на сервер
export const editAvatar = (formEditLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: formEditLink.value,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка редактированной информации профиля на сервер
export const editProfile = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка карточки на сервер
export const postNewCard = (item) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: item.name,
      link: item.link,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка запроса на удаление карточки с сервера
export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка информации о лайке карточки на сервер
export const putLikeServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};
// отправка информации о снятии лайка карточки на сервер
export const deleteLikeServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};
