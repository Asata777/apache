import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopsComponent } from './tops.component';
import { TopsRoutingModule } from './tops.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [TopsComponent],
    imports: [
        CommonModule,
        TopsRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class TopsModule { }
