let extras = {
    1: { title: '%s - %s раскрыл вам свою роль', name: 'Игрок раскрыл роль', id: 155 },
    2: { title: 'Вы пытались исповедаться, но вам никто не поверил', name: 'Не сработала исповедь', id: 0 },
    3: { title: 'Гадание не принесло результата', name: 'Не сработало гадание', id: 0 },
    4: { title: 'Карты таро раскрыли вам роль: %s - %s', name: 'Карты таро', id: 156 },
    5: { title: 'Талант/усиление «Таро бустер» раскрыл вам роль игрока: %s - %s', name: 'Таро бустер', id: 156 },
    6: { title: 'Пытки паяльником дали результат: %s - %s', name: 'Паяльник', id: 203 },
    7: { title: 'Джокер раскрыл роль случайного игрока: %s - %s', name: 'Джокер', id: 240 },
    8: { title: 'Детектор лжи дал результаты: %s - %s', name: 'Детектор лжи', id: 104 },
    9: { title: 'Прогревание «Утюгом Тони» дало результат: %s - %s', name: 'Утюг Тони', id: 302 },
    10: { title: 'Карнавальные Таро раскрыли роль:  %s - %s', name: 'Карнавальные таро', id: 292 },
    11: { title: 'Пасхальные Таро раскрыли роль: %s - %s', name: 'Пасхальные таро', id: 145 },
    12: { title: 'Эликсир правды раскрыл роль: %s - %s', name: 'Эликсир правды', id: 197 },
    13: { title: 'Таро от Бандитос раскрыли роль: %s - %s', name: 'Таро от Бандитос', id: 317 }
};

let fake_extra = '';
for (let i in extras) {
    fake_extra += `
        <option value="${i}">${extras[i].name}</option>
    `;
}
$('#rootContainer').append(`
    <div id="fake_search" class="popup-move ui-draggable ui-draggable-handle">
        <a href="#" onclick="$('#fake_search').toggle('fade');return !1;" class="popup-small-close" style="top: -30px;"></a>
        <select id="fake_extra" class="fake-search-select">
            ${fake_extra}
        </select>
        <select id="fake_nick" class="fake-search-select"></select>
        <select id="fake_role" class="fake-search-select"></select>
        <button class="fake-search-btn" onclick="makeFakeSearch();">Отправить</button>
    </div>
`);
$('.footerPanel').append(`<li onclick="$('#fake_search').toggle('fade');">Липы</li>`);
$('#fake_search').draggable();

let appended = false,
    live_nicks = [];
setInterval(() => {
    if (gam_state === 'play') {
        if (!appended) {
            appendNicks();
            appendRoles();
            appended = true;
        }
        modifyRoles();
        modifyNicks();
    }
    if (gam_state !== 'play' && appended) {
        live_nicks.length = 0;
        $('#fake_nick').children().remove();
        $('#fake_role').children().remove();
        appended = false;
    }
}, 1000);

function appendNicks() {
    let list = $('#upl_list').children().find('.dead.not-displayed'),
        fake_nick = '';
    for (let i = 0; i < list.length; ++i) {
        let nick = list.eq(i).parent().parent().find('.nick').text();
        live_nicks.push(nick);
        fake_nick += `
            <option value="${nick}">${nick}</option>
        `;
    }
    $('#fake_nick').append(fake_nick);
}

function modifyRoles() {
    for (let i in gam_data.v_left) {
        if (!gam_data.v_left[i]) {
            let role = t_persons[i];
            $('#fake_role').children(`option[value='${role}']`).remove();
        }
    }
}

function modifyNicks() {
    let list = $('#upl_list').children().find('.dead.not-displayed');
    if (list.length < live_nicks.length) {
        let arr = [];
        for (let i = 0; i < list.length; ++i) {
            let nick = list.eq(i).parent().parent().find('.nick').text();
            arr.push(nick);
        }
        live_nicks.forEach(e => {
            let index = arr.indexOf(e);
            if (!~index) {
                $('#fake_nick').children(`option[value='${e}']`).remove();
                live_nicks.splice(index, 1);
            }
        });
    }
}

function appendRoles() {
    let fake_role = '';
    for (let i in gam_data.v_left) {
        if (gam_data.v_left[i]) {
            fake_role += `
                <option value="${t_persons[i]}">${t_persons[i]}</option>
            `;
        }
    }
    $('#fake_role').append(fake_role);
}

function makeFakeSearch() {
    if (gam_state === 'play' && appended) {
        let extra = +$('#fake_extra').val(),
            nick = $('#fake_nick').val(),
            role = $('#fake_role').val(),
            extra_title = extras[extra].title,
            extra_id = extras[extra].id,
            to_screen = '',
            to_chat = '';
        if (extra_id) {
            to_chat = extra_title.replace('%s', nick).replace('%s', role);
            to_screen = extra_title
                .replace('%s', `
                <a href="#" onclick="var ot=this;setTimeout(function(){if(_pl_no_ton){_pl_no_ton=false;return};_TON('ich', ot);}, 25);return false" class="nick">
                    ${nick}
                </a>
                `)
                .replace('%s', role);
            appendToChat(to_screen, true, extra_id, to_chat);
        } else {
            appendToChat(extra_title);
        }
    }
}

function appendToChat(text, button = false, extra_id, to_chat) {
    $('#cco_log').append(`
        ${button ? `
        <div class="extra">
            <div class="img">
                <img src="/img/extras/${extra_id}.png">
            </div>
            <div class="text">
                ${text}
                <button href="#" class="cssGreenButton writeToChat" onclick="_CHT_action('ich', 'write_to_input', '${to_chat}'); return false">
                    Рассказать
                </button>
            </div>
        </div>` : `
        <p class="night-turn">
            ${text}
        </p>
        `}
    `);
}
$(document.body).append(`
	<style>
	#fake_search {
		width: max-content !important;
        height: max-content !important;
        right: 10px;
        bottom: 35px;
        padding: 15px;
        border: 2px solid;
    }
    .fake-search-select {
        outline: none;
        background: none;
        color: white;
        border: 2px solid;
        padding: 5px 10px;
        border-radius: 25px;
        font-weight: bold;
        margin-right: 5px;
    }
    .fake-search-select option {
        background: black;
    }
    .fake-search-btn {
        color: white;
        border: 2px solid;
        padding: 7px 10px;
        border-radius: 25px;
        font-weight: bold;
    }
	</style>
`);