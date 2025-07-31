import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';

import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({ declarations: [
        AppComponent,
        MenuComponent,
    ],
    exports: [],
    bootstrap: [AppComponent], imports: [BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()], providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
