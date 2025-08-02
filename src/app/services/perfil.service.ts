import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  async obterPerfil() {
    const user = this.auth.currentUser;
    if (!user) return null;

    const docRef = doc(this.firestore, `usuarios/${user.uid}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? docSnap.data() : null;
  }

  async salvarPerfil(dados: { nome: string; fotoURL: string}) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuário não autenticado.');

    const docRef = doc(this.firestore, `usuarios/${user.uid}`);
    return setDoc(docRef, dados, { merge: true });
  }
}
