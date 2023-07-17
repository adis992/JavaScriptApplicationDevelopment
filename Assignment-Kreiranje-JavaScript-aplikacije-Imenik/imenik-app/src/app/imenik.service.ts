import { Injectable } from '@angular/core';
import { Kontakt } from './kontakt.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImenikService {
    private STORAGE_KEY = 'imenik';
    kontaktiChanged = new Subject<Kontakt[]>();

    constructor() { }

    dodajKontakt(kontakt: Kontakt): void {
        const postojeciKontakti = this.getKontakti();
        postojeciKontakti.push(kontakt);
        this.setKontakti(postojeciKontakti);
        this.kontaktiChanged.next(postojeciKontakti);
    }

    getKontakti(): Kontakt[] {
        const kontakti = localStorage.getItem(this.STORAGE_KEY);
        const parsedKontakti = kontakti ? JSON.parse(kontakti) : [];
        return parsedKontakti;
    }

    setKontakti(kontakti: Kontakt[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(kontakti));
    }

    obrisiKontakt(kontakt: Kontakt): void {
        const postojeciKontakti = this.getKontakti();
        const filtriraniKontakti = postojeciKontakti.filter(k => k.ime !== kontakt.ime || k.brojTelefona !== kontakt.brojTelefona);
        this.setKontakti(filtriraniKontakti);
        this.kontaktiChanged.next(filtriraniKontakti);
    }
}
