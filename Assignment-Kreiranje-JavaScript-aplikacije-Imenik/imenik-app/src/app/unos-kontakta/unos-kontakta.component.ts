import { Component, OnInit } from '@angular/core';
import { ImenikService } from '../imenik.service';
import { Kontakt } from '../kontakt.model';

@Component({
  selector: 'app-unos-kontakta',
  templateUrl: './unos-kontakta.component.html',
  styleUrls: ['./unos-kontakta.component.css']
})
export class UnosKontaktaComponent implements OnInit {
  ime: string = '';
  brojTelefona: string = '';

  constructor(private imenikService: ImenikService) { }

  ngOnInit(): void {
    // Inicijalizacija
  }

  dodajKontakt(): void {
    const kontakt: Kontakt = {
      ime: this.ime,
      brojTelefona: this.brojTelefona
    };

    this.imenikService.dodajKontakt(kontakt);

    this.ime = '';
    this.brojTelefona = '';
  }
}
