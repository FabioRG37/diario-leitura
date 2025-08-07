import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';

export interface Livro {
  id?: string;
  titulo: string;
  autor: string;
  status: 'quero-ler' | 'lendo' | 'lido';
  imagem?: string;
  paginasLidas?: number;
  totalPaginas?: number;
  dataAdicionado?: any; // ou usar Timestamp do Firebase
}

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private livrosCollection = collection(this.firestore, 'livros');

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  getLivros(): Observable<Livro[]> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of([]);
        const livrosRef = collection(this.firestore, 'livros');
        const q = query(livrosRef, where('uid', '==', user.uid));
        return collectionData(q, { idField: 'id'}) as Observable<Livro[]>;
      })
    );
  }

  deleteLivro(id: string) {
    const livroRef = doc(this.firestore, `livros/${id}`);
    return deleteDoc(livroRef);
  }

  updateLivro(id: string, livro: Partial<Livro>) {
    const livroDoc = doc(this.firestore, `livros/${id}`);
    return updateDoc(livroDoc, livro);
  }

  addLivro(livro: any) {
    const user = this.auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado.");

    const livrosCollection = collection(this.firestore, 'livros');
    return addDoc(livrosCollection, {
      ...livro,
      uid: user.uid
    });
  }

  atualizarStatus(id: string, novoStatus: string) {
    const livroRef = doc(this.firestore, `livros/${id}`);
    return updateDoc(livroRef, { status: novoStatus });
  }

}
