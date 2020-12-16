import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
	providedIn: 'root'
})
export class GameService {
	socket: any;
	url: string = 'http://localhost:8080/mafia';
	// url: string = 'https://asata.club/mafia';
	constructor(private titleService: Title) {
		this.socket = io(this.url);
	}
	setTitle(title: string) {
		this.titleService.setTitle(title);
	}
	on(event_name: string) {
		return new Observable(subscriber => {
			this.socket.on(event_name, (data: any) => {
				subscriber.next(data);
			});
		});
	}
	emit(event_name: string, data: any) {
		this.socket.emit(event_name, data);
	}
	sendMessage() {
		this.socket.emit('message', { hello: 46516 });
	}
	getUserData(hash: string) {
		this.socket.emit('message', {
			type: 'user_data',
			hash: hash
		});
	}
	socketDisconnect() {
		this.socket.disconnect();
		this.socket.off();
	}
	socketConnect() {
		this.socket.connect();
	}
}
