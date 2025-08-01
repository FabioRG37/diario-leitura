import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  async adicionarTeste() {
    const ref = collection(this.firestore, 'teste');
    const docRef = await addDoc(ref, {
      mensagem: "Conexão com Firebase funcionando!",
      data: new Date()
    });
  }
}
