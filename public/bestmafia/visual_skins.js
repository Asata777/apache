let skin_appended = false,
    auc_skin_appended = false,
    obj = {},
    undefined_skins = [];
if (localStorage.visual_skins) {
    obj = JSON.parse(localStorage.visual_skins);
}
setInterval(() => {
    if (gam_state === 'play' && !pla_data.dead && !pla_data.win && !skin_appended) {
        auc_skin_appended = false;
        let { person } = pla_data;
        changeSkin(person, obj[person]);
        document.querySelector('.ico.my').onclick = () => {
            _GM_action('f', 'upd', 'pp_dh', 'extras');
            let { person } = pla_data,
                html_m = '',
                html_f = '';
            for (let i = 0; i <= 22; ++i) {
                let m_uri = `/img/persons/big/${k_persons[person] + (i ? i : '')}_m.png`,
                    f_uri = `/img/persons/big/${k_persons[person] + (i ? i : '')}_f.png`;
                if (!undefined_skins.includes(m_uri)) {
                    html_m += makeHtmlString(person, m_uri);
                }
                if (!undefined_skins.includes(f_uri)) {
                    html_f += makeHtmlString(person, f_uri);
                }
            }
            if (person === 2) {
                html_m += makeHtmlString(person, `/img/persons/big/mafiosos31_m.png`);
                html_f += makeHtmlString(person, `/img/persons/big/mafiosos31_f.png`);
            }
            popup_container.insertAdjacentHTML('beforeEnd', `
                <div id="pp_extras" class="popup-move extras-popup ui-draggable ui-draggable-handle" style="display: block; left: 439px; top: 85px; z-index: 10;max-height: 570px;overflow-y: auto;">
                    <p style="padding: 0; margin: 0 0 5px 0">Сменить образ:</p>
                    <p style="padding: 0; margin: 0 0 5px 0">Мужской:</p>
                    <div class="use-figure" style="display: flow-root;">
                        ${html_m}
                    </div>
                    <p style="padding: 0; margin: 0 0 5px 0">Женский:</p>
                    <div class="use-figure">
                        ${html_f}
                    </div>
                    <a href="#" onclick="_GM_action('f', 'upd', 'pp_dh', 'extras');return false;" class="popup-small-close"></a>
                </div>
            `);
            $('#pp_extras').draggable();
        }
        skin_appended = true;
    } else if (gam_state !== 'play') {
        skin_appended = false;
    }
    if (gam_state === 'init' && !auc_skin_appended) {
        let { sale_p } = gam_data;
        if (typeof sale_p !== 'object') {
            changeSkin(sale_p, obj[sale_p], true);
            auc_skin_appended = true;
        } else {
            sale_p.forEach((e, i) => {
                changeSkin(e, obj[e], false, true, i);
            });
        }
        auc_skin_appended = true;
    }
}, 200);
function changeSkin(person, skin_uri, in_auction = false, in_arena = false, index) {
    if (skin_uri) {
        if (in_auction) {
            return document.querySelector('.roleImage > img').src = skin_uri;
        } else if (in_arena) {
            return document.querySelectorAll('.rolesForSale > li > .roleIco')[index].querySelector('img').src = skin_uri;
        }
        obj[person] = skin_uri;
        localStorage.visual_skins = JSON.stringify(obj);
        document.querySelector('.ico.my').style.backgroundImage = `url('${skin_uri}')`;
        document.querySelector('.role-review > .img > img').src = skin_uri;
    }
}
function makeHtmlString(person, skin_uri) {
    return `
    <div class="role" onclick="changeSkin(${person}, '${skin_uri}');">
        <img src="${skin_uri}" onerror="removeUndefinedSkin(this, '${skin_uri}');" onload="_PIX_crop(this, 65);" class="ico" style="height: 65px; margin: 0px;">
    </div>`;
}

function removeUndefinedSkin(target, skin_uri) {
    target.parentNode.remove();
    undefined_skins.push(skin_uri);
}