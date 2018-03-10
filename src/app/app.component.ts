import { Component, Inject } from '@angular/core';
import { APP_CONFIG } from './app.config';
import { Environment } from '../models/Environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  private environment;

  constructor(@Inject(APP_CONFIG) AppConfig: Environment) {
    this.environment = AppConfig;
  }
}
