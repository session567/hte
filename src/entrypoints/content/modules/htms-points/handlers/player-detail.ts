import { querySelector } from '@/entrypoints/content/common/utils/dom'
import { processPlayer } from '@/entrypoints/content/modules/htms-points/utils'

const runPlayerDetail = (): void => {
  const playerElement = querySelector('#mainBody .playerInfo')
  const ageElement = querySelector('#mainBody > .byline')
  if (playerElement && ageElement) processPlayer(playerElement, ageElement)
}

export default runPlayerDetail
