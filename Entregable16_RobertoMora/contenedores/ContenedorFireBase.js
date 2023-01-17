import FirebaseAdmin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { readFile } from "fs/promises";
import {serverTimestamp} from "firebase/firestore"
import { FieldValue } from 'firebase-admin/firestore'


const cert = JSON.parse(
  await readFile(new URL(process.env.FIREBASE_CERT_PATH, import.meta.url))
);

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(cert),
});
class ContenedorFireBase {
  constructor(collection) {
    this.collection = collection;
  }

  async listar(id) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const snapshot = await query.where("id", "==", id).get();
      if (!snapshot.empty) {
        console.log(
          `[readByName] Elemento obtenido con éxito! ->`,
          snapshot.docs[0].data()
        );
        const result = snapshot.docs[0].data();
        return result;
      } else {
        console.log(`[readByName] Elemento no encontrado`);
      }
    } catch (error) {
      console.error(
        `[readByName] Ocurrio un error al intenter obtener color ${name} ->`,
        error.message
      );
    }
  }

  async listarAll() {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return response;
    } catch (error) {}
  }

  async guardar(obj) {
    try {
      const db = FirebaseAdmin.firestore();
      const query = db.collection(this.collection);
      let id = uuidv4();
      console.log(id)
      let doc = query.doc(id);
      let createdAt= FieldValue.serverTimestamp();
      const result = await doc.create({ ...obj, id,createdAt });
      return result;
    } catch (error) {
      console.error("[create] Ocurrio un error ->", error.message);
    }
  }

  async actualizar(id, method, data) {
    try {
      const db = FirebaseAdmin.firestore()
      const query = db.collection(this.collection)
      const snapshot = await query.where('id', '==', id).get()
      if (!snapshot.empty) {
        const doc = query.doc(snapshot.docs[0].id)
        const result = await doc.update(data)
        console.log(`[updateByName] Elemento actualizado con éxito!`)
        return result
      } else {
        console.log(`[updateByName] Elemento no encontrado`)
      }
    } catch (error) {
      console.error(`[updateByName] Ocurrio un error al intentar actualizar elemento ->`, error.message)
    }
  }
  
  async borrar(id) {
    try {
      const db = FirebaseAdmin.firestore()
      const query = db.collection(this.collection)
      const snapshot = await query.where('id', '==', id).get()
      if (!snapshot.empty) {
        const doc = query.doc(snapshot.docs[0].id)
        const result = await doc.delete()
        console.log(`[deleteByName] Elemento eliminado con éxito!`)
        return result
      } else {
        console.log(`[deleteByName] Elemento no encontrado`)
      }
    } catch (error) {
      console.error(`[deleteByName] Ocurrio un error al intentar eliminado elemento ->`, error.message)
    }
  }
  async borrarAll() {
    const result = await this.collection.deleteMany({});
    return result;
  }
}

export default ContenedorFireBase;
