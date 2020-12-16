import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModersComponent } from './moders.component';


const routes: Routes = [
    { path: '', component: ModersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModersRoutingModule { }  