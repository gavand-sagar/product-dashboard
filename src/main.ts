import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// import { App } from './app/app';
import { AppCopy } from './app/app-copy';

bootstrapApplication(AppCopy, appConfig)
  .catch((err) => console.error(err));
