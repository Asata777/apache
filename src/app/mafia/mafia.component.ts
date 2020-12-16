import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-mafia',
  templateUrl: './mafia.component.html',
  styleUrls: ['./mafia.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class MafiaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(123);
  }

}
