import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(private firestore: Firestore) {}

  getLivros(): Observable<Livro[]> {
    return collectionData(this.livrosCollection, { idField: 'id' }) as Observable<Livro[]>;
  }

  addLivro(livro: Livro) {
    return addDoc(this.livrosCollection, {
      ...livro,
      dataAdicionado: new Date()
    });
  }

  deleteLivro(id: string) {
    const livroDoc = doc(this.firestore, `livros/${id}`);
    return deleteDoc(livroDoc);
  }

  updateLivro(id: string, livro: Partial<Livro>) {
    const livroDoc = doc(this.firestore, `livros/${id}`);
    return updateDoc(livroDoc, livro);
  }
}
