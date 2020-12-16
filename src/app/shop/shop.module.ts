import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutingModule } from './shop.routing';
import { SharedModule } from '../shared/shared.module';

import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [ShopComponent],
    imports: [
        CommonModule,
        ShopRoutingModule,
        SharedModule,
        MatRippleModule
    ]
})
export class ShopModule { }