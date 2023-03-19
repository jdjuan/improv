import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly CELEBRITY_ENDPOINT = 'https://api.api-ninjas.com/v1/celebrity?name=';
  artistData;

  async fetchArtistData(event: Event) {
    const input = event.target as HTMLInputElement;
    const artist = input.value;

    const headers = { 'X-Api-Key': 't0jbymptmoGMx9wsd7beU0GdXScfTspHKUtbemIS' };
    const response = await fetch(`${this.CELEBRITY_ENDPOINT}${artist}`, { headers });
    this.artistData = await response.json();
  }
}
