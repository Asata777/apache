import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MafiaComponent } from './mafia.component';
import { RegistrComponent } from './registr/registr.component';
import { GameComponent } from './game/game.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
    declarations: [
        MafiaComponent,
        RegistrComponent,
        GameComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class SharedModule { }
