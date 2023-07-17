import { Component, OnDestroy, OnInit } from '@angular/core';
import { Kontakt } from '../kontakt.model';
import { ImenikService } from '../imenik.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kontakt-lista',
  templateUrl: './kontakt-lista.component.html',
  styleUrls: ['./kontakt-lista.component.css']
})
export class KontaktListaComponent implements OnInit, OnDestroy {
  kontakti: Kontakt[] = [];
  private kontaktiSub!: Subscription;

  constructor(private imenikService: ImenikService) { }

  ngOnInit(): void {
    this.kontakti = this.imenikService.getKontakti();
    this.kontaktiSub = this.imenikService.kontaktiChanged.subscribe(
      (kontakti: Kontakt[]) => {
        this.kontakti = kontakti;
      }
    );
  }

  obrisiKontakt(kontakt: Kontakt): void {
    this.imenikService.obrisiKontakt(kontakt);
  }

  ngOnDestroy(): void {
    this.kontaktiSub.unsubscribe();
  }
}
