import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';
import { UtilsService } from 'app/shared/utils/utils.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class InputSelectComponent implements OnInit {
  nameError: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) list!: { value: string | number, label: string }[];
  @Input() errors: any = {};
  
  @Output() changeEvent = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() { }

  OnChangeSelect(event: any) {
    const item = this.list.find(item => item.value == event.value);
    this.changeEvent.emit(item);
  }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }
}
