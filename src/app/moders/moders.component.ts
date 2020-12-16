import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModersService } from './moders.service';
@Component({
	selector: 'app-moders',
	templateUrl: './moders.component.html',
	styleUrls: ['./moders.component.css'],
	encapsulation: ViewEncapsulation.None,
})

export class ModersComponent implements OnInit {
	optionType: string = '';
	moders: ModerList[] = [];
	modersNotFounded: boolean = false;
	admins: ModerList[] = [];
	adminsNotFounded: boolean = false;
	hideModers: boolean = false;
	hideLoading: boolean = false;
	constructor(private modersService: ModersService) { }
	ngOnInit() {
		this.modersService.getModers().subscribe((moders: ModerList[]) => {
			this.appendModers(moders);
		});
		this.modersService.setTitle('Модеры и админы онлайн');
	}
	appendModers(moders: ModerList[]) {
		if (!moders.length) {
			this.adminsNotFounded = true;
			this.modersNotFounded = true;
		} else {
			moders.forEach((e: any) => {
				if (e.admin) {
					this.admins.push(e);
				} else {
					this.moders.push(e);
				}
			});
			if (!this.moders.length) {
				this.modersNotFounded = true;
			}
			if (!this.admins.length) {
				this.adminsNotFounded = true;
			}
		}

		this.hideLoading = true;
	}
}

interface ModerList {
	photo?: string,
	nick?: string,
	url?: string,
	id?: number,
	admin?: boolean
}
