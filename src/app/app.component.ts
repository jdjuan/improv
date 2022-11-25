import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  imgUrl?: string;

  constructor() {
    this.fetchImage(undefined, 'window');
  }

  async fetchImage(event?: Event, searchTerm?: string): Promise<void> {
    const target = event?.target as HTMLInputElement;
    const query = target?.value || searchTerm;
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    const headers = { Authorization: '563492ad6f917000010000018b45ab3bc50e4aab9ff9ace464cda2c7' };
    const response = await (await fetch(url, { headers })).json();
    this.imgUrl = response.photos[0].src.landscape;
  }
}
