export interface EventDTO {
  eventNumber: number;
  teams: TeamsDTO;
  distribution: DistributionDTO[];
  odds: OddsDTO[];
}

export interface TeamsDTO {
  home: string;
  away: string;
}

export interface DistributionDTO {
  timestamp: Date;
  home: string;
  draw: string;
  away: string;
}

export interface OddsDTO {
  timestamp: Date;
  home: string;
  draw: string;
  away: string;
}
