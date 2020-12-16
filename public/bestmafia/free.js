$('.footerPanel').append(`
    <link rel="stylesheet" href="https://asata.top/bestmafia/style.css?v=0.11">
    <li onclick="bot_menu.hidden=!bot_menu.hidden;">Меню</li>
`);
const menu = `<div id="bot_menu" class="popup-move bot-menu">
    <div id="settings_popup" class="setting-popup" hidden>
        <ul id="setting_list" class="bot-ul">
            <li>
                <span>Некоторые функции</span>
                <label id="drag" title="Позволяет передвигать меню в нужное место">Подвижное меню
                    <input type="checkbox" id="drag_menu" style="margin-top: 5px;">
                </label>
            </li>
            <li>
                <span>Контакты</span>
                <div><a href="https://vk.com/id184062213" target="_blank">ВК разработчика</a></div>
                <div><a href=https://vk.com/bot.menu target="_blank">Группа в ВК</a></div>
            </li>
            <li>
            <a href="https://asata.top/shop" class="full-version" target="_blank">Получить полную версию</a>
            </li>
        </ul>
    </div>
    <div class="menu-head">
        <label class="mh-label settings" title="Настройки">
            <svg class="mh-svg">
                <polygon
                    points="3.24 5.61 2.21 7.22 4.05 8.91 4.2 12.97 2.21 14.94 3.29 16.53 5.73 15.62 9.49 18.06 9.88 20.32 11 20.32 11 22 8.43 22 7.91 19.06 5.52 17.5 2.62 18.59 0 14.74 2.45 12.31 2.35 9.65 0 7.5 2.5 3.59 5.55 4.6 7.77 3.28 8.45 0 11 0 11 1.68 9.86 1.68 9.31 4.33 5.77 6.44 3.24 5.61"
                    class="svg-polygon"></polygon>
                <polygon
                    points="18.76 5.61 19.79 7.22 17.95 8.91 17.8 12.97 19.79 14.94 18.71 16.53 16.27 15.62 12.51 18.06 12.12 20.32 11 20.32 11 22 13.57 22 14.09 19.06 16.48 17.5 19.38 18.59 22 14.74 19.55 12.31 19.65 9.65 22 7.5 19.5 3.59 16.45 4.6 14.23 3.28 13.55 0 11 0 11 1.68 12.14 1.68 12.69 4.33 16.23 6.44 18.76 5.61"
                    class="svg-polygon"></polygon>
                <circle class="svg-circle" cx="11" cy="11" r="3"></circle>
            </svg>
            <input type="checkbox" hidden id="setting">
        </label>
        <label class="mh-label menu-close">
            <svg class="mh-svg">
                <rect class="svg-rect" x="-3.08" y="9.52" width="28.16" height="2.95"
                    transform="translate(-4.56 11) rotate(-45)" />
                <rect class="svg-rect" x="9.52" y="-3.08" width="2.95" height="28.16"
                    transform="translate(-4.56 11) rotate(-45)" />
            </svg>
            <input type="checkbox" hidden id="close_menu">
        </label>
    </div>
    <div class="menu-content">
        <ul id="header" class="bot-ul">
            <li class="sep">
                <label>Создать<input type="radio" hidden value="1" name="choice"></label>
                <label>Прыгать<input type="radio" hidden value="2" name="choice"></label>
                <label>Автовход<input type="radio" hidden value="3" name="choice"></label>
                <div id="cur" hidden></div>
            </li>
            <li class="inputs">
                <label for="entry" hidden>Создать: </label>
                <label for="entry" hidden>Прыгать: </label>
                <label for="entry" hidden>Автовход: </label>
                <input type="checkbox" id="entry" hidden style="margin-top: 7px;"></label>
                <select id="r_size" hidden>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
                <select id="l_num" hidden>
                    <option value="1">Бронза</option>
                    <option value="2">Серебро</option>
                    <option value="3">Золото+</option>
                    <option value="999">Моя лига</option>
                </select>
                <input type="text" hidden placeholder="Ники" id="sozd">
                <select id="l_text" hidden>
                    <option value="777">Арена</option>
                    <option value="Бронзовая лига">Бронза</option>
                    <option value="Серебряная лига">Серебро</option>
                    <option value="Золотая лига,Платиновая лига,Бриллиантовая лига,Лига Чемпионов,Гроссмейстерская лига">Золото+</option>
                    <option value="888">Все лиги</option>
                    <option value="999">Моя лига</option>
                </select>
            </li>
        </ul>
        <label><input type="checkbox" value="main" name="path" hidden><span class="_arrow">Основное</span></label>
        <ul id="main" class="bot-ul">
            <li><label>Брать аукцион:<input type="checkbox" id="moneyauk"
                        style="margin-top: 7px;"></label>
                <input type="text" placeholder="Роли" id="aukrole_m" autocomplete>
                <input type="number" min="20" step="20" placeholder="Монет" id="aukcount" autocomplete>
            </li>
            <li><label>Делать ночной ход:<input type="checkbox" id="night_move"></label></li>
            <li><label>Голосовать по прове:<input type="checkbox" id="searchvote"></label></li>
            <li><label>Голосовать в ответ:<input type="checkbox" id="returnvote"></label></li>
            <li><label>Досрочка:<input type="checkbox" id="earlyauk" style="margin-top: 7px;"></label>
                <input type=text placeholder="Роли" id="aukrole_e" autocomplete>
            </li>
            <li data-part="main"><label>Выходить с комнаты:<input type="checkbox" id="room_exit"></label>
                <input type="number" min="1" step="1" placeholder="Сек." id="exit_interval">
            </li>
            <li data-part="main"><label>Заказать ход:<input type="checkbox" id="setmove" style="margin-top: 7px;"></label>
                <select id=setm>
                    <option value=1>По нику</option>
                    <option value=2>По указу</option>
                </select>
                <input hidden type="text" placeholder="Ник" id="set_nick" autocomplete>
            </li>
            <li><label>Текст по роли:<input type="checkbox" id="sendmsg"></label></li>
            <li><label>Будильники:<input type="checkbox" id="alarms"></label></li>
            <li><label>Скрывать вспл. окна:<input type="checkbox" id="hide_popups"></label></li>
        </ul>
    </div>
</div>`
$('#rootContainer').append(menu);



const mafias = ['Мафиози', 'Двуликий', 'Босс мафии', 'Громила', 'Продажный Комиссар'],
    citizens = ['Комиссар', 'Сержант', 'Свидетель', 'Гражданин', 'Вор', 'Стерва', 'Медработник', 'Смертник', 'Доктор', 'Гадалка'],
    vegets = ['Гражданин', 'Медработник', 'Сержант', 'Смертник'],
    comms = ['Комиссар', 'Сержант'],
    maniacs = ['Маньяк', 'Потрошитель', 'Валентин', 'Убийца', 'Взрывная Лили', 'Чёрная Борода'],
    professors = ['Чокнутый Профессор', 'Голем', 'Супер-Мутант'],
    tonys = ['Подручный', 'Франческа', 'Жирный Тони', 'Марко', 'Розарио', 'Хулиганка Пеппи'],
    banditos = ['Мигель', 'Санчо', 'Бандит'],
    yakuzas = ['Тётушка Лин', 'Тень', 'Гора', 'Якудза'],
    evils = [...mafias, ...tonys, ...banditos, ...yakuzas, ...maniacs],
    moder_arr = [
        10649896, 7922799, 7920341, 9753111, 9754309,
        7044265, 3025224, 10383731, 9443196
    ],
    man_arr = [],
    evil_arr = [],
    mir_arr = [],
    maf_arr = [];

let vote_stop = 0,
    move_stop = 0,
    arena_room = 0;

function AutoCreate() {
    if (gam_id) return;
    let num = +l_num.value,
        size = +r_size.value;
    if (+num == 999)
        league_ttls[my_league];
    httpRequest({
        method: 'gam_create',
        players: size,
        bet: 20,
        league: num,
        prior: 1
    }).then(data => {
        if (typeof data.err != 'undefined') {
            return entry.checked = 0;
        }
        _GM_action('', 'do', 'create', data.arr);
    });
}

function ArenaEntry() {
    httpRequest({
        method: 'gam_play_at'
    }).then(data => {
        if (typeof data.err != 'undefined')
            return entry.checked = 0;
        _GM_action('', 'do', 'create', data.arr);
    });
}

let bad_rooms = [];
async function LigaEntry() {
    if (!gam_id) {
        let size = +r_size.value,
            liga = l_text.value.split(','),
            list = gml_list.children;
        if (+liga == 777)
            return ArenaEntry();
        else if (+liga == 888)
            liga = league_ttls_w.slice(1, my_league + 1);
        else if (+liga == 999)
            liga = league_ttls_w[my_league];
        for (let i = 0; i < list.length; i++) {
            if (!list[i].className) {
                let _liga = list[i].children[1].title,
                    _size = +list[i].children[2].textContent.split('/')[1],
                    _mon = +list[i].children[3].textContent;
                if (size == _size && _mon == 20 && ~liga.indexOf(_liga)) {
                    let id = +list[i].id.substr(4);
                    if (!~bad_rooms.indexOf(id)) {
                        let room = await roomEntry(id);
                        if (room) break;
                    }
                }
            }
        }
    } else if (gam_state == 'def' && +l_text.value.split(',') != 777) {
        let list = gpl_list.querySelectorAll('li > span');
        for (let i = 0; i < list.length; ++i) {
            let id = +list[i].id.substr(4);
            if (~moder_arr.indexOf(id)) {
                bad_rooms.push(+gam_id);
                console.info(`Модер ${id} со мной в комнате, выхожу`);
                _GM_action('', 'exit');
            }
        }
    }
    if (gam_state == 'play') {
        bad_rooms.length = 0;
    }
}

async function AutoEntry() {
    if (!gam_id) {
        let list = gml_list.children,
            szd = sozd.value;
        if (szd) {
            for (let i = 0; i < list.length; ++i) {
                if (gam_id) break;
                let name = list[i].querySelector('.name > span');
                if (name) {
                    let nick = name.textContent;
                    if (~szd.indexOf(nick)) {
                        let id = +list[i].id.substr(4),
                            room = await roomEntry(id);
                        if (room) break;
                    }
                }
            }
        }
    }
}

function roomEntry(id) {
    return new Promise(resolve => {
        httpRequest({
            method: 'gam_join',
            id: id
        }).then(data => {
            if (typeof data.arr != 'undefined') {
                _GM_action('', 'do', 'create', data.arr);
                resolve(1);
            } else if (typeof data.err != 'undefined' && data.err == 13)
                return entry.checked = 0;
            resolve(0);
        });
    });
}

function MoneyAuk() {
    if (gam_state == 'init' && typeof gam_data.sale_p != 'object') {
        let role = aukrole_m.value.trim().toLowerCase(),
            limit = +aukcount.value,
            txt = gsl_ttl.textContent,
            name = t_persons[gam_data.sale_p].toLowerCase();
        if (gam_data.sale_t < 1 && gam_data.sale_b < limit && txt != 'вы лидируете') {
            switch (role) {
                case 'все роли':
                case '*':
                    _GM_action('', 'sale_bet', 0, event);
                    break;
                default:
                    if (~role.indexOf(name)) {
                        _GM_action('', 'sale_bet', 0, event);
                    }
            }
        }
    }
}

let slice_id = [],
    move_id = [];

function autoMove() {
    inspectHelper();
    chatHelper();
    let person = pla_data.person,
        state = gam_state == 'play',
        mode = gam_data.v_mode,
        cycle = gam_data.v_cycle,
        act = pla_data.act,
        freeze = pla_data.freeze;
    if (!move_stop && state && !mode && cycle && (~[25, 12, 3].indexOf(person) ? 1 : evilCount()) && !act && !freeze) {
        let list = upl_list.querySelectorAll('.dead.not-displayed'),
            role = t_persons[person],
            r_move = randMove(),
            r_count = rolesCount,
            t_count = teamCount(),
            e_count = evilCount(),
            not_title = withoutTitle(),
            get_timer = timer();
        for (let i = 0; i < list.length; ++i) {
            if (move_stop) break;
            let parent = list[i].parentNode,
                title = parent.title,
                not_my = !parent.classList.contains('my'),
                nick = parent.parentNode.querySelector('.name > .nick').textContent,
                team_act = +parent.parentNode.querySelector('.count').textContent,
                list_id = +parent.parentNode.id.substr(4),
                id = list_id != my_id ? list_id : 0;
            switch (role) {
                case 'Комиссар':
                    if (t_count > 1) {
                        if (get_timer < 24 && !title && id) {
                            checkArr(move_id, id, 0);
                            if (get_timer < 22) Move(move_id);
                        }
                        if (get_timer < 18)
                            Move(r_move);
                    }
                    break;
                case 'Двуликий':
                    if (person == 25) {
                        if (get_timer < 27 && not_my && ~mafias.indexOf(title))
                            Move(id);
                        if (get_timer < 24 && maf_arr.length) {
                            maf_arr.forEach(pl_nick => {
                                if (pl_nick == nick) Move(id);
                            });
                        }

                        if (get_timer < 21 && !title && !~mir_arr.indexOf(nick)) {
                            if (id && !~slice_id.indexOf(id))
                                checkArr(move_id, id, 0);
                            if (get_timer < 19) Move(move_id, 1);
                        }

                        if (get_timer < 18) Move(r_move);
                    } else if (get_timer < 21) {
                        if (not_title > 1) {
                            if (e_count > 1 && !team_act && id) {
                                checkArr(move_id, id, 0);
                                if (get_timer < 19) Move(move_id);
                            } else Move(r_move);
                        } else Move(r_move);
                    }
                    break;
                case 'Свидетель':
                case 'Доктор':
                    if (t_count > 1) {
                        if (get_timer < 24 && not_my && title && (~citizens.indexOf(title)) || ~mir_arr.indexOf(nick))
                            Move(id);

                        if (get_timer < 20) Move(r_move);
                    }
                    break;
                case 'Стерва':
                case 'Вор':
                    if (get_timer < 27 && ~evils.indexOf(title))
                        Move(id);

                    if (get_timer < 25 && evil_arr.length) {
                        evil_arr.forEach(pl_nick => {
                            if (pl_nick == nick) Move(id);
                        });
                    }

                    if (get_timer < 23 && not_my && !~citizens.indexOf(title) && !~mir_arr.indexOf(nick)) {
                        if (id && !~slice_id.indexOf(id))
                            checkArr(move_id, id, 0);
                        if (get_timer < 21) Move(move_id, 1);
                    }
                    if (get_timer < 17) Move(r_move);
                    break;
                case 'Босс мафии':
                    if (get_timer < 26 && e_count < t_count)
                        Move(r_move);

                    if (get_timer < 24 && t_count > 1 && !team_act && id) {
                        checkArr(move_id, id, 0);
                        if (get_timer < 22) Move(move_id);
                    }

                    if (get_timer < 20) Move(r_move);
                    break;
                case 'Мафиози':
                    let dvul = (r_count(25) || r_count(26)) && !~mafias[1].indexOf(title);
                    if (get_timer < 28 && dvul && not_title <= 3 && not_my && title && id) {
                        checkArr(move_id, id, 0);
                        if (get_timer < 26) Move(move_id);
                    }
                    if (r_count(2) >= 2) {
                        if (get_timer < 21 && team_act) Move(id);
                        if (get_timer < 14) Move(r_move);
                    } else if (get_timer < 23) Move(r_move);
                    break;
                case 'Гадалка':
                    if (get_timer < 25) {
                        if (gam_data.v_cycle == 1)
                            Move(gam_data.owner);
                        else if (!title && id)
                            checkArr(move_id, id, 0);
                        if (get_timer < 22) Move(move_id);
                    }
                    if (get_timer < 18) Move(r_move);
                    break;
                default:
                    if (get_timer <= rand(16, 24) && !~vegets.indexOf(myRole())) {
                        Move(r_move);
                    }
            }
        }
    }
    if (gam_data.v_mode)
        move_stop = move_id.length = 0;
    if (gam_state != 'play')
        maf_arr.length = man_arr.length = slice_id.length = evil_arr.length = night_act_count = 0;
}

function Move(id, verify) {
    if (typeof id == 'object') {
        let rand_id = id[~~(Math.random() * id.length)];
        if (verify) {
            if (!~slice_id.indexOf(rand_id)) {
                slice_id.push(rand_id);
                id = rand_id;
            }
            if (timer() < 17) id = rand_id;
        } else id = rand_id;
    }
    let list = upl_list.querySelector(`#upl_${id} .dead.not-displayed`);
    if (list) {
        let parent = list.parentNode.parentNode,
            check = parent.querySelector('.actionButton > button').className != 'reanim';
        if (check) {
            _GM_action('', 'vote', 2, [id, 0, event]);
            move_stop = 1;
        }
    }
}

let stop15 = 0;

function Inspection() {
    inspectHelper();
    if (gam_data.v_mode && evilCount() && !pla_data.freeze && !pla_data.dead) {
        let check_arr = maf_arr.length || man_arr.length;
        if (check_arr) {
            let list = upl_list.querySelectorAll('.dead.not-displayed'),
                get_timer = timer(),
                my_role = myRole(),
                i_maf = ~mafias.indexOf(my_role),
                maf_condition = evilCount() - teamCount() > 2;
            for (let i = 0; i < list.length; ++i) {
                let parent = list[i].parentNode.parentNode,
                    nick = parent.querySelector('.name > .nick').textContent,
                    id = +parent.id.substr(4);
                if (maf_arr.length) {
                    maf_arr.forEach(pl_nick => {
                        if (pl_nick == nick) {
                            if ((i_maf && maf_condition) || !i_maf) {
                                if (!stop15 && !pla_data.act) {
                                    // console.info('Голосую в', id)
                                    setTimeout(() => Vote(id), rand(3000, 6000));
                                    stop15 = 1;
                                }
                                if (get_timer + 4 <= 0 && pla_data.kvt != my_id)
                                    $('.yes').click();
                            }
                        }
                    });
                } else if (man_arr.length) {
                    man_arr.forEach(pl_nick => {
                        if (pl_nick == nick) {
                            if (!stop15 && !pla_data.act) {
                                // console.info('Голосую в', id)
                                setTimeout(() => Vote(id), rand(4000, 7000));
                                stop15 = 1;
                            }
                            if (get_timer + 4 <= 0 && pla_data.kvt != my_id)
                                $('.yes').click();
                        }
                    });
                }
            }
        }
    }
    if (!gam_data.v_mode)
        stop15 = 0;
    if (gam_state != 'play')
        man_arr.length = maf_arr.length = 0;
}

let stop10 = 0,
    vote_ids = [];

function returnVote() {
    if (gam_data.v_mode && evilCount() && !pla_data.freeze && !pla_data.dead && pla_data.person != 8) {
        let list = upl_list.querySelectorAll('.dead.not-displayed'),
            my_role = myRole(),
            get_timer = timer(),
            v_rand = get_timer > 8 ? rand(4000, 8000) : rand(2000, 4000);
        for (let i = 0; i < list.length; ++i) {
            let parent = list[i].parentNode,
                title = parent.title,
                not_my = !parent.classList.contains('my'),
                vote = parent.parentNode.querySelector('.name > .hint').textContent.substr(8),
                id = +parent.parentNode.id.substr(4);
            if (vote == my_nick) {
                if (totalRoles() == 2 && !isExtra(161))
                    buyExtra(161);
                if (~citizens.indexOf(my_role)) {
                    if (not_my && !~citizens.indexOf(title)) {
                        checkArr(vote_ids, id, 0);
                        if (!stop10 && !pla_data.act) {
                            setTimeout(() => Vote(vote_ids), v_rand);
                            stop10 = 1;
                        }
                        if (get_timer + 6 <= 0 && pla_data.kvt != my_id)
                            $('.yes').click();
                    }
                } else if (~mafias.indexOf(my_role)) {
                    if (not_my && !~mafias.indexOf(title)) {
                        checkArr(vote_ids, id, 0);
                        if (!stop10 && !pla_data.act) {
                            setTimeout(() => Vote(vote_ids), v_rand);
                            stop10 = 1;
                        }
                        if (get_timer + 4 <= 0 && pla_data.kvt != my_id)
                            $('.yes').click();
                    }
                } else if (not_my) {
                    checkArr(vote_ids, id, 0);
                    if (!stop10 && !pla_data.act) {
                        setTimeout(() => Vote(vote_ids), v_rand);
                        stop10 = 1;
                    }
                    if (get_timer + 5 <= 0 && pla_data.kvt != my_id)
                        $('.yes').click();
                }
            }
        }
    }
    if (!gam_data.v_mode)
        stop10 = vote_ids.length = 0;
}


let stop20 = 0;

function EarlyAuk() {
    let role = aukrole_e.value.trim();
    if (gam_state === 'init' && typeof gam_data.sale_p != 'object' && !stop20) {
        let name = t_persons[gam_data.sale_p],
            underline = document.querySelector('.underline');
        switch (role) {
            case 'Все роли':
            case '*':
                underline.click();
                break;
            default:
                if (~role.indexOf(name))
                    underline.click();
        }
        stop20 = 1;
    }
    if (gam_state != 'init')
        stop20 = 0;
}

let stop18 = 0;

function autoExit() {
    let interval = +exit_interval.value;
    if (!stop18 && pla_data.dead || gam_data.v_win) {
        setTimeout(() => {
            if (pla_data.dead || gam_data.v_win)
                _DLG('exit', 2, event);
        }, interval * 1000 || 5000);
        stop18 = 1;
    }
    if (gam_state != 'play')
        stop18 = 0;
}

let stop3 = 0;

function sendMsg() {
    if (!stop3 && gam_data.v_mode && timer() < rand(22, 40) && !pla_data.freeze) {
        if (!~evils.indexOf(myRole())) {
            if (pla_data.person == 1) {
                _CHT_action('', 'smile', 'гр', event);
                _CHT_action('ich', 'send', 'close');
                stop3 = 1;
            } else if (!rolesCount(1)) {
                _CHT_action('', 'smile', 'мир', event);
                _CHT_action('ich', 'send', 'close');
                stop3 = 1;
            } else stop3 = 1;
        }
    }
    if (!pla_data.person) stop3 = 0;
}

let stop2 = 0,
    move_appended = 0;

function SetMove() {
    let act = +pla_data.act;
    if (gam_state == 'play' && !act && !pla_data.dead) {
        let list = upl_list.querySelectorAll('.dead.not-displayed'),
            set = +setm.value,
            pl_nick = set_nick.value,
            idead = $('#upl_list > li > .idead').siblings('.name').children('.attack'),
            use = extraUse,
            my_role = myRole();
        if (idead.length) idead.remove();
        if (!~vegets.indexOf(my_role)) {
            for (let i = 0; i < list.length; ++i) {
                let parent = list[i].parentNode.parentNode,
                    upd = parent.querySelector('.name'),
                    id = +parent.id.substr(4),
                    nick = parent.querySelector('.name > .nick').textContent,
                    title = list[i].parentNode.title;
                switch (set) {
                    case 1:
                        let radio = $('.attack');
                        if (radio.length) radio.remove();
                        if (!gam_data.v_mode && nick == pl_nick) {
                            Vote(id);
                        }
                        break;
                    case 2:
                        let check_team = (~mafias.indexOf(my_role) && !~mafias.indexOf(title)) ||
                            (~comms.indexOf(my_role) && !~comms.indexOf(title)) ||
                            ~citizens.indexOf(my_role);
                        if (!move_appended && id != my_id && check_team)
                            upd.insertAdjacentHTML('beforeEnd', `<input type=radio value=${id} name=attack class=attack>`);
                        let checked = document.querySelector('.attack:checked');
                        if (!gam_data.v_mode && checked && gam_data.v_cycle) {
                            let id = +checked.value;
                            Vote(id);
                            checked.checked = 0;
                        }
                        break;
                }
            }
            move_appended = 1;
        }
    } else if (!gam_id) {
        stop2 = move_appended = 0;
        let used = $('#upl_list > li > .name > .attack');
        if (used.length) used.remove();
    }
}

function alarmClock() {
    let extra = document.querySelector('#gxt_154');
    if (gam_state == 'play' && extra) {
        let enabled = !extra.classList.contains('disabled'),
            data = !pla_data.dead && !pla_data.freeze && !pla_data.kvt;
        if (enabled && data) {
            let list = upl_list.querySelectorAll('.dead.not-displayed');
            for (let i = 0; i < list.length; ++i) {
                let parent = list[i].parentNode,
                    speak = parent.querySelector('.noSpeak'),
                    hidden = speak.classList.contains('not-displayed');
                if (!hidden) {
                    let id = +parent.parentNode.id.substr(4);
                    extraUse(154, id);
                }
            }
        }
    }
}

function myRole() {
    if (pla_data.person)
        return t_persons[pla_data.person];
}

let stop6 = 0;

function Skin() {
    if (gam_state == 'play' && !stop6) {
        _GM_action('', 'fig_set', [31], event);
        stop6 = 1;
    }
    if (gam_state != 'play')
        stop6 = 0;
}

function isExtra(id) {
    return document.querySelector(`#gxt_${id}`) != null;
}

let stop19 = false;

function TaroOfDestiny() {
    if (!stop19 && gam_state === 'play') {
        let popup = document.querySelector('#pp_tel_cards');
        if (popup) {
            setTimeout(() => {
                popup.querySelectorAll('li')[rand(0, 2)].click();
                setTimeout(() => _GM_action('', 'tel_cards', 'remove'), 2000);
            }, 3000);
            stop19 = true;
        }
    } else if (!gam_data.v_mode) {
        stop19 = false;
    }
}

function Profile(id) {
    return new Promise(resolve => {
        httpRequest({
            method: 'prf',
            id: id
        }).then(data => {
            if (typeof data.arr != 'undefined') {
                resolve(1);

            }
            resolve(0);
        });
    });
}

let stop21 = 0,
    throw_arr = [];


function roomThrow(item) {
    if (!stop21) {
        stop21 = 1;
        let interval,
            i = 0,
            c = 0,
            stop17 = 0;
        interval = setInterval(() => {
            if (!roomthrow.checked) {
                stop21 = throw_arr.length = i = c = stop17 = 0;
                return clearInterval(interval);
            }
            if (gam_state == 'play' && !pla_data.freeze) {
                let list = upl_list.querySelectorAll('.dead.not-displayed'),
                    type = +r_throw.value;
                switch (type) {
                    case 1:
                        i = c = 0;
                        if (!throw_arr.length && !stop17) {
                            for (let i = 0; i < list.length; ++i) {
                                let id = +list[i].parentNode.parentNode.id.substr(4);
                                if (id != my_id)
                                    throw_arr.push(id);
                            }
                            stop17 = 1;
                        } else if (throw_arr.length) {
                            let id = throw_arr[~~(Math.random() * throw_arr.length)],
                                index = throw_arr.indexOf(id);
                            Profile(id).then(response => {
                                if (response) {
                                    ers_uid = id;
                                    _DLG('eraser', 3);
                                }
                            });
                            if (~index)
                                throw_arr.splice(index, 1);
                        }
                        break;
                    case 2:
                        throw_arr.length = c = 0;
                        if (i < list.length) {
                            let id = +list[i].parentNode.parentNode.id.substr(4);
                            if (id == my_id) {
                                ++i;
                                return;
                            }
                            Profile(id).then(response => {
                                if (response) {
                                    ers_uid = id;
                                    _DLG('eraser', 3);
                                }
                            });
                            ++i;
                        }
                        break;
                    case 3:
                        throw_arr.length = i = 0;
                        if (!stop17) {
                            c = list.length - 1;
                            stop17 = 1;
                        }
                        if (c >= 0) {
                            let id = +list[c].parentNode.parentNode.id.substr(4);
                            if (id == my_id) {
                                --c;
                                return;
                            }
                            Profile(id).then(response => {
                                if (response) {
                                    ers_uid = id;
                                    _DLG('eraser', 3);
                                }
                            });
                            --c;
                        }
                        break;
                }
            }
            if (gam_state != 'play') {
                i = c = throw_arr.length = stop17 = 0;
            }
        }, rand(3000, 7000));
    }
}

let gift_count = 0,
    reply_ids = [];

function eventReply() {
    let log = cco_log.querySelectorAll('.giftRecieved.table');
    if (log.length > gift_count) {
        let td = log[gift_count].querySelectorAll('.td > a'),
            to_nick = td[0].textContent;
        if (to_nick == my_nick) {
            reply = td[2];
            if (!reply.noted) {
                let id = +reply.onclick.toString().match(/\d+/i);
                if (!~reply_ids.indexOf(id)) {
                    reply_ids.push(id);
                    ers_uid = id;
                    _DLG('eraser', 3);
                }
                reply.noted = true;
            }
        }
        ++gift_count;
    }
    if (gam_state == 'init' || pla_data.dead || pla_data.win) {
        gift_count = reply_ids.length = 0;
    }
}

function buyExtra(id) {
    if (!isExtra(id)) {
        _WND_proc('extras', 'buy', { id: id }, event);
    }
}

function hidePopups() {
    if (popup_container.children.length) {
        $(`
        #wnd_newbie,
        #pp_money_bonus,
        #wnd_invite,
        .achCompletePopup,
        .clanTaskCompletePopup,
        .dailyBonusPopup
        `).find('.popupClose').click();
        leagueProc('collect_all');
    }
}

function extraUse(ext_id = 0, pl_id = 0) {
    if (pla_data.person) {
        let gtx = document.querySelector('#gxt_' + ext_id);
        if (gtx && !gtx.classList.contains('disabled')) {
            switch (ext_id) {
                case 159:
                case 154:
                case 101:
                    _GM_action('', 'ext_use', [ext_id, pl_id], event);
                    break;
                default:
                    if (!pl_id) {
                        _GM_action('', 'ext_act', ext_id, event);
                    } else {
                        let list = upl_list.querySelectorAll('.dead.not-displayed'),
                            rand = randMove(),
                            list_id = +list[rand].parentNode.parentNode.id.substr(4);
                        if (list_id != my_id) {
                            _GM_action('', 'ext_use', [ext_id, list_id], event);
                        }
                    }
            }
        }
    }
}

function cleanDisplay() {
    let erase = document.querySelector('.containerEraser');
    if (erase)
        $('.containerEraser').remove();
}

function rejectEventExtras() {
    if (gam_state == 'play') {
        let id = breakdownId,
            dynamit = document.querySelector('#pp_dynamit');
        if (id(189) || id(196) || id(280))
            _GM_action('', 'powder_b');
        else if (id(253) || id(8))
            _GM_action('', 'ship_cannon');
        else if (dynamit)
            _GM_action('', 'dynamit', 'action');
    }
}

function breakdownId(id) {
    if (gam_state == 'play') {
        let img = cco_log.querySelectorAll('.extra > .img');
        if (img.length) {
            let last = img[img.length - 1],
                button = last.nextSibling.querySelector('button'),
                img_id = +last.querySelector('img').src.match(/\d+/i);
            if (id == img_id && button && !button.noted) {
                button.noted = 1;
                return 1;
            }
        }
        return 0;
    }
}

function duelTickets() {
    let lottery = document.querySelector('.lotteryPopup');
    if (lottery)
        _GM_action('', 'duel_lwin', 'get');
}

function Vote(id) {
    if (!pla_data.act && !pla_data.freeze && !pla_data.dead) {
        if (typeof id == 'object')
            id = id[~~(Math.random() * id.length)];
        let list = upl_list.querySelector(`#upl_${id} .dead.not-displayed`);
        if (list) {
            let parent = list.parentNode.parentNode,
                vote = parent.querySelector('.actionButton > button').className,
                false_btn = ['x2vote', 'reanim', 'zgchk'];
            if (!~false_btn.indexOf(vote))
                _GM_action('', 'vote', 2, [id, 0, event]);
        }
    }
}


let stop8 = 0,
    prov_count = 0;

function inspectHelper() {
    if (gam_data.v_mode) {
        let prov = cco_log.querySelectorAll('.proverka');
        if (!stop8 && prov_count < prov.length) {
            let proverka = prov[prov_count],
                text = proverka.textContent.split('за ')[1],
                nick = proverka.querySelector('.bb > em > .nick').textContent;
            if (nick != my_nick) {
                switch (text) {
                    case 'мафию':
                        checkArr([maf_arr, evil_arr], nick);
                        break;
                    case 'маньяка':
                        checkArr([man_arr, evil_arr], nick);
                        break;
                    default:
                        checkArr(mir_arr, nick, 0);
                }
            }
            stop8 = 1;
            ++prov_count;
        }
    }
    if (!gam_data.v_mode) stop8 = 0;
    if (!pla_data.person) prov_count = 0;
}

function EventBreakdown() {
    if (gam_state == 'play') {
        let safe = gam_data.safe,
            btn = document.querySelector('#pp_safe > button');
        if (safe && btn) {
            let is_disabled = btn.classList.contains('disabledGrayscale');
            if (!is_disabled) {
                switch (safe) {
                    case 3:
                        _DLG('pinyata_br', 2, event);
                        break;
                    case 7:
                        _DLG('safe_open_b', 2, event);
                        break;
                }
            }
        }
    }
}

let verify_count = 0,
    extras_options = [
        'паяльником дали результат: ',
        'таро раскрыли вам роль: ',
        'раскрыл роль случайного игрока: ',
        'лжи дал результаты: ',
        '«Утюгом Тони» дало результат: ',
        'Таро раскрыли роль: ',
        'правды раскрыл роль: ',
        'Таро бустер» раскрыл вам роль игрока: ',
        'Таро от Бандитос раскрыли роль: ',
        'Талант/усиление «Таро бустер» раскрыл вам роль игрока:'
    ];

function chatHelper() {
    if (gam_state == 'play' && evilCount()) {
        let p = cco_log.querySelectorAll('p');
        if (verify_count < p.length) {
            let text = p[verify_count].textContent;
            for (let extra of extras_options) {
                let find = text.search(extra);
                if (~find) {
                    let piece = text.substr(find + extra.length);
                    for (let evil of evils) {
                        let finded = piece.search(evil);
                        if (~finded) {
                            let nick = piece.substr(0, finded - 3),
                                role = piece.substr(finded, evil.length);
                            if (nick != my_nick && rolesCount(role)) {
                                if (~mafias.indexOf(role))
                                    checkArr([maf_arr, evil_arr], nick);
                                else if (~citizens.indexOf(role))
                                    checkArr(mir_arr, nick, 0);
                                else
                                    checkArr([man_arr, evil_arr], nick);
                            }
                        }
                    }
                }
            }
            ++verify_count;
        }
    }
    if (gam_state != 'play')
        verify_count = 0;
}

function rolesCount(role) {
    let leave = gam_data.v_left;
    if (+role) {
        return +leave[role];
    } else {
        for (let name in leave) {
            if (role == t_persons[name] && leave[name]) {
                return leave[name];
            }
        }
    }
    return 0;
}

function totalRoles() {
    let left = gam_data.v_left;
    return Object.keys(left).reduce((sum, arg) => sum + +(left[arg]), 0);
}


function timer() {
    return gam_data.v_mode ? 45 - gam_data.v_time : 30 - gam_data.v_time;
}

function randMove() {
    let list = upl_list.querySelectorAll('.dead.not-displayed'),
        rand = ~~(Math.random() * list.length),
        id = +list[rand].parentNode.parentNode.id.substr(4);
    if (id && id != my_id)
        return id;
}

function rand(min, max) {
    return ~~(Math.random() * (max - min)) + min;
}

function checkArr(arr, arg, flag = 1) {
    if (flag) {
        for (let d in arr) {
            if (!~arr[d].indexOf(arg))
                arr[d].push(arg);
        }
    } else if (!~arr.indexOf(arg))
        arr.push(arg);
}

function withoutTitle() {
    let count = 0,
        list = upl_list.querySelectorAll('.dead.not-displayed');
    for (let i = 0; i < list.length; ++i) {
        let title = list[i].parentNode.title;
        if (!title)
            ++count;
    }
    return count;
}

const roles = {
    cit: {
        1: 'Гражданин',
        4: 'Комиссар',
        5: 'Сержант',
        6: 'Доктор',
        7: 'Медработник',
        8: 'Смертник',
        10: 'Стерва',
        11: 'Вор',
        12: 'Свидетель',
        39: 'Гадалка',
        23: 'Костюмер'
    },
    maf: {
        2: 'Мафиози',
        9: 'Боcc мафии',
        25: 'Двуликий',
        26: 'Двуликий',
        29: 'Громила',
        47: 'Продажный комиссар'
    },
    sin: {
        3: 'Маньяк',
        34: 'Потрошитель',
        20: 'Взрывная Лили',
        14: 'Валентин',
        40: 'Чёрная Борода',
        44: 'Убийца',
        45: 'Убийца',
        46: 'Убийца'
    },
    prof: {
        18: 'Чокнутый Профессор',
        19: 'Голем',
        42: 'Супер-Мутант'
    },
    ton: {
        16: 'Подручный',
        31: 'Франческа',
        32: 'Франческа',
        17: 'Жирный Тони',
        30: 'Марко',
        33: 'Розарио',
        41: 'Хулиганка Пеппи',
    },
    band: {
        21: 'Мигель',
        24: 'Санчо',
        43: 'Бандит'
    },
    yak: {
        35: 'Тётушка Лин',
        36: 'Якудза',
        37: 'Гора',
        38: 'Тень',
    }
};

function teamCount() {
    let count = 0,
        person = pla_data.person,
        rival = {},
        leave = gam_data.v_left;
    for (let i in roles) {
        let cond = roles[i][person];
        if (cond)
            Object.assign(rival, roles[i])
    }
    for (let i in rival) {
        if (leave[i])
            count += +leave[i];
    }
    return count;
}

function evilCount() {
    let count = 0,
        person = pla_data.person,
        rival = {},
        leave = gam_data.v_left;
    for (let i in roles) {
        let cond = !roles[i][person];
        if (cond)
            Object.assign(rival, roles[i])
    }
    for (let i in rival) {
        if (leave[i])
            count += +leave[i];
    }
    return count;
}

const hash = PAGE_goto.toString().split('/')[2];

function httpRequest(data) {
    return new Promise(resolve => {
        $.ajax({
            async: true,
            cache: false,
            type: 'POST',
            url: `/standalone/${hash}/DO/${Math.random()}`,
            data: data,
            dataType: 'JSON',
            success: data => resolve(data)
        });
    });
}

var elem = document.createElement('script');
elem.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-sortable/0.9.13/jquery-sortable-min.js';
document.body.appendChild(elem);

function extrasOrder() {
    $("#gxt_list").sortable({
        update: () => addExtrasInStrorage()
    });
    let list = gxt_list.children;
    if (list.length) {
        for (let i = 0; i < list.length; ++i) {
            list[i].classList.add('ui-state-default');
        }
    }
}

function addExtrasInStrorage() {
    let list = gxt_list.children,
        arr = [];
    for (let i = 0; i < list.length; ++i) {
        let id = list[i].id;
        if (id) {
            arr.push(id.substr(4))
        }
    }
    localStorage.setItem('extras_order', arr);
}
extrasOrder();
let check = 1,
    check1 = 1,
    check2 = 1,
    check3 = 1,
    check4 = 1,
    check5 = 1;
setInterval(() => {
    /*-----------IN ROOM-------------*/
    if (night_move.checked) autoMove();
    if (searchvote.checked) Inspection();
    if (returnvote.checked) returnVote();
    if (sendmsg.checked) sendMsg();
    if (alarms.checked) alarmClock();
    if (hide_popups.checked) hidePopups();
    if (room_exit.checked) autoExit();
    if (setmove.checked) SetMove();
    else if (!setmove.checked) {
        let radio = $('.attack');
        if (radio.length) radio.remove();
        stop2 = move_appended = 0;
    }
    /*-----------OUT OF ROOM---------*/
    if (moneyauk.checked) MoneyAuk();
    if (earlyauk.checked) EarlyAuk();
    let choice = bot_menu.querySelector('input[name=choice]:checked');
    if (entry.checked && choice) {
        let ch_val = +choice.value;
        if (ch_val == 1) AutoCreate();
        else if (ch_val == 2) LigaEntry();
        else if (ch_val == 3) AutoEntry();
    }
    /*-------------EVENT-------------*/
    // if (skinchange.checked) Skin();
    // if (reject_extras.checked) rejectEventExtras();
    // if (destiny_taro.checked) TaroOfDestiny();
    // if (clean_display.checked) cleanDisplay();
    // if (breaks_extras.checked) EventBreakdown();
    // if (roomthrow.checked) roomThrow();
    // if (event_reply.checked) eventReply();
}, 1000);

function Drag(e) {
    $('#bot_menu').draggable({
        disabled: !e.checked,
        containment: 'document'
    });
}

(() => {
    let goal = bot_menu.querySelectorAll('input, select');

    for (let i = 0; i < goal.length; ++i) {
        switch (goal[i].type) {
            case 'checkbox':
                goal[i].checked = +localStorage[goal[i].id];
                if (goal[i].name === 'path') {
                    let { checked, value, nextSibling } = goal[i];
                    if (checked) {
                        $(`#${value}`).slideToggle(200);
                        nextSibling.classList.toggle('hidecontent');
                    }
                }
                /* Скрываем секцию с ивентом */
                // hideEventSection(goal[i].id);

                goal[i].onchange = e => {
                    let target = e.target,
                        { name, value, nextSibling } = target;
                    if (name === 'path') {
                        nextSibling.classList.toggle('hidecontent');
                        $(`#${value}`).slideToggle(200);
                    } else if (target.id == 'setting') {
                        settings_popup.hidden = !settings_popup.hidden;
                    } else if (target.id === 'close_menu') {
                        bot_menu.hidden = true;
                    } else if (target.id == 'drag_menu') {
                        Drag(target);
                    }
                    localStorage[e.target.id] = +e.target.checked;
                }
                break;
            case 'text':
            case 'number':
                goal[i].onmouseover = () => goal[i].title = goal[i].value
                goal[i].value = localStorage[goal[i].id] || '';
                goal[i].oninput = e => localStorage[e.target.id] = e.target.value;
                break;
            case 'select-one':
                goal[i].value = localStorage[goal[i].id] || goal[i][0].value;
                goal[i].onchange = e => {
                    localStorage[e.target.id] = e.target.value;
                    if (e.target.id == 'setm')
                        set_nick.hidden = +e.target.value != 1;
                }
                break;
            case 'radio':
                if (goal[i].name == 'choice') {
                    goal[i].onchange = e => {
                        let cur = document.querySelector('#cur');
                        $(cur).siblings('.current_b').removeClass('current_b');
                        cur.hidden = 0;
                        e.target.parentNode.classList.add('current_b');
                        let inputs = document.querySelector('.inputs'),
                            val = +e.target.value;
                        for (let i = 0; i < inputs.children.length; ++i)
                            inputs.children[i].hidden = 1;
                        inputs.children[val - 1].hidden = 0;
                        r_size.hidden = val > 2;
                        cur.style.marginLeft = `${(val - 1) * 76}px`;
                        (val == 1 ? l_num : val == 2 ? l_text : sozd).hidden = 0;
                        entry.hidden = 0;
                    }
                }
                break;
        }
    }

    function hideEventSection(id) {
        if (id == 'event') {
            let evt = bot_content.querySelectorAll(`li[data-part=${id}]`);
            for (let i = 0; i < evt.length; ++i) {
                evt[i].hidden = true;
                evt[i].querySelector('input').checked = false;
            }
            bot_content.querySelector(`#${id}`).parentNode.hidden = true;
        }
    }
    Drag(drag_menu);

    if (+setm.value == 1) set_nick.hidden = 0;
    if (setting.checked) settings_popup.hidden = 0;
    myExtras.insertAdjacentHTML('beforeEnd', `
        <button class="button size1 myProfile" onclick="_Duels();">Дуэль</button>
        <button class="button size1 myProfile" onclick="_WND_proc('clans');">Клан</button>
        <button class="button size1 myProfile" onclick="_WND_proc('top');">Топ</button>
        <button class="button size1 myProfile" onclick="_PRF();">Профиль</button>
        <button class="button size1 myProfile" onclick="_EventScene();">Ивент</button>
    `);

    let extras_order = localStorage.getItem('extras_order');
    if (extras_order) {
        extras_order.split(',').forEach((e, _i) => {
            let list = gxt_list.children;
            for (let i = 0; i < list.length; ++i) {
                let id = list[i].id.substr(4);
                if (e == id) {
                    list[i].parentNode.insertBefore(list[i], list[_i]);
                }
            }
        });
    }
    extrasOrder();
})();