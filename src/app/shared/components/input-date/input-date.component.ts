import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-input-date',
  standalone: true,
  imports: [Modules],
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent  implements OnInit {
  nameError: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() autocomplete: string = 'false';
  @Input() errors: any = {};
  
  constructor() { }
  ngOnInit() { }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }
}
