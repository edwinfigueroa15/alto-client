import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';
import { UtilsService } from 'app/shared/utils/utils.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class InputTextComponent implements OnInit {
  nameError: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() value: any = null;
  @Input() placeholder: string = '';
  @Input() autocomplete: string = 'false';
  @Input() errors: any = {};
  
  private _utilsService = inject(UtilsService); 
  constructor() { }

  ngOnInit() { }

  validators(event: any) {
    if (this.type === "number") return this._utilsService.isNumber(event.key);
    return true;
  }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }
}
