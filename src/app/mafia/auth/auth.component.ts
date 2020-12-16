import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from "@angular/router";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	maf_link: string = '';
	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	Auth(nick: string, password: string) {
		if (nick && password) {
			this.authService.Auth(nick, password).subscribe((data: any) => {
				if (data.error) {
					alert(data.error);
				} else {
					this.router.navigate([`/mafia/game/${data.hash}`]);
				}
			});
		} else {
			alert('Ошибка');
		}
	}
}
