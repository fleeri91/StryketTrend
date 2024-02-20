export interface GamesRoot {
  teams: Teams;
  _id: string;
  percentage: Percentage[];
  odds: Odd[];
  __v: number;
}

export interface Teams {
  home: string;
  away: string;
}

export interface Percentage {
  timestamp: string;
  home: string;
  draw: string;
  away: string;
  _id: string;
}

export interface Odd {
  timestamp: string;
  home: string;
  draw: string;
  away: string;
  _id: string;
}
