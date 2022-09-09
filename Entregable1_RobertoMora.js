class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return (`El nombre completo es: ${this.nombre} ${this.apellido}`)
  }
  addMascotas(mascotas) {
    this.mascotas.push(mascotas)
    return (this.mascotas);
  }
  countMascotas() {
    return (this.mascotas.push());
  }
  addBook(libros) {
    this.libros.push(libros)
    return (this.libros);
  }
  getBooksNames() {
    const nombres =[]
    for (const i in this.libros) {
        nombres.push(this.libros[i].nombre)
    }
    return(nombres);
  }
}

const usuario = new Usuario(
    'Roberto','Mora',
    [{nombre:'El señor de las mocas',autor: 'William Golding'},
    {nombre:'El Mago de Oz',autor: 'L.Frank Baum'}],
    ['perro','gato','conejo']
);

console.log(usuario.getFullName())
console.log(usuario.countMascotas())
console.log(usuario.addMascotas('dinosuario'))
console.log(usuario.getBooksNames())
console.log(usuario.addBook({nombre:'Harry Potter', autor: 'J.K.Rolling'}))