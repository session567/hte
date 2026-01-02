export const paths = {
  all: '__ALL__',
  appDenominations: '/Help/Rules/AppDenominations.aspx',
  matches: '/Club/Matches/',
  player: '/Club/Players/Player.aspx',
  players: '/Club/Players/',
  series: '/World/Series/',
  specialists: '/Club/Specialists/',
  stadium: '/Club/Stadium/',
  transfersSearchResult: '/World/Transfers/TransfersSearchResult.aspx',
  youthPlayer: '/Club/Players/YouthPlayer.aspx',
  youthPlayers: '/Club/Players/YouthPlayers.aspx',
}

export const getCurrentPath = () => window.location.pathname

export const isPath = (path: string) => getCurrentPath() === path
