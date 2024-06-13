import { Component, Input } from '@angular/core';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
  standalone: true,
  imports: [Modules],
})
export class BreadCrumbsComponent {
  @Input() breadCrumbs: string[] = [];
}
