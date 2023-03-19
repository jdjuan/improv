import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'improv';
  openAIKey = '';

  constructor() {
    this.fetch();
  }

  async fetch() {
    console.log('Loading...');
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'What is the OpenAI mission? Be super concise' }],
    };
    const headers = { Authorization: `Bearer ${this.openAIKey}`, 'Content-Type': 'application/json' };
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      headers,
      body: JSON.stringify(body),
      method: 'POST',
    });
    const data = await response.json();
    console.log('Done!');
    console.log(data.choices[0].message.content);
  }
}
