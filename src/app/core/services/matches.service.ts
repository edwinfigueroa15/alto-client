import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Matches } from 'app/core/interfaces/matches.interface';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  statusOptions: any = { 
    assigned: 'Asignado',
    in_progress: 'En proceso',
    finished: 'Terminado'
  }

  private _http = inject(HttpClient);
  constructor() { }

  getAll(): Observable<Matches[]> {
    return this._http.get<Matches[]>(`${environment.API_URL}/matches/`).pipe(
      map(matches => {
        return matches.map(match => {
          return { 
            ...match,
            status_label: this.statusOptions[match.status],
            teams: `${match.team_one.name} vs ${match.team_two.name}`,
          }
        })
      })
    );
  }

  create(matches: any): Observable<any> {
    return this._http.post<any>(`${environment.API_URL}/matches/`, matches);
  }

  update(id: number, matches: any): Observable<any> {
    return this._http.put<any>(`${environment.API_URL}/matches/${id}/`, matches);
  }

  delete(id: number): Observable<any> {
    return this._http.delete<any>(`${environment.API_URL}/matches/${id}/`);
  }

}
