import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { Observable, map } from 'rxjs';
import { Team, TeamForm } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _http = inject(HttpClient);
  constructor() { }

  getAll(): Observable<Team[]> {
    return this._http.get<Team[]>(`${environment.API_URL}/team/`).pipe(
      map(teams => {
        return teams.map(item => {
          item.matches_played = String(Number(item.matches_won) + Number(item.lost_matches) + Number(item.tied_matches));
          item.difference_goals = String(Number(item.goals_favor) - Number(item.goals_against));
          item.points = String((Number(item.matches_won) * 3) + Number(item.tied_matches));
          return item;
        })
      }),
      map(teams => {
        return teams.sort((a, b) => {
          return b.points!.localeCompare(a.points!, 'en', { numeric: true });
        });
      }),
      map(teams => {
        return teams.map((item, index) => {
          item.position = String(index + 1);
          return item;
        })
      })
    );
  }

  getAllForSelect(): Observable<any> {
    return this._http.get<any[]>(`${environment.API_URL}/team/`).pipe(
      map(teams => {
        return teams.map(item => {
          return { value: item.id, label: item.name }
        })
      })
    );
  }

  create(team: TeamForm): Observable<Team> {
    return this._http.post<any>(`${environment.API_URL}/team/`, team);
  }

  update(id: number, team: TeamForm): Observable<Team> {
    return this._http.put<any>(`${environment.API_URL}/team/${id}/`, team);
  }

  delete(id: number): Observable<Team> {
    return this._http.delete<any>(`${environment.API_URL}/team/${id}/`);
  }

}
