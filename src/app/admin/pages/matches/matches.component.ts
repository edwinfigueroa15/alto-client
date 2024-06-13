import { Component, inject, signal } from '@angular/core';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, InputDateComponent, InputSelectComponent, InputTextComponent, ModalComponent, TableComponent } from 'app/shared/components';
import { Team, TeamForm } from 'app/core/interfaces/team.interface';
import { Subscription } from 'rxjs';
import { TeamService } from 'app/core/services/team.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchesService } from 'app/core/services/matches.service';
import { Matches } from 'app/core/interfaces/matches.interface';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, InputDateComponent, InputTextComponent, InputSelectComponent, ModalComponent, TableComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
})
export default class MatchesComponent {
  allSubs: Subscription[] = [];
  showModal = signal<boolean>(false);
  isEdit = signal<boolean>(false);
  equalTeams = signal<boolean>(false);
  
  showActionsTable = { edit: true, delete: true };
  nameHeaderColumns: string[] = ['Goles', 'Equipos', 'Goles', 'Fecha del partido', 'Estado'];
  keyBodyData: string[] = ['goals_team_one', 'teams', 'goals_team_two', 'data_start', 'status_label'];
  dataBodyTable: Matches[] = [];

  listTeams: any[] = [];
  listStatus = [
    { value: 'assigned', label: 'Asignado' },
    { value: 'in_progress', label: 'En proceso' },
    { value: 'finished', label: 'Terminado' },
  ];

  form = new FormGroup({
    id: new FormControl(null),
    team_one: new FormControl(null, [Validators.required]),
    team_two: new FormControl(null, [Validators.required]),
    status: new FormControl('assigned', [Validators.required]),
    goals_team_one: new FormControl('0', [Validators.required]),
    goals_team_two: new FormControl('0', [Validators.required]),
    data_start: new FormControl(new Date(), [Validators.required]),
  })

  errors = {
    team_one: {
      required: { message: 'El equipo local es obligatorio' },
    },
    team_two: {
      required: { message: 'El equipo visitante es obligatorio' },
    },
    goals_team_one: {
      required: { message: 'Los goles del local son obligatorios' },
    },
    goals_team_two: {
      required: { message: 'Los goles del visitante son obligatorios' },
    },
    status: {
      required: { message: 'El estado del partido es obligatorio' },
    },
    data_start: {
      required: { message: 'La fecha del partido es obligatoria' },
    },
  }

  private _teamService = inject(TeamService);
  private _matchesService = inject(MatchesService);
  constructor() { }

  ngOnInit(): void {
    this.getAllTeamsForSelect();
    this.getAllMatches();
  }

  ngOnDestroy() {
    this.allSubs.forEach((sub) => sub.unsubscribe());
  }

  onChangeSelect(event: any) {
    if(this.form.controls['team_one'].value === this.form.controls['team_two'].value) {
      this.equalTeams.set(true);
    } else {
      this.equalTeams.set(false);
    }
  }

  getAllTeamsForSelect() {
    this.allSubs[this.allSubs.length] = this._teamService.getAllForSelect().subscribe({
      next: (res) => {
        this.listTeams = res;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  getAllMatches() {
    this.allSubs[this.allSubs.length] = this._matchesService.getAll().subscribe({
      next: (res) => {
        this.dataBodyTable = res;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  closeModal(event: boolean) {
    this.showModal.set(!event);
    this.form.reset();
  }

  createEvent() {
    this.isEdit.set(false);
    this.showModal.set(true);
    this.form.reset();
  }

  editEvent(event: any) {
    this.isEdit.set(true);
    this.showModal.set(true);
    this.form.patchValue(event as any);
    this.form.controls['team_one'].setValue(event.team_one.id);
    this.form.controls['team_two'].setValue(event.team_two.id);
  }

  addOrUpdateTeam() {
    const id = this.form.value.id!;
    delete this.form.value.id;

    if (this.isEdit()) { 
      this.allSubs[this.allSubs.length] = this._matchesService.update(id, this.form.value).subscribe({
        next: (res) => {
          this.getAllMatches();
          this.closeModal(true);
        },
        error: (err) => {
          console.log(err)
          this.form.controls['id'].setValue(id)
        }
      })

    } else {
      this.allSubs[this.allSubs.length] = this._matchesService.create(this.form.value).subscribe({
        next: (res) => {
          this.getAllMatches();
          this.closeModal(true);
        },
        error: (err) => {
          console.log(err)
          this.form.controls['id'].setValue(id)
        }
      })
    }
  }

  deleteEvent(event: any) {
    
  }

}
