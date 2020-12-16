import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', redirectTo: 'shop', pathMatch: 'full' },
    { path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
    { path: 'moders', loadChildren: () => import('./moders/moders.module').then(m => m.ModersModule) },
    { path: 'tops', loadChildren: () => import('./tops/tops.module').then(m => m.TopsModule) },
    { path: 'test', loadChildren: () => import('./test/test.module').then(m => m.TestModule) },
    { path: 'monitoring', loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule) },
    { path: 'panel', loadChildren: () => import('./panel/panel.module').then(m => m.PanelModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }