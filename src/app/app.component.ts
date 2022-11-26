import { Component } from '@angular/core';

export const enum CounterOperation {
  Fetch = 'get',
  Hit = 'hit',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  counter?: number;

  constructor() {
    this.fetchCounter();
  }

  async fetchCounter() {
    this.manageCounter(CounterOperation.Fetch);
  }

  async increaseCounter() {
    this.manageCounter(CounterOperation.Hit);
  }

  async manageCounter(operation: CounterOperation) {
    const url = `https://api.countapi.xyz/${operation}/improv-burundi/visits`;
    const response = await (await fetch(url)).json();
    this.counter = response.value;
    this.isItFinished();
  }

  isItFinished() {
    if (this.counter && this.counter > 14) {
      new Audio('../assets/trumpet.mp3').play();
    }
  }
}
