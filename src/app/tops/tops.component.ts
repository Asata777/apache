import { Component, OnInit } from '@angular/core';
import { TopsService } from './tops.service';
/* <input #itemInput
  (keyup.enter)="addItem(itemInput.value); itemInput.value=''"> */
interface TopName {
	[name: string]: {
		name: string,
		url: string,
		count_name: string
	}
}
@Component({
	selector: 'app-tops',
	templateUrl: './tops.component.html',
	styleUrls: ['./tops.component.css']
})
export class TopsComponent implements OnInit {
	hideLoading: boolean = true;
	hideNotFounded: boolean = true;
	hideTopInfo: boolean = false;
	hideIco: boolean = true;
	ico: string;
	users: any[] = [];
	count_name: string = 'Количество';
	top_title: string = 'Онлайн обновление топов';
	topCategory: any = null;
	tops_names: TopName = {
		event_d: {
			name: 'Новый год',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_newyear.png',
			count_name: 'Побед'
		},
		event4_d: {
			name: 'Мега-Снежки',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_sn_eraser.png',
			count_name: 'Отправлено'
		},
		event5_d: {
			name: 'Звёзды',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_astars.png?3',
			count_name: 'Получено звёзд'
		},
		rating_d: {
			name: 'Дневной рейтинг',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_rating.png',
			count_name: 'Рейтинга'
		},
		arena_w: {
			name: 'Арена мастер',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_arena.png',
			count_name: 'Жетоны'
		},
		auc_d: {
			name: 'Аукцион',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_auction.png',
			count_name: 'Выиграно ролей'
		},
		expa_d: {
			name: 'Опыт',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_opit_personaljnij.png',
			count_name: 'Опыт'
		},
		love_d: {
			name: 'Любовь',
			url: 'http://www.mafia-rules.net/images/icons/tops/top_love.png',
			count_name: 'Подарков'
		}
	};
	constructor(private topsService: TopsService) { }

	ngOnInit() {
		this.topsService.setTitle('Обновление топов');
		this.topsService.socketConnect();
		this.topsService.on('message').subscribe((data: any) => {
			if (typeof data.users != 'undefined') {
				this.appendTopUsers(data.users);
				this.hideLoading = true;
			}
		});
	}
	ngOnDestroy() {
		this.topsService.socketDisconnect();
	}
	keys(): Array<string> {
		return Object.keys(this.tops_names);
	}
	appendTopUsers(users: any) {
		this.hideTopInfo = false;
		if (!users.length) {
			this.hideNotFounded = false;
		} else {
			if (users.length !== this.users.length) {
				this.users = users;
			} else {
				users.forEach((e: any, i: number) => {
					if (this.users[i] && (e.nick != this.users[i].nick || +e.count != +this.users[i].count || e.online != this.users[i].online)) {
						let diff = (+e.count - +this.users[i].count);
						this.users[i].nick = e.nick;
						this.users[i].count = e.count;
						this.users[i].online = e.online;
					}
				});
			}
		}
	}
	getTops(category: string) {
		if (category && category !== 'null') {
			this.users.length = 0;
			this.hideTopInfo = true;
			this.hideIco = false;
			this.ico = `url(${this.tops_names[category].url})`;
			this.top_title = `Топ «${this.tops_names[category].name}»`;
			this.topsService.emit('message', {
				category: category
			});
			this.count_name = this.tops_names[category].count_name;
			this.hideNotFounded = true;
			this.hideLoading = false;
		}
	}
}