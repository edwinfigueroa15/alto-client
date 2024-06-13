import { Injectable, inject } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private router = inject(Router);

  isNumber(value: any) {
    const regex = /^-?[0-9.]*$/;
    return regex.test(value);
  }

  formatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  routerLink(url: string, extras?: NavigationBehaviorOptions) {
    return this.router.navigateByUrl(url, extras);
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  saveLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
