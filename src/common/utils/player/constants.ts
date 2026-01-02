export const NUM_OF_SKILLS = 7

export enum Skill {
  Keeper = 'Keeper',
  Defending = 'Defending',
  Playmaking = 'Playmaking',
  Winger = 'Winger',
  Passing = 'Passing',
  Scoring = 'Scoring',
  SetPieces = 'SetPieces',
}

export interface PlayerAge {
  years: number
  days: number
}

export type PlayerSkills = Record<Skill, number>
