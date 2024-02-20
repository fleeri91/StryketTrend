export interface EventsRoot {
  _id: string;
  timestamp: string;
  events: Event[];
  __v: number;
}

export interface Event {
  teams: Teams;
  percentage: Percentage;
  odds: Odds;
  eventNumber: number;
  _id: string;
}

export interface Teams {
  home: string;
  away: string;
}

export interface Percentage {
  home: string;
  draw: string;
  away: string;
}

export interface Odds {
  home: string;
  draw: string;
  away: string;
}
