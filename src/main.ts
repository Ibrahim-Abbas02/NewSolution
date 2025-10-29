import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { HttpClientModule } from '@angular/common/http';


bootstrapApplication(App, {
  providers: [importProvidersFrom(BrowserAnimationsModule,HttpClientModule)],
});
