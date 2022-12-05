
export default async function auth (req, res, next) {
    const { isAuth } = req.session
    if (isAuth) {
      next()
    } else{
      const data= {mensaje: "Debes realizar el login!"}
      res.render("login",data)
    }
  }
