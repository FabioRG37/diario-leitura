import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment'
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diario-leitura';

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    // this.testarFirebase();
  }

  // testarFirebase() {
  //   this.firebaseService.adicionarTeste();
  // }

  logout() {
    this.authService.logout();
  }
}

