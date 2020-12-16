var hash = PAGE_goto.toString().split('/')[2];

let stop_send = false,
    mod_adm_ids = [];

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
        })
    })
}
function onlineIds() {
    return new Promise(async resolve => {
        let res = await fetch('https://asata.top/bestmafia/playerIds'),
            { ids } = await res.json(),
            cnt = 0,
            online_ids = [];
        if (ids.length) {
            for (let i = 0; i < Math.ceil(ids.length / 50); ++i) {
                if (stop_send) {
                    break;
                }
                let res = await httpRequest({
                    method: 'scrl_req',
                    ids: ids.slice(cnt, cnt + 50).map(e => `uol_${e}`)
                });
                if (res?.arr) {
                    for (let key in res.arr) {
                        let value = res.arr[key],
                            id = +key.substr(4);
                        if (value.length >= 3) {
                            online_ids.push(id);
                            if (value[3][2] || id === 27993) {
                                mod_adm_ids.push(id);
                            }
                        }
                    }
                    cnt += 50;
                }
            }
        }
        resolve(online_ids);
    });
}
async function startSendMessages() {
    if (!message_text.value.trim()) {
        return alert('Введите сообщение!', message_text.focus());
    }
    stop_send = false;
    stop_btn.disabled = false;
    start_btn.disabled = true;
    let ids = await onlineIds();
    if (ids.length) {
        pl_found.textContent = `Найден${ids.length === 1 ? '' : 'о'} ${ids.length} игрок${declOfNum(ids.length, ['', 'а', 'ов'])} онлайн`;
        pl_left.textContent = `Осталось проверить ${ids.length} игрок${declOfNum(ids.length, ['а', 'ов', 'ов'])}`;
        inform.hidden = false;
        let cnt = ids.length;
        for (let id of ids) {
            if (stop_send) {
                stop_send = false;
                stop_btn.disabled = true;
                start_btn.disabled = false;
                break;
            }
            if (!mod_admin_bypass.checked || !mod_adm_ids.includes(id)) {
                let allow_send = await checkProfile(id);
                if (allow_send) {
                    await sendMessage(id);
                }
            }
            if (id === ids[ids.length - 1]) {
                stop_btn.disabled = true;
                start_btn.disabled = false;
            }
            --cnt;
            pl_left.textContent = `Осталось проверить ${cnt} игрок${declOfNum(cnt, ['а', 'ов', 'ов'])}`;
            if (!cnt) {
                inform.hidden = true;
            }
        }
    }
}

function stopSendMessages() {
    stop_btn.disabled = true;
    start_btn.disabled = false;
    stop_send = true;
}
function sendMessage(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            httpRequest({
                method: 'cht_send',
                val: message_text.value,
                sd: 1,
                opt: { pv: id }
            }).then(data => {
                if (data?.rpx) {
                    RPX_data_arr.push(data.rpx);
                }
                resolve(true);
            });
        }, 5000);
    });
}

function checkProfile(id) {
    return new Promise(resolve => {
        httpRequest({
            method: 'prf',
            id: id
        }).then(data => {
            if (data?.arr) {
                let { arr } = data,
                    clan_cond = (+clan_type.value === 1 ? true : +wedding_type.value === 2 ? arr[5] : !arr[5]),
                    gender_cond = (gender_from.value === 'any' ? true : gender_from.value === arr[1]),
                    wedding_cond = (+wedding_type.value === 1 ? true : +wedding_type.value === 2 ? arr[10] : !arr[10]),
                    rand_and_liga_cond = (+arr[8][0] >= +rank_from.value && +data.arr[15] >= +liga_from.value),
                    prof_cond = (+prof_type.value === 1 ? true : +prof_type.value === 2 ? data.gold : !data.gold);
                if (clan_cond && rand_and_liga_cond && gender_cond && wedding_cond && prof_cond) {
                    resolve(true);
                }
            }
            resolve(false);
        });
    });
}
function declOfNum(n, titles) {
    return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

$('.footerPanel').append(`
    <li onclick="notif_menu.hidden=!notif_menu.hidden;">Оповещение</li>
`);

const notif_html = `
<div id="notif_menu" class="notif-menu popup-move">
    <a href="#" onclick="notif_menu.hidden=true" class="popup-small-close" style="top: -30px;"></a>
    <ul class="notif-ul">
        <li>Текст сообщения: <input type="text" oninput="this.title=this.value" placeholder="Введите текст" id="message_text"></li>
        <li>Состояние клана: 
            <select id="clan_type">
                <option value="1" selected>Без разницы</option>
                <option value="2">Состоит в клане</option>
                <option value="3">Не состоит в клане</option>
            </select>
        </li>
        <li>С золотым профилем: 
            <select id="prof_type">
                <option value="1" selected>Без разницы</option>
                <option value="2">Да</option>
                <option value="3">Нет</option>
            </select>
        </li>
        <li>Семейное положение: 
            <select id="wedding_type">
                <option value="1" selected>Без разницы</option>
                <option value="2">Женат/замужем</option>
                <option value="3">Не женат/не замужем</option>
            </select>
        </li>
        <li>С какого звания:
            <select id="rank_from">
                <option value="1">Новичок</option>
                <option value="11">Мафиози</option>
                <option value="21">Главарь</option>
                <option value="31">Советник босса</option>
                <option value="41">Младший босс</option>
                <option value="51">Босс мафии</option>
                <option value="61">Крестный отец</option>
                <option value="76">Глава картеля</option>
                <option value="91">Босс всех боссов</option>
            </select>
        </li>
        <li>С какой лиги:
            <select id="liga_from">
                <option value="1" selected>Бронзовая лига</option>
                <option value="2">Серебряная лига</option>
                <option value="3">Золотая лига</option>
                <option value="4">Платиновая лига</option>
                <option value="5">Бриллиантовая лига</option>
                <option value="6">Лига Чемпионов</option>
                <option value="7">Гроссмейстерская лига</option>
            </select>
        </li>
        <li>Какой пол:
            <select id="gender_from">
                <option value="any" selected>Без разницы</option>
                <option value="m">Мужской</option>
                <option value="f">Женский</option>
            </select>
        </li>
        <li><label>Обходить модераторов и админов: <input type="checkbox" id="mod_admin_bypass"></label></li>
        <li id="inform" hidden>
            <p id="pl_found">Найдено игроков онлайн: </p>
            <p id="pl_left">Осталось проверить: </p>
        </li>
        <li>
            <button class="notif-btn btn-start" id="start_btn" onclick="startSendMessages();">Старт</button>
            <button class="notif-btn btn-stop" id="stop_btn" onclick="stopSendMessages();" disabled>Стоп</button>
        </li>
    </ul>
</div>
`;
$('#rootContainer').append(notif_html);

document.body.insertAdjacentHTML('beforeEnd', `
<style>
.notif-menu {
    position: absolute;
    background: black;
    right: 8px;
    bottom: 50px;
    border: 4px solid #333131;
}
.notif-ul {
    width: max-content;
}
.notif-ul li {
    padding: 5px;
    font-size: 14px;
}
.notif-ul li input[type=text],
.notif-ul li select {
    background: black;
    border: 2px solid white;
    padding: 4px;
    border-radius: 25px;
    color: white;
    outline: none;
}
.notif-ul li select {
    padding: 2px !important;
}
.notif-btn {
    padding: 5px 15px;
    font-size: 15px;
    color: white;
}
.notif-btn.btn-start {
    background: #389227;
}
.notif-btn.btn-stop {
    background: #9a1711;
}
.notif-btn:disabled {
    opacity: .7;
    cursor: default;
}
</style>
`);

$('#notif_menu').draggable();