import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(public http: HttpClient) { }
	Auth(nick: string, password: string) {
		return this.http.post('https://asata.club/mafia', {
			type: 'auth',
			nick: nick,
			password: password
		});
	}
}
