import { Component } from '@angular/core';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Modules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
