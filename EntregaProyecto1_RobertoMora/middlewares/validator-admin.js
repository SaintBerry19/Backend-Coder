const admin = false;

module.exports = async function validatorAdminMiddleware(req, res, next) {
  const logPrefix = "[validadorAdminMiddleware]";
  try {
    console.log(`${logPrefix} intentando validar admin...`);
    if (admin) {
      console.log(`${logPrefix} validación body producto exitosa.`);
      next();
    } else {
      throw new Error("");
    }
  } catch (error) {
    console.log(`${logPrefix} validación fallida:`, error);
    res.status(400).send({ error : -1, descripcion: `ruta ${req.url} método ${req.method}  no autorizada` })
  }
};
