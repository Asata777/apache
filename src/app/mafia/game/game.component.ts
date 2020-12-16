import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GameService } from './game.service';
import { ActivatedRoute } from '@angular/router';
import { HtmlAstPath } from '@angular/compiler';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class GameComponent implements OnInit {
	// popup: any;

	my_id: string = '';
	my_nick: string = '';
	my_photo: string = '';
	balance: any = {
		money: 0,
		diamond: 0
	};
	room_id: string = '';

	wait_room: boolean = false;
	in_corridor: boolean = true;
	in_room: boolean = false;

	users_online: any = [];

	hash: string = '';

	room_list: any = [];

	room_data: any = {
		status: 'def',
		_id: '',
		rating: 0,
		size: 0,
		bet: 0,
		civilians: [],
		villains: [],
		role_name: '',
		role_explain: '',
		day_time: '',
		time_of_day: '',
		players: []
	};

	donate_popup: boolean = false;
	donate: object = {
		money: [
			{ count: 5000, amount: 80 },
			{ count: 25000, amount: 150 },
			{ count: 50000, amount: 270 },
			{ count: 100000, amount: 500 }
		],
		diamond: [
			{ count: 3, amount: 20 },
			{ count: 10, amount: 50 },
			{ count: 50, amount: 270 },
			{ count: 100, amount: 500 }
		]
	};
	create_options: any = {
		rating: ['100', 200, 300, 400],
		size: [2, 8, 12, 16, 20],
		bet: [20, 100, 200, 500]
	};
	employee: any = [
		{ id: 1, name: 'Asata' },
		{ id: 2, name: 'Nail' }
	];
	money_button: boolean = true;

	profile_popup: boolean = false;
	profile_data: object = {
		id: '',
		nick: '',
		level: 0,
		photo: ''
	};

	pm_popup: boolean = false;
	pm_data = {
		id: '',
		nick: '',
		photo: ''
	};

	pm_messages: any = [];
	main_messages: any = [];

	messages: any = [];

	online_title: string = '';

	create_room_popup: boolean = false;

	maf_center: number = 0;

	emoji: any = {
		smiles: []
	};
	hide_smiles = true;
	constructor(
		private gameService: GameService,
		private sanitized: DomSanitizer,
		private route: ActivatedRoute
	) { }


	ngOnInit() {
		this.setBodySize(document.querySelector('#mafia'));
		this.popupAling();
		this.gameService.setTitle('Мафия');
		this.hash = this.route.snapshot.params.hash;
		this.gameService.on('message').subscribe((data: any) => {
			this.Distributor(data);
		});
		this.gameService.getUserData(this.hash);
		this.createSmiles();
	}
	setBodySize(maf: any) {
		let height = (screen.width <= screen.height ? outerHeight : innerHeight);
		let top = (height / 2) - (maf.clientHeight / 2);
		this.maf_center = top;
	}
	createSmiles() {
		for (let i = 1; i <= 36; ++i) {
			this.emoji.smiles.push(`[#s${i}]`);
		}
	}
	ngOnDestroy() {
		this.gameService.socketDisconnect();
	}
	popupAling() {
		let popup = document.querySelectorAll<HTMLElement>('.popup-align'),
			maf = document.querySelector('#mafia'),
			maf_l = (maf.clientWidth / 2),
			maf_t = (maf.clientHeight / 2);

		for (let i = 0; i < popup.length; ++i) {
			if (popup[i].className.includes('donate-buy-popup')) {
				console.log('Донате', popup[i], maf_l, maf_t);
			} else {
				console.log(maf_l, maf_t);
			}
			let l = `${maf_l - (popup[i].clientWidth / 2)}px`,
				t = `${maf_t - (popup[i].clientHeight / 2)}px`;
			popup[i].style.left = l;
			popup[i].style.top = t;
		}
	}
	profilePopup(id = this.my_id) {
		this.gameService.emit('message', {
			type: 'profile',
			id: id
		});
	}
	Profile(data: any) {
		this.profile_popup = true;
		let { _id, nick, level, photo } = data;
		this.profile_data = {
			id: _id,
			nick: nick,
			level: level,
			photo: photo
		};
	}
	closePopup(popup_name: string, target: HTMLElement) {
		target.classList.add('popup-hide');
		setTimeout(() => {
			this[popup_name] = false;
			target.classList.remove('popup-hide');
		}, 250);
	}
	html(value: any) {
		return this.sanitized.bypassSecurityTrustHtml(value);
	}
	createRoom(rating: number, size: number, bet: number, without_turn: boolean) {
		if (rating && size && bet) {
			this.gameService.emit('message', {
				type: 'create_room',
				rating: rating,
				size: size,
				bet: bet,
				without_turn: without_turn
			});
			this.create_room_popup = false;
		}
	}
	exitFromRoom() {
		this.gameService.emit('message', {
			type: 'room_exit'
		});
	}
	addPlayerInWaitRoom(data: any) {
		delete data.type;
		if (!data.error) {
			data.class = `room-size${data.size}`;
			this.room_data = data;
		}
	}
	addJoinPlayer(data: any) {
		this.room_data.players.push(data.player);
	}
	addRoom(data: any) {
		this.room_list.push(data);
		data.players.forEach((e: any) => {
			if (e.id === this.my_id) {
				// delete data.room_id;
				this.addPlayerInWaitRoom(data);
			}
		});
	}
	roomEntrance(room_id: string) {
		this.gameService.emit('message', {
			type: 'room_entrance',
			room_id: room_id
		});
	}
	cleanRoom(data: any) {
		console.log('Очищаю комнату', data);
		this.room_data._id = '';
		this.room_data.players.length = 0;
		this.room_data.status = 'def';
		this.room_data.size = 0;
		this.room_data.rating = 0;
		this.room_data.bet = 0;
	}
	playerExitNotification(data: any) {
		this.room_data.players.forEach((e: any, i: number) => {
			if (e.id === data.id) {
				this.room_data.players.splice(i, 1);
			}
		});
	}
	appendPlayerInRoom(data: any) {

	}
	deletePlayerFromRoom(data: any) {

	}
	smilesPopup(action: string, popup: HTMLElement) {
		popup.classList.remove('smiles-in-room');
		if (action === 'room') {
			popup.classList.add('smiles-in-room');
		}
		this.hide_smiles = !this.hide_smiles;
	}
	addSmileToInput(smile_id: string, elem: HTMLInputElement) {
		elem.value += smile_id;
	}
	pmPopup(id: string, nick: string, popup: HTMLElement, photo: string) {
		this.pm_messages.length = 0;
		this.pm_popup = true;
		this.pm_data = {
			id: id,
			nick: nick,
			photo: photo
		};
		setTimeout(() => popup.focus(), 500);
	}
	Distributor(data: any) {
		let type = data.type;
		switch (type) {
			case 'user_data':
				this.setUserData(data);
				break;
			case 'profile':
				this.Profile(data);
				break;
			case 'change_balance':
				this.changeBalance(data);
				break;
			case 'message':
				this.appendMessage(data);
				break;
			case 'connect':
				this.addUserOnline(data);
				break;
			case 'disconnect':
				this.deleteUserOnline(data.id);
				break;
			case 'wait_room':
			case 'room_entrance':
				this.addPlayerInWaitRoom(data);
				break;
			case 'add_room':
				this.addRoom(data);
				break;
			case 'room_exit':
				this.cleanRoom(data);
				break;
			case 'notif_room_exit':
				this.playerExitNotification(data);
				break;
			case 'room_join':
				this.addJoinPlayer(data);
				break;
			/* case 'append_room':
				this.appendRoom(data);
				break; */
			/* case 'room_join':
				console.log('Присоединился к комнате', data);
				break; */
		}
	}
	buyDonate(category: string, id: number) {
		this.gameService.emit('message', {
			type: 'buy_donate',
			category: category,
			id: id
		});
	}
	appendMessage(data: any) {
		let { msg_type, message } = data;
		if (message && message.includes('[#')) {
			let match = message.match(/\[#\w+/g);
			if (match) {
				match.forEach((e: any) => {
					let split = e.split('[#')[1],
						emoji_type = split.substr(0, 1),
						emoji_id = +split.substr(1),
						regex = new RegExp(`\\[#${emoji_type + emoji_id}\\]`, 'i');
					message = message.replace(regex, `<span class="chat-emoji chat-smile${emoji_id}"></span>`);
				});
				data.message = this.html(message);
			}
		}
		switch (msg_type) {
			case 'private':
				this.pm_messages.push(data);
				data.class = 'private-msg';
				this.messages.push(data);
				break;
			case 'main':
				this.messages.push(data);
				break;
			case 'shout':
				this.changeBalance({
					category: 'money',
					count: this.balance.money -= 20
				});
				data.class = 'shout-msg';
				this.messages.push(data);
				break;
		}
	}
	changeBalance(data: any) {
		let category = data.category;
		this.balance[category] = data.count;
	}
	sendMessage(msg_type: string, target: any, id: string) {
		let message = target.value;
		if (message.trim()) {
			let data = {
				type: 'message',
				msg_type: msg_type,
				message: message.trim(),
				to_id: ''
			};
			if (msg_type === 'private') {
				data.to_id = id;
			} else {
				delete data.to_id;
			}
			target.value = '';
			target.focus();
			this.gameService.emit('message', data);
		}
	}
	addUserOnline(data: any) {
		let inserted = this.users_online.some((e: any) => e._id === data._id);
		if (!inserted) {
			this.users_online.push(data);
			this.online_title = `${this.users_online.length} игрок${this.declOfNum(this.users_online.length, ['', 'а', 'ов'])} онлайн`;
		}
	}
	deleteUserOnline(id: string) {
		this.users_online.forEach((e: any, i: number) => {
			if (e._id === id) {
				this.users_online.splice(i, 1);
				this.online_title = `${this.users_online.length} игрок${this.declOfNum(this.users_online.length, ['', 'а', 'ов'])} онлайн`;
			}
		});
	}
	declOfNum(n: number, titles: any) {
		return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
	}
	createRange(num: number) {
		let items = [];
		for (let i = 0; i < num; ++i) {
			items.push(i);
		}
		return items;
	}
	setUserData(data: any) {
		let { my_id, my_nick, my_photo, balance, room_data, users_online, room_list } = data;
		this.my_id = my_id;
		this.my_nick = my_nick;
		this.my_photo = my_photo;
		this.balance = balance;
		this.room_data = room_data;
		this.users_online = users_online;
		this.room_list = room_list;

		let online = users_online.length;
		this.online_title = `${online} игрок${this.declOfNum(online, ['', 'а', 'ов'])} онлайн`;
		switch (room_data.status) {
			case 'def':
				console.log('В коридоре');
				break;
			case 'wait':
				room_data.class = `room-size${room_data.size}`;
				break;
			case 'play':
				console.log('В игре');
				break;
		}
	}
	popupAligns() {
		let obj = {
			pm_align: {
				width: 420,
				height: 245
			}
		};
		for (let i in obj) {
			let w = `${(screen.width / 2) - (obj[i].width / 2)}px`,
				h = `${(screen.height / 2) - (obj[i].height / 2)}px`;
			this[i] = {
				left: w,
				top: h
			}
		}
	}
}
