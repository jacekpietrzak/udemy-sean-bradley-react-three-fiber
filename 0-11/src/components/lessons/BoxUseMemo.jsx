import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Box(props) {
  const ref = useRef()
  const [rotate, setRotate] = useState(false) // if false = 0 if true = 1
  // const geometry = new THREE.BoxGeometry()
  const geometry = useMemo(() => new THREE.BoxGeometry(), [])
  // use useMemo if we are using expensive, resource intensive functions from needlessly re-running
  // You should only use useMemo as a performance optimization, in case your code doesn’t work without it

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotate
    ref.current.rotation.y += 0.5 * delta * rotate
  })

  useEffect(() => {
    console.log(ref.current.geometry.uuid)
  })

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerDown={() => setRotate(!rotate)}
      geometry={geometry}>
      {/* <boxGeometry /> */}
      <meshBasicMaterial color={'lime'} wireframe />
    </mesh>
  )
}
