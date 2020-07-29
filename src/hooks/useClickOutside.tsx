import { useEffect } from 'react'

const MOUSEDOWN = 'mousedown'
const TOUCHSTART = 'touchstart'

type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART]
type HandledEventsType = HandledEvents[number]
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type]
}[HandledEventsType]
type Handler = (event: PossibleEvent) => void

export default function useClickOutside(ref: React.RefObject<HTMLElement>, handler: Handler) {
  useEffect(() => {

    const listener = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    }
    document.addEventListener(MOUSEDOWN, listener)
    document.addEventListener(TOUCHSTART, listener)
    return () => {
      document.removeEventListener(MOUSEDOWN, listener)
      document.removeEventListener(TOUCHSTART, listener)
    }
  }
    , [ref, handler]
  )
}
