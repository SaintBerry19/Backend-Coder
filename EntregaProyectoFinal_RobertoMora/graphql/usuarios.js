import crypto from 'crypto'

class Usuario {
  constructor({ id, firstname, lastname, email, age }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
  }
}

const usersMap = {};

export function createUsuario({ data }) {
  const id = generateId();
  const newUser = new Usuario({ ...data, id });
  usersMap[id] = newUser;
  return newUser;
}

export function getUsers() {
  return Object.values(usersMap);
}

export function getUserById({ id }) {
  if (!usersMap[id]) {
    throw new Error("User not found");
  }
  return usersMap[id];
}

export function updateUser({ id, data }) {
  if (!usersMap[id]) {
    throw new Error("User not found");
  }
  const updatedUser = new Usuario({ ...usersMap[id], ...data, id });
  usersMap[id] = updatedUser;
  return updatedUser;
}

export function deleteUser({ id }) {
  if (!usersMap[id]) {
    throw new Error("User not found");
  }
  const deletedUser = usersMap[id];
  delete usersMap[id];
  return deletedUser;
}

export function generateId() {
  return crypto.randomBytes(10).toString("hex");
}

export default {
    createUsuario,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}