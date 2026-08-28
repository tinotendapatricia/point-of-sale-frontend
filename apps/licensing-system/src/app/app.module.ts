import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, NxWelcomeComponent],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
