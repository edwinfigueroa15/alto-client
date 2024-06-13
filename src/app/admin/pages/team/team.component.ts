import { Component, inject, signal } from '@angular/core';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, InputSelectComponent, InputTextComponent, ModalComponent, TableComponent } from 'app/shared/components';
import { Team, TeamForm } from 'app/core/interfaces/team.interface';
import { Subscription } from 'rxjs';
import { TeamService } from 'app/core/services/team.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, InputTextComponent, InputSelectComponent, ModalComponent, TableComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
})
export default class TeamComponent {
  allSubs: Subscription[] = [];
  showModal = signal<boolean>(false);
  isEdit = signal<boolean>(false);
  
  showActionsTable = { edit: true, delete: true };
  nameHeaderColumns: string[] = ['Equipo'];
  keyBodyData: string[] = ['name'];
  dataBodyTable: Team[] = [];

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    goals_favor: new FormControl('0', [Validators.required]),
    goals_against: new FormControl('0', [Validators.required]),
    matches_won: new FormControl('0', [Validators.required]),
    tied_matches: new FormControl('0', [Validators.required]),
    lost_matches: new FormControl('0', [Validators.required]),
  })

  errors = {
    name: {
      required: { message: 'El nombre del equipo es obligatorio' },
    },
    
    goals_favor: {
      required: { message: 'Los goles a favor son obligatorios' },
    },
    goals_against: {
      required: { message: 'Los goles en contra son obligatorios' },
    },
    matches_won: {
      required: { message: 'Los partidos ganados son obligatorios' },
    },
    tied_matches: {
      required: { message: 'Los partidos empatados son obligatorios' },
    },
    lost_matches: {
      required: { message: 'Los partidos perdidos son obligatorios' },
    }
  }

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

  closeModal(event: boolean) {
    this.showModal.set(!event);
    this.form.reset();
  }

  createEvent() {
    this.isEdit.set(false);
    this.showModal.set(true);
    this.form.reset();
  }

  editEvent(event: Team) {
    this.isEdit.set(true);
    this.showModal.set(true);
    this.form.patchValue(event as any);
  }

  addOrUpdateTeam() {
    if (this.isEdit()) { 
      const id = this.form.value.id!;
      delete this.form.value.id;
      this.allSubs[this.allSubs.length] = this._teamService.update(id, this.form.value as TeamForm).subscribe({
        next: (res) => {
          this.getAllTeams();
          this.closeModal(true);
        },
        error: (err) => {
          console.log(err)
        }
      })

    } else {
      delete this.form.value.id;
      this.allSubs[this.allSubs.length] = this._teamService.create(this.form.value as TeamForm).subscribe({
        next: (res) => {
          this.getAllTeams();
          this.closeModal(true);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  deleteEvent(event: any) {
    console.log(event);
    const deleteConfirm = confirm('¿Desea eliminar este equipo?');
    if(deleteConfirm) {
      this.allSubs[this.allSubs.length] = this._teamService.delete(event.id).subscribe({
        next: (res) => {
          this.getAllTeams();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
