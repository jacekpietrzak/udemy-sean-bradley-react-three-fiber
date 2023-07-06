import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box({ position, name, wireframe, color }) {
  const [boxColor, setBoxColor] = useState(color)
  const [hovered, setHovered] = useState(false)
  const [rotate, setRotate] = useState(false)
  const instanceRef = useRef()
  const materialRef = useRef()
  useEffect(() => {
    console.log(instanceRef)
    console.log(materialRef)
  })

  useFrame((state, delta) => {
    {
      if (rotate) {
        instanceRef.current.rotation.x += 1 * delta
        instanceRef.current.rotation.y += 0.5 * delta
      }
    }
    if (hovered) {
      setBoxColor('green')
      // instanceRef.current.position.y =
      //   Math.sin(state.clock.getElapsedTime() * 2) / 4
    } else {
      setBoxColor(color)
    }
  })
  return (
    <mesh
      position={position}
      name={name}
      ref={instanceRef}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() => {
        setRotate(!rotate)
        console.log(instanceRef)
      }}
      onPointerOver={() => {
        setHovered(true)
        console.log(instanceRef.current.name)
      }}
      onPointerOut={() => {
        setHovered(false)
        console.log(instanceRef.current.name)
      }}
      // onUpdate={(self) => console.log(self)}
    >
      <boxGeometry />
      <meshBasicMaterial
        color={boxColor}
        wireframe={wireframe}
        ref={materialRef}
      />
    </mesh>
  )
}
