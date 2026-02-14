export const NUM_OF_SKILLS = 7

export type Skill = 'keeper' | 'defending' | 'playmaking' | 'winger' | 'passing' | 'scoring' | 'setPieces'

export type PlayerAge = {
  years: number
  days: number
}

export type PlayerSkills = Record<Skill, number>
