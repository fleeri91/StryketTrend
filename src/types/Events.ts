export interface EventsRoot {
  _id: string;
  events: Event[];
  __v: number;
}

export interface Event {
  teams: Teams;
  eventNumber: number;
  distribution: Distribution[];
  odds: Odd[];
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

export interface Odd {
  home: string;
  draw: string;
  away: string;
  _id: string;
  timestamp: string;
}
