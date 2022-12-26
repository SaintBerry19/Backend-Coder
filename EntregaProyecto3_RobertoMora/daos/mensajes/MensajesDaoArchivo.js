import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js"

class MensajesDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('mensajes.json')
    }
}

export default MensajesDaoArchivo
