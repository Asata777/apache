var throw_interval = 1500;

async function startThrow() {
    let players = await getPlayerIds();
    if (players) {
        for (let id of players) {
            let allow_profile = await checkProfile(+id);
            if (allow_profile) {
                await throwToPlayer(+id);
            }
        }
    }
}

function getPlayerIds() {
    return new Promise(async resolve => {
        let res = await fetch('https://asata.top/bestmafia/playerIds'),
            { ids } = await res.json(),
            cnt = 0,
            online_ids = [];
        if (ids.length) {
            for (let i = 0; i < Math.ceil(ids.length / 50); ++i) {
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
                        }
                    }
                    cnt += 50;
                }
            }
        }
        resolve(online_ids);
    });
}


function throwToPlayer(id) {
    return new Promise(resolve => {
        let interval;
        interval = setInterval(async () => {
            let last_snow = await checkLastThrow(id);
            console.log('Снег', last_snow);
            if (last_snow) {
                console.info('Кинул большой снежок, перехожу к следующему');
                clearInterval(interval);
                resolve(true);
            } else if (!last_snow) {
                let throw_snow = await httpRequest({ method: 'eraser', id: id });
                if (typeof throw_snow.ret != 'undefined' && throw_snow.ret[0] === 15) {
                    console.info('Лимит, переход');
                    clearInterval(interval);
                    resolve(true);
                }
            }
        }, throw_interval || 1500);
    });
}

function checkProfile(id) {
    return new Promise(async resolve => {
        let profile = await httpRequest({ method: 'prf', id: id });
        if (typeof profile.arr != 'undefined' && !profile.arr[14].length) {
            resolve(true);
            console.info('У игрока ', id, 'все ок');
        } else {
            console.info(id, 'либо блок либо лимит');
            resolve(false);
        }
    });
}

function checkLastThrow(id) {
    return new Promise(resolve => {
        let list = $('#cco_log').children('.giftRecieved');
        for (let i = 0; i < list.length; ++i) {
            let img = $(list).eq(i).children('.td.gift').children('img').attr('src').split('/')[5];
            if (img === 'c1.png') {
                let th_id = +$(list).eq(i).find('.photo').attr('onclick').match(/\d+/g);
                if (th_id === id) {
                    resolve(true);
                    break;
                }
            }
        }
        resolve(false);
    });
}

var hash = PAGE_goto.toString().split('/')[2];

function httpRequest(data) {
    return new Promise(resolve => {
        $.ajax({
            type: 'POST',
            url: `/standalone/${hash}/DO/${Math.random()}`,
            dataType: 'JSON',
            data: data,
            success: data => resolve(data)
        })
    });
}
startThrow();