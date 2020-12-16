import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }
  public dataSource: PeriodicElement[] = [
    {
      _id: '5e08cf7e435ad043705c849e',
      maf_id: 7096535,
      nick: 'Игopь',
      active: true,
      count: 12,
      registered: '29.12.2019',
      enc_id: 'b6f8bb81ac6152ce97b1aa700ba7ed30',
      activity: '30.06.2020',
    },
    {
      _id: '5e08cf7e435ad043705c849e',
      maf_id: 7096535,
      nick: 'Игopь',
      active: true,
      count: 12,
      registered: '29.12.2019',
      enc_id: 'b6f8bb81ac6152ce97b1aa700ba7ed30',
      activity: '30.06.2020',
    },
    {
      _id: '5e08cf7e435ad043705c849e',
      maf_id: 7096535,
      nick: 'Игopь',
      active: true,
      count: 12,
      registered: '29.12.2019',
      enc_id: 'b6f8bb81ac6152ce97b1aa700ba7ed30',
      activity: '30.06.2020',
    },
    {
      _id: '5e08cf7e435ad043705c849e',
      maf_id: 7096535,
      nick: 'Игopь',
      active: true,
      count: 12,
      registered: '29.12.2019',
      enc_id: 'b6f8bb81ac6152ce97b1aa700ba7ed30',
      activity: '30.06.2020',
    },
    {
      _id: '5e08cf7e435ad043705c849e',
      maf_id: 7096535,
      nick: 'Игopь',
      active: true,
      count: 12,
      registered: '29.12.2019',
      enc_id: 'b6f8bb81ac6152ce97b1aa700ba7ed30',
      activity: '30.06.2020'
    }
  ];
  public displayedColumns: string[] = ['_id', 'maf_id', 'nick', 'active', 'count', 'registered', 'enc_id', 'activity', 'action'];

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  _id: string,
  maf_id: number,
  nick: string,
  active: boolean,
  count: number,
  registered: string,
  enc_id: string,
  activity: string,
  action?: string
}
