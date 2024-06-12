import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'app/core/interfaces/components.interface';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Modules],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export default class AdminComponent {
  showMenu = signal(false);
  currentPath: string = '';
  pages: Menu[] = [
    { title: 'Estadisticas', url: '/admin/statistics', icon: 'assets/icons/' },
    { title: 'Equipos', url: '/admin/team', icon: 'assets/icons/' },
    { title: 'Partidos', url: '/admin/matches', icon: 'assets/icons/' },
  ]

  private _router = inject(Router);

  async ngOnInit() {
    this.currentPath = this._router.url;
    this._router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event?.url;
    })
  }

  changeShowMenu() {
    this.showMenu.update(value => !value);
  }

  closeMenu() {
    this.showMenu.update(value => false);
  }
}
