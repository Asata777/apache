import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Title } from "@angular/platform-browser";
@Injectable({
	providedIn: 'root'
})
export class ShopService {
	constructor(private http: HttpClient, private titleService: Title) {
	}
	setTitle(title: string) {
		this.titleService.setTitle(title);
	}
	getLink(maf_id: number) {
		return this.http.post('https://asata.top/bestmafia/qiwiLink', {
			maf_id: maf_id
		});
	}
}
interface GetLink {
	error: number,
	link: string
}