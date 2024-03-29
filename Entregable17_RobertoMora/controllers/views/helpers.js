import helpersServices from "../../services/views/helpers.js";

export async function homeView(username) {
  let result = await helpersServices.homeView(username);
  return result;
}

export async function infoView() {
  let data = await helpersServices.infoView();
  return data;
}

export async function loginView(username, contador) {
  let result = await helpersServices.loginView(username, contador);
  return result;
}

export async function loginEntry(username, password) {
  let result = await helpersServices.loginEntry(username, password);
  return result;
}

export async function editUser(username, session) {
  let result = await helpersServices.editUser(username, session);
  return result;
}

export default {
  homeView,
  infoView,
  loginView,
  loginEntry,
  editUser,
};
