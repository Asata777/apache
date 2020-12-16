$('.footerPanel').append(`
<link rel="stylesheet" href="https://asata.top/bestmafia/style.css?v=0.11">
<li onclick="bot_menu.hidden=!bot_menu.hidden;">Меню</li>
`);
// <link rel="stylesheet" href="http://localhost:8080/bestmafia/style.css?v=0.11">
const menu_html = `<div id="bot_menu" class="popup-move bot-menu">
<div id="settings_popup" class="setting-popup" hidden>
    <ul id="setting_list" class="bot-ul">
        <li>
            <span>Некоторые функции</span>
            <label title="Позволяет передвигать меню в нужное место">Подвижное меню
                <input type="checkbox" id="drag_menu" onclick="Drag(this);" style="margin-top: 5px;" checked>
            </label>
            <label title="Показывает ID игрока при открытии профиля">Показывать ID игрока
                <input type="checkbox" id="show_id" onclick="showProfileId(this);" style="margin-top: 5px;" checked>
            </label>
            <label title="При старте меню, автоматически выбирает метод входа в комнату">Автозапуск меню
                <input type="checkbox" id="auto_start" style="margin-top: 5px;" checked>
            </label>
        </li>
        <li>
            <span>Информация об меню</span>
            <div id="bought">Куплено: </div>
            <div id="duration">Доступно до: </div>
        </li>
        <li>
            <span>Контакты</span>
            <div><a href="https://vk.com/id184062213" target="_blank">ВК разработчика</a></div>
            <div><a href=https://vk.com/bot.menu target="_blank">Группа в ВК</a></div>
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
    <label class="mh-label menu-close" onclick="bot_menu.hidden = true;">
        <svg class="mh-svg">
            <rect class="svg-rect" x="-3.08" y="9.52" width="28.16" height="2.95"
                transform="translate(-4.56 11) rotate(-45)" />
            <rect class="svg-rect" x="9.52" y="-3.08" width="2.95" height="28.16"
                transform="translate(-4.56 11) rotate(-45)" />
        </svg>
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
                <option value="my_league">Моя лига</option>
            </select>
            <select id="e_type" hidden>
                <option value="usual">Обычный</option>
                <option value="tail">Хвостик</option>
            </select>
            <input type="text" placeholder="Ники" id="a_nicks" hidden>
            <select id="l_text" hidden>
                <option value="arena">Арена</option>
                <option value="Бронзовая лига">Бронза</option>
                <option value="Серебряная лига">Серебро</option>
                <option value="Золотая лига,Платиновая лига,Бриллиантовая лига,Лига Чемпионов,Гроссмейстерская лига">
                    Золото+
                </option>
                <option value="all_leagues">Все лиги</option>
                <option value="my_league">Моя лига</option>
            </select>
        </li>
    </ul>
    <label><input type="checkbox" value="main" name="path" hidden><span class="_arrow">Основное</span></label>
    <ul id="main" class="bot-ul">
        <li><label>Брать аукцион:<input type="checkbox" id="money_auk"
                    style="margin-top: 7px;"></label>
            <input type="text" placeholder="Роли" id="aukrole_m" autocomplete>
            <input type="number" min="20" step="20" placeholder="Монет" id="aukcount" autocomplete>
        </li>
        <li><label>Делать ночной ход:<input type="checkbox" id="night_move"></label></li>
        <li><label>Голосовать по прове:<input type="checkbox" id="search_vote"></label></li>
        <li><label>Голосовать в ответ:<input type="checkbox" id="return_vote"></label></li>
        <li><label>Голосовать по находке:<input type="checkbox" id="b_verifying"></label></li>
        <li><label>Дополнительные голоса:<input type="checkbox" id="aux_votes"></label></li>
        <li><label>Помогать напарнику:<input type="checkbox" id="team_help"></label></li>
        <li><label>Выполнять арену:<input type="checkbox" id="arena"></label></li>
        <li><label>Отбрасывать экстры:<input type="checkbox" id="reject_extras"></label></li>
        <li><label>Досрочка:<input type="checkbox" id="early_auk" style="margin-top: 7px;"></label>
            <select id="ear_auk_method">
                <option value="1">Обычная</option>
                <option value="2">На арене</option>
            </select>
            <input type=text placeholder="Роли" id="early_auction" autocomplete>
        </li>
        <li><label>Выходить с комнаты:<input type="checkbox" id="room_exit"
                    style="margin-top: 7px;"></label>
            <input type="number" min="1" step="1" placeholder="Сек." id="exit_interval">
        </li>
        <li><label>Заказать ход:<input type="checkbox" id="set_move"
                    style="margin-top: 7px;"></label>
            <select id="move_method">
                <option value="on_nick">По нику</option>
                <option value="self-choice">По указу</option>
            </select>
            <input type="text" placeholder="Ник" id="set_nick" autocomplete hidden>
        </li>
        <li><label>Клановые задания:<input type="checkbox" id="clan_tasks"
                    style="margin-top: 7px;"></label>
            <select id="task_method">
                <option value="0">Заходить</option>
                <option value="1">Создавать</option>
            </select>
        </li>
        <li><label>Отправлять проверку:<input type="checkbox" id="send_prov"></label></li>
        <li><label>Текст по роли:<input type="checkbox" id="send_msg"></label></li>
        <li><label>Автожук:<input type="checkbox" id="use_bug" style="margin-top: 7px;"></label>
            <select id="bug_method">
                <option value="random">Рандомно</option>
                <option value="self-choice">По указу</option>
                <option value="on_nick">По нику</option>
            </select>
            <input type="text" placeholder="Ник" id="bug_nick" autocomplete hidden>
        </li>
        <li><label>Будильники:<input type="checkbox" id="alarms"></label></li>
        <li><label>Болтун:<input type="checkbox" id="talker"
                    style="margin-top: 7px;"></label>
            <input type="text" placeholder="Текст через запятую" id="talk_messages" style="width:150px">
        </li>
        <li><label>Скрывать вспл. окна:<input type="checkbox" id="hide_popups"></label></li>
        <li><label>Оповещение в ВК:<input type="checkbox" id="vk_notif"
                    style="margin-top: 7px;"></label>
            <input type="text" placeholder="ID от ВК" id="peer_id">
        </li>
    </ul>
    <label><input type="checkbox" value="event" name="path" hidden><span class="_arrow">Ивент</span></label>
    <ul id="event" class="bot-ul">
    <li data-part="event"><label>Открывать мешок:<input type="checkbox" id="breaks_extras"></label></li>
    <li data-part="event"><label>Брать способность:<input type="checkbox" id="take_ability"></label></li>
    </ul>
    <label><input type="checkbox" value="duel" name="path" hidden><span class="_arrow">Дуэль</span></label>
    <ul id="duel" class="bot-ul">
        <li><label>Автоака:<input type="checkbox" id="autoak"></label></li>
        <li><label>Голосовать под себя:<input type="checkbox" id="under_vote"></label></li>
        <li><label>Делать суицид:<input type="checkbox" id="suicide"></label></li>
    </ul>
    <label><input type="checkbox" value="duel_quests" name="path" hidden><span class="_arrow">Дуэльные квесты</span></label>
    <ul id="duel_quests" class="bot-ul">
        <li><label>Начать дуэльные квесты:<input type="checkbox" id="start_duel_quests"></label></li>
        <li><label>Делать суицид для ускорения:<input type="checkbox" id="make_suicide"></label></li>
        <li><label>Брать аукцион досрочно:<input type="checkbox" id="use_early_auc"></label></li>
        <li><label>Тратить монеты до:<input type="checkbox" id="money_limit"
                    style="margin-top: 7px;"></label>
            <input type="number" min="20" step="20" placeholder="Монеты" id="leave_money">
        </li>
        <li><label>Тратить рубины до:<input type="checkbox" id="ruby_limit"
                    style="margin-top: 7px;"></label>
            <input type="number" min="1" step="1" placeholder="Рубины" id="leave_ruby">
        </li>
        <li><button class="duel-menu-btn" onclick="duel_menu.hidden=false;">Открыть дуэльное меню</button></li>
    </ul>
</div>
</div>
<div id="duel_menu" class="popup-move bot-menu" hidden>
<label class="mh-label menu-close" style="position: absolute;right: 0;top: -30px;" onclick="duel_menu.hidden=true;">
<svg class="mh-svg">
    <rect class="svg-rect" x="-3.08" y="9.52" width="28.16" height="2.95"
        transform="translate(-4.56 11) rotate(-45)" />
    <rect class="svg-rect" x="9.52" y="-3.08" width="2.95" height="28.16"
        transform="translate(-4.56 11) rotate(-45)" />
</svg>
<input type="checkbox" hidden id="close_menu">
</label>
<ul id="duel_menu_ul" class="bot-ul duel-ppp-ul"></ul>
</div>`
$('#rootContainer').append(menu_html);
/* 
<li><label>Открывать коробку с картами:<input type="checkbox" id="breaks_extras"></label></li>
<li><label>Использовать Таро за Костюмера:<input type="checkbox" id="event_taro"></label></li>
<li><label>Использовать АК-47 за Костюмера:<input type="checkbox" id="event_ak47"></label></li>
*/
const mafias = ['Мафиози', 'Двуликий', 'Босс мафии'],
    citizens = ['Комиссар', 'Сержант', 'Свидетель', 'Гражданин', 'Вор', 'Стерва', 'Медработник', 'Смертник', 'Доктор'],
    vegets = ['Гражданин', 'Медработник', 'Сержант', 'Смертник'],
    comms = ['Комиссар', 'Сержант'],
    professors = ['Чокнутый Профессор', 'Голем', 'Супер-Мутант'],
    maniacs = ['Маньяк', 'Убийца'],
    evils = [...mafias, ...maniacs, ...professors],
    moder_arr = [
        10649896, 7922799, 7920341, 9753111, 9754309,
        7044265, 3025224, 10383731, 9443196, 1613081
    ],
    man_arr = new Set,
    evil_arr = new Set,
    mir_arr = new Set,
    maf_arr = new Set,
    team_arr = new Set,
    prof_arr = new Set,
    slice_ids = new Set;

async function autoCreate() {
    if (!gam_id) {
        let num = +l_num.value,
            size = +r_size.value;
        if (num === 'my_league') {
            league_ttls[my_league];
        }
        let { err, arr } = await httpRequest({
            method: 'gam_create',
            players: size,
            bet: 20,
            league: num,
            prior: 1
        });
        if (err) {
            return entry.checked = false;
        }
        _GM_action('', 'do', 'create', arr);
    }
}

async function arenaEntry() {
    if (!gam_id) {
        let { err, arr } = await httpRequest({ method: 'gam_play_at' });
        if (err) {
            return entry.checked = false;
        }
        _GM_action('', 'do', 'create', arr);
    }
}

const bad_rooms = new Set;

async function ligaEntry() {
    let need_liga = l_text.value,
        need_size = +r_size.value;
    if (!gam_id) {
        if (need_liga == 'arena') {
            arenaEntry();
        } else if (need_liga == 'all_leagues') {
            need_liga = league_ttls_w.slice(1, my_league + 1);
        } else if (need_liga == 'my_league') {
            need_liga = league_ttls_w[my_league];
        }
        let room_list = await roomList();
        if (room_list) {
            for (let e of room_list) {
                if (need_liga.includes(e.room_liga) && e.room_size === need_size && e.room_bet === 20) {
                    let room = await roomEntry(e.room_id);
                    if (room) {
                        break;
                    }
                }
            }
        }
    } else if (gam_state === 'def' && need_liga !== 'arena') {
        let list = gpl_list.querySelectorAll('li > span');
        if (list.length === need_size) {
            for (let i = 0; i < list.length; ++i) {
                let id = +list[i].id.substr(4);
                if (moder_arr.includes(id)) {
                    bad_rooms.add(+gam_id);
                    _GM_action('', 'exit');
                }
            }
        }
    }
    if (gam_state === 'play') {
        bad_rooms.clear();
    }
}

let tail_sent = false;
async function autoEntry() {
    let nicks = a_nicks.value;
    if (!gam_id && nicks) {
        let entry_type = e_type.value;
        switch (entry_type) {
            case 'usual':
                let room_list = await roomList();
                if (room_list) {
                    for (let e of room_list) {
                        if (nicks.includes(e.creator_nick)) {
                            let room = await roomEntry(e.room_id);
                            if (room) {
                                break;
                            }
                        }
                    }
                }
                break;
            case 'tail':
                if (!tail_sent) {
                    socket.emit('tail', {
                        action: 'start',
                        nicks: nicks
                    });
                    tail_sent = true;
                }
                break;
        }
    }
}

async function roomEntry(room_id) {
    let { arr, err } = await httpRequest({
        method: 'gam_join',
        id: room_id
    });
    if (arr) {
        _GM_action('', 'do', 'create', arr);
        return true;
    } else if (err && err === 13) {
        return entry.checked = false;
    }
    return false;
}

let my_bet = -1,
    stop12 = false;

function moneyAuction() {
    if (!stop12) {
        stop12 = true;
        let interval;
        interval = setInterval(() => {
            let { money } = accountBalance();
            if (money <= 20) {
                _OHINT('Недостаточно монет!');
                money_auk.checked = false;
            }
            if (!money_auk.checked) {
                stop12 = false;
                return clearInterval(interval);
            }
            if (gam_state == 'init' && typeof gam_data.sale_p != 'object') {
                let need_role = aukrole_m.value.trim().toLowerCase(),
                    limit = +aukcount.value,
                    auc_role = t_persons[gam_data.sale_p].toLowerCase(),
                    auc_bet = gam_data.sale_b;
                if (gam_data.sale_t < 1 && auc_bet < limit && my_bet < auc_bet) {
                    switch (need_role) {
                        case 'все роли':
                        case '*':
                            _GM_action('', 'sale_bet', 0, event);
                            my_bet = gam_data.sale_b + 20;
                            break;
                        default:
                            if (need_role.includes(auc_role)) {
                                _GM_action('', 'sale_bet', 0, event);
                                my_bet = gam_data.sale_b + 20;
                            }
                    }
                }
            } else if (gam_state != 'init') {
                my_bet = -1;
            }
        });
    }
}

async function autoMove() {
    chatHelper();
    provHelper();
    let in_room = gam_state == 'play',
        { v_mode, v_cycle } = gam_data,
        { act, freeze, person } = pla_data,
        def_roles = [25, 12, 3, 34, 20, 14];
    if (in_room && !v_mode && v_cycle && !act && !freeze && (def_roles.includes(person) || rivalCount())) {
        switch (myRole()) {
            case 'Комиссар':
                comissarMove();
                break;
            case 'Двуликий':
                twoFacedMove();
                break;
            case 'Свидетель':
            case 'Доктор':
                withessAndDoctorMove();
                break;
            case 'Стерва':
            case 'Вор':
                thiefAndBitchMove();
                break;
            case 'Босс мафии':
                bossMove();
                break;
            case 'Мафиози':
                mafiosoMove();
                break;
            default:
                defaultMove();
        }
    }
}

let com_rand = [rand(25, 28), rand(17, 23)];
async function comissarMove() {
    if (teamCount() > 1) {
        if (timer() < com_rand[0]) {
            let player_list = await playerList();
            if (player_list) {
                let ids = player_list.filter(e => {
                    let by_pass = (gam_data.v_cycle === 1 ? e.id != +gam_data.owner : true);
                    return by_pass && !e.role;
                });
                Move(ids);
            }
        }
        if (timer() < com_rand[1]) {
            Move(await randId());
        }
    }
}

let tf_rand = [rand(22, 26), rand(13, 15), rand(9, 12), rand(17, 25)];
async function twoFacedMove() {
    let player_list = await playerList();
    if (player_list) {
        if (pla_data.person === 25) { //25 - двул до превращения
            if (timer() < tf_rand[0]) {
                let ids = player_list.filter(e => e.id != my_id && (mafias.includes(e.role) || maf_arr.has(e.nick)));
                Move(ids);
            }
            if (timer() < tf_rand[1]) {
                let ids = player_list.filter(e => {
                    let epic_arena_cond = checkCommandArray([mir_arr, man_arr], e.nick);
                    return e.id != my_id && epic_arena_cond && !e.role && !slice_ids.has(e.id);
                });
                Move(ids, true);
            }
            if (timer() < tf_rand[2]) {
                Move(await randId());
            }
        } else if (timer() < tf_rand[3]) {
            let team_act_nicks = [];
            player_list.forEach(e => {
                if (e.vote) {
                    team_act_nicks.push(e.vote);
                }
            });
            let ids = player_list.filter(e => {
                let dvul_cond = ((teamCount() <= rivalCount()) ? !e.team_act && !team_act_nicks.includes(e.nick) : true);
                return e.id != my_id && dvul_cond && !team_arr.has(e.id) && !mafias.includes(e.role);
            });
            Move(ids);
        }
    }
}

let w_d_rand = [rand(23, 28), rand(17, 21)];
async function withessAndDoctorMove() {
    if (teamCount() > 1) {
        if (timer() < w_d_rand[0]) {
            let player_list = await playerList();
            if (player_list) {
                let ids = player_list.filter(e => e.id != my_id && !evils.includes(e.role) && !evil_arr.has(e.nick) && (citizens.includes(e.role) || mir_arr.has(e.nick)));
                Move(ids);
            }
        }
        if (timer() < w_d_rand[1]) {
            Move(await randId());
        }
    }
}

let t_b_rand = [rand(25, 28), rand(21, 24), rand(17, 20)];
async function thiefAndBitchMove() {
    //проверять на мафа если поймал типа
    let player_list = await playerList();
    if (player_list) {
        if (timer() < t_b_rand[0]) {
            let ids = player_list.filter(e => evils.includes(e.role) || evil_arr.has(e.nick));
            Move(ids);
        }
        if (timer() < t_b_rand[1]) {
            let ids = player_list.filter(e => e.id != my_id && !citizens.includes(e.role) && !mir_arr.has(e.nick) && !slice_ids.has(e.id));
            Move(ids, true);
        }
        if (timer() < t_b_rand[2]) {
            Move(await randId());
        }
    }
}

let boss_rand = [rand(24, 29), rand(18, 22), rand(17, 21)];
async function bossMove() {
    if (timer() < boss_rand[0]) {
        if (teamCount() > 1) {
            let player_list = await playerList();
            if (player_list) {
                let team_act_nicks = [];
                player_list.forEach(e => {
                    if (e.vote) {
                        team_act_nicks.push(e.vote);
                    }
                });
                let ids = player_list.filter(e => {
                    let boss_cond = ((teamCount() <= rivalCount()) ? !e.team_act && !team_act_nicks.includes(e.nick) : true);
                    return e.id != my_id && boss_cond && !team_arr.has(e.id) && !maf_arr.has(e.nick) && !mafias.includes(e.role);
                });
                Move(ids);
            }
        }
    }
    if ((timer() < boss_rand[1] && teamCount() > rivalCount()) || timer() < boss_rand[2]) {
        Move(await randId());
    }
}

let maf_rand = [rand(21, 26), rand(18, 22), rand(14, 17)];
async function mafiosoMove() {
    let player_list = await playerList();
    if (player_list) {
        let team_act_nicks = [];
        player_list.forEach(e => {
            if (e.vote) {
                team_act_nicks.push(e.vote);
            }
        });
        if (rolesCount(2) >= 2) {
            if (timer() < maf_rand[1]) {
                let ids = player_list.filter(e => e.team_act);
                Move(ids);
            }
            if (timer() < maf_rand[2]) {
                let ids = player_list.filter(e => {
                    let maf_cond = ((teamCount() <= rivalCount()) ? !team_act_nicks.includes(e.nick) : true);
                    return e.id != my_id && maf_cond && !team_arr.has(e.id) && !maf_arr.has(e.nick) && !mafias.includes(e.role);
                });
                Move(ids);
            }
        } else if (timer() < maf_rand[0]) {
            let ids = player_list.filter(e => {
                let maf_cond = ((teamCount() <= rivalCount()) ? !team_act_nicks.includes(e.nick) : true);
                return e.id != my_id && maf_cond && !team_arr.has(e.id) && !maf_arr.has(e.nick) && !mafias.includes(e.role);
            });
            Move(ids);
        }
    }
}
let def_rand = rand(18, 27);

async function defaultMove() {
    if (timer() < def_rand && !vegets.includes(myRole())) {
        Move(await randId());
    }
}

function checkCommandArray(arrays, player) {
    let access = true;
    arrays.forEach(array => {
        if (array.has(player)) {
            access = false;
        }
    });
    return access;
}


let int_refreshed = false;

function refreshRandomIntervals() {
    if (!int_refreshed && gam_state !== 'play') {
        com_rand = [rand(25, 28), rand(17, 23)];
        tf_rand = [rand(22, 26), rand(13, 15), rand(9, 12), rand(17, 25)];
        w_d_rand = [rand(23, 28), rand(17, 21)];
        t_b_rand = [rand(25, 28), rand(21, 24), rand(17, 20)];
        boss_rand = [rand(24, 29), rand(18, 22), rand(17, 21)];
        maf_rand = [rand(21, 26), rand(18, 22), rand(14, 17)];
        def_rand = rand(18, 27);
        com_send_rand = rand(31, 40);

        int_refreshed = true;
    } else if (gam_state === 'play' && int_refreshed) {
        int_refreshed = false;
    }
}

function eventCollectAll() {
    if (gam_state === 'play') {
        let chest = document.querySelector('#wnd_lea_chest');
        if (chest) {
            leagueProc('collect_all');
        }
    }
    if (evt_onscreen.children.length > 1) {
        _EvtCollectOnScreenAll();
    }
}
let arena_timeout,
    arena_hidden = true,
    arena_delay = 15;

async function Arena() {
    let { t_arr, arr } = await httpRequest({ method: 'arena' });
    if (t_arr) {
        let time = +t_arr[1],
            status = t_arr[3];
        if (status == 'run') {
            if (time > 0) {
                if (!arena_hidden) {
                    setTimeout(() => _WND_proc('', 'close', 'are_inf'), 2000);
                    setTimeout(() => _WND_proc('arena', 'close'), 3000);
                    entry.checked = true;
                    arena_hidden = true;
                }
                time = (time + arena_delay) * 1000;
                arena_timeout = setTimeout(Arena, time);
            } else {
                arena_timeout = setTimeout(Arena, 5000);
            }
        } else if (status == 'fin') {
            await httpRequest({ method: 'take_atokens' });
            arena_hidden = false;
            Arena();
        }
    } else if (arr) {
        let status = arr[10],
            time = arr[13] * 1000;
        if (status == 'null') {
            if (arr[12] == 1) {
                await httpRequest({ method: 'atour_join' });
                Arena();
            } else {
                setTimeout(Arena, time);
            }
        } else if (status == 'init') {
            arena_timeout = setTimeout(Arena, 15000);
        }
    }
}

let event_arena_timeout;

async function eventArena() {
    clearTimeout(event_arena_timeout);
    let { aret } = await httpRequest({ method: 'evArena_scene' });
    if (aret) {
        let status = aret[0],
            time = +aret[2];
        switch (status) {
            case 'null':
                await httpRequest({ method: 'atour_join' });
                eventArena();
                break;
            case 'run':
                if (time > 0) {
                    arenaEntry();
                    _EvtPopupClose('start');
                    l_text.value = 'event_arena';
                    document.querySelector('.sep').children[1].click();
                    entry.checked = true;
                    time = (time + arena_delay) * 1000;
                    event_arena_timeout = setTimeout(eventArena, time);
                }
                break;
            case 'fin':
                await httpRequest({ method: 'take_atokens' });
                eventArena();
                break;
            case 'init':
                event_arena_timeout = setTimeout(eventArena, arena_delay * 1000);
                break;
        }
    }
}

async function chatChecker() {
    chatHelper();
    let { act, freeze, dead } = pla_data;
    if (!vote_stop && gam_data.v_mode && !act && rivalCount() && !freeze && !dead) {
        let player_list = await playerList();
        if (player_list) {
            if (maf_arr.size) {
                let ids = player_list.filter(e => e.id != my_id && maf_arr.has(e.nick));
                if (ids.length) {
                    let greatest_act_ids = getGreatestActs(ids);
                    if (greatest_act_ids.length) {
                        let maf_cond = (rivalCount() - teamCount() > 3),
                            mafia_side = mafias.includes(myRole());
                        if ((mafia_side && maf_cond) || !mafia_side) {
                            Vote(greatest_act_ids, rand(5000, 8000));
                        }
                    }
                }
            }
            if (man_arr.size) {
                let ids = player_list.filter(e => e.id != my_id && man_arr.has(e.nick));
                if (ids.length) {
                    Vote(ids, rand(3000, 6000));
                }
            }
            eventChatCheckerCond(player_list);
        }
    } else {
        if (!gam_data.v_mode) {
            help_stop = false;
        }
    }
}

async function eventChatCheckerCond(player_list) {
    if (prof_arr.size) {
        eventChatCheckerVote(player_list, prof_arr, professors, rand(5000, 8000));
    }
}

function eventChatCheckerVote(player_list, team_nicks, team_arr, interval) {
    let ids = player_list.filter(e => e.id != my_id && team_nicks.has(e.nick));
    if (ids.length) {
        let greatest_act_ids = getGreatestActs(ids);
        if (greatest_act_ids.length) {
            let team_cond = (rivalCount() - teamCount() > 2),
                team_side = team_arr.includes(myRole());
            if ((team_side && team_cond) || !team_side) {
                Vote(greatest_act_ids, interval);
            }
        }
    }
}

function getGreatestActs(arr) {
    let count = Math.max.apply(Math, arr.map(e => e.team_act));
    return arr.filter(e => count && e.team_act === count);
}

async function returnVote() {
    let { freeze, dead, person } = pla_data;
    if (!vote_stop && gam_data.v_mode && rivalCount() && !freeze && !dead && (((person === 8 && totalRoles() === 2) || person !== 8))) {
        let player_list = await playerList();
        if (player_list) {
            let my_role = myRole(),
                v_rand = (timer() > 8 ? rand(4000, 8000) : rand(2000, 4000)),
                against_me = player_list.filter(e => e.vote === my_nick);
            if (against_me.length) {
                if (totalRoles() === 2) {
                    buyExtra(161);
                }
                let ids = against_me.filter(e => {
                    if (citizens.includes(my_role)) {
                        return (!citizens.includes(e.role) && !mir_arr.has(e.nick));
                    } else if (mafias.includes(my_role)) {
                        return (!mafias.includes(e.role) && !maf_arr.has(e.nick));
                    } else if (maniacs.includes(my_role)) {
                        return true;
                    } else {
                        return eventReturnVote(my_role, e);
                    }
                });
                if (ids.length) {
                    Vote(ids, v_rand);
                }
            }
        }
    }
}

function eventReturnVote(my_role, e) {
    let can_vote = false,
        arrays = [
            [professors, prof_arr]
        ];
    arrays.forEach(array => {
        if (array[0].includes(my_role)) {
            can_vote = (!array[0].includes(e.role) && !array[1].has(e.nick));
        }
    });
    return can_vote;
}

async function auxiliaryVotes() {
    if (!vote_stop && gam_data.v_mode && rivalCount() && !pla_data.freeze && !pla_data.dead) {
        let player_list = await playerList();
        if (player_list) {
            let my_role = myRole();
            if (totalRoles() === 2) {
                buyExtra(161);
                let id = player_list.filter(e => e.id != my_id);
                Vote(id, rand(3000, 4000));
            } else if (mafias.includes(my_role)) {
                if (withoutTitle() === 1) {
                    let ids = player_list.filter(e => e.id != my_id && !maf_arr.has(e.nick) && !team_arr.has(e.id) && !mafias.includes(e.role));
                    if (ids.length) {
                        Vote(ids, rand(3000, 6000));
                    }
                } else {
                    let ids = player_list.filter(e => e.id != my_id && evils.includes(e.role) && !mafias.includes(e.role) && !team_arr.has(e.id) && !maf_arr.has(e.nick));
                    if (ids.length) {
                        Vote(ids, rand(3000, 6000));
                    }
                }
            } else if (citizens.includes(my_role) || maniacs.includes(my_role)) {
                let ids = player_list.filter(e => e.id != my_id && (evils.includes(e.role) || (withoutTitle() === 1 && !e.role)));
                if (ids.length) {
                    Vote(ids, rand(5000, 8000));
                }
            } else {
                eventAuxiliaryVotes(my_role, player_list);
            }
        }
    } else if (!gam_data.v_mode) {
        help_stop = false;
    }
}

function eventAuxiliaryVotes(my_role, player_list) {
    let arrays = [
        [professors, prof_arr]
    ];
    arrays.forEach(array => {
        if (array[0].includes(my_role)) {
            if (withoutTitle() === 1) {
                let ids = player_list.filter(e => e.id != my_id);
                if (ids.length) {
                    Vote(ids, rand(3000, 6000));
                }
            } else {
                let ids = player_list.filter(e => e.id != my_id && evils.includes(e.role) && !array[0].includes(e.role) && !team_arr.has(e.id) && !array[1].has(e.nick));
                if (ids.length) {
                    Vote(ids, rand(4000, 7000));
                }
            }
        }
    });
}

const possible_msgs = [
    'я гр', 'я ком', 'я мир', 'я вор', 'я стерва', 'я док', 'я свид',
    'голос', 'не туп', 'тупо', 'ало', 'нуб', 'ну', 'быстр', 'рещ',
    'помог', 'ровня', 'равня', 'эу', 'ты тут', 'за мн', 'сади его', 'против'
];
let help_stop = false;
async function helpToTeam() {
    if (!vote_stop && gam_data.v_mode && rivalCount() && !pla_data.freeze && !pla_data.dead) {
        let player_list = await playerList();
        if (player_list) {
            let my_role = myRole();
            if (mafias.includes(my_role)) {
                helpToMafias(player_list);
            } else if (citizens.includes(my_role)) {
                helpToCitizens(player_list);
            } else {
                eventHelpToTeam(my_role, player_list);
            }
            checkCourt();
        }
    } else if (!gam_data.v_mode) {
        help_stop = false;
    }
}

function eventHelpToTeam(my_role, player_list) {
    let arrays = [
        [professors, prof_arr]
    ];
    arrays.forEach(array => {
        if (array[0].includes(my_role)) {
            let team = player_list.filter(e => e.id != my_id && (array[0].includes(e.role) || array[1].has(e.nick)));
            if (team.length) {
                team.forEach(e => team_arr.add(e.id));
                let team_help_cond = (teamCount() >= rivalCount()) || (rivalCount() - teamCount() < 3);
                if (team_help_cond) {
                    team.some(e => {
                        let teammates_nicks = getTeammatesNicks(team),
                            teammate_vote = e.vote;
                        if (teammate_vote && teammate_vote != my_nick && !teammates_nicks.includes(teammate_vote)) {
                            let ids = player_list.filter(e => e.nick === teammate_vote);
                            if (ids.length) {
                                Vote(ids, rand(2000, 4000));
                                return true;
                            }
                        }
                    });
                }
            }
        }
    });
}

function helpToMafias(player_list) {
    let team = player_list.filter(e => e.id != my_id && (mafias.includes(e.role) || maf_arr.has(e.nick)));
    if (team.length) {
        team.forEach(e => team_arr.add(e.id));
        let maf_cond = (teamCount() >= rivalCount()) || (rivalCount() - teamCount() < 3);
        if (maf_cond) {
            team.some(e => {
                let teammates_nicks = getTeammatesNicks(team),
                    teammate_vote = e.vote;
                if (teammate_vote && teammate_vote != my_nick && !teammates_nicks.includes(teammate_vote)) {
                    let ids = player_list.filter(e => e.nick === teammate_vote);
                    if (ids.length) {
                        Vote(ids, rand(2000, 4000));
                        return true;
                    }
                }
            });
        }
    }
}

function getTeammatesNicks(arr) {
    let teammates_nicks = [];
    arr.forEach(e => {
        if (team_arr.has(e.id)) {
            teammates_nicks.push(e.nick);
        }
    });
    return teammates_nicks;
}

function helpToCitizens(player_list) {
    let msg_to_me = cco_log.querySelectorAll('.message-to-me');
    if (msg_to_me.length) {
        let msg_text = msg_to_me[msg_to_me.length - 1].textContent.split(':')[1].trim().toLowerCase();
        possible_msgs.forEach(message => {
            if (msg_text.includes(message)) {
                let nick = msg_to_me[msg_to_me.length - 1].querySelector('.nick-from'),
                    team = player_list.filter(e => e.nick === nick && (mir_arr.has(e.nick) || citizens.includes(e.role) || !evil_arr.has(e.nick) || !evils.includes(e.role)));
                if (team.length) {
                    team.some(e => {
                        let teammate_vote = e.vote,
                            ids = player_list.filter(e => e.nick === teammate_vote);
                        if (ids.length) {
                            Vote(ids, rand(4000, 7000));
                            return true;
                        }
                    });
                }
            }
        });
    }
}

function eventTakeAbility() {
    if (gam_state == 'play') {
        let ability = document.querySelector('#pp_spower');
        if (ability) {
            _GM_action('', 'spower', 'done', event);
        }
    }
}

function checkCourt() {
    let { kvt } = pla_data;
    if (kvt && team_arr.size && team_arr.has(kvt)) {
        let jail = cco_log.querySelectorAll('.jail > em');
        if (jail.length) {
            let text = jail[jail.length - 1].textContent;
            if (text.includes('приговорить')) {
                help_stop = true;
                let split = text.split(': '),
                    prig = +split[1].substr(0, 2),
                    opr = +split[2];
                if (timer() < -9) {
                    $(`.${(prig - opr < 2) ? 'no' : 'yes'}`).click();
                }
            }
        }
    }
}
let stop1 = false;

function earlyAuction() {
    let need_role = early_auction.value.trim().toLowerCase(),
        auk_method = +ear_auk_method.value,
        { ruby } = accountBalance();
    if ((auk_method === 1 ? !ruby : !haveExtra(320))) {
        _OHINT(`У вас нет ${auk_method === 1 ? 'рубинов' : 'экстры «Выбор роли»'}`);
        stop1 = false;
        return early_auk.checked = false;
    }
    if (!stop1 && need_role && gam_state === 'init') {
        let { sale_p } = gam_data;
        switch (need_role) {
            case 'все роли':
            case '*':
                if (auk_method === 1) {
                    if (typeof sale_p !== 'object') {
                        _GM_action('', 'sale_bet', 2, event);
                    }
                } else if (auk_method === 2) {
                    if (typeof sale_p === 'object') {
                        _GM_action('', 'sale_bet_a', rand(0, 5), event);
                    }
                }
                break;
            default:
                if (auk_method === 1) {
                    let auc_role = t_persons[sale_p].toLowerCase();
                    if (typeof sale_p !== 'object' && need_role.includes(auc_role)) {
                        _GM_action('', 'sale_bet', 2, event);
                    }
                } else if (auk_method === 2 && haveExtra(320)) {
                    sale_p.some((e, i) => {
                        let role_title = t_persons[e].toLowerCase();
                        if (need_role.includes(role_title)) {
                            _GM_action('', 'sale_bet_a', i, event);
                            return true;
                        }
                    });
                }
        }
        stop1 = true;
    } else if (gam_state !== 'init') {
        stop1 = false;
    }
}

let stop2 = false;

function autoExit() {
    let room_end = pla_data.dead || pla_data.win;
    if (!stop2 && room_end) {
        let interval = +exit_interval.value;
        setTimeout(() => {
            if (pla_data.dead || pla_data.win) {
                _DLG('exit', 2, event);
            }
        }, (interval * 1000) || 4000);
        stop2 = true;
    } else if (!room_end) {
        stop2 = false;
    }
}
let stop_tasks = '';

async function clanTasks() {
    if (!my_clan) {
        stop_tasks = 'У вас нет клана!';
    }
    if (stop_tasks) {
        localStorage.clan_tasks = 0;
        clan_tasks.checked = false
        alert(stop_tasks, stop_tasks = '');
    } else {
        let { clach } = await httpRequest({
            method: 'cl_root',
            id: my_clan
        });
        if (clach) {
            let task = +clach[0],
                method = +task_method.value;
            method ? l_num.value = 1 : l_text.value = 'all_leagues';
            switch (task) {
                case 173:
                case 47:
                case 250:
                    if (task === 47 && !silence_talent && !talker.checked) {
                        talker.checked = true;
                    }
                    r_size.value = 8;
                    break;
                case 175:
                    let { err } = await httpRequest({ method: 'cl_askip' });
                    if (err) {
                        r_size.value = 8;
                        l_num.value = 1;
                        l_text.value = 'Бронзовая лига';
                    }
                    break;
                case 251:
                    r_size.value = 12;
                    break;
                case 282:
                    r_size.value = 16;
                    break;
                case 16:
                    buyExtra(102);
                    r_size.value = 8;
                    break;
            }
            method ? autoCreate() : ligaEntry();
        } else {
            stop_tasks = 'Клановые задания кончились!';
        }
    }
}

let stop3 = false;

function sendMessage() {
    if (!stop3 && gam_data.v_mode && timer() < rand(18, 34) && !pla_data.freeze) {
        if (!evils.includes(myRole())) {
            let message = (pla_data.person == 1 ? 'гр' : !rolesCount(1) ? 'мир' : false);
            if (message) {
                _CHT_action('', 'smile', message, event);
                _CHT_action('ich', 'send', 'close');
            }
        }
        stop3 = true;
    } else if (!gam_id) {
        stop3 = false;
    }
}
let move_appended = false;

async function setMove() {
    if (gam_state == 'play' && !pla_data.act && !pla_data.dead) {
        let my_role = myRole();
        if (!vegets.includes(my_role)) {
            let player_list = await playerList();
            if (player_list) {
                let method = move_method.value;
                if (method) {
                    let dead = $('#upl_list > li > .idead').siblings('.name').children('.setmove');
                    if (dead.length) {
                        dead.remove();
                    }
                    switch (method) {
                        case 'on_nick':
                            let radio = $('.setmove');
                            if (radio.length) {
                                radio.remove();
                                move_appended = false;
                            }
                            let nick = set_nick.value.trim();
                            if (!gam_data.v_mode && gam_data.v_cycle && nick && nick != my_nick && timer() < 29) {
                                let id = player_list.filter(e => e.nick === nick);
                                if (id.length) {
                                    Move(id);
                                }
                            }
                            break;
                        case 'self-choice':
                            if (!move_appended) {
                                player_list.forEach(e => {
                                    let not_mate = (mafias.includes(my_role) && !mafias.includes(e.role)) ||
                                        (comms.includes(my_role) && !comms.includes(e.role)) ||
                                        citizens.includes(my_role);
                                    if (not_mate && e.id != my_id) {
                                        e.upd.insertAdjacentHTML('beforeEnd', `
                                    <input type="radio" value="${e.id}" name="move" class="setmove">
                                `);
                                    }
                                });
                                move_appended = true;
                            }
                            if (!gam_data.v_mode && gam_data.v_cycle) {
                                let move = document.querySelector('input[name=move]:checked');
                                if (move && timer() < 29) {
                                    let id = +move.value;
                                    Move(id);
                                    move.checked = false;
                                }
                            }
                            break;
                    }
                }
            }
        }
    } else if (gam_state != 'play') {
        move_appended = false;
        let used = $('#upl_list > li > .name > .setmove');
        if (used.length) {
            used.remove();
        }
    }
}

let bug_appended = false;

async function setBug() {
    if (gam_state == 'play' && haveExtra(101) && !pla_data.dead) {
        let player_list = await playerList();
        if (player_list) {
            let dead = $('#upl_list > li > .idead').siblings('.name').children('.setbug'),
                radio = $('.setbug');
            if (dead.length) {
                dead.remove();
            }
            let method = bug_method.value;
            switch (method) {
                case 'random':
                    if (radio.length) {
                        radio.remove();
                        bug_appended = false;
                    }
                    if (!pla_data.e101 && !gam_data.v_mode && timer() < 27) {
                        useExtra(101, await randId());
                    }
                    break;
                case 'self-choice':
                    if (!bug_appended) {
                        player_list.forEach(e => {
                            if (e.id != my_id) {
                                e.upd.insertAdjacentHTML('beforeEnd', `
                            <input type="radio" value="${e.id}" name="bug" class="setbug">
                        `);
                            }
                        });
                        bug_appended = true;
                    }
                    let setbug = document.querySelector('.setbug:checked');
                    if (!gam_data.v_mode && setbug && timer() < 26) {
                        let id = +setbug.value;
                        useExtra(101, id);
                        setbug.checked = false;
                    }
                    break;
                case 'on_nick':
                    if (radio.length) {
                        radio.remove();
                        bug_appended = false;
                    }
                    if (!pla_data.e101 && !gam_data.v_mode && 25) {
                        let nick = bug_nick.value;
                        if (nick && nick.trim() && nick.trim() != my_nick) {
                            nick = nick.trim();
                            player_list.some(e => {
                                if (e.nick === nick) {
                                    useExtra(101, e.id);
                                    return true;
                                }
                            });
                        }
                    }
                    break;
            }
        }
    } else if (gam_state != 'play') {
        bug_appended = false;
        let used_bug = $('#upl_list > li > .name > .usebug');
        if (used_bug.length) {
            used_bug.remove();
        }
    } else if (!haveExtra(101)) {
        use_bug.checked = false;
        _OHINT('У вас нет жучков!');
    }
}

async function alarmClock() {
    let limit = extras_limit ? 4 : 5,
        { dead, freeze, kvt, e154 } = pla_data;
    if (gam_state === 'play' && e154 != limit) {
        await buyExtra(154, true);
        if (!dead && !freeze && !kvt) {
            let player_list = await playerList();
            if (player_list) {
                let ids = player_list.filter(e => e.need_alarm);
                if (ids.length) {
                    let { id } = ids[~~(Math.random() * ids.length)].id;
                    useExtra(154, id);
                }
            }
        }
    }
}

function eventSkin() {}

let stop4 = false;

function eventBreaks() {
    if (!stop4) {
        stop4 = true;
        let interval;
        interval = setInterval(() => {
            if (!breaks_extras.checked) {
                stop4 = false;
                return clearInterval(interval);
            }
            if (gam_state == 'play') {
                let safe_btn = document.querySelector('#pp_safe > button'),
                    ny_btn = document.querySelector('#pp_ny_chest > button'),
                    chest_btn = document.querySelector('#pp_gems_chest > button'),
                    { safe, gems_chest, ny_chest } = gam_data;
                if (safe && safe_btn) {
                    let disabled = safe_btn.classList.contains('disabledGrayscale');
                    if (!disabled) {
                        switch (safe) {
                            case 3:
                                _DLG('event_breaks_br', 2, event);
                                break;
                            case 7:
                                _DLG('safe_open_b', 2, event);
                                break;
                        }
                    }
                } else if (ny_chest) {
                    let disabled = ny_btn.classList.contains('disabledGrayscale');
                    if (!disabled) {
                        _DLG('nyc_open', 2, event);
                    }
                } else if (gems_chest) {
                    let disabled = chest_btn.classList.contains('disabledGrayscale');
                    if (!disabled) {
                        _DLG('gmc_open', 2, event);
                    }
                }
            }
        }, rand(3000, 5000));
    }
}

let stop5 = false;

async function eventRoomThrow() {
    if (!stop5 && gam_state === 'play' && !pla_data.freeze) {
        stop5 = true;
        let player_list = await playerList();
        if (player_list) {
            let method = throw_method.value,
                players = player_list.filter(e => e.id != my_id);
            switch (method) {
                case 'random':
                    players = shuffleArray(players);
                    for (let player of players) {
                        if (gam_state !== 'play') {
                            break;
                        }
                        await throwToPlayer(player.id);
                    }
                    break;
                case 'begining':
                    for (let player of players) {
                        if (gam_state !== 'play') {
                            break;
                        }
                        await throwToPlayer(player.id);
                    }
                    break;
                case 'end':
                    for (let i = players.length - 1; i >= 0; --i) {
                        if (gam_state !== 'play') {
                            break;
                        }
                        await throwToPlayer(players[i].id);
                    }
                    break;
            }
        }
    } else if (gam_state !== 'play') {
        stop5 = false;
    }
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

let stop6 = false,
    throw_ids = [...moder_arr];

async function eventHallThrow() {
    if (!stop6 && gam_state !== 'play') {
        let img = cco_log.querySelectorAll('.pl-nick-s-div > img');
        if (img.length) {
            let id = +img[img.length - 1].onclick.toString().match(/\d+/i);
            if (!throw_ids.includes(id)) {
                stop6 = true;
                await throwToPlayer(id);
                throw_ids.push(id);
                stop6 = false;
            }
        }
    } else if (gam_state === 'play') {
        throw_ids = [...moder_arr];
    }
}

function throwToPlayer(id) {
    return new Promise(resolve => {
        setTimeout(async() => {
            let can_throw = await profileAccess(id);
            if (!can_throw) {
                resolve(false);
            }
            ers_uid = id;
            setTimeout(() => {
                _DLG('eraser', 3);
                resolve(true);
            }, 2000);
        }, rand(3000, 5000));
    });
}

let started_onl_throw = false;
async function eventOnlineThrow() {
    if (!started_onl_throw) {
        started_onl_throw = true;
        let onl_ids = await getOnlineIds();
        if (onl_ids.length) {
            for (let id of onl_ids) {
                let access = await profileAccess(id);
                if (access) {
                    await throwToOnlinePlayer(id);
                }
                if (id === onl_ids[onl_ids.length - 1]) {
                    online_throw.checked = false;
                    started_onl_throw = false;
                }
                if (!online_throw.checked) {
                    started_onl_throw = false;
                    break;
                }
            }
        }
    }
}
async function getOnlineIds() {
    let res = await fetch('https://asata.top/bestmafia/playerIds'),
        { ids } = await res.json(),
        cnt = 0,
        online_ids = [];
    if (ids.length) {
        for (let i = 0; i < Math.ceil(ids.length / 50); ++i) {
            let { arr } = await httpRequest({
                method: 'scrl_req',
                ids: ids.slice(cnt, cnt + 50).map(e => `uol_${e}`)
            });
            if (arr) {
                for (let key in arr) {
                    let value = arr[key],
                        id = +key.substr(4);
                    if (value.length >= 3) {
                        online_ids.push(id);
                    }
                }
                cnt += 50;
            }
        }
    }
    return online_ids;
}

function throwToOnlinePlayer(id) {
    return new Promise(resolve => {
        let interval;
        interval = setInterval(async() => {
            if (!online_throw.checked) {
                started_onl_throw = false;
                return clearInterval(interval);
            }
            let big_throw = await checkBigThrow(id);
            if (big_throw) {
                clearInterval(interval);
                resolve(true);
            } else if (!big_throw) {
                let throw_eraser = await httpRequest({ method: 'eraser', id: id });
                if (typeof throw_eraser.ret !== 'undefined' && throw_eraser.ret[0] === 15) {
                    clearInterval(interval);
                    resolve(true);
                }
            }
        }, (+onl_throw_interval.value * 1000) || 1500);
    });
}

let started_fav_throw = false;
async function eventFavouriteThrow() {
    let fav_ids = await getFavouriteIds();
    if (!started_fav_throw && fav_ids.length) {
        started_fav_throw = true;
        for (let id of fav_ids) {
            let access = await profileAccess(id);
            if (access) {
                await throwToFavourite(id);
            }
            if (id === fav_ids[fav_ids.length - 1]) {
                favourite_throw.checked = false;
            }
            if (!favourite_throw.checked) {
                started_fav_throw = false;
                break;
            }
        }
    }
}
async function getFavouriteIds() {
    let list = ufv_list.children,
        ids = [];
    for (let i = 0; i < list.length; ++i) {
        let id = +list[i].id.substr(4);
        if (id) {
            ids.push(id);
        }
    }
    return ids;
}
async function throwToFavourite(id) {
    let interval;
    interval = setInterval(async() => {
        if (!favourite_throw.checked) {
            started_fav_throw = false;
            clearInterval(interval);
            return false;
        }
        let big_throw = await checkBigThrow(id);
        if (big_throw) {
            clearInterval(interval);
            return true;
        } else if (!big_throw) {
            let { ret } = await httpRequest({ method: 'eraser', id: id });
            if (ret && ret[0] === 15) {
                clearInterval(interval);
                return true;
            }
        }
    }, (+fav_throw_interval.value * 1000) || 1500);
}
async function checkBigThrow(id) {
    let list = $('#cco_log').children('.giftRecieved');
    for (let i = 0; i < list.length; ++i) {
        let img = $(list).eq(i).children('.td.gift').children('img').attr('src').split('/')[5];
        if (img === 'c1.png') {
            let th_id = +$(list).eq(i).find('.photo').attr('onclick').match(/\d+/g);
            if (th_id === id) {
                return true;
            }
        }
    }
    return false;
}
let reply_ids = [];

function eventReply() {
    let log = cco_log.querySelectorAll('.giftRecieved.table');
    if (log.length && gam_state !== 'init') {
        for (let i = 0; i < log.length; ++i) {
            let td = log[i].querySelectorAll('.td > a'),
                to_nick = td[0].textContent;
            if (to_nick == my_nick) {
                let id = +td[2].onclick.toString().match(/\d+/i);
                if (!reply_ids.includes(id)) {
                    reply_ids.push(id);
                    ers_uid = id;
                    _DLG('eraser', 3);
                }
            }
        }
    }
    if (gam_state === 'init' || pla_data.dead || pla_data.win) {
        reply_ids.length = 0;
    }
}

let stop14 = false,
    default_talk_messages = ['.', ':]', ':)', ':{', ':|', '8}', 'x)'];

function notToBeSilent() {
    if (!stop14) {
        stop14 = true;
        let interval;
        interval = setInterval(() => {
            if (!talker.checked) {
                stop14 = false;
                return clearInterval(interval);
            }
            let { win, dead, freeze } = pla_data;
            if (gam_state === 'play' && !win && !dead && !freeze) {
                let messages = (talk_messages.value.trim() ? talk_messages.value.trim().split(',') : default_talk_messages),
                    rand_message = messages[~~(Math.random() * messages.length)];
                _CHT_action('', 'smile', rand_message, event);
                _CHT_action('ich', 'send', 'close', event);
            }
        }, 60000);
    }
}

async function provSearcher() {
    provHelper();
    if (!vote_stop && gam_data.v_mode && evil_arr.size && rivalCount() && !pla_data.freeze) {
        let player_list = await playerList();
        if (player_list) {
            let ids = player_list.filter(e => {
                let cond = (team_arr.has(e.id) && (rivalCount() - teamCount() > 3));
                return evil_arr.has(e.nick) && (cond || !team_arr.size || !team_arr.has(e.id));
            });
            Vote(ids, rand(3000, 6000));
        }
    } else if (!gam_data.v_mode) {
        help_stop = false;
    }
}

async function profileAccess(id) {
    let { arr } = await httpRequest({
        method: 'prf',
        id: id
    });
    if (arr) {
        return true;
    }
    return false;
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

async function buyExtra(extra_id, clan_extra = false) {
    let { money } = accountBalance();
    if (!haveExtra(extra_id) && money > __store[extra_id].price) {
        if (clan_extra) {
            _WND_proc('clans', 'act', { act: 'xbuy_own', id: extra_id }, event);
        } else {
            _WND_proc('extras', 'buy', { id: extra_id }, event);

        }
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


async function useExtra(extra_id, player_id) {
    if (gam_state === 'play') {
        let gtx = document.querySelector(`#gxt_${extra_id}`),
            enabled = gtx && !gtx.classList.contains('disabled');
        if (enabled) {
            _GM_action('', 'ext_use', (player_id ? [extra_id, player_id] : extra_id), event);
        }
    }
}

function eventCleanDisplay() {
    let eraser = document.querySelector('.containerEraser');
    if (eraser) {
        $('.containerEraser').remove();
    }
}

async function eventTaro() {
    if (gam_state === 'play' && pla_data.person === 23) { // 23 - Костюмер
        let taro = document.querySelector('#gxt_156'),
            limit = extras_limit ? 2 : 3;
        if (taro && pla_data.e156 != limit) {
            let player_list = await playerList(),
                found = false;
            if (player_list) {
                player_list.some(e => {
                    if (mafias.includes(e.role)) {
                        for (let i = 0; i < limit; ++i) {
                            useExtra(156, e.id);
                        }
                        return true;
                    } else {
                        maf_arr.forEach(nick => {
                            if (e.nick == nick && !found) {
                                for (let i = 0; i < limit; ++i) {
                                    useExtra(156, e.id);
                                }
                                found = true;
                            }
                        });
                        if (found) {
                            return true;
                        }
                    }
                });
            }
        }
    }
}

function eventAk47() {
    if (gam_state === 'play' && pla_data.person === 23 && checkMafiaLives()) {
        let ak47 = document.querySelector('#gxt_159'),
            limit = extras_limit ? 2 : 3;
        if (ak47 && pla_data.e159 != limit) {
            useExtra(159);
        }
    }
}

function checkMafiaLives() {
    let mafia_team_ids = [2, 9, 25, 26],
        { v_left } = gam_data;
    for (let i in v_left) {
        if (v_left[i] && mafia_team_ids.includes(+i)) {
            return true;
        }
    }
    return false;
}

let stop7 = 0;

function eventDice() {
    if (!stop7) {
        stop7 = 1;
        let interval;
        interval = setInterval(async() => {
            if (!event_dice.checked) {
                stop7 = 0;
                return clearInterval(interval);
            }
            if (gam_state == 'play' && checkExtra(291)) {
                let extra = cco_log.querySelectorAll('.extra'),
                    last_extra = extra[extra.length - 1],
                    u_nick = last_extra.querySelector('.text > .nick').textContent;
                let player_list = await playerList();
                if (player_list) {
                    player_list.some(e => {
                        let { nick, id } = e;
                        if (nick == u_nick) {
                            _GM_action('', 'dice', 'call', id);
                            return true;
                        }
                    });
                }
            }
        }, rand(1000, 3000));
    }
}

function rejectExtras() {
    if (gam_state === 'play') {
        let dynamit = document.querySelector('#pp_dynamit');
        if (checkExtra(189) || checkExtra(196) || checkExtra(280)) {
            _GM_action('', 'powder_b');
        } else if (checkExtra(253) || checkExtra(8)) {
            _GM_action('', 'ship_cannon');
        } else if (dynamit) {
            _GM_action('', 'dynamit', 'action');
        }
    }
}

function checkExtra(extra_id) {
    let img = cco_log.querySelectorAll('.extra > .img');
    if (img.length) {
        let last = img[img.length - 1],
            button = last.nextSibling.querySelector('button'),
            img_id = +last.querySelector('img').src.match(/\d+/i);
        if (extra_id == img_id && button && !button.noted) {
            button.noted = true;
            return true;
        }
    }
    return false;
}

async function voteUnderMe() {
    if (!vote_stop && gam_data.v_mode && rivalCount() && !pla_data.act) {
        let player_list = await playerList();
        if (player_list) {
            player_list.some((e, i) => {
                if (e.id === my_id) {
                    ++i;
                    let index = (player_list.length > i ? i : 0),
                        player = player_list[index];
                    Vote(player.id, 0);
                    return true;
                }
            });
        }
    }
}

let stop8 = false;

function makeSuicide() {
    if (gam_state === 'play') {
        let warn = document.getElementById('warn_default');
        if (!warn) {
            if (!stop8) {
                _DLG('exit', 2, event);
                check8 = true;
            }
        } else {
            stop8 = true;
        }
    } else {
        if (suicide_limit) {
            setTimeout(() => stop8 = false, 600000);
        } else {
            stop8 = false;
        }
    }
}

let stop9 = false,
    prov_count = 0;

function chatHelper() {
    if (gam_data.v_mode) {
        let prov = cco_log.querySelectorAll('.proverka');
        if (!stop9 && prov.length) {
            for (let i = 0; i < prov.length; ++i) {
                let proverka = prov[i];
                if (!proverka.noted) {
                    let text = proverka.textContent.split('за ')[1],
                        nick = proverka.querySelector('.bb > em > .nick').textContent;
                    if (nick != my_nick) {
                        switch (text) {
                            case 'мафию':
                                maf_arr.add(nick);
                                evil_arr.add(nick);
                                break;
                            case 'маньяка':
                            case 'убийцу':
                            case 'Потрошителя':
                            case 'Валентина':
                            case 'Чёрную Бороду':
                                man_arr.add(nick);
                                evil_arr.add(nick);
                                break;
                            default:
                                mir_arr.add(nick);
                        }
                    }
                    proverka.noted = true;
                }
            }
        }
    } else {
        stop9 = false;
    }
}

let verify_count = 0,
    possible_extras = [
        'паяльником дали результат: ',
        'рты таро раскрыли вам роль: ',
        'раскрыл роль случайного игрока: ',
        'лжи дал результаты: ',
        '«Утюгом Тони» дало результат: ',
        'годние Таро раскрыли роль: ',
        'правды раскрыл роль: ',
        'бустер» раскрыл вам роль игрока: ',
        'от Бандитос раскрыли роль: ',
        'усиление «Таро бустер» раскрыл вам роль игрока: ',
        'от Лили раскрыли роль: ',
        'схальные Таро раскрыли роль: ',
        'рнавальные Таро раскрыли роль: ',
        'рты судьбы раскрыли роль: '
    ];

function provHelper() {
    if (gam_state == 'play' && rivalCount()) {
        let p = cco_log.querySelectorAll('p');
        if (verify_count < p.length) {
            let text = p[verify_count].textContent;
            for (let extra of possible_extras) {
                let find = text.search(extra);
                if (~find) {
                    let piece = text.substr(find + extra.length);
                    for (let evil of evils) {
                        let finded = piece.search(evil);
                        if (~finded) {
                            let nick = piece.substr(0, finded - 3),
                                //(finded - 3) - убираем тире ' - Мафиози'
                                role = piece.substr(finded, evil.length);
                            if (nick != my_nick && rolesCount(role)) {
                                if (mafias.includes(role)) {
                                    maf_arr.add(nick);
                                    evil_arr.add(nick);
                                } else if (citizens.includes(role)) {
                                    mir_arr.add(nick);
                                } else if (maniacs.includes(role)) {
                                    man_arr.add(nick);
                                    evil_arr.add(nick);
                                }
                            }
                        }
                    }
                }
            }
            ++verify_count;
        }
    } else if (gam_state != 'play') {
        verify_count = 0;
    }
}

let prov_arr = new Set,
    stop10 = false,
    com_send_rand = rand(31, 40);

async function sendComissarSearch() {
    if (!stop10 && gam_data.v_mode && myRole() == 'Комиссар' && timer() < com_send_rand) {
        let imp_msg = cco_log.querySelectorAll('.important-msg');
        if (imp_msg.length) {
            let search_text = imp_msg[imp_msg.length - 1].textContent,
                include = search_text.includes('Вы теперь знаете');
            if (include) {
                let nick = imp_msg[imp_msg.length - 1].querySelector('.nick').textContent,
                    role = search_text.split(' - ')[1];
                if (!prov_arr.has(nick) && citizens.includes(role) && rolesCount(role)) {
                    let player_list = await playerList();
                    if (player_list) {
                        player_list.some(async e => {
                            if (nick === e.nick) {
                                let { rpx } = await httpRequest({
                                    method: 'cht_send',
                                    val: search_text,
                                    sd: 1,
                                    opt: { pv: e.id }
                                });
                                if (rpx) {
                                    RPX_data_arr.push(rpx);
                                    prov_arr.add(nick);
                                }
                                return true;
                            }
                        });
                    }
                }
            }
        }
        stop10 = true;
    } else if (!gam_data.v_mode) {
        stop10 = false;
    }
    if (gam_state !== 'play') {
        prov_arr.clear();
    }
}


function rolesCount(role) {
    let leave = gam_data.v_left;
    if (+role) {
        return +leave[role] || 0;
    } else {
        for (let name in leave) {
            if (role === t_persons[name] && leave[name]) {
                return leave[name];
            }
        }
    }
    return 0;
}

function totalRoles() {
    let { v_left } = gam_data;
    return Object.keys(v_left).reduce((sum, arg) => sum + +(v_left[arg]), 0);
}

function timer() {
    return gam_data.v_mode ? 45 - gam_data.v_time : 30 - gam_data.v_time;
}

async function randId() {
    let player_list = await playerList();
    if (player_list) {
        let ids = player_list.filter(e => e.id !== my_id),
            { id } = ids[~~(Math.random() * ids.length)];
        return id;
    }
    return 0;
}


function rand(min, max) {
    return ~~(Math.random() * (max - min)) + min;
}

let extras_limit = true,
    suicide_limit = true,
    silence_talent = false;

async function checkTalents() {
    if (my_tals[26]) {
        extras_limit = false;
    }
    let { ret } = await httpRequest({ method: 'talents' });
    if (ret) {
        if (ret[2][52]) {
            suicide_limit = false;
        }
        if (ret[2][17]) {
            silence_talent = true;
        }
    }
}
checkTalents();

async function playerList() {
    if (gam_state === 'play') {
        let list = upl_list.querySelectorAll('.dead.not-displayed'),
            arr = [];
        for (let i = 0; i < list.length; ++i) {
            let parent = list[i].parentNode,
                name = parent.parentNode.querySelector('.name'),
                speak = parent.querySelector('.noSpeak');

            let info = {
                id: +parent.parentNode.id.substr(4),
                nick: name.querySelector('.nick').textContent,
                team_act: (+parent.parentNode.querySelector('.count').textContent || 0),
                role: parent.title,

                vote: name.querySelector('.hint').textContent.substr(8),
                upd: name,

                need_alarm: !speak.classList.contains('not-displayed')
            };
            arr.push(info);
        }
        return arr;
    }
    return false;
}

function haveExtra(id) {
    return document.querySelector(`#gxt_${id}`) != null;
}

function clearArrays() {
    if (gam_state !== 'play') {
        let arrays = [maf_arr, man_arr, evil_arr, mir_arr, team_arr, slice_ids];
        arrays.forEach(array => {
            if (array.size) {
                array.clear();
            }
        });
    }
}

function Move(id, with_verify = false) {
    if (typeof id === 'object' && id.length) {
        let rand_id = id[~~(Math.random() * id.length)].id;
        if (with_verify) {
            slice_ids.add(rand_id);
            id = rand_id;
            if (timer() < 17) {
                id = rand_id;
            }
        } else {
            id = rand_id;
        }
    }
    let list = upl_list.querySelector(`#upl_${id} .dead.not-displayed`);
    if (list && typeof id !== 'object') {
        let parent = list.parentNode.parentNode,
            not_reanim = parent.querySelector('.actionButton > button').className != 'reanim';
        if (not_reanim) {
            _GM_action('', 'vote', 2, [id, 0, event]);
        }
    }
}
let vote_stop = false,
    stop11 = false;

function Vote(id, interval) {
    if (!vote_stop && !pla_data.act) {
        vote_stop = true;
        setTimeout(() => {
            if (typeof id === 'object' && id.length) {
                id = id[~~(Math.random() * id.length)].id;
            }
            let list = upl_list.querySelector(`#upl_${id} .dead.not-displayed`);
            if (gam_data.v_mode && list) {
                let parent = list.parentNode.parentNode,
                    vote = parent.querySelector('.actionButton > button').className,
                    false_btns = ['x2vote', 'reanim', 'zgchk'];
                if (!false_btns.includes(vote)) {
                    _GM_action('', 'vote', 2, [id, 0, event]);
                    let interval;
                    clearInterval(interval);
                    interval = setInterval(() => {
                        let { kvt } = pla_data;
                        if (kvt && kvt != my_id && !help_stop && !stop11 && (timer() + rand(3, 7) <= 0)) {
                            if (kvt == id) {
                                _GM_action('', 'vote', 2, [kvt, 0]);
                                stop11 = true;
                            } else {
                                let sentence_nick = $('#pp_vte').find('.nick').text();
                                if (evil_arr.has(sentence_nick)) {
                                    _GM_action('', 'vote', 2, [kvt, 0]);
                                    stop11 = true;
                                }
                            }
                        } else if (!gam_data.v_mode) {
                            clearInterval(interval);
                            vote_stop = false;
                            stop11 = false;
                        }
                    }, 2000);
                } else {
                    vote_stop = false;
                }
            } else {
                vote_stop = false;
            }
        }, interval);
    }
}

async function roomList() {
    let arr = [],
        list = gml_list.children;
    for (let i = 0; i < list.length; ++i) {
        if (!list[i].className) {
            let room_id = +list[i].id.substr(4);
            if (!bad_rooms.has(room_id)) {
                let name = list[i].querySelector('.name > span');
                let info = {
                    room_liga: list[i].children[1].title,
                    room_size: +list[i].children[2].textContent.split('/')[1],
                    room_bet: +list[i].children[3].textContent,
                    room_id: room_id
                };
                if (name) {
                    info.creator_nick = name.textContent;
                }
                arr.push(info);
            }
        }
    }
    return (arr.length ? arr : false);
}

function myRole() {
    let { person } = pla_data;
    if (person) {
        return t_persons[person];
    }
}

let pm_count = 0;

function vkNotification() {
    let log = cpv_log.querySelectorAll('.message-to-me');
    if (log.length > pm_count) {
        let from_id = +log[pm_count].querySelector('a').onclick.toString().match(/\d+/g);
        if (from_id && moder_arr.includes(from_id)) {
            let message = log[pm_count].textContent;
            sendMessageToVk(message);
        }
        ++pm_count;
    }
}

function sendMessageToVk(message, test = false) {
    let id = peer_id.value.trim();
    if (id) {
        socket.emit('vk_message', {
            peer_id: id,
            message: message
        });
    }
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
        15: 'Добрый Зайка',
        27: 'Вредный Зайка',
        28: 'Нефритовый Зайка',
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
        { person } = pla_data,
        rival = {},
        { v_left } = gam_data;
    for (let i in roles) {
        if (roles[i][person]) {
            Object.assign(rival, roles[i]);
        }
    }
    for (let i in rival) {
        if (v_left[i]) {
            count += +v_left[i];
        }
    }
    return count;
}

function rivalCount() {
    let count = 0,
        { person } = pla_data,
        rival = {},
        { v_left } = gam_data;
    for (let i in roles) {
        if (!roles[i][person]) {
            Object.assign(rival, roles[i]);
        }
    }
    for (let i in rival) {
        if (v_left[i]) {
            count += +v_left[i];
        }
    }
    return count;
}

function withoutTitle() {
    let count = 0,
        list = upl_list.querySelectorAll('.dead.not-displayed');
    for (let i = 0; i < list.length; ++i) {
        let { title } = list[i].parentNode;
        if (!title) {
            ++count;
        }
    }
    return count;
}

var elem = document.createElement('script');
elem.src = 'https://asata.top/socket.io/socket.io.js';
document.body.appendChild(elem);
let socket,
    info_appended = false;

function socketConnection() {
    try {
        socket = io('https://asata-project.herokuapp.com/bestmafia');
        // socket = io('http://localhost:8080/bestmafia');
        socket.on('vk_message', data => {
            if (data.error) {
                alert(data.error);
            } else if (data.test) {
                entry.checked = false;
            }
        });
        socket.on('auth', data => {
            if (typeof data.error !== 'undefined') {
                return alert(data.error);
            }
            if (!info_appended) {
                bought.textContent += data.bought;
                duration.textContent += data.duration;
                info_appended = true;
            }
        });
        socket.on('tail', data => {
            switch (data.action) {
                case 'start':
                    if (typeof data.arr !== 'undefined') {
                        _GM_action('', 'do', 'create', data.arr);
                    } else {
                        alert(data.error);
                        entry.checked = false;
                        socket.emit('tail', { action: 'stop' });
                    }
                    tail_sent = false;
                    break;
                case 'stop':
                    tail_sent = false;
                    break;
            }
        });
        socket.on('connect', () => socketAuthorization());
    } catch (e) {
        console.info('Ошибка при подключении сокета', e);
    }
}
elem.onload = () => socketConnection()

function socketAuthorization() {
    socket.emit('auth', {
        my_id: my_id,
        hash: hash
    });
}
let tail_change_timeout;

function tailEntranceInput() {
    clearTimeout(tail_change_timeout);
    tail_change_timeout = setTimeout(tailStart, 1000);
}

function tailStart() {
    let nicks = a_nicks.value;
    if (!gam_id && e_type.value === 'tail' && entry.checked && nicks) {
        socket.emit('tail', {
            action: 'start',
            nicks: nicks
        });
        tail_sent = true;
    }
}

let stop13 = false;

function arenaShoots() {
    if (!stop13) {
        stop13 = true;
        let interval;
        interval = setInterval(() => {
            if (!arena.checked) {
                stop13 = false;
                return clearInterval(interval);
            }
            let shoots = document.querySelector('#pp_a_shootout');
            if (gam_state === 'play' && !pla_data.dead && shoots) {
                _GM_action('', 'a_shootout', 'action');
            }
        }, 2000);
    }
}

function showProfileId(target) {
    if (!target.checked) {
        return rootContainer.onclick = null;
    }
    rootContainer.onclick = () => {
        let prof = document.querySelectorAll('.profilePopup');
        if (prof.length) {
            for (let i = 0; i < prof.length; ++i) {
                let prof_id = +prof[i].id.substr(4);
                if (!prof[i].noted) {
                    prof[i].noted = true;
                    let name = prof[i].querySelector('.user-name'),
                        html = `
                <span class="clan-link" style="color:#00ffff">
                    ID игрока: 
                    <span id="copy_${prof_id}" onclick="copyData('copy_${prof_id}');" title="Скопировать" style="text-decoration:underline;cursor:pointer;">
                        ${prof_id}
                    </span>
                </span>`;
                    if (name) {
                        name.insertAdjacentHTML('beforeEnd', html);
                    } else {
                        prof[i].querySelector('.profile-page').children[0].insertAdjacentHTML('beforeEnd', html);
                    }
                }
            }
        }
    }
}

function copyData(div) {
    let str = document.getElementById(div).innerText,
        el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    _OHINT('ID успешно скопирован!');
}
/* 
case 54: //детек
case 60: //рев
case 65: //испа
case 66: //таро
case 71: //ак
case 72: //таро для мафа
case 73: //таро для манаа
case 74: //свинец для мафа
case 75: //клановые экстры
case 76: //обычные экстры 


case 6://игры на 8
case 7://игры на 12
case 8://игры на 16
case 9://игры на 20
case 10://рейтинг
case 11://опыт

case 12://выиграть за Гражданина
case 13://выиграть за Комиссара
case 14://выиграть за Доктора
case 15://выиграть за Вора
case 16://выиграть за Свида
case 17://выиграть за Мафа
case 18://выиграть за Босса
case 19://выиграть за Двула
case 20://выиграть за Мана

case 42: //аук - ком
case 43: //аук - док
case 44: //аук - вор/стерва
case 45: //аук - свид
case 46: //аук - босс
case 47: //аук - двул
case 48: //аук - ман
case 49: //аук - любой
case 50: //аук - любой за 20 монет
*/
let last_quests = {},
    got_quests = false,
    simple_extras_in_mode_sort = [55, 61, 67],
    simple_extras_out_mode_sort = [52, 68, 70],
    extras_any_mode_sort = [54, 60, 65, 66, 71, 72, 73, 74, 75, 76],
    game_wins_sort = [6, 7, 8, 9, 10, 11],
    game_role_wins_sort = [12, 13, 14, 15, 16, 17, 18, 19, 20],
    auction_roles_sort = [42, 43, 44, 45, 46, 47, 48, 49, 50],
    presents_sort = [79, 81];
async function startDuelQuests() {
    if (!got_quests) {
        let get_quests = await getDuelQuests();
        if (!get_quests) {
            start_duel_quests.checked = false;
            console.info('Дуэли еще нет');
        } else {
            got_quests = true;
        }
    } else {
        for (let quest in last_quests) {
            quest = +quest;
            if (!await getTaskRemainingCount(quest)) {
                if (!gam_id) {
                    // distributeQuestTasks();
                    await takeQuestAward(last_quests[quest].slot);
                    delete last_quests[quest];
                    got_quests = false;
                    auctionForQuests(quest, true);
                    return;
                }
                continue;
            }

            if (!gam_id && game_role_wins_sort.includes(quest)) {
                auctionForQuests(quest);
            }

            if (gam_state === 'play') {
                if (gam_data.v_mode && simple_extras_in_mode_sort.includes(quest)) {
                    useExtraForQuests(quest);
                } else if (!gam_data.v_mode && simple_extras_out_mode_sort.includes(quest)) {
                    useExtraForQuests(quest);
                }

                if (extras_any_mode_sort.includes(quest)) {
                    useExtraForQuests(quest);
                } else if (game_wins_sort.includes(quest)) {
                    playGamesForQuests(quest);
                }

                if (pla_data.dead && quest === 62) { //киллер
                    can_exit = false;
                    useExtraForQuests(quest);
                }
            }

            if (gam_state === 'init' && auction_roles_sort.includes(quest)) {
                auctionForQuests(quest);
            }

            if (presents_sort.includes(quest)) { //подарки
                giftPresentsForQuests(quest);
            }
        }
    }
}

function playGamesForQuests(quest_id) {
    switch (quest_id) {
        case 6: //игры на 8
            checkForRoomEnter(quest_id, 8);
            break;
        case 7: //игры на 12
            checkForRoomEnter(quest_id, 12);
            break;
        case 8: //игры на 16
            checkForRoomEnter(quest_id, 16);
            break;
        case 9: //игры на 20
            checkForRoomEnter(quest_id, 20);
            break;
        case 10: //рейтинг
            checkForRoomEnter(quest_id, 8);
            break;
        case 11: //опыт
            checkForRoomEnter(quest_id, 8);
            break;
    }
}

function checkForRoomEnter(quest_id, room_size) {
    /* if (create_quest_room.checked) {

    } */
}

function auctionForQuests(quest_id, clear = false) {
    switch (quest_id) {
        case 42: //аук - ком
        case 13:
            updateAuctionInputValue('Комиссар', clear);
            break;
        case 43: //аук - док
        case 14:
            updateAuctionInputValue('Доктор', clear);
            break;
        case 44: //аук - вор/стерва
        case 15:
            updateAuctionInputValue(my_gender === 'm' ? 'Вор' : 'Стерва', clear);
            break;
        case 45: //аук - свид
        case 16:
            updateAuctionInputValue('Свидетель', clear);
            break;
        case 46: //аук - босс
        case 18:
            updateAuctionInputValue('Босс мафии', clear);
            break;
        case 47: //аук - двул
        case 19:
            updateAuctionInputValue('Двуликий', clear);
            break;
        case 48: //аук - ман
        case 20:
            updateAuctionInputValue('Маньяк', clear);
            break;
        case 49: //аук - любой
            updateAuctionInputValue('*', clear);
            break;
        case 50: //аук - любой за 20 монет
            updateAuctionInputValue('*', clear);
            break;
    }
}
async function takeQuestAward(slot) {
    let { ret } = await httpRequest({ method: 'duel_takeaw', slot: slot });
    if (ret) {
        last_quests[ret[0]].count = __evq[ret[0]].limit[slot - 1];
        last_quests[ret[0]].slot = slot;
        return true;
    }
    return false;
}
let task_changes_count = 0;

async function getTaskChangesCount() {
    let { arr } = await httpRequest({ method: 'duels' });
    if (arr) {
        task_changes_count = +arr[8][2];
    }
}
async function getTaskRemainingCount(quest_id) {
    let { arr } = await httpRequest({ method: 'duels' });
    if (arr) {
        let count = 0;
        arr[8][0].forEach((e, i) => {
            if (+e === quest_id) {
                count = (__dqs[e].limits[i] - +arr[8][1][i]);
            }
        });
        return count;
    }
}
async function changeQuest(quest_id, slot) {
    let quest_task = document.querySelector(`#task${quest_id}`),
        can_change = false;
    switch (+quest_task.value) {
        case 2:
            if (task_changes_count < 3) {
                can_change = true;
            }
            break;
        case 3:
            let { money } = accountBalance();
            if ((task_changes_count < 3) || (task_changes_count < 13 && money > 100)) { //сделать поле ввода
                can_change = true;
            }
            break;
        case 4:
            let { ruby } = accountBalance();
            let money_cond = (task_changes_count < 13 && money > (money_limit.checked ? +leave_money.value : 100)),
                ruby_cond = (ruby > (ruby_limit.checked ? +leave_ruby.value : 0));
            if (task_changes_count < 3 || money_cond || ruby_cond) { //сделать поле ввода
                can_change = true;
            }
            break;
    }
    if (can_change) {
        let { ret } = await httpRequest({ method: 'duel_chg_task', slot: slot });
        if (ret) {
            last_quests[ret].count = __evq[ret].limit[slot - 1];
            last_quests[ret].slot = slot;
            ++task_changes_count;
            return true;
        }
    } else {
        quest_task.value = 1;
        return false;
    }
}
let last_auc_value = '';

function updateAuctionInputValue(role, clear = false) {
    let auc_roles = aukrole_m.value.trim();
    if (clear && auc_roles.includes(role)) {
        let auc_value = auc_roles.replace(`,${role}`, '').replace(`, ${role}`).replace(` ,${role}`).replace(role, '');
        if (role === '*') {
            auc_value = last_auc_value;
        }
        aukrole_m.value = auc_value;
        if (use_early_auc.checked) {
            early_auction.value = auc_value;
        }
        if (money_auk.checked) {
            money_auk.checked = false;
        }
        if (early_auk.checked) {
            early_auk.checked = false;
        }
    } else if (!auc_roles.includes(role)) {
        if (role === '*') {
            last_auc_value = aukrole_m.value;
            aukrole_m.value = role;
            if (use_early_auc.checked) {
                early_auction.value = role;
            }
        } else {
            aukrole_m.value += (auc_roles ? `, ${role}` : role);
            if (use_early_auc.checked) {
                early_auction.value += (auc_roles ? `, ${role}` : role);
            }
        }
        if (!money_auk.checked) {
            money_auk.checked = true;
        }
        if (use_early_auc.checked && (!early_auk.checked || +ear_auk_method.value !== 1)) {
            ear_auk_method.value = 1;
            early_auk.checked = true;
        }
    }
}

async function useExtraForQuests(quest_id) {
    let limit3 = (extras_limit ? 2 : 3);
    switch (quest_id) {
        case 52: //жучок
            if (!pla_data.el101 && !pla_data.e101) {
                await buyExtra(101);
                await useExtra(101, await randId());
                updateQuestExtras(quest_id, 76);
            }
            break;
        case 54: //детек
            if (!pla_data.el104 && pla_data.e104 != limit3) {
                await buyExtra(104);
                await useExtra(104, await randId());
                updateQuestExtras(quest_id, 76);
                //отправить, что установил на игрока детектор
            }
            break;
        case 55: //удвойка
            if (pla_data.el103 != limit3) {
                await buyExtra(103);
                let rand_id = await getRandomIdForQuests();
                if (rand_id) {
                    await useExtra(103, rand_id);
                    updateQuestExtras(quest_id, 76);
                }
            }
            break;
        case 58: //маска
            if (pla_data.el106 != limit3) {
                await buyExtra(106);
            }
            //updateQuestExtras(quest_id, 76);
            //проверить, сорвали ли маску;
            break;
        case 60: //рев
            if (pla_data.el105 != limit3) {
                await buyExtra(105);
                let rand_id = await getRandomIdForQuests();
                if (rand_id) {
                    await useExtra(105, rand_id);
                    updateQuestExtras(quest_id, 76);
                }
            }
            break;
        case 61: //психоз
            if (pla_data.el114 != limit3) {
                await buyExtra(114);
                let rand_id = await getRandomIdForQuests();
                if (rand_id) {
                    await useExtra(114, rand_id);
                    updateQuestExtras(quest_id, 76);
                }
            }
            break;
        case 62: //киллер
            if (pla_data.el115 != limit3) {
                await buyExtra(115);
                let rand_id = await getRandomIdForQuests();
                if (rand_id) {
                    await useExtra(115, rand_id);
                    updateQuestExtras(quest_id, 76);
                    if (!last_quests[62].count) {
                        can_exit = true;
                    }
                } else {
                    can_exit = true;
                }
            } else {
                can_exit = true;
            }
            break;
        case 65: //испа
            if (pla_data.el155 != limit3) {
                await buyExtra(155, true);
                await useExtra(155, await randId());
                updateQuestExtras(quest_id, 75);
            }
            break;
        case 66: //таро
            if (pla_data.el156 != limit3) {
                await buyExtra(156, true);
                await useExtra(156, await randId());
                updateQuestExtras(quest_id, 75);
            }
            break;
        case 67: //бюр
            if (pla_data.el157 != limit3) {
                await buyExtra(157, true);
                let rand_id = await getRandomIdForQuests();
                if (rand_id) {
                    await useExtra(157, rand_id);
                    updateQuestExtras(quest_id, 75);
                }
            }
            break;
        case 70: //снотва
            if (pla_data.el170 != limit3) {
                await buyExtra(170, true);
                await useExtra(170);
                updateQuestExtras(quest_id, 75);
            }
            break;
        case 71: //ак
            if (pla_data.el159 != limit3) {
                await buyExtra(159, true);
                await useExtra(159);
                updateQuestExtras(quest_id, 75);
            }
            break;
        case 72: //таро в мафа
            if (pla_data.el156 != limit3) {
                await buyExtra(156, true);
                let player_list = await playerList();
                if (player_list) {
                    let ids = player_list.filter(e => e.id != my_id && (mafias.includes(e.role) || maf_arr.has(e.nick)));
                    if (ids.length) {
                        let { id } = ids[~~(Math.random() * ids.length)];
                        await useExtra(156, id);
                        updateQuestExtras(quest_id, 75);
                    }
                }
            }
            break;
        case 73: //таро в мана
            if (pla_data.el156 != limit3) {
                await buyExtra(156, true);
                let player_list = await playerList();
                if (player_list) {
                    let ids = player_list.filter(e => e.id != my_id && (e.role === 'Маньяк' || man_arr.has(e.nick)));
                    if (ids.length) {
                        let { id } = ids[~~(Math.random() * ids.length)];
                        await useExtra(156, id);
                        updateQuestExtras(quest_id, 75);
                    }
                }
            }
            break;
        case 74: //свинец для мафа
            if (pla_data.el159 != limit3 && checkMafiaLives()) {
                await buyExtra(159, true);
                await useExtra(159);
                updateQuestExtras(quest_id, 75);
            }
            break;
        case 75: //клановые экстры
            if (gam_data.v_mode) {
                useExtraForQuests(65);
                useExtraForQuests(66);
            } else if (!gam_data.v_mode) {
                useExtraForQuests(70);
            }
            if (!alarms.checked) {
                alarms.checked = true;
            }
            break;
        case 76: //обычные экстры
            if (gam_data.v_mode) {
                useExtraForQuests(54);
                useExtraForQuests(55);
            } else if (!gam_data.v_mode) {
                useExtraForQuests(52);
            }
            if (gam_state === 'init') {
                await buyExtra(102);
                await buyExtra(107);
            }
            break;
    }
}

function giftPresentsForQuests(quest_id) {
    switch (quest_id) {
        case 79: //мега-экстры
            sendGift('mega', quest_id);
            break;
        case 81: //ряды 
            sendGift('row', quest_id);
            break;
    }
}
let discount_gift,
    wedding_id;

function sendGift(type, quest_id) {
    let gift_id = type === 'mega' ? rand(2101, 2115) : discount_gift,
        row = type === 'row';
    _WND_proc('gifts', 'buy', { id: gift_id, uid: wedding_id || 2194163, txt: '', cr: +row, hd: 0 }, event);
}
async function getDiscountGift() {
    let { ret } = await httpRequest({ method: 'gift_dsc', uid: my_id });
    discount_gift = +ret[0];
}
async function getWeddingId() {
    let { arr } = await httpRequest({ method: 'prf', id: my_id });
    wedding_id = (arr[10] ? +arr[10][0] : 0);
}
getDiscountGift();
getWeddingId();

function updateQuestExtras(quest_id, quest_extra) {
    if (last_quests[quest_id] && last_quests[quest_id].count) {
        --last_quests[quest_id].count;
    }
    if (last_quests[quest_extra] && last_quests[quest_extra].count) {
        --last_quests[quest_extra].count;
    }
}
async function getRandomIdForQuests() {
    let player_list = await playerList();
    if (player_list) {
        let ids = player_list.filter(e => {
            let cit_cond = (citizens.includes(myRole()) && !citizens.includes(e.role) && !mir_arr.has(e.id)),
                maf_cond = (mafias.includes(myRole()) && !mafias.includes(e.role) && !maf_arr.has(e.id));
            return e.id !== my_id && (cit_cond || maf_cond || true) && !team_arr.has(e.id);
        });
        if (ids.length) {
            let { id } = ids[~~(Math.random() * ids.length)];
            return id;
        }
    }
    return 0;
}
async function getDuelQuests() {
    let { farr, arr } = await httpRequest({ method: 'duels' });
    if (farr) {
        return false;
    } else if (arr) {
        last_quests = {};
        arr[8][0].forEach(async(e, i) => {
            let change_quest = await changeQuest(e, i + 1);
            if (!change_quest) {
                last_quests[e] = {
                    count: (__dqs[e].limits[i] - +arr[8][1][i]),
                    slot: i + 1
                }
            }
        });
        return true;
    }
}

function accountBalance() {
    let money = +document.querySelector('.moneyBalance').textContent,
        ruby = +document.querySelector('.rubyBalance').textContent;
    return {
        money: money,
        ruby: ruby
    };
}

function appendDuelTasks() {
    let tasks = '',
        row = '',
        appended_rows = 1,
        keys = Object.keys(__dqs);
    keys.forEach((e, i) => {
        let task = __dqs[e];
        row += `<li>
    <div data-task="${task.text.replace('%s', task.limits)}" title="${task.text.replace('%s', task.limits)}">
    ${task.title}
    </div>
    <select id="task${e}" style="width: 112px;margin-left:0px;">
        <option value="1">Выполнять</option>
        <option value="2">Пропускать бесплатно</option>
        <option value="3">Пропускать бесплатно, за монеты</option>
        <option value="4">Пропускать бесплатно, за монеты, за рубины</option>
    </select>
    <div hidden>${task.text}</div>
</li>`;
        ++i;
        if ((appended_rows * 8) === i) {
            tasks += `<ul class="duel-ul" id="row_${appended_rows}">${row}</ul>`;
            ++appended_rows;
            row = '';
        }
    });
    duel_menu_ul.insertAdjacentHTML('beforeEnd', tasks);
    $('#duel_menu').draggable();
}
appendDuelTasks();
var elem = document.createElement('script');
elem.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery-sortable/0.9.13/jquery-sortable-min.js';
document.body.appendChild(elem);

function extrasOrder() {
    let list = gxt_list.children;
    $("#gxt_list").sortable({
        update: () => {
            let arr = [];
            for (let i = 0; i < list.length; ++i) {
                let id = list[i].id;
                if (id) {
                    arr.push(id.substr(4));
                }
            }
            localStorage.setItem('extras_order', arr);
        }
    });
    if (list.length) {
        for (let i = 0; i < list.length; ++i) {
            list[i].classList.add('ui-state-default');
        }
    }
}
setInterval(() => {
    /*-----------IN ROOM-------------*/
    if (night_move.checked) autoMove();
    if (search_vote.checked) chatChecker();
    if (return_vote.checked) returnVote();
    if (b_verifying.checked) provSearcher();
    if (aux_votes.checked) auxiliaryVotes();
    if (team_help.checked) helpToTeam();
    if (send_msg.checked) sendMessage();
    if (alarms.checked) alarmClock();
    if (hide_popups.checked) hidePopups();
    if (send_prov.checked) sendComissarSearch();
    if (room_exit.checked) autoExit();
    if (reject_extras.checked) rejectExtras();
    if (talker.checked) notToBeSilent();
    if (use_bug.checked) {
        setBug();
        set_move.checked = false;
        set_move.disabled = true;
    } else if (!use_bug.checked) {
        let radio = $('.setbug');
        if (radio.length) {
            radio.remove();
        }
        set_move.disabled = bug_appended = false;
    }
    if (set_move.checked) {
        setMove();
        use_bug.checked = false;
        use_bug.disabled = true;
    } else if (!set_move.checked) {
        let radio = $('.setmove');
        if (radio.length) {
            radio.remove();
        }
        use_bug.disabled = move_appended = false;
    }
    /*-----------OUT OF ROOM---------*/
    if (money_auk.checked) moneyAuction();
    if (early_auk.checked) earlyAuction();
    if (!gam_id && clan_tasks.checked) clanTasks();
    let choice = bot_menu.querySelector('input[name=choice]:checked');
    if (entry.checked && choice) {
        let ch_val = +choice.value;
        if (ch_val == 1) autoCreate();
        else if (ch_val == 2) ligaEntry();
        else if (ch_val == 3) autoEntry();
    }
    if (vk_notif.checked) vkNotification();
    /*-------------EVENT-------------*/
    // if (skinchange.checked) Skin();
    // if (clean_display.checked) eventCleanDisplay();
    // if (event_taro.checked) eventTaro();
    // if (event_ak47.checked) eventAk47();
    // if (room_throw.checked) eventRoomThrow();
    // if (hall_throw.checked) eventHallThrow();
    // if (favourite_throw.checked) eventFavouriteThrow();
    // if (online_throw.checked) eventOnlineThrow();
    // if (event_reply.checked) eventReply();
    // if (event_dice.checked) eventDice();
    // if (event_collect.checked) eventCollectAll();
    if (breaks_extras.checked) eventBreaks();
    if (take_ability.checked) eventTakeAbility();
    /*--------------DUEL-------------*/
    if (autoak.checked) useExtra(159);
    if (under_vote.checked) voteUnderMe();
    if (suicide.checked) makeSuicide();
    /*-------------DUEL QUESTS-------------*/
    if (start_duel_quests.checked) startDuelQuests();
    clearArrays();
    refreshRandomIntervals();
}, 1000);

function Drag(target) {
    $('#bot_menu').draggable({
        disabled: !target.checked,
        containment: 'document'
    });
}
let choice_selected = false;
(() => {
    let goal = bot_menu.querySelectorAll('input, select');
    for (let i = 0; i < goal.length; ++i) {
        let { type, checked, id, name, value, nextSibling } = goal[i];
        switch (type) {
            case 'checkbox':
                goal[i].checked = +localStorage[id];
                if (name === 'path') {
                    if (checked) {
                        $(`#${value}`).slideToggle(200);
                        nextSibling.classList.toggle('hidecontent');
                    }
                }
                /* Скрытие секции с ивентом */
                /* if (value === 'event') {
                    setTimeout(() => {
                        const evt = document.querySelector('#event');
                        for (let i = 0; i < evt.children.length; ++i) {
                            evt.children[i].querySelector('input[type=checkbox]').checked = false;
                        }
                        evt.hidden = true;
                        goal[i].parentNode.hidden = true;
                    });
                } */
                /* Скрытие секции с дуэльными квестами */
                if (value === 'duel_quests') {
                    setTimeout(() => {
                        let quests = document.querySelector('#duel_quests');
                        for (let i = 0; i < quests.children.length; ++i) {
                            let checkbox = quests.children[i].querySelector('input[type=checkbox]');
                            if (checkbox) {
                                checkbox.checked = false;
                            }
                        }
                        quests.hidden = true;
                        goal[i].parentNode.hidden = true;
                    });
                }
                goal[i].onchange = e => {
                    let { name, value, nextSibling, id, checked } = e.target;
                    localStorage[id] = +checked;
                    if (name === 'path') {
                        nextSibling.classList.toggle('hidecontent');
                        $(`#${value}`).slideToggle(200);
                    } else {
                        switch (id) {
                            case 'setting':
                                settings_popup.hidden = !settings_popup.hidden;
                                break;
                            case 'arena':
                                if (checked) {
                                    arenaShoots();
                                    Arena();
                                } else {
                                    clearTimeout(arena_timeout);
                                }
                                break;
                            case 'entry':
                                let choice = bot_menu.querySelector('input[name=choice]:checked');
                                if (choice) {
                                    let val = +choice.value;
                                    if (val === 3 && tail_sent && !checked) {
                                        socket.emit('tail', { action: 'stop' });
                                        tail_sent = false;
                                    }
                                }
                                break;
                        }
                    }
                }
                break;
            case 'text':
            case 'number':
                goal[i].onmouseover = () => goal[i].title = value;
                goal[i].value = localStorage[id] || '';
                goal[i].oninput = e => {
                    localStorage[e.target.id] = e.target.value;
                    if (e.target.id === 'a_nicks') {
                        tailEntranceInput();
                    }
                }
                break;
            case 'select-one':
                goal[i].value = localStorage[id] || goal[i][0].value;
                goal[i].onchange = e => {
                    let { id, value } = e.target;
                    localStorage[id] = value;
                    switch (id) {
                        case 'bug_method':
                            bug_nick.hidden = value !== 'on_nick';
                            break;
                        case 'move_method':
                            set_nick.hidden = value !== 'on_nick';
                            break;
                        case 'e_type':
                            if (value === 'tail' && tail_sent) {
                                socket.emit('tail', { action: 'stop' });
                                tail_sent = false;
                            }
                            break;
                    }
                }
                break;
            case 'radio':
                if (name == 'choice') {
                    goal[i].onchange = e => {
                        let cur = document.querySelector('#cur');
                        $(cur).siblings('.current_b').removeClass('current_b');
                        cur.hidden = false;
                        let { parentNode, value } = e.target;
                        e.target.parentNode.classList.add('current_b');
                        let inputs = document.querySelector('.inputs');
                        for (let i = 0; i < inputs.children.length; ++i) {
                            inputs.children[i].hidden = true;
                        }
                        inputs.children[+value - 1].hidden = false;
                        r_size.hidden = +value > 2;
                        e_type.hidden = +value !== 3;
                        cur.style.marginLeft = `${(+value - 1) * 76}px`;
                        (+value == 1 ? l_num : +value == 2 ? l_text : a_nicks).hidden = false;
                        entry.hidden = false;
                        if (+value !== 3 && tail_sent) {
                            socket.emit('tail', { action: 'stop' });
                            tail_sent = false;
                        } else if (+value === 3 && +e_type.value === 'tail' && !tail_sent) {
                            tailStart();
                        }
                        localStorage.choice = value;
                    }
                    if (auto_start.checked && localStorage.choice && !choice_selected) {
                        choice_selected = true;
                        setTimeout(() => document.querySelectorAll('input[name=choice]')[localStorage.choice - 1].parentNode.click());
                    }
                }
                break;
        }
    }
    let tasks = duel_menu.querySelectorAll('select');
    for (let i = 0; i < tasks.length; ++i) {
        tasks[i].value = localStorage[tasks[i].id] || tasks[i][0].value;
        tasks[i].onchange = e => localStorage[e.target.id] = e.target.value;
    }
    Drag(drag_menu);
    showProfileId(show_id);
    if (+move_method.value == 1) set_nick.hidden = false;
    if (+bug_method.value == 3) player_nick.hidden = false;
    if (setting.checked) settings_popup.hidden = false;
    if (arena.checked) {
        arenaShoots();
        Arena();
    }

    myExtras.insertAdjacentHTML('beforeEnd', `
    <button class="button size1 myProfile" onclick="_Duels();">Дуэль</button>
    <button class="button size1 myProfile" onclick="_WND_proc('clans');">Клан</button>
    <button class="button size1 myProfile" onclick="_WND_proc('top');">Топ</button>
    <button class="button size1 myProfile" onclick="_PRF();">Профиль</button>
    <button class="button size1 myProfile" onclick="_EventScene();">Арена</button>
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