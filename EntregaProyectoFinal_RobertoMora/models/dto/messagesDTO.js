export default class MensajeDTO {
  constructor(mensaje) {
    this._id = mensaje._id
    this.message = mensaje.message
    this.author = mensaje.author
  }
}