rootContainer.insertAdjacentHTML('beforeEnd', `
	<ul id="active_players" class="popup-move">
		<a href="#" onclick="this.offsetParent.classList.toggle('not-displayed');return false" class="popup-small-close" hidefocus="true"></a>
		<li>
			<h2 style="margin-top: 20px;color:#1985d4">Ждем игры!</h2>
		</li>
	</ul>
`);

$('.footerPanel').append(`<li onclick="active_players.classList.toggle('not-displayed')">Активы</li>`);

$('#active_players').css({
    background: 'black',
    position: 'absolute',
    right: '10px',
    bottom: '35px',
    padding: '10px 13px',
    color: 'white',
    'font-size': '14px',
    'border-radius': '5px'
}).draggable();

let player_arr = [],
    stop_p = false,
    actives_count = 0;
setInterval(() => {
    let activs = active_players,
        text = activs.children[1].children[0];
    if (gam_state == 'play') {
        text.textContent = !actives_count ? 'Активные роли не найдены!' : 'Активные роли у:'
    } else {
        text.textContent = 'Ждем игры!';
    }
    $('#active_players').css({
        height: 'max-content',
        width: 'max-content'
    });
    if (!player_arr.length && gam_state == 'init') {
        let list = gpl_list.children;
        for (let i = 0; i < list.length; ++i) {
            let item = list[i].children[0],
                id = +item.id.substr(4),
                nick = item.children[0].textContent;
            if (id != my_id) {
                checkPlayer(id).then(data => {
                    let info = {
                        id: id,
                        nick: nick,
                        step: data.step,
                        progress: data.progress
                    };
                    info.access = !data.error;
                    player_arr.push(info);
                });
            }
        }
    } else if (!stop_p && player_arr.length && gam_state == 'play') {
        for (let i = 0; i < player_arr.length; ++i) {
            if (player_arr[i].access) {
                checkPlayer(player_arr[i].id).then(data => {
                    if (data.step > player_arr[i].step || data.progress > player_arr[i].progress) {
                        ++actives_count;
                        activs.classList.remove('not-displayed');
                        activs.insertAdjacentHTML('beforeEnd', `
                            <li style="cursor:pointer;border-bottom:1px solid #42404099;padding:5px 0;" onclick="_PRF(${player_arr[i].id})">
                                ${player_arr[i].nick}
                            </li>
						`);
                    }
                });
            }
        }
        stop_p = true;
    }
    if (!gam_id) {
        $('#active_players').children().not('a, :nth-child(2)').remove();
        stop_p = false;
        player_arr.length = 0;
        actives_count = 0;
    }
}, 500);

function checkPlayer(id) {
    return new Promise(resolve => {
        let hash = PAGE_goto.toString().split('/')[2];
        $.ajax({
            async: true,
            cache: true,
            type: 'POST',
            dataType: 'JSON',
            url: `/${_language == 'ru' ? 'standalone' : 'draugiem'}/${hash}/DO/${Math.random()}`,
            data: { method: 'achievements', id: id, args: [1110, 1] },
            success: data => {
                let info = { error: false };
                if (!data.err) {
                    let ach = data.ret[1][0][11];
                    info.step = +ach[1]
                    info.progress = +ach[2];
                } else {
                    info.error = true;
                }
                resolve(info);
            }
        });
    });
}