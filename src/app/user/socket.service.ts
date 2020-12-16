import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
@Injectable({
    providedIn: 'root'
})
export class ModersService {
    socket: any;
    url: string = 'http://localhost:8080/moders';
    constructor(private http: HttpClient) {
        this.socket = io(this.url);
    }
    on(eventName: string) {
        return new Observable(subscriber => {
            this.socket.on(eventName, (data) => {
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
    getModers() {
        return this.http.post('http://localhost:8080/moders', { type: 'moders' });
    }
}
