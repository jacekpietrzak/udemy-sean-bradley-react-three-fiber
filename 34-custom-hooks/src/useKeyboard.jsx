import { useEffect, useRef } from 'react'

export default function useKeyboard() {
  const keyMap = useRef({})

  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap.current[e.code] = e.type === 'keydown'
      // console.log(e)
      // console.log('keyMap', keyMap)
    }
    document.addEventListener('keydown', onDocumentKey)
    document.addEventListener('keyup', onDocumentKey)
    return () => {
      document.removeEventListener('keydown', onDocumentKey)
      document.removeEventListener('keyup', onDocumentKey)
    } // this is must have in any hooks. It is for celaning memory. Each time react rerender component in which this hook is used will clear data. If we didnt have it it would add to it and we would build up unnecessary memory.
  })

  return keyMap.current
}
