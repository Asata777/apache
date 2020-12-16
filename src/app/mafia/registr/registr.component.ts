import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegistrService } from './registr.service';
@Component({
	selector: 'app-registr',
	templateUrl: './registr.component.html',
	styleUrls: ['./registr.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class RegistrComponent implements OnInit {
	constructor(private registrService: RegistrService) { }

	Registr(nick: string, password: string, repeat_password: string) {
		nick = nick ? nick.trim() : '';
		password = password ? password.trim() : '';
		repeat_password = repeat_password ? repeat_password.trim() : '';
		if (nick && password && repeat_password && password === repeat_password) {
			this.registrService.Registr(nick, password).subscribe((data: any) => {
				if (data.error) {
					alert(data.error);
				} else {
					location.href = `/mafia/game/${data.hash}`;
				}
			});
		} else {
			alert('Ошибка');
		}
	}
	ngOnInit() {
		this.registrService.setTitle('Регистрация');
	}

}
