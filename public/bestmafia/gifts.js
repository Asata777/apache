function appendGifts() {
    let simple_gifts = [
            1004, 1017, 1018, 1019, 1002, 1020, 1021, 1071, 1106, 1001,
            1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1013,
            1003, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1028,
            1014, 1015, 1016, 1022, 1023, 1024, 1025, 1026, 1027,
        ],
        anim_id = {
            2101: 11,
            2102: 5,
            2103: 10,
            2104: 10,
            2105: 15,
            2106: 10,
            2107: 10,
            2108: 10,
            2109: 5,
            2110: 10,
            2111: 25,
            2112: 10,
            2113: 20,
            2114: 10,
            2201: 9,
            2202: 15,
            2203: 10,
            2204: 9,
            2205: 20,
            2206: 20,
            2207: 10,
            2208: 10,
            2209: 6,
            2210: 25,
            2211: 26,
            2212: 15,
            2213: 10,
            2214: 10,
            2215: 29,
            2216: 22,
            2217: 10,
            2218: 15,
            2219: 16
        },
        html = '',
        html1 = '';
    for (let i = 1001; i <= 1118; ++i) {
        if (!~simple_gifts.indexOf(i)) {
            html += `
                <li onclick="showGiftPopup('${i}');" class="gift" style="border: inset 1px #f3efef;border-radius: 10px;">
                    <div class="gift">
                        <img src="/images/gifts/${i}.png">
                        <p class="price"><img src="/images/icons/coin-micro.png" title="${__store[i].title}">
                            <span>${__store[i].price}</span>
                        </p>
                    </div>
                </li>
            `;
        }
    }
    let gift_class = '';
    for (let i = 2201; i <= 2219; ++i) {
        gift_class = i < 2205 ? 'eventBeard' : (i < 2209 || i >= 2213 ? 'eventNy' : 'eventProf');
        html1 += `
            <li onclick="showGiftPopup('${i}');" class="${gift_class} bigGift" style="border: inset 1px #f3efef;border-radius: 10px;">
                <div class="gift">
                    <img src="/images/_.gif" style="background-image: url(/images/gifts/${i}.png)" class="animGift frame${anim_id[i]}" title="${__store[i].title}">
                    <p class="price"><img src="/images/icons/coin-micro.png" title="${__store[i].title}">
                        <span>${__store[i].price}</span>
                    </p>
                </div>
            </li>
        `;
    }
    document.body.onclick = () => {
        setTimeout(() => {
            let gift_popup = $('#wnd_gifts');
            if (gift_popup.length && !+gift_popup.data('noted')) {
                gift_popup.data('noted', 1);
                let simple_smile_list = $('.giftsList.glsts_0').find('.giftsList'),
                    anim_smile_list = $('.giftsList.glsts_2').find('.giftsList');
                simple_smile_list.css({
                    maxHeight: '400px',
                    overflow: 'auto'
                });
                simple_smile_list.append(html);
                anim_smile_list.append(html1);
                $('.giftsList.glsts_2').children('.viewport').css({
                    overflow: 'auto'
                });
                $('.giftsList.glsts_2').find('.thumb').remove();
            }
        }, 500);
    }
}
appendGifts();

function showGiftPopup(gift_id) {
    $('#pp_gftx').attr('label', gift_id);
    $('.hh_gftx').removeClass('not-displayed');
    $('.ll_gftx_r').attr('label', '4500');
    $('#pp_gftx').removeClass('not-displayed');
    $('#pp_gftx').find('textarea').focus();
}