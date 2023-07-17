import { Component, OnInit } from '@angular/core';
import { ImenikService } from './imenik.service';
import { Kontakt } from './kontakt.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Imenik aplikacija';
  kontakti: Kontakt[] = [];

  constructor(private imenikService: ImenikService) { }

  ngOnInit(): void {
    this.kontakti = this.imenikService.getKontakti();
  }
}
