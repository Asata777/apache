import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModersComponent } from './moders.component';
import { ModersRoutingModule } from './moders.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ModersComponent
    ],
    imports: [
        CommonModule,
        ModersRoutingModule,
        SharedModule
    ]
})
export class ModersModule { }
