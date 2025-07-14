import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private API_URL = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  buscarLivros(query: string) {
    return this.http.get(`${this.API_URL}?q=${encodeURIComponent(query)}`);
  }

  buscarLivroPorId(id: string) {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}
