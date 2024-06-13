import { TeamForm } from "./team.interface";

export interface Matches {
    id:             number;
    goals_team_one: string;
    goals_team_two: string;
    status:         string;
    data_start:     Date;
    created:        Date;
    team_one:       TeamForm;
    team_two:       TeamForm;
}