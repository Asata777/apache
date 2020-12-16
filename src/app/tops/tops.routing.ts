import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopsComponent } from './tops.component';


const routes: Routes = [
    { path: '', component: TopsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TopsRoutingModule { }  