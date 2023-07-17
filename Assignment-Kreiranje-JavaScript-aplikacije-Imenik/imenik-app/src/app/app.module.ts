import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { KontaktListaComponent } from './kontakt-lista/kontakt-lista.component';
import { UnosKontaktaComponent } from './unos-kontakta/unos-kontakta.component';
import { ImenikService } from './imenik.service';

@NgModule({
  declarations: [
    AppComponent,
    KontaktListaComponent,
    UnosKontaktaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ImenikService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
