import { Component, EventEmitter, Input, OnInit, Output, booleanAttribute, signal } from '@angular/core';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class TableComponent  implements OnInit {
  currenItem: any = null;

  @Input() showActionsTable: { edit?: boolean, delete?: boolean, detail?: boolean, status?: boolean } = {
    edit: false,
    status: false,
    delete: false,
    detail: false,
  };

  @Input({ required: true }) nameHeaderColumns: string[] = [];
  @Input({ required: true }) keyBodyData: string[] = [];
  @Input({ required: true }) dataBodyTable: any[] = [];
  @Input() paginator = { show: false, currentPage: 1, pageSize: 10, totalPage: 1 }

  @Output() detailEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() changeStatusEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  @Output() pageBackEvent = new EventEmitter<any>();
  @Output() pageNextEvent = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() { }

  OnDetail(currenItem: any) {
    this.detailEvent.emit(currenItem);
  }

  OnEdit(currenItem: any) {
    this.editEvent.emit(currenItem);
  }

  OnChangeStatus(currenItem: any) {
    this.changeStatusEvent.emit(currenItem);
  }

  OnDelete(currenItem: any) {
    this.deleteEvent.emit(currenItem);
  }

  OnPageBack() {
    this.pageBackEvent.emit(true);
  }

  OnPageNext() {
    this.pageNextEvent.emit(true);
  }

}
