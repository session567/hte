/**
 * The changes for team spirit to drop when buying/selling a player, based on their gentleness level.
 *
 * Indexed by gentleness level: 0=Nasty, 1=Controversial, 2=Pleasant, 3=Sympathetic, 4=Popular
 *
 * @See {@link https://stage.hattrick.org/Forum/Read.aspx?t=17665541&n=44&v=4&mr=0}
 */
export const BUY_TS_DROP_RATES = [69, 47, 30, 0, 0]
export const SELL_TS_DROP_RATES = [0, 0, 12, 22, 27]
