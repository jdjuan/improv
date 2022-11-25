import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  gifUrl;
  constructor() {
    this.fetchShirt();
  }

  async fetchShirt() {
    const url = new URL('https://api.giphy.com/v1/gifs/search');
    url.searchParams.set('api_key', '');
    url.searchParams.set('limit', '1');
    url.searchParams.set('q', 'shirt');
    const response = await (await fetch(url.href)).json();
    this.gifUrl = response.data[0].images.original.url;
  }
}
