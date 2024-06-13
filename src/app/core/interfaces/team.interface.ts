export interface Team {
    id:                 null | number;
    name:               string;
    position:           null | string;
    points:             null | string;
    matches_played:     null | string;
    difference_goals:   null | string;
    matches_won:        null | string;
    lost_matches:       null | string;
    tied_matches:       null | string;
    goals_favor:        null | string;
    goals_against:      null | string;
    created:            Date;
}

export interface TeamForm {
    id:                 number | null;
    name:               string;
    matches_won:        null | string;
    lost_matches:       null | string;
    tied_matches:       null | string;
    goals_favor:        null | string;
    goals_against:      null | string;
}