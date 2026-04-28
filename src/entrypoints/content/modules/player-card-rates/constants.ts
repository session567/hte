/**
 * Yellow card probability matrix based on a player's honesty and aggressiveness.
 *
 * Rows = aggressiveness, columns = honesty. Values are percentages.
 *
 * Both denominations are from 0 to 5 in Hattrick, but "saintly" honesty and "unstable" aggressiveness are excluded due
 * to insufficient sample sizes.
 *
 * @see {@link https://stage.hattrick.org/Forum/Read.aspx?t=17665541&n=369&v=4}
 */
export const YELLOW_CARD_RATES: number[][] = [
  // Infamous  Dishonest  Honest  Upright  Righteous
  [2.7, 0.5, 0.6, 0.5, 0.5], // Tranquil
  [7.9, 3.1, 1.7, 1.6, 1.7], // Calm
  [10.6, 7.6, 4.9, 3.9, 3.7], // Balanced
  [12.0, 10.7, 9.0, 7.6, 7.0], // Temperamental
  [13.2, 12.7, 12.0, 11.4, 11.4], // Fiery
]

/**
 * Red card probability matrix based on a player's honesty and aggressiveness.
 *
 * Rows = aggressiveness, columns = honesty. Values are percentages.
 *
 * Both denominations are from 0 to 5 in Hattrick, but "saintly" honesty and "unstable" aggressiveness are excluded due
 * to insufficient sample sizes.
 *
 * @see {@link https://stage.hattrick.org/Forum/Read.aspx?t=17665541&n=369&v=4}
 */
export const RED_CARD_RATES: number[][] = [
  // Infamous  Dishonest  Honest  Upright  Righteous
  [0.08, 0.01, 0.02, 0.01, 0.01], // Tranquil
  [0.36, 0.12, 0.08, 0.08, 0.08], // Calm
  [0.66, 0.43, 0.27, 0.23, 0.23], // Balanced
  [0.88, 0.78, 0.64, 0.55, 0.49], // Temperamental
  [1.17, 1.12, 1.05, 0.99, 1.04], // Fiery
]
