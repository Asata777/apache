import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { TestRoutingModule } from './test.routing';
@NgModule({
    declarations: [TestComponent],
    imports: [
        CommonModule,
        TestRoutingModule
    ]
})
export class TestModule { }