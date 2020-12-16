import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from "@angular/platform-browser";
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
	providedIn: 'root'
})
export class TopsService {
	socket: any;
	url: string = '/tops';
	constructor(private http: HttpClient, private titleService: Title) {
		this.socket = io(`${location.origin.replace('4200', '8080') + this.url}`);
	}
	setTitle(title: string) {
		this.titleService.setTitle(title);
	}
	on(eventName: string) {
		return new Observable(subscriber => {
			this.socket.on(eventName, (data: any) => {
				subscriber.next(data);
			});
		});
	}
	emit(eventName: string, data: any) {
		this.socket.emit(eventName, data);
	}
	sendMessage() {
		this.socket.emit('message', { hello: 46516 });
	}
	socketDisconnect() {
		this.socket.disconnect();
		this.socket.off();
	}
	socketConnect() {
		this.socket.connect();
	}
}
