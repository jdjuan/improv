import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly CELEBRITY_ENDPOINT = 'https://api.api-ninjas.com/v1/celebrity?name=';

  constructor(public auth: AngularFireAuth) {
    this.fetchNetWorth();
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  async fetchNetWorth() {
    const response = await fetch(`${this.CELEBRITY_ENDPOINT}shakira`, {
      headers: { 'X-Api-Key': 'API KEYYYY' },
    });
    const data = await response.json();
    console.log(data);
  }
}
