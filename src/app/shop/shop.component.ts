import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';


@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    walletType: string = '';
    hideHintPopup: boolean = true;
    constructor(private shopService: ShopService) { }


    async makePayment(target: HTMLInputElement) {
        let error = false,
            title = 'бот-меню',
            maf_id = +target.value;
        if (!this.walletType || !maf_id) {
            error = true;
        }
        if (!error) {
            switch (this.walletType) {
                case 'yandex':
                case 'bank':
                    let method = (this.walletType == 'yandex') ? 'PC' : 'AC';
                    location.href = `https://money.yandex.ru/transfer?receiver=410014294602871&sum=${115}&successURL=https%3A%2F%2Fasata.top%2Fbestmafia%2Fsuccess_pay&quickpay-back-url=https%3A%2F%2Fasata.top%2Fbestmafia%2Fsuccess_pay&shop-host=asata.top&label=${maf_id}&targets=Покупка%20${title}&comment=&origin=form&selectedPaymentType=${method}&destination=Покупка%20${title}&form-comment=Покупка%20${title}&short-dest=&quickpay-form=shop`;
                    break;

                case 'qiwi':
                    this.shopService.getLink(maf_id).subscribe((data: GetLink) => {
                        let { error, link } = data;
                        if (error) {
                            switch (error) {
                                case 1:
                                    alert('Неверный формат ID');
                                    break;
                                case 2:
                                    alert('Не удалось получить ссылку на оплату');
                                    break;
                            }
                        } else {
                            location.href = link;
                        }
                    });
                    break;
            }
        } else {
            target.focus();
            return alert('Ошибка!\nУбедитесь, что вы ввели правильный ID (именно цифры) и выбрали способ оплаты!');
        }
    }
    ngOnInit() {
        this.shopService.setTitle('Магазин');
    }
}
interface GetLink {
    error: number,
    link: string
}