import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from "@angular/platform-browser";
@Injectable({
	providedIn: 'root'
})
export class ModersService {
	constructor(private http: HttpClient, private titleService: Title) {
	}
	getModers() {
		return this.http.post('https://asata.top/bestmafia/moders', {});
	}
	setTitle(title: string) {
		this.titleService.setTitle(title);
	}
}

