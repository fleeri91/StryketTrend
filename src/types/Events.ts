export interface EventsRoot {
  _id: string;
  events: Event[];
  __v: number;
}

export interface Event {
  teams: Teams;
  eventNumber: number;
  distribution: Distribution[];
  odds: Odds[];
  _id: string;
}

export interface Teams {
  home: string;
  away: string;
}

export interface Distribution {
  home: string;
  draw: string;
  away: string;
  _id: string;
  timestamp: string;
}

export interface Odds {
  home: string;
  draw: string;
  away: string;
  _id: string;
  timestamp: string;
}
