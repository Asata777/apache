import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from "@angular/platform-browser";
@Injectable({
	providedIn: 'root'
})
export class RegistrService {
	constructor(private http: HttpClient, private titleService: Title) {
	}
	Registr(nick: string, password: string) {
		return this.http.post('https://asata.club/mafia', {
			type: 'registr',
			nick: nick,
			password: password
		});
	}
	setTitle(title: string) {
		this.titleService.setTitle(title);
	}
}
