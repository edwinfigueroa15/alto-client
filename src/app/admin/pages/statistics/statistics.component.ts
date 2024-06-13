import { Component, inject } from '@angular/core';
import { Team } from 'app/core/interfaces/team.interface';
import { TeamService } from 'app/core/services/team.service';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, TableComponent } from 'app/shared/components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, TableComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export default class StatisticsComponent {
  allSubs: Subscription[] = [];
  
  nameHeaderColumns: string[] = ['Posición', 'Equipo', 'PJ', 'PG', 'PE', 'PP', 'GF', 'GC', 'DG', 'Pts'];
  keyBodyData: string[] = ['position', 'name', 'matches_played', 'matches_won', 'tied_matches', 'lost_matches', 'goals_favor', 'goals_against', 'difference_goals', 'points'];
  dataBodyTable: Team[] = [];

  private _teamService = inject(TeamService);
  constructor() { }

  ngOnInit(): void {
    this.getAllTeams();
  }

  ngOnDestroy() {
    this.allSubs.forEach((sub) => sub.unsubscribe());
  }

  getAllTeams() {
    this.allSubs[this.allSubs.length] = this._teamService.getAll().subscribe({
      next: (res) => {
        this.dataBodyTable = res;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
  
}
