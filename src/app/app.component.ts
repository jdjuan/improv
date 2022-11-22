import { Component } from '@angular/core';

export interface Sentiment {
  score: number;
  sentiment: string;
  text: string;
}

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
  imageUrl?: string;
  sentiment?: string;
  API_KEY = 'GET YOUR API KEY FROM https://api-ninjas.com/profile';

  constructor() {}

  async search(event: Event) {
    const sentiment = await this.fetchSentiment(event);
    this.fetchYesNoImage(sentiment.sentiment);
  }

  async fetchSentiment(event: Event): Promise<Sentiment> {
    const input = event.target as HTMLInputElement;
    console.log();
    const text = input.value;
    const url = 'https://api.api-ninjas.com/v1/sentiment?text=' + text;
    const result = await fetch(url, { headers: { 'X-Api-Key': this.API_KEY } });
    const body = await result.json();
    this.sentiment = body;
    return body;
  }

  async fetchYesNoImage(sentiment: string) {
    const yesOptions = ['POSITIVE', 'WEAK_POSITIVE'];
    const forceResponse = yesOptions.includes(sentiment) ? 'yes' : 'no';
    const yesNoApi = `https://yesno.wtf/api?force=${forceResponse}`;
    const body = await (await fetch(yesNoApi)).json();
    this.imageUrl = body.image;
  }
}
