import { usuariosDao } from "../../daos/index.js";
import { base_host } from "../../bin/www.js";
import os from "os";
import { isValidPassword } from "../../utils.js";

export async function homeView(username) {
  let value = await usuariosDao.buscar(username);
  let avatar = value[0].avatar;
  const username2 = {
    username: {
      username: username,
      base_url: base_host,
      avatar: avatar,
    },
  };

  return username2;
}

export async function infoView() {
  let data = {
    num: os.cpus().length,
    directorio: process.cwd(),
    idProcess: process.pid,
    version: process.version,
    title: process.title,
    plataform: process.platform,
    execution: process.execPath,
    memory: process.memoryUsage(),
    base_url: base_host,
  };
  return data;
}

export async function loginView(username, contador) {
  if (username) {
    let data = {
      username: {
        username: username,
        contador: contador,
        base_url: base_host,
      },
    };
    let result = {
      autorizado: true,
      data: data,
    };
    return result;
  } else {
    let result = {
      autorizado: false,
    };
    return result;
  }
}

export async function loginEntry(username, password) {
  let value = await usuariosDao.buscar(username);
  if (value.length === 0) {
    const data = {
      mensaje: "Usuario o Constrasena Invalidos!",
      base_url: base_host,
      autorizado: false,
    };
    return data;
  } else {
    if (isValidPassword(password, value[0].password)) {
      let avatar = value[0].avatar;
      let data = {
        username: {
          username: username,
          base_url: base_host,
          avatar: avatar,
        },
        autorizado: true,
      };
      return data;
    } else {
      const data = {
        mensaje: "Usuario o Constrasena Invalidos!",
        base_url: base_host,
        autorizado: false,
      };
      return data;
    }
  }
}

export async function editUser(username, session) {
  let value = await usuariosDao.buscar(username);
  let userid = value[0]._id.toString();
  let avatar = value[0].avatar;
  let username2 = {
    username: {
      username: session.username,
      base_url: base_host,
      avatar: avatar,
      userid: userid,
    },
  };
  return username2;
}

export default {
  homeView,
  infoView,
  loginView,
  loginEntry,
  editUser,
};
